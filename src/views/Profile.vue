<template>
  <div class="min-h-screen bg-gray-50 py-6 sm:py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
          My Profile
        </h1>
        <p class="text-base sm:text-lg text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Profile Info -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Profile Information</h2>
            
            <form @submit.prevent="updateProfile" class="space-y-4 sm:space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    v-model="profile.firstName"
                    type="text"
                    class="input-field"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    v-model="profile.lastName"
                    type="text"
                    class="input-field"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="input-field"
                  disabled
                />
                <p class="mt-1 text-sm text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="input-field"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  v-model="profile.dateOfBirth"
                  type="date"
                  class="input-field"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  v-model="profile.address"
                  rows="3"
                  class="input-field"
                  placeholder="Your address"
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button type="submit" class="btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          </div>

          <!-- Order History -->
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6 sm:mt-8">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Order History</h2>
            
            <div v-if="orders.length === 0" class="text-center py-6 sm:py-8">
              <svg class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <p class="text-sm sm:text-base text-gray-600">No orders yet</p>
              <router-link to="/products" class="btn-primary mt-3 sm:mt-4 inline-block">
                Start Shopping
              </router-link>
            </div>

            <div v-else class="space-y-3 sm:space-y-4">
              <div 
                v-for="order in orders" 
                :key="order.id"
                class="border border-gray-200 rounded-lg p-3 sm:p-4"
              >
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                  <div>
                    <h3 class="font-medium text-gray-900 text-sm sm:text-base">Order #{{ order.id }}</h3>
                    <p class="text-xs sm:text-sm text-gray-600">{{ order.date }}</p>
                  </div>
                  <span class="text-sm font-medium text-primary-600">${{ order.total }}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span class="text-xs sm:text-sm text-gray-600">{{ order.items.length }} items</span>
                  <span class="text-xs sm:text-sm text-gray-600">{{ order.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Account Summary -->
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Account Summary</h3>
            <div class="space-y-2 sm:space-y-3">
              <div class="flex justify-between">
                <span class="text-sm sm:text-base text-gray-600">Member since</span>
                <span class="text-sm sm:text-base text-gray-900">{{ memberSince }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm sm:text-base text-gray-600">Total orders</span>
                <span class="text-sm sm:text-base text-gray-900">{{ orders.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm sm:text-base text-gray-600">Total spent</span>
                <span class="text-sm sm:text-base text-gray-900">${{ totalSpent }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div class="space-y-2 sm:space-y-3">
              <router-link to="/products" class="block w-full btn-outline text-center text-sm sm:text-base">
                Browse Products
              </router-link>
              <router-link to="/cart" class="block w-full btn-primary text-center text-sm sm:text-base">
                View Cart
              </router-link>
              <button @click="logout" class="block w-full btn-outline text-center border-red-300 text-red-600 hover:bg-red-50 text-sm sm:text-base">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: ''
})

const orders = ref([
  // Mock order data - in a real app, this would come from Firebase
  {
    id: 'ORD-001',
    date: '2024-01-15',
    total: 89.50,
    status: 'Delivered',
    items: ['Premium OG Kush', 'Blue Dream Vape Cart']
  }
])

const memberSince = computed(() => {
  if (authStore.user?.metadata?.creationTime) {
    return new Date(authStore.user.metadata.creationTime).toLocaleDateString()
  }
  return 'Recently'
})

const totalSpent = computed(() => {
  return orders.value.reduce((total, order) => total + order.total, 0).toFixed(2)
})

const updateProfile = async () => {
  // In a real app, this would update the user's profile in Firebase
  alert('Profile updated successfully!')
}

const logout = async () => {
  await authStore.logout()
  router.push('/')
}

onMounted(async () => {
  await authStore.init()
  
  if (authStore.user) {
    profile.value.email = authStore.user.email || ''
    
    // Load user profile data from Firebase
    const userProfile = await authStore.getUserProfile()
    if (userProfile) {
      profile.value.firstName = userProfile.firstName || ''
      profile.value.lastName = userProfile.lastName || ''
      profile.value.phone = userProfile.phone || ''
      profile.value.dateOfBirth = userProfile.dateOfBirth || ''
      profile.value.address = userProfile.address || ''
    }
  } else {
    router.push('/login')
  }
})
</script>
