"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart"
import ClientLayout from "@/components/client-layout"

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart()
    const [promoCode, setPromoCode] = useState("")

    const totalPrice = getTotalPrice()
    const totalItems = getTotalItems()
    const shippingCost = totalPrice >= 300 ? 0 : 30
    const finalTotal = totalPrice + shippingCost

    if (items.length === 0) {
        return (
            <ClientLayout>
                <div className="container mx-auto px-4 py-12 text-center">
                    <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                    <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
                    <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700">
                        <Link href="/">Continuer vos achats</Link>
                    </Button>
                </div>
            </ClientLayout>
        )
    }

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Panier ({totalItems} articles)</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white border rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 relative overflow-hidden rounded-lg border">
                                        <Image
                                            src={item.image_url || "/placeholder.svg?height=80&width=80&query=product"}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        {item.brand && <p className="text-sm text-teal-600">{item.brand}</p>}
                                        <p className="text-lg font-bold text-gray-900 mt-1">{item.price.toFixed(2)} DH</p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)} DH</p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Sous-total ({totalItems} articles)</span>
                                <span>{totalPrice.toFixed(2)} DH</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Frais de livraison</span>
                                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                  {shippingCost === 0 ? "GRATUIT" : `${shippingCost.toFixed(2)} DH`}
                </span>
                            </div>

                            {totalPrice < 300 && (
                                <p className="text-sm text-gray-600">
                                    Ajoutez {(300 - totalPrice).toFixed(2)} DH pour la livraison gratuite
                                </p>
                            )}

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{finalTotal.toFixed(2)} DH</span>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="mt-6 space-y-2">
                            <label className="text-sm font-medium">Code promo</label>
                            <div className="flex space-x-2">
                                <Input
                                    placeholder="Entrez votre code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <Button variant="outline">Appliquer</Button>
                            </div>
                        </div>

                        <Button asChild className="w-full mt-6 bg-teal-600 hover:bg-teal-700" size="lg">
                            <Link href="/commande">Passer la commande</Link>
                        </Button>

                        <Button variant="outline" asChild className="w-full mt-2 bg-transparent">
                            <Link href="/">Continuer vos achats</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}
