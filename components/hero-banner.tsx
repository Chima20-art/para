import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
    return (
        <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">DERCOS</h1>
                            <p className="text-lg text-gray-600 max-w-md">
                                Découvrez la gamme DERCOS, expertise dermatologique pour vos cheveux. Solutions professionnelles
                                recommandées par les dermatologues.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                                Découvrir la gamme
                            </Button>
                            <Button variant="outline" size="lg">
                                Voir tous les produits
                            </Button>
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

                        {/* DERCOS product overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Image
                                        src="/placeholder.svg?height=80&width=80"
                                        alt="Produit DERCOS"
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="font-bold text-lg mb-2">DERCOS</h3>
                                <p className="text-sm text-gray-600">TECHNIQUE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
