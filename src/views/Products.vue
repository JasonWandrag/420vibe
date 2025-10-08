<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Our Products
        </h1>
        <p class="text-lg text-gray-600">
          Discover our carefully curated selection of premium cannabis products.
        </p>
        
        <!-- Firebase Connection Status -->
        <div v-if="productsStore.error" class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-yellow-800">Demo Mode</p>
              <p class="text-xs text-yellow-700">Showing sample products. Connect to Firebase to see your actual product database.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Category:</label>
            <select 
              v-model="selectedCategory" 
              class="input-field w-auto"
            >
              <option value="">All Categories</option>
              <option value="flower">Flower</option>
              <option value="vape">Vape</option>
              <option value="edibles">Edibles</option>
              <option value="concentrates">Concentrates</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Sort by:</label>
            <select 
              v-model="sortBy" 
              class="input-field w-auto"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Search:</label>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search products..."
              class="input-field w-64"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="productsStore.loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading products...</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="card group cursor-pointer"
          @click="$router.push(`/products/${product.id}`)"
        >
          <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-xl overflow-hidden">
            <img 
              :src="getProductImage(product)" 
              :alt="product.name"
              class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              @error="handleImageError"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-primary-600 uppercase tracking-wide">
                {{ product.category }}
              </span>
              <span class="text-sm text-gray-500">⭐ {{ product.rating }}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-2 text-sm">{{ product.description }}</p>
            
            <!-- Product Details -->
            <div v-if="product.thc || product.cbd || product.strainType" class="mb-4">
              <div class="flex flex-wrap gap-2 text-xs">
                <span v-if="product.thc" class="bg-green-100 text-green-800 px-2 py-1 rounded">
                  THC: {{ product.thc }}%
                </span>
                <span v-if="product.cbd" class="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  CBD: {{ product.cbd }}%
                </span>
                <span v-if="product.strainType" class="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {{ product.strainType }}
                </span>
              </div>
              <p v-if="product.effects" class="text-xs text-gray-500 mt-1">
                Effects: {{ product.effects }}
              </p>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-primary-600">R{{ product.price }}</span>
              <button 
                @click.stop="addToCart(product)"
                class="btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!productsStore.loading && filteredProducts.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600">Try adjusting your filters or search terms.</p>
        <div v-if="productsStore.error" class="mt-4 p-4 bg-red-50 rounded-lg">
          <p class="text-sm text-red-600 font-medium">Error: {{ productsStore.error }}</p>
          <p class="text-xs text-red-500 mt-2">
            If you're seeing mock data, please check your Firebase configuration in the .env file.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useProductsStore } from '../stores/products'

const cartStore = useCartStore()
const productsStore = useProductsStore()

const selectedCategory = ref('')
const sortBy = ref('name')
const searchQuery = ref('')

const filteredProducts = computed(() => {
  let filtered = productsStore.products

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => 
      product.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }

  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return filtered
})

const addToCart = (product) => {
  cartStore.addItem(product)
}

// Helper function to handle product images (base64 or URL)
const getProductImage = (product) => {
  if (!product.image) {
    return 'https://via.placeholder.com/400x400?text=No+Image'
  }
  
  // Check if it's a base64 image
  if (product.image.startsWith('data:image/')) {
    return product.image
  }
  
  // Check if it's a URL
  if (product.image.startsWith('http')) {
    return product.image
  }
  
  // Default fallback
  return 'https://via.placeholder.com/400x400?text=No+Image'
}

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x400?text=Image+Error'
}

onMounted(async () => {
  await productsStore.fetchProducts()
  cartStore.init()
})
</script>
