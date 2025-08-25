"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
    Minus,
    Plus,
    ShoppingCart,
    Share2,
    Shield,
    Truck,
    CreditCard,
    CheckCircle,
    Facebook,
    Instagram,
    MessageCircle,
    Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useCart } from "@/lib/cart"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"
import ClientLayout from "@/components/client-layout"

type Product = Database["public"]["Tables"]["products"]["Row"]

export default function ProductPage() {
    const params = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const { addItem } = useCart()

    useEffect(() => {
        async function fetchProduct() {
            if (!params.slug) return

            const { data, error } = await supabase.from("products").select("*").eq("slug", params.slug).single()

            if (data) {
                setProduct(data)
            }
            setLoading(false)
        }

        fetchProduct()
    }, [params.slug])

    const handleAddToCart = () => {
        if (!product) return

        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                brand: product.brand,
            })
        }

        toast.success("Ajouté au panier !", {
            description: `${quantity} × ${product.name} ajouté(s) à votre panier.`,
        })
    }

    const handleShare = (platform: string) => {
        const url = window.location.href
        const text = `Découvrez ${product?.name} sur Univers Paradiscount`

        switch (platform) {
            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
                toast.success("Partage Facebook", {
                    description: "Page Facebook ouverte pour partager ce produit",
                })
                break
            case "instagram":
                navigator.clipboard.writeText(`${text} - ${url}`)
                toast.success("Lien copié !", {
                    description: "Vous pouvez maintenant le partager sur Instagram",
                })
                break
            case "whatsapp":
                window.open(`https://wa.me/?text=${encodeURIComponent(`${text} - ${url}`)}`, "_blank")
                toast.success("WhatsApp ouvert", {
                    description: "Vous pouvez maintenant partager ce produit",
                })
                break
            case "copy":
                navigator.clipboard.writeText(url)
                toast.success("Lien copié !", {
                    description: "Le lien du produit a été copié dans le presse-papiers",
                })
                break
        }
    }

    if (loading) {
        return (
            <ClientLayout>
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="aspect-square bg-gray-200 rounded-lg"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        )
    }

    if (!product) {
        return (
            <ClientLayout>
                <div className="container mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
                    <p className="text-gray-600">Le produit que vous recherchez n'existe pas.</p>
                </div>
            </ClientLayout>
        )
    }

    const discountPercentage = product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0

    const brandSlug = product.brand?.toLowerCase().replace(/\s+/g, "-")

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg border">
                            <Image
                                src={product.image_url || "/placeholder.svg?height=600&width=600&query=product"}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            {discountPercentage > 0 && (
                                <Badge className="absolute top-4 left-4 bg-red-500 text-white">-{discountPercentage}%</Badge>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Brand - Clickable */}
                        {product.brand && (
                            <Link
                                href={`/marques/${brandSlug}`}
                                className="inline-block text-teal-600 font-medium hover:text-teal-700 hover:underline transition-colors"
                            >
                                {product.brand}
                            </Link>
                        )}

                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-4">
                                <span className="text-3xl font-bold text-gray-900">{product.price.toFixed(2)} DH</span>
                                {product.original_price && (
                                    <span className="text-xl text-gray-500 line-through">{product.original_price.toFixed(2)} DH</span>
                                )}
                            </div>
                            {discountPercentage > 0 && (
                                <p className="text-green-600 font-medium">
                                    Vous économisez {(product.original_price! - product.price).toFixed(2)} DH
                                </p>
                            )}
                        </div>

                        <Separator />

                        {/* Quantity and Add to Cart */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="font-medium">Quantité:</span>
                                <div className="flex items-center border rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="px-4 py-2 font-medium">{quantity}</span>
                                    <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                                    size="lg"
                                    disabled={!product.in_stock}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {product.in_stock ? "Ajouter au panier" : "Rupture de stock"}
                                </Button>

                                {/* Share Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="lg">
                                            <Share2 className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
                                            <Facebook className="w-4 h-4 mr-2" />
                                            Facebook
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShare("instagram")} className="cursor-pointer">
                                            <Instagram className="w-4 h-4 mr-2" />
                                            Instagram
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            WhatsApp
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleShare("copy")} className="cursor-pointer">
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copier le lien
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <Separator />

                        {/* Product Features */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex items-center space-x-3">
                                <Truck className="w-5 h-5 text-green-600" />
                                <span className="text-sm">Livraison gratuite dès 300 DH</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CreditCard className="w-5 h-5 text-green-600" />
                                <span className="text-sm">Paiement à la livraison</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="w-5 h-5 text-green-600" />
                                <span className="text-sm">Produit authentique garanti</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm">Géré par des pharmaciens</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Description - Last */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Description</h3>
                            <div className="prose prose-sm max-w-none">
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description || "Description du produit non disponible."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Product Information */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white border rounded-lg p-6 text-center">
                        <Truck className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Livraison Rapide</h3>
                        <p className="text-sm text-gray-600">Livraison sous 2-3 jours ouvrables partout au Maroc</p>
                    </div>

                    <div className="bg-white border rounded-lg p-6 text-center">
                        <Shield className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Produits Authentiques</h3>
                        <p className="text-sm text-gray-600">Tous nos produits sont authentiques et certifiés</p>
                    </div>

                    <div className="bg-white border rounded-lg p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Conseil Pharmacien</h3>
                        <p className="text-sm text-gray-600">Équipe de pharmaciens disponible pour vous conseiller</p>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}
