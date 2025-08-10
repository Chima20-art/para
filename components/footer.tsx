import Link from "next/link"
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="bg-teal-600 text-white px-3 py-2 rounded font-bold text-xl">U</div>
                            <div className="ml-2">
                                <div className="font-bold text-lg">UNIVERS</div>
                                <div className="text-sm text-teal-400 font-medium">PARADISCOUNT</div>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Votre parapharmacie en ligne de confiance au Maroc. Produits authentiques, conseils d'experts.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/categories/dermocosmétique" className="text-gray-300 hover:text-white">
                                    Dermocosmétique
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/cheveux" className="text-gray-300 hover:text-white">
                                    Cheveux
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/visage" className="text-gray-300 hover:text-white">
                                    Visage
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/corps" className="text-gray-300 hover:text-white">
                                    Corps
                                </Link>
                            </li>
                            <li>
                                <Link href="/promos" className="text-gray-300 hover:text-white">
                                    Promotions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Service client</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-white">
                                    Nous contacter
                                </Link>
                            </li>
                            <li>
                                <Link href="/livraison" className="text-gray-300 hover:text-white">
                                    Livraison
                                </Link>
                            </li>
                            <li>
                                <Link href="/retours" className="text-gray-300 hover:text-white">
                                    Retours
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-300 hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/cgv" className="text-gray-300 hover:text-white">
                                    CGV
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-teal-400" />
                                <span className="text-gray-300">+212 5XX-XXXXXX</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-teal-400" />
                                <span className="text-gray-300">contact@parapharmacie.ma</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-teal-400" />
                                <span className="text-gray-300">Casablanca, Maroc</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">© 2024 Univers Paradiscount. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
