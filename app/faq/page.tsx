"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ClientLayout from "@/components/client-layout"

const faqs = [
    {
        category: "Commandes",
        questions: [
            {
                question: "Comment passer une commande ?",
                answer:
                    "Vous pouvez passer une commande en ajoutant les produits à votre panier, puis en cliquant sur 'Passer la commande'. Remplissez vos informations de livraison et confirmez votre commande.",
            },
            {
                question: "Puis-je modifier ma commande après l'avoir passée ?",
                answer:
                    "Vous pouvez modifier votre commande dans les 2 heures suivant sa confirmation en nous contactant par téléphone ou WhatsApp.",
            },
            {
                question: "Comment annuler ma commande ?",
                answer:
                    "Pour annuler votre commande, contactez-nous immédiatement par téléphone ou WhatsApp avec votre numéro de commande.",
            },
        ],
    },
    {
        category: "Livraison",
        questions: [
            {
                question: "Quels sont les délais de livraison ?",
                answer:
                    "Nous livrons sous 2-3 jours ouvrables partout au Maroc. Les commandes passées avant 14h sont traitées le jour même.",
            },
            {
                question: "Livrez-vous partout au Maroc ?",
                answer:
                    "Oui, nous livrons dans toutes les villes du Maroc. Les frais de livraison sont gratuits pour les commandes de plus de 300 DH.",
            },
            {
                question: "Comment suivre ma commande ?",
                answer:
                    "Vous recevrez un SMS avec le statut de votre commande. Vous pouvez aussi nous contacter avec votre numéro de commande.",
            },
        ],
    },
    {
        category: "Paiement",
        questions: [
            {
                question: "Quels modes de paiement acceptez-vous ?",
                answer:
                    "Nous acceptons uniquement le paiement à la livraison en espèces. Vous payez lors de la réception de votre commande.",
            },
            {
                question: "Est-ce que je peux payer en plusieurs fois ?",
                answer:
                    "Actuellement, nous n'offrons pas de paiement en plusieurs fois. Le paiement se fait intégralement à la livraison.",
            },
            {
                question: "Y a-t-il des frais supplémentaires ?",
                answer:
                    "Les seuls frais supplémentaires sont les frais de livraison (30 DH) pour les commandes de moins de 300 DH.",
            },
        ],
    },
    {
        category: "Produits",
        questions: [
            {
                question: "Vos produits sont-ils authentiques ?",
                answer:
                    "Oui, tous nos produits sont 100% authentiques. Nous travaillons directement avec les laboratoires et distributeurs officiels.",
            },
            {
                question: "Que faire si un produit ne me convient pas ?",
                answer:
                    "Contactez-nous dans les 7 jours suivant la réception. Nous étudierons votre cas et trouverons une solution adaptée.",
            },
            {
                question: "Comment conserver mes produits ?",
                answer:
                    "Suivez les instructions sur l'emballage. En général, conservez dans un endroit sec et frais, à l'abri de la lumière directe.",
            },
        ],
    },
]

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const toggleExpanded = (id: string) => {
        setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const filteredFaqs = faqs
        .map((category) => ({
            ...category,
            questions: category.questions.filter(
                (faq) =>
                    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        }))
        .filter((category) => category.questions.length > 0)

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">Questions Fréquentes</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Trouvez rapidement les réponses à vos questions les plus courantes
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                    <Input
                        placeholder="Rechercher une question..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {filteredFaqs.map((category) => (
                        <div key={category.category}>
                            <h2 className="text-2xl font-bold mb-4 text-teal-600">{category.category}</h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, index) => {
                                    const id = `${category.category}-${index}`
                                    const isExpanded = expandedItems.includes(id)

                                    return (
                                        <Card key={id} className="overflow-hidden">
                                            <CardContent className="p-0">
                                                <button
                                                    onClick={() => toggleExpanded(id)}
                                                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                                                        {isExpanded ? (
                                                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                                                        ) : (
                                                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                                                        )}
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="px-6 pb-6">
                                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredFaqs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">Aucune question trouvée pour "{searchTerm}"</p>
                        <p className="text-sm text-gray-500">Essayez d'autres mots-clés ou contactez-nous directement</p>
                    </div>
                )}

                {/* Contact Section */}
                <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
                    <h2 className="text-xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
                    <p className="text-gray-600 mb-6">Notre équipe de pharmaciens est là pour vous aider</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Nous contacter
                        </a>
                        <button
                            onClick={() => {
                                const phone = "+212600000000"
                                const message = "Bonjour ! J'ai une question qui n'est pas dans la FAQ."
                                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}
