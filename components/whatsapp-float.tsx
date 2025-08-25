"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppFloat() {
    const handleWhatsAppClick = () => {
        const phoneNumber = "+212600000000" // Replace with your WhatsApp number
        const message = "Bonjour ! J'aimerais obtenir des informations sur vos produits."
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
                title="Contactez-nous sur WhatsApp"
            >
                <MessageCircle className="w-6 h-6" />
            </Button>
        </div>
    )
}
