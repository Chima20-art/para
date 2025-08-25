"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import ClientLayout from "@/components/client-layout"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""
    const [searchQuery, setSearchQuery] = useState(query)
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function searchProducts() {
            if (!query) {
                setLoading(false)
                return
            }

            setLoading(true)
            try {
                // Search in product names, descriptions, and brands
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
                    .order("created_at", { ascending: false })

                if (data) {
                    setProducts(data)
                }
            } catch (error) {
                console.error("Error searching products:", error)
            } finally {
                setLoading(false)
            }
        }

        searchProducts()
    }, [query])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/recherche?q=${encodeURIComponent(searchQuery.trim())}`
        }
    }

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{query ? `Résultats pour "${query}"` : "Recherche"}</h1>

                </div>

                {/* Results */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <p className="text-gray-600 mb-6">{products.length} produit(s) trouvé(s)</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                ) : query ? (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-semibold mb-4">Aucun résultat trouvé</h2>
                        <p className="text-gray-600 mb-8">Essayez avec d'autres mots-clés ou parcourez nos catégories</p>
                        <Button asChild>
                            <a href="/catalogue">Voir le catalogue</a>
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-semibold mb-4">Que recherchez-vous ?</h2>
                        <p className="text-gray-600">Utilisez la barre de recherche ci-dessus pour trouver vos produits</p>
                    </div>
                )}
            </div>
        </ClientLayout>
    )
}
