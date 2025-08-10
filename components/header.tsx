"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, X, Facebook, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart"

const categories = [
    { name: "MARQUES", href: "/marques" },
    { name: "PROMOS", href: "/promos", highlight: true },
    { name: "CATALOGUE", href: "/catalogue" },
    { name: "DERMOCOSMÉTIQUE", href: "/categories/dermocosmétique" },
    { name: "CHEVEUX", href: "/categories/cheveux" },
    { name: "VISAGE", href: "/categories/visage" },
    { name: "MAQUILLAGE", href: "/categories/maquillage" },
    { name: "CORPS", href: "/categories/corps" },
    { name: "BÉBÉ&MAMAN", href: "/categories/bebe-maman" },
    { name: "SANTÉ", href: "/categories/sante" },
    { name: "HOME", href: "/categories/home" },
    { name: "PRODUITS CORÉENS", href: "/categories/produits-coreens" },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isClient, setIsClient] = useState(false)
    const { getTotalItems } = useCart()

    // Only show cart count after hydration
    useEffect(() => {
        setIsClient(true)
    }, [])

    const totalItems = isClient ? getTotalItems() : 0

    return (
        <header className="bg-white shadow-sm">
            {/* Top bar */}
            <div className="bg-teal-600 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Facebook className="w-4 h-4" />
                            <Instagram className="w-4 h-4" />
                            <MessageCircle className="w-4 h-4" />
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-white border-white hover:bg-white hover:text-teal-600 bg-transparent"
                        >
                            Contactez nous
                        </Button>
                    </div>
                    <div className="hidden md:block">
                        <span className="font-medium">N° 1 de la parapharmacie au Maroc. Géré par des pharmaciens.</span>
                    </div>
                    <div className="text-right">
                        <span className="text-sm">Livraison partout au Maroc 🚚</span>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="bg-teal-600 text-white px-3 py-2 rounded font-bold text-xl">U</div>
                        <div className="ml-2">
                            <div className="font-bold text-lg text-gray-800">UNIVERS</div>
                            <div className="text-sm text-teal-600 font-medium">PARADISCOUNT</div>
                        </div>
                    </Link>

                    {/* Search bar */}
                    <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Rechercher un produit - une marque"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pr-12 py-3"
                            />
                            <Button size="sm" className="absolute right-1 top-1 bg-teal-600 hover:bg-teal-700">
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Cart and mobile menu */}
                    <div className="flex items-center space-x-4">
                        <Link href="/panier" className="relative">
                            <Button variant="outline" size="sm" className="relative bg-transparent">
                                <ShoppingCart className="w-5 h-5" />
                                {isClient && totalItems > 0 && (
                                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="sm"
                            className="md:hidden bg-transparent"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>

                        <Button className="hidden md:block bg-teal-600 hover:bg-teal-700">🎁 Cartes cadeaux</Button>
                    </div>
                </div>

                {/* Mobile search */}
                <div className="mt-4 md:hidden">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Rechercher un produit"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-12"
                        />
                        <Button size="sm" className="absolute right-1 top-1 bg-teal-600 hover:bg-teal-700">
                            <Search className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-gray-50 border-t">
                <div className="container mx-auto px-4">
                    <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
                        <div className="flex flex-col md:flex-row md:items-center py-2 space-y-2 md:space-y-0 md:space-x-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className={`text-sm font-medium px-3 py-2 rounded transition-colors ${
                                        category.highlight
                                            ? "bg-red-500 text-white hover:bg-red-600"
                                            : "text-gray-700 hover:text-teal-600 hover:bg-white"
                                    }`}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
