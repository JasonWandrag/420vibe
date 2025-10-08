<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  // Initialize authentication state when app starts
  await authStore.init()
})
</script>