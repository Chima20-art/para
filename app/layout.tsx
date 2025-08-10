import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Univers Paradiscount - Parapharmacie en ligne au Maroc",
    description:
        "Votre parapharmacie en ligne de confiance au Maroc. Produits de beauté, soins, cosmétiques avec livraison partout au Maroc.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
        <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">{children}</main>
        <Footer />
        </body>
        </html>
    )
}
