"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu, X, Facebook, Instagram, MessageCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart"
import { supabase } from "@/lib/supabase"

const staticMenuItems = [
    { name: "MARQUES", href: "/marques" },
    { name: "PROMOS", href: "/promos", highlight: true },
    { name: "CATALOGUE", href: "/catalogue" },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isClient, setIsClient] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { getTotalItems } = useCart()
    const router = useRouter()

    // Only show cart count after hydration
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Fetch categories from Supabase
    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase.from("categories").select("*").order("name").limit(10) // Get top 10 categories

                if (data) {
                    setCategories(data)
                }
            } catch (error) {
                console.error("Error fetching categories:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    const totalItems = isClient ? getTotalItems() : 0

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const handleSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch(e as any)
        }
    }

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
                        <form onSubmit={handleSearch} className="relative">
                            <Input
                                type="text"
                                placeholder="Rechercher un produit - une marque"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleSearchKeyPress}
                                className="w-full pr-12 py-3"
                            />
                            <Button type="submit" size="sm" className="absolute right-1 top-1 bg-teal-600 hover:bg-teal-700">
                                <Search className="w-4 h-4" />
                            </Button>
                        </form>
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
                    </div>
                </div>

                {/* Mobile search */}
                <div className="mt-4 md:hidden">
                    <form onSubmit={handleSearch} className="relative">
                        <Input
                            type="text"
                            placeholder="Rechercher un produit"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                            className="w-full pr-12"
                        />
                        <Button type="submit" size="sm" className="absolute right-1 top-1 bg-teal-600 hover:bg-teal-700">
                            <Search className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-gray-50 border-t">
                <div className="container mx-auto px-4">
                    <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
                        <div className="flex flex-col md:flex-row md:items-center py-2 space-y-2 md:space-y-0 md:space-x-6">
                            {/* Categories Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="text-sm font-medium px-3 py-2 rounded transition-colors text-gray-700 hover:text-teal-600 hover:bg-white flex items-center"
                                    >
                                        CATÉGORIES
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    {loading ? (
                                        <DropdownMenuItem disabled>Chargement...</DropdownMenuItem>
                                    ) : (
                                        <>
                                            {categories.slice(0, 8).map((category) => (
                                                <DropdownMenuItem key={category.id} asChild>
                                                    <Link href={`/categories/${category.slug}`} className="w-full">
                                                        {category.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href="/categories" className="w-full font-medium text-teal-600">
                                                    Toutes les catégories →
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Static Menu Items */}
                            {staticMenuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-medium px-3 py-2 rounded transition-colors ${
                                        item.highlight
                                            ? "bg-red-500 text-white hover:bg-red-600"
                                            : "text-gray-700 hover:text-teal-600 hover:bg-white"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Remaining categories for mobile */}
                            <div className="md:hidden space-y-2">
                                {categories.slice(0, 8).map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categories/${category.slug}`}
                                        className="block text-sm font-medium px-3 py-2 rounded transition-colors text-gray-700 hover:text-teal-600 hover:bg-white"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/categories"
                                    className="block text-sm font-medium px-3 py-2 rounded transition-colors text-teal-600 hover:bg-white"
                                >
                                    Toutes les catégories →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
