"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart"
import type { Database } from "@/lib/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            brand: product.brand,
        })
    }

    const discountPercentage = product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0

    return (
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
            <div className="relative">
                <Link href={`/produits/${product.slug}`}>
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <Image
                            src={product.image_url || "/placeholder.svg?height=300&width=300&query=product"}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-200"
                        />
                    </div>
                </Link>

                {discountPercentage > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{discountPercentage}%</Badge>
                )}

                <Button variant="outline" size="sm" className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                </Button>
            </div>

            <div className="p-4">
                {product.brand && <p className="text-sm text-teal-600 font-medium mb-1">{product.brand}</p>}

                <Link href={`/produits/${product.slug}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-teal-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">{product.price.toFixed(2)} DH</span>
                        {product.original_price && (
                            <span className="text-sm text-gray-500 line-through">{product.original_price.toFixed(2)} DH</span>
                        )}
                    </div>
                </div>

                <Button
                    onClick={handleAddToCart}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={!product.in_stock}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.in_stock ? "Ajouter au panier" : "Rupture de stock"}
                </Button>
            </div>
        </div>
    )
}
