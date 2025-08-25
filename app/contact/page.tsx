"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import ClientLayout from "@/components/client-layout"

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate form submission
        setTimeout(() => {
            toast.success("Message envoyé !", {
                description: "Nous vous répondrons dans les plus brefs délais.",
            })
            setLoading(false)
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })
        }, 1000)
    }

    return (
        <ClientLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Notre équipe de pharmaciens est là pour vous conseiller. N'hésitez pas à nous contacter pour toute question.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Envoyez-nous un message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Nom complet *</Label>
                                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="subject">Sujet *</Label>
                                    <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
                                </div>

                                <div>
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        placeholder="Décrivez votre demande..."
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
                                    <Send className="w-4 h-4 mr-2" />
                                    {loading ? "Envoi..." : "Envoyer le message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations de contact</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-teal-600" />
                                    <div>
                                        <p className="font-medium">Téléphone</p>
                                        <p className="text-gray-600">+212 5XX-XXXXXX</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-teal-600" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-gray-600">contact@parapharmacie.ma</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-teal-600" />
                                    <div>
                                        <p className="font-medium">Adresse</p>
                                        <p className="text-gray-600">Casablanca, Maroc</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-teal-600" />
                                    <div>
                                        <p className="font-medium">Horaires</p>
                                        <p className="text-gray-600">Lun-Sam: 9h-19h</p>
                                        <p className="text-gray-600">Dimanche: 10h-17h</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Support rapide</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        onClick={() => {
                                            const phone = "+212600000000"
                                            const message = "Bonjour ! J'aimerais obtenir des informations."
                                            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")
                                        }}
                                    >
                                        WhatsApp - Réponse immédiate
                                    </Button>

                                    <p className="text-sm text-gray-600 text-center">
                                        Pour une réponse rapide, contactez-nous directement sur WhatsApp
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}
