import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ClientLayout from "@/components/client-layout"
import Link from "next/link"

export default async function CataloguePage() {
    // Fetch all products
    const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    // Fetch all categories for filter
    const { data: categories } = await supabase.from("categories").select("*").order("name")

    // Get unique brands for filter
    const { data: brandData } = await supabase.from("products").select("brand").not("brand", "is", null)
    const uniqueBrands = [...new Set(brandData?.map((item) => item.brand))].filter(Boolean)

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Catalogue Complet</h1>
                    <p className="text-gray-600">Découvrez tous nos produits de parapharmacie</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Filtres</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Rechercher</label>
                            <Input placeholder="Nom du produit..." />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Catégorie</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Toutes les catégories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les catégories</SelectItem>
                                    {categories?.map((category) => (
                                        <SelectItem key={category.id} value={category.slug}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Brand Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Marque</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Toutes les marques" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les marques</SelectItem>
                                    {uniqueBrands.map((brand) => (
                                        <SelectItem key={brand} value={brand || ""}>
                                            {brand}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Prix</label>
                            <Select>
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
                    </div>
                </div>

                {/* Categories Quick Links */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Parcourir par catégorie</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories?.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm hover:bg-teal-200 transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600">{products?.length || 0} produits trouvés</p>
                        <Select>
                            <SelectTrigger className="w-48">
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

                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 mb-4">Aucun produit trouvé.</p>
                            <Button asChild>
                                <Link href="/">Retour à l'accueil</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {products && products.length > 0 && (
                    <div className="text-center">
                        <Button variant="outline" size="lg">
                            Charger plus de produits
                        </Button>
                    </div>
                )}
            </div>
        </ClientLayout>
    )
}
