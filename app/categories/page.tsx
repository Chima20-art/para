"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { notFound } from "next/navigation"
import ClientLayout from "@/components/client-layout"

interface CategoryPageProps {
    params: {
        slug: string
    }
}

export default function CategoryPage() {
    const params = useParams()
    const [category, setCategory] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [filteredProducts, setFilteredProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("newest")
    const [priceRange, setPriceRange] = useState("all")
    const [brandFilter, setBrandFilter] = useState("all")
    const [brands, setBrands] = useState<string[]>([])

    useEffect(() => {
        async function fetchData() {
            if (!params.slug) return

            // Decode the URL slug to handle special characters like é, à, etc.
            const decodedSlug = decodeURIComponent(params.slug as string)

            // Fetch category
            const { data: categoryData } = await supabase.from("categories").select("*").eq("slug", decodedSlug).single()

            if (!categoryData) {
                notFound()
                return
            }

            setCategory(categoryData)

            // Fetch products in this category
            const { data: productsData } = await supabase
                .from("products")
                .select("*")
                .eq("category_id", categoryData.id)
                .order("created_at", { ascending: false })

            if (productsData) {
                setProducts(productsData)
                setFilteredProducts(productsData)

                // Extract unique brands
                const uniqueBrands = [...new Set(productsData.map((p) => p.brand).filter(Boolean))] as string[]
                setBrands(uniqueBrands)
            }

            setLoading(false)
        }

        fetchData()
    }, [params.slug])

    // Filter and sort products
    useEffect(() => {
        let filtered = [...products]

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Brand filter
        if (brandFilter !== "all") {
            filtered = filtered.filter((product) => product.brand === brandFilter)
        }

        // Price range filter
        if (priceRange !== "all") {
            switch (priceRange) {
                case "0-50":
                    filtered = filtered.filter((product) => product.price <= 50)
                    break
                case "50-100":
                    filtered = filtered.filter((product) => product.price > 50 && product.price <= 100)
                    break
                case "100-200":
                    filtered = filtered.filter((product) => product.price > 100 && product.price <= 200)
                    break
                case "200+":
                    filtered = filtered.filter((product) => product.price > 200)
                    break
            }
        }

        // Sort products
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "price-high":
                filtered.sort((a, b) => b.price - a.price)
                break
            case "name":
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            case "newest":
            default:
                filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                break
        }

        setFilteredProducts(filtered)
    }, [products, searchTerm, sortBy, priceRange, brandFilter])

    const clearFilters = () => {
        setSearchTerm("")
        setSortBy("newest")
        setPriceRange("all")
        setBrandFilter("all")
    }

    if (loading) {
        return (
            <ClientLayout>
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="aspect-square bg-gray-200 rounded-lg"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ClientLayout>
        )
    }

    if (!category) {
        return null
    }

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Category Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
                    {category.description && <p className="text-gray-600 max-w-2xl">{category.description}</p>}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold flex items-center">
                            <Filter className="w-5 h-5 mr-2" />
                            Filtres
                        </h2>
                        <Button variant="outline" onClick={clearFilters} size="sm">
                            Effacer les filtres
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Rechercher</label>
                            <Input
                                placeholder="Nom du produit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Brand Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Marque</label>
                            <Select value={brandFilter} onValueChange={setBrandFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Toutes les marques" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les marques</SelectItem>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand} value={brand}>
                                            {brand}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Prix</label>
                            <Select value={priceRange} onValueChange={setPriceRange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tous les prix" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les prix</SelectItem>
                                    <SelectItem value="0-50">0 - 50 DH</SelectItem>
                                    <SelectItem value="50-100">50 - 100 DH</SelectItem>
                                    <SelectItem value="100-200">100 - 200 DH</SelectItem>
                                    <SelectItem value="200+">200+ DH</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Trier par</label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Trier par" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Plus récents</SelectItem>
                                    <SelectItem value="price-low">Prix croissant</SelectItem>
                                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                                    <SelectItem value="name">Nom A-Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-6">
                    <p className="text-gray-600">{filteredProducts.length} produit(s) trouvé(s)</p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">Aucun produit trouvé avec ces filtres.</p>
                        <Button onClick={clearFilters} variant="outline">
                            Effacer les filtres
                        </Button>
                    </div>
                )}
            </div>
        </ClientLayout>
    )
}
