<template>
  <div class="min-h-screen bg-gray-50 py-6 sm:py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
          Shopping Cart
        </h1>
        <p class="text-base sm:text-lg text-gray-600">
          Review your items before checkout.
        </p>
      </div>

      <!-- Empty Cart -->
      <div v-if="cartStore.isEmpty" class="text-center py-8 sm:py-12">
        <svg class="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
        </svg>
        <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p class="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Add some products to get started!</p>
        <router-link to="/products" class="btn-primary">
          Shop Products
        </router-link>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Cart Items List -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h2 class="text-base sm:text-lg font-semibold text-gray-900">
                Cart Items ({{ cartStore.itemCount }})
              </h2>
            </div>
            
            <div class="divide-y divide-gray-200">
              <div 
                v-for="item in cartStore.items" 
                :key="item.id"
                class="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
              >
                <div class="flex items-center space-x-3 sm:space-x-4 flex-1">
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="text-base sm:text-lg font-medium text-gray-900">{{ item.name }}</h3>
                    <p class="text-xs sm:text-sm text-gray-500 capitalize">{{ item.category }}</p>
                    <p class="text-base sm:text-lg font-semibold text-primary-600">R{{ item.price }}</p>
                  </div>
                </div>
                
                <div class="flex items-center justify-between sm:justify-end space-x-3">
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span class="w-8 text-center text-sm sm:text-base">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  
                  <div class="text-right">
                    <p class="text-base sm:text-lg font-semibold text-gray-900">
                      R{{ (item.price * item.quantity).toFixed(2) }}
                    </p>
                    <button 
                      @click="removeItem(item.id)"
                      class="text-xs sm:text-sm text-red-600 hover:text-red-800 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-8">
            <h2 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Order Summary</h2>
            
            <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">R{{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">R{{ shippingCost.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tax</span>
                <span class="text-gray-900">R{{ taxAmount.toFixed(2) }}</span>
              </div>
              <div class="border-t pt-2 sm:pt-3">
                <div class="flex justify-between text-base sm:text-lg font-semibold">
                  <span class="text-gray-900">Total</span>
                  <span class="text-primary-600">R{{ totalAmount.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <button 
              @click="proceedToCheckout"
              class="w-full btn-primary text-base sm:text-lg py-3 mb-3 sm:mb-4"
            >
              Proceed to Checkout
            </button>
            
            <button 
              @click="clearCart"
              class="w-full btn-outline py-3"
            >
              Clear Cart
            </button>

            <!-- Security Badges -->
            <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                  <span>Fast Shipping</span>
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
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const shippingCost = computed(() => {
  return cartStore.totalPrice > 50 ? 0 : 9.99
})

const taxAmount = computed(() => {
  return cartStore.totalPrice * 0.08 // 8% tax
})

const totalAmount = computed(() => {
  return cartStore.totalPrice + shippingCost.value + taxAmount.value
})

const updateQuantity = (productId, newQuantity) => {
  cartStore.updateQuantity(productId, newQuantity)
}

const removeItem = (productId) => {
  cartStore.removeItem(productId)
}

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart()
  }
}

const proceedToCheckout = () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  } else {
    // In a real app, this would redirect to a checkout page
    alert('Checkout functionality would be implemented here')
  }
}

onMounted(() => {
  cartStore.init()
})
</script>
