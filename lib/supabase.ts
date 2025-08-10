import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    image_url: string | null
                    created_at: string
                    updated_at: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    price: number
                    original_price: number | null
                    image_url: string | null
                    images: string[] | null
                    category_id: string | null
                    brand: string | null
                    in_stock: boolean
                    stock_quantity: number
                    featured: boolean
                    created_at: string
                    updated_at: string
                }
            }
            orders: {
                Row: {
                    id: string
                    order_number: string
                    customer_name: string
                    customer_email: string
                    customer_phone: string
                    shipping_address: string
                    city: string
                    postal_code: string | null
                    total_amount: number
                    status: string
                    payment_method: string
                    notes: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    order_number: string
                    customer_name: string
                    customer_email: string
                    customer_phone: string
                    shipping_address: string
                    city: string
                    postal_code?: string | null
                    total_amount: number
                    status?: string
                    payment_method?: string
                    notes?: string | null
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string | null
                    product_name: string
                    product_price: number
                    quantity: number
                    subtotal: number
                    created_at: string
                }
                Insert: {
                    order_id: string
                    product_id?: string | null
                    product_name: string
                    product_price: number
                    quantity: number
                    subtotal: number
                }
            }
        }
    }
}
