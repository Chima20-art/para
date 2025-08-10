import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import { notFound } from "next/navigation"
import Image from "next/image"
import ClientLayout from "@/components/client-layout"

interface BrandPageProps {
    params: {
        brand: string
    }
}

export default async function BrandPage({ params }: BrandPageProps) {
    // Convert URL slug back to brand name
    const brandName = params.brand.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

    // Fetch products for this brand
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .ilike("brand", `%${brandName}%`)
        .order("created_at", { ascending: false })

    if (!products || products.length === 0) {
        notFound()
    }

    const brand = products[0]?.brand

    return (
        <ClientLayout>
            <div className="min-h-screen">
                {/* Brand Hero Section */}
                <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
                    <div className="container mx-auto px-4 py-12 md:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{brand}</h1>
                                    <p className="text-lg text-gray-600 max-w-md">
                                        {brand === "DERCOS" &&
                                            "Pionnier de l'innovation et de la recherche sur le cuir chevelu depuis plus de 50 ans. Créé en 1964 avec comme ambition : associer l'expertise dermatologique à la connaissance en cosmétique."}
                                        {brand === "La Roche Posay" &&
                                            "Recommandée par plus de 90 000 dermatologues dans le monde, La Roche-Posay développe des produits pour les peaux sensibles."}
                                        {brand === "Vichy" &&
                                            "Depuis 1931, Vichy puise sa force dans les vertus de son Eau Thermale minéralisante, véritable signature de la marque."}
                                        {brand === "Avène" &&
                                            "Depuis plus de 270 ans, l'Eau thermale d'Avène apaise et soulage les peaux sensibles, intolérantes et allergiques."}
                                        {!["DERCOS", "La Roche Posay", "Vichy", "Avène"].includes(brand || "") &&
                                            `Découvrez tous les produits ${brand}, une marque de confiance pour vos soins.`}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium">
                                        Découvrir la gamme
                                    </button>
                                    <button className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium">
                                        Voir tous les produits
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                                            <Image
                                                src="/placeholder.svg?height=400&width=300"
                                                alt="Portrait homme"
                                                fill
                                                className="object-cover grayscale"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                                            <Image
                                                src="/placeholder.svg?height=400&width=300"
                                                alt="Portrait femme"
                                                fill
                                                className="object-cover grayscale"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Brand product overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <Image
                                                src="/placeholder.svg?height=80&width=80"
                                                alt={`Produit ${brand}`}
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                            />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{brand}</h3>
                                        <p className="text-sm text-gray-600">TECHNIQUE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-4">Découvrez Nos Best Sellers</h2>
                            <p className="text-gray-600">Les produits {brand} les plus populaires</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </ClientLayout>
    )
}
