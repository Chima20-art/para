import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import ClientLayout from "@/components/client-layout"

export default async function PromosPage() {
    // Fetch products with discounts (where original_price exists)
    const { data: promoProducts } = await supabase
        .from("products")
        .select("*")
        .not("original_price", "is", null)
        .order("created_at", { ascending: false })

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4 text-red-600">🔥 PROMOTIONS</h1>
                    <p className="text-gray-600">Profitez de nos meilleures offres et réductions exceptionnelles</p>
                </div>

                {promoProducts && promoProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {promoProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">Aucune promotion disponible pour le moment.</p>
                        <p className="text-sm text-gray-500">Revenez bientôt pour découvrir nos nouvelles offres !</p>
                    </div>
                )}
            </div>
        </ClientLayout>
    )
}
