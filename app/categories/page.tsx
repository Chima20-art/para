import { supabase } from "@/lib/supabase"
import Link from "next/link"
import ClientLayout from "@/components/client-layout"

export default async function AllCategoriesPage() {
    // Fetch all categories
    const { data: categories } = await supabase.from("categories").select("*").order("name")

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Toutes les Catégories</h1>
                    <p className="text-gray-600">Explorez tous nos produits par catégorie</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories?.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow group"
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                                    <span className="text-2xl">💊</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                                {category.description && <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </ClientLayout>
    )
}
