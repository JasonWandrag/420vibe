import { defineStore } from 'pinia'
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy,
  where
} from 'firebase/firestore'
import { db } from '../firebase/config'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    currentProduct: null
  }),

  getters: {
    productsByCategory: (state) => (category) => {
      return state.products.filter(product => product.category === category)
    },
    featuredProducts: (state) => {
      return state.products.filter(product => product.featured === true && product.active === true)
    },
    activeProducts: (state) => {
      return state.products.filter(product => product.active === true)
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        // Check if Firebase is properly configured
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID === 'your_project_id') {
          throw new Error('Firebase configuration missing. Please set up your .env file with Firebase credentials.')
        }

        console.log('Attempting to fetch products from Firebase...')
        const productsRef = collection(db, 'products')
        
        // Try with active filter first, fallback to all products if that fails
        let q = query(productsRef, where('active', '==', true), orderBy('createdAt', 'desc'))
        let querySnapshot = await getDocs(q)
        
        // If no products found with active filter, try without it
        if (querySnapshot.empty) {
          console.log('No active products found, fetching all products...')
          q = query(productsRef, orderBy('createdAt', 'desc'))
          querySnapshot = await getDocs(q)
        }
        
        this.products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        console.log(`✅ Successfully fetched ${this.products.length} products from Firebase`)
      } catch (error) {
        this.error = error.message
        console.error('❌ Error fetching products from Firebase:', error)
        console.log('🔄 Falling back to mock data...')
        // Fallback to mock data if Firebase fails
        this.loadMockProducts()
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id) {
      this.loading = true
      this.error = null

      try {
        const productDoc = await getDoc(doc(db, 'products', id))
        if (productDoc.exists()) {
          this.currentProduct = {
            id: productDoc.id,
            ...productDoc.data()
          }
          console.log(`Fetched product: ${this.currentProduct.name}`)
        } else {
          // Try to find in already loaded products
          this.currentProduct = this.products.find(p => p.id === id) || null
          if (!this.currentProduct) {
            throw new Error('Product not found')
          }
        }
      } catch (error) {
        this.error = error.message
        console.error('Error fetching product:', error)
        // Fallback to mock data
        this.currentProduct = this.products.find(p => p.id === id) || null
      } finally {
        this.loading = false
      }
    },

    loadMockProducts() {
      // Fallback mock data
      this.products = [
        {
          id: 1,
          name: 'Premium OG Kush',
          category: 'flower',
          price: 45.00,
          rating: 4.8,
          description: 'Classic indica-dominant strain with earthy, pine flavors and relaxing effects.',
          image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop',
          active: true,
          featured: true,
          thc: 22,
          cbd: 1,
          strainType: 'Indica',
          effects: 'Relaxing, Sleepy, Happy'
        },
        {
          id: 2,
          name: 'Blue Dream Vape Cart',
          category: 'vape',
          price: 35.00,
          rating: 4.9,
          description: 'Smooth sativa-dominant hybrid with sweet berry flavors and uplifting effects.',
          image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop',
          active: true,
          featured: true,
          thc: 18,
          cbd: 2,
          strainType: 'Sativa',
          effects: 'Uplifting, Creative, Energetic'
        },
        {
          id: 3,
          name: 'CBD Gummies',
          category: 'edibles',
          price: 25.00,
          rating: 4.7,
          description: 'Delicious mixed berry gummies with 10mg CBD each for relaxation and wellness.',
          image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop',
          active: true,
          featured: false,
          thc: 0,
          cbd: 10,
          strainType: 'CBD',
          effects: 'Relaxing, Calming'
        }
      ]
    },

    clearError() {
      this.error = null
    },

    clearCurrentProduct() {
      this.currentProduct = null
    }
  }
})
