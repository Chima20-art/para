import { supabase } from "@/lib/supabase"
import HeroBanner from "@/components/hero-banner"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ClientLayout from "@/components/client-layout"

export default async function HomePage() {
  // Fetch featured products
  const { data: featuredProducts } = await supabase.from("products").select("*").eq("featured", true).limit(8)

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("*").limit(6)

  return (
      <ClientLayout>
        <div className="min-h-screen">
          <HeroBanner />

          {/* Categories Section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Nos Catégories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories?.map((category) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">💊</span>
                      </div>
                      <h3 className="font-medium text-sm">{category.name}</h3>
                    </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Produits en Vedette</h2>
                <Button variant="outline" asChild>
                  <Link href="/produits">Voir tous les produits</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* Promotional Banner */}
          <section className="py-12 bg-teal-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Livraison Gratuite</h2>
              <p className="text-xl mb-6">Sur toutes les commandes de plus de 300 DH</p>
              <Button size="lg" variant="secondary">
                Commandez maintenant
              </Button>
            </div>
          </section>
        </div>
      </ClientLayout>
  )
}
