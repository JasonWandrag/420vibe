<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading product...</p>
      </div>

      <!-- Product Not Found -->
      <div v-else-if="!product" class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p class="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <router-link to="/products" class="btn-primary">
          Back to Products
        </router-link>
      </div>

      <!-- Product Details -->
      <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <!-- Product Image -->
          <div class="aspect-w-1 aspect-h-1">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-primary-600 uppercase tracking-wide">
                  {{ product.category }}
                </span>
                <div class="flex items-center space-x-1">
                  <span class="text-sm text-gray-500">⭐ {{ product.rating }}</span>
                  <span class="text-sm text-gray-500">({{ product.reviews }} reviews)</span>
                </div>
              </div>
              <h1 class="text-3xl font-display font-bold text-gray-900 mb-4">
                {{ product.name }}
              </h1>
              <p class="text-xl font-bold text-primary-600 mb-4">
                R{{ product.price }}
              </p>
              <p class="text-gray-600 text-lg leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Product Details -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-700">THC Content:</span>
                  <span class="text-gray-600 ml-2">{{ product.thc }}%</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">CBD Content:</span>
                  <span class="text-gray-600 ml-2">{{ product.cbd }}%</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Strain Type:</span>
                  <span class="text-gray-600 ml-2">{{ product.strainType }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Effects:</span>
                  <span class="text-gray-600 ml-2">{{ product.effects }}</span>
                </div>
              </div>
            </div>

            <!-- Quantity and Add to Cart -->
            <div class="border-t pt-6">
              <div class="flex items-center space-x-4 mb-6">
                <label class="text-sm font-medium text-gray-700">Quantity:</label>
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    @click="decreaseQuantity"
                    class="px-3 py-2 text-gray-600 hover:text-gray-800"
                    :disabled="quantity <= 1"
                  >
                    -
                  </button>
                  <span class="px-4 py-2 border-x border-gray-300">{{ quantity }}</span>
                  <button 
                    @click="increaseQuantity"
                    class="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div class="flex space-x-4">
                <button 
                  @click="addToCart"
                  class="btn-primary flex-1 text-lg py-3"
                >
                  Add to Cart - R{{ (product.price * quantity).toFixed(2) }}
                </button>
                <button class="btn-outline px-6 py-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Reviews Section -->
            <div class="border-t pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
              <div class="space-y-4">
                <div 
                  v-for="review in product.reviewList" 
                  :key="review.id"
                  class="border-l-4 border-primary-200 pl-4"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-900">{{ review.author }}</span>
                    <div class="flex items-center space-x-1">
                      <span class="text-sm text-gray-500">⭐ {{ review.rating }}</span>
                      <span class="text-sm text-gray-500">{{ review.date }}</span>
                    </div>
                  </div>
                  <p class="text-gray-600">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useProductsStore } from '../stores/products'

const route = useRoute()
const cartStore = useCartStore()
const productsStore = useProductsStore()

const loading = ref(true)
const quantity = ref(1)

const product = computed(() => {
  return productsStore.currentProduct
})

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value)
    // Reset quantity
    quantity.value = 1
    // You could add a toast notification here
  }
}

onMounted(async () => {
  const productId = route.params.id
  await productsStore.fetchProduct(productId)
  loading.value = false
  cartStore.init()
})
</script>
