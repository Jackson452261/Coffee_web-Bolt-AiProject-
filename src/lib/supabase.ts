import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Order = {
  id: string
  user_id: string
  product_id: number
  product_name: string
  product_price: string
  product_image: string
  product_description: string
  created_at: string
}

export type Favourite = {
  id: string
  user_id: string
  product_id: number
  product_name: string
  product_price: string
  product_image: string
  product_description: string
  created_at: string
}

export type Comment = {
  id: string
  user_id: string
  user_name: string
  product_id: number
  product_name: string
  rating: number
  comment_text: string
  created_at: string
}

export type CartItem = {
  id: string
  user_id: string
  product_id: number
  product_name: string
  product_price: string
  product_image: string
  product_description: string
  quantity: number
  created_at: string
}
