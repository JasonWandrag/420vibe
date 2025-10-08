<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">
            Welcome to 
            <span class="text-secondary-400">420Vibe</span>
          </h1>
          <p class="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-primary-100 max-w-3xl mx-auto px-4">
            Discover premium cannabis products with exceptional quality and service. 
            Your journey to the perfect vibe starts here.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <template v-if="user">
              <router-link to="/products" class="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Shop Now
              </router-link>
              <button class="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Learn More
              </button>
            </template>
            <template v-else>
              <router-link to="/register" class="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Sign Up to Shop
              </router-link>
              <router-link to="/login" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Login
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-12 sm:py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
            Featured Products
          </h2>
          <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Handpicked selections of our finest cannabis products, curated for the ultimate experience.
          </p>
        </div>

        <template v-if="user">
          <!-- Loading State -->
          <div v-if="productsStore.loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Loading featured products...</p>
          </div>

          <!-- Featured Products Grid -->
          <div v-else-if="featuredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div 
              v-for="product in featuredProducts" 
              :key="product.id"
              class="card group cursor-pointer"
              @click="$router.push(`/products/${product.id}`)"
            >
              <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-xl overflow-hidden">
                <img 
                  :src="getProductImage(product)" 
                  :alt="product.name"
                  class="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  @error="handleImageError"
                />
              </div>
              <div class="p-4 sm:p-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs sm:text-sm font-medium text-primary-600 uppercase tracking-wide">
                    {{ product.category }}
                  </span>
                  <span class="text-xs sm:text-sm text-gray-500">⭐ {{ product.rating }}</span>
                </div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
                <p class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <span class="text-xl sm:text-2xl font-bold text-primary-600">R{{ product.price }}</span>
                  <button 
                    @click.stop="addToCart(product)"
                    class="btn-primary text-sm sm:text-base px-4 py-2 w-full sm:w-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Featured Products -->
          <div v-else class="text-center py-12">
            <p class="text-gray-600">No featured products available at the moment.</p>
          </div>

          <div v-if="featuredProducts.length > 0" class="text-center mt-8 sm:mt-12">
            <router-link to="/products" class="btn-outline text-base sm:text-lg px-6 sm:px-8 py-3">
              View All Products
            </router-link>
          </div>
        </template>

        <template v-else>
          <!-- Login Required Message -->
          <div class="text-center py-8 sm:py-12">
            <div class="max-w-md mx-auto px-4">
              <div class="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg class="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Login Required</h3>
              <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Please sign up or login to view our premium cannabis products and start shopping.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <router-link to="/register" class="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
                  Create Account
                </router-link>
                <router-link to="/login" class="btn-outline text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
                  Login
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-12 sm:py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
            Why Choose 420Vibe?
          </h2>
          <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            We're committed to providing the highest quality products and exceptional service.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div class="text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
            <p class="text-sm sm:text-base text-gray-600">Carefully sourced and tested products that meet the highest standards.</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
            <p class="text-sm sm:text-base text-gray-600">Quick and discreet delivery to your doorstep with tracking.</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
            <p class="text-sm sm:text-base text-gray-600">Knowledgeable team ready to help you find the perfect products.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="py-12 sm:py-16 bg-primary-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-display font-bold text-white mb-3 sm:mb-4">
          Stay in the Loop
        </h2>
        <p class="text-base sm:text-xl text-primary-100 mb-6 sm:mb-8 px-4">
          Get the latest updates on new products, special offers, and cannabis news.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-secondary-500 text-gray-900"
          />
          <button class="btn-secondary px-6 sm:px-8 py-3 w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useProductsStore } from '../stores/products'

const cartStore = useCartStore()
const authStore = useAuthStore()
const productsStore = useProductsStore()

const user = computed(() => authStore.user)

// Get featured products from the store
const featuredProducts = computed(() => {
  return productsStore.featuredProducts.slice(0, 3) // Show only first 3 featured products
})

const addToCart = (product) => {
  cartStore.addItem(product)
  // You could add a toast notification here
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
  // Fetch products from Firebase
  await productsStore.fetchProducts()
  cartStore.init()
})
</script>
