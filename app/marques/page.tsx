import { supabase } from "@/lib/supabase"
import Link from "next/link"
import ClientLayout from "@/components/client-layout"

export default async function BrandsPage() {
    // Get all unique brands from products
    const { data: brands } = await supabase.from("products").select("brand").not("brand", "is", null).order("brand")

    // Get unique brands
    const uniqueBrands = [...new Set(brands?.map((item) => item.brand))].filter(Boolean)

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Nos Marques</h1>
                    <p className="text-gray-600">Découvrez toutes nos marques de confiance</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {uniqueBrands.map((brand) => (
                        <Link
                            key={brand}
                            href={`/marques/${brand?.toLowerCase().replace(/\s+/g, "-")}`}
                            className="bg-white border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-teal-600">{brand?.charAt(0)}</span>
                            </div>
                            <h3 className="font-medium text-gray-900">{brand}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </ClientLayout>
    )
}
