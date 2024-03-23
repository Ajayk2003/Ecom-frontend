import axios from 'axios'
import { create } from 'zustand'

interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
  sellerId: number
  createdAt: string
  updatedAt: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  cart: CartItem[]
  isLoading: boolean
  error: string | null
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  fetchCart: () => void
  updateCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isLoading: false,
  error: null,
  addToCart: (product: Product) => {
    set(state => {
      const existingCartItem = state.cart.find(item => item.id === product.id)

      if (existingCartItem) {
        const updatedCart = state.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
        return { cart: updatedCart }
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] }
      }
    })
  },
  removeFromCart: (productId: number) => {
    set(state => ({
      cart: state.cart.filter(item => item.id !== productId),
    }))
  },
  increaseQuantity: (productId: number) => {
    set(state => ({
      cart: state.cart.map(item => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    }))
  },
  decreaseQuantity: (productId: number) => {
    set(state => ({
      cart: state.cart.map(item =>
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ),
    }))
  },
  fetchCart: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get('http://localhost:5002/api/cart/')
      if (response.status > 299) throw new Error(response.data)
      set({ cart: response.data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },
  updateCart: async () => {
    const { cart } = get()
    try {
      await axios.post('http://localhost:5002/api/cart/', cart) // Replace with your backend API endpoint
    } catch (error) {
      console.error('Failed to update cart data:', error)
    }
  },
}))
