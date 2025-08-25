"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useCart } from "@/lib/cart"
import { supabase } from "@/lib/supabase"
import ClientLayout from "@/components/client-layout"

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getTotalPrice, clearCart } = useCart()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        shippingAddress: "",
        city: "",
        postalCode: "",
        notes: "",
    })

    const totalPrice = getTotalPrice()
    const shippingCost = totalPrice >= 300 ? 0 : 30
    const finalTotal = totalPrice + shippingCost

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Generate order number
            const orderNumber = `CMD-${Date.now()}`

            // Create order
            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert({
                    order_number: orderNumber,
                    customer_name: formData.customerName,
                    customer_email: formData.customerEmail,
                    customer_phone: formData.customerPhone,
                    shipping_address: formData.shippingAddress,
                    city: formData.city,
                    postal_code: formData.postalCode,
                    total_amount: finalTotal,
                    notes: formData.notes,
                    status: "pending",
                    payment_method: "cash_on_delivery",
                })
                .select()
                .single()

            if (orderError) throw orderError

            // Create order items
            const orderItems = items.map((item) => ({
                order_id: order.id,
                product_id: item.id,
                product_name: item.name,
                product_price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity,
            }))

            const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

            if (itemsError) throw itemsError

            toast.success("Commande confirmée !", {
                description: `Votre commande ${orderNumber} a été créée avec succès.`,
            })

            // Clear cart and redirect
            clearCart()
            router.push(`/commande/confirmation?order=${orderNumber}`)
        } catch (error) {
            console.error("Error creating order:", error)
            toast.error("Erreur", {
                description: "Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.",
            })
        } finally {
            setLoading(false)
        }
    }

    if (items.length === 0) {
        router.push("/panier")
        return null
    }

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Finaliser votre commande</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de livraison</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="customerName">Nom complet *</Label>
                                            <Input
                                                id="customerName"
                                                name="customerName"
                                                value={formData.customerName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="customerPhone">Téléphone *</Label>
                                            <Input
                                                id="customerPhone"
                                                name="customerPhone"
                                                type="tel"
                                                value={formData.customerPhone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="customerEmail">Email *</Label>
                                        <Input
                                            id="customerEmail"
                                            name="customerEmail"
                                            type="email"
                                            value={formData.customerEmail}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="shippingAddress">Adresse de livraison *</Label>
                                        <Textarea
                                            id="shippingAddress"
                                            name="shippingAddress"
                                            value={formData.shippingAddress}
                                            onChange={handleInputChange}
                                            required
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">Ville *</Label>
                                            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                                        </div>
                                        <div>
                                            <Label htmlFor="postalCode">Code postal</Label>
                                            <Input
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="notes">Notes (optionnel)</Label>
                                        <Textarea
                                            id="notes"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            placeholder="Instructions spéciales pour la livraison..."
                                            rows={3}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" size="lg" disabled={loading}>
                                        {loading ? "Traitement..." : "Confirmer la commande"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Résumé de votre commande</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">Qté: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">{(item.price * item.quantity).toFixed(2)} DH</p>
                                    </div>
                                ))}

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Sous-total</span>
                                        <span>{totalPrice.toFixed(2)} DH</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Livraison</span>
                                        <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "GRATUIT" : `${shippingCost.toFixed(2)} DH`}
                    </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>{finalTotal.toFixed(2)} DH</span>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h3 className="font-medium text-yellow-800 mb-2">💰 Paiement à la livraison</h3>
                                    <p className="text-sm text-yellow-700">
                                        Vous paierez en espèces lors de la réception de votre commande.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}
