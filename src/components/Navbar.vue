<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <img src="/src/assets/images/Logo_Clear.png" alt="420Vibe" class="h-10 w-auto" />
            <span class="text-2xl font-display font-bold text-primary-600">420Vibe</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            :class="{ 'text-primary-600': $route.name === 'Home' }"
          >
            Home
          </router-link>
          <template v-if="user">
            <router-link 
              to="/products" 
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              :class="{ 'text-primary-600': $route.name === 'Products' }"
            >
              Products
            </router-link>
            <router-link 
              to="/cart" 
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center space-x-1"
              :class="{ 'text-primary-600': $route.name === 'Cart' }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
              </svg>
              <span>Cart ({{ cartItemCount }})</span>
            </router-link>
          </template>
          <template v-else>
            <span class="text-gray-500 font-medium">Products</span>
            <span class="text-gray-500 font-medium">Cart</span>
          </template>
        </div>

        <!-- User Menu -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="user">
            <router-link 
              to="/profile" 
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Profile
            </router-link>
            <button 
              @click="logout"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link 
              to="/login" 
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              class="btn-primary"
            >
              Sign Up
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <router-link 
            to="/" 
            class="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
            @click="mobileMenuOpen = false"
          >
            Home
          </router-link>
          <template v-if="user">
            <router-link 
              to="/products" 
              class="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
              @click="mobileMenuOpen = false"
            >
              Products
            </router-link>
            <router-link 
              to="/cart" 
              class="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
              @click="mobileMenuOpen = false"
            >
              Cart ({{ cartItemCount }})
            </router-link>
            <router-link 
              to="/profile" 
              class="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
              @click="mobileMenuOpen = false"
            >
              Profile
            </router-link>
            <button 
              @click="logout; mobileMenuOpen = false"
              class="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <span class="block px-3 py-2 text-gray-500 font-medium">Products (Login Required)</span>
            <span class="block px-3 py-2 text-gray-500 font-medium">Cart (Login Required)</span>
            <router-link 
              to="/login" 
              class="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
              @click="mobileMenuOpen = false"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              class="block px-3 py-2 text-primary-600 hover:text-primary-700 font-medium"
              @click="mobileMenuOpen = false"
            >
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()

const mobileMenuOpen = ref(false)

const user = computed(() => authStore.user)
const cartItemCount = computed(() => cartStore.itemCount)

const logout = async () => {
  await authStore.logout()
}
</script>
