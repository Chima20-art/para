"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
    id: string
    name: string
    price: number
    image_url: string | null
    quantity: number
    brand?: string | null
}

interface CartStore {
    items: CartItem[]
    addItem: (product: Omit<CartItem, "quantity">) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const items = get().items
                const existingItem = items.find((item) => item.id === product.id)

                if (existingItem) {
                    set({
                        items: items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
                    })
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] })
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((item) => item.id !== productId) })
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                    return
                }

                set({
                    items: get().items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
                })
            },
            clearCart: () => set({ items: [] }),
            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            name: "cart-storage",
        },
    ),
)
