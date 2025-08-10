"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import ClientLayout from "@/components/client-layout"

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get("order")
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchOrder() {
            if (!orderNumber) return

            const { data, error } = await supabase
                .from("orders")
                .select(`
          *,
          order_items (*)
        `)
                .eq("order_number", orderNumber)
                .single()

            if (data) {
                setOrder(data)
            }
            setLoading(false)
        }

        fetchOrder()
    }, [orderNumber])

    if (loading) {
        return (
            <ClientLayout>
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse text-center">
                        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    </div>
                </div>
            </ClientLayout>
        )
    }

    if (!order) {
        return (
            <ClientLayout>
                <div className="container mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Commande non trouvée</h1>
                    <p className="text-gray-600 mb-8">La commande que vous recherchez n'existe pas.</p>
                    <Button asChild>
                        <Link href="/">Retour à l'accueil</Link>
                    </Button>
                </div>
            </ClientLayout>
        )
    }

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-green-600 mb-2">Commande confirmée !</h1>
                        <p className="text-gray-600">Merci pour votre commande. Nous avons bien reçu votre demande.</p>
                    </div>

                    {/* Order Details */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Détails de la commande</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Numéro de commande</p>
                                    <p className="font-bold">{order.order_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Date</p>
                                    <p className="font-medium">{new Date(order.created_at).toLocaleDateString("fr-FR")}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total</p>
                                    <p className="font-bold text-lg">{order.total_amount.toFixed(2)} DH</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Statut</p>
                                    <p className="font-medium text-yellow-600">En attente</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Info */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Informations de livraison</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p>
                                    <strong>Nom:</strong> {order.customer_name}
                                </p>
                                <p>
                                    <strong>Téléphone:</strong> {order.customer_phone}
                                </p>
                                <p>
                                    <strong>Email:</strong> {order.customer_email}
                                </p>
                                <p>
                                    <strong>Adresse:</strong> {order.shipping_address}
                                </p>
                                <p>
                                    <strong>Ville:</strong> {order.city}
                                </p>
                                {order.postal_code && (
                                    <p>
                                        <strong>Code postal:</strong> {order.postal_code}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Articles commandés</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {order.order_items.map((item: any) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{item.product_name}</p>
                                            <p className="text-sm text-gray-600">
                                                {item.product_price.toFixed(2)} DH × {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium">{item.subtotal.toFixed(2)} DH</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Prochaines étapes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Package className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="font-medium">Préparation de votre commande</p>
                                        <p className="text-sm text-gray-600">Nous préparons vos articles avec soin</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Truck className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="font-medium">Expédition</p>
                                        <p className="text-sm text-gray-600">Livraison sous 2-3 jours ouvrables</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <CreditCard className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="font-medium">Paiement à la livraison</p>
                                        <p className="text-sm text-gray-600">Payez en espèces lors de la réception</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="flex-1">
                            <Link href="/">Continuer vos achats</Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1 bg-transparent">
                            <Link href={`mailto:support@parapharmacie.ma?subject=Commande ${order.order_number}`}>
                                Contacter le support
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}
