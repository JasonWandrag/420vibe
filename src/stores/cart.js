import { defineStore } from 'pinia'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    isEmpty: (state) => state.items.length === 0
  },

  actions: {
    async init() {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        await this.loadCartFromFirestore()
      } else {
        this.loadCartFromLocalStorage()
      }
    },

    async loadCartFromFirestore() {
      const authStore = useAuthStore()
      if (!authStore.user) return

      try {
        const cartDoc = await getDoc(doc(db, 'carts', authStore.user.uid))
        if (cartDoc.exists()) {
          this.items = cartDoc.data().items || []
        }
      } catch (error) {
        console.error('Error loading cart from Firestore:', error)
        this.loadCartFromLocalStorage()
      }
    },

    loadCartFromLocalStorage() {
      try {
        const savedCart = localStorage.getItem('420vibe-cart')
        if (savedCart) {
          this.items = JSON.parse(savedCart)
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        this.items = []
      }
    },

    async saveCart() {
      const authStore = useAuthStore()
      
      // Save to localStorage
      localStorage.setItem('420vibe-cart', JSON.stringify(this.items))
      
      // Save to Firestore if authenticated
      if (authStore.isAuthenticated) {
        try {
          await setDoc(doc(db, 'carts', authStore.user.uid), {
            items: this.items,
            updatedAt: new Date()
          })
        } catch (error) {
          console.error('Error saving cart to Firestore:', error)
        }
      }
    },

    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          category: product.category
        })
      }
      
      this.saveCart()
    },

    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveCart()
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.saveCart()
        }
      }
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },

    async syncCartWithFirestore() {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        await this.loadCartFromFirestore()
      }
    }
  }
})
