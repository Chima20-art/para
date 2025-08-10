import { supabase } from "@/lib/supabase"
import ProductCard from "@/components/product-card"
import { notFound } from "next/navigation"
import ClientLayout from "@/components/client-layout"

interface CategoryPageProps {
    params: {
        slug: string
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    // Decode the URL slug to handle special characters like é, à, etc.
    const decodedSlug = decodeURIComponent(params.slug)

    // Fetch category
    const { data: category } = await supabase.from("categories").select("*").eq("slug", decodedSlug).single()

    if (!category) {
        notFound()
    }

    // Fetch products in this category
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", category.id)
        .order("created_at", { ascending: false })

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Category Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
                    {category.description && <p className="text-gray-600 max-w-2xl">{category.description}</p>}
                </div>

                {/* Products Grid */}
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">Aucun produit trouvé dans cette catégorie.</p>
                    </div>
                )}
            </div>
        </ClientLayout>
    )
}
