import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import ProductDetail from './views/ProductDetail.vue'
import Cart from './views/Cart.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import TermsOfService from './views/TermsOfService.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
import { useAuthStore } from './stores/auth'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { 
    path: '/products', 
    name: 'Products', 
    component: Products,
    meta: { requiresAuth: true }
  },
  { 
    path: '/products/:id', 
    name: 'ProductDetail', 
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  { 
    path: '/cart', 
    name: 'Cart', 
    component: Cart,
    meta: { requiresAuth: true }
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { 
    path: '/profile', 
    name: 'Profile', 
    component: Profile,
    meta: { requiresAuth: true }
  },
  { path: '/terms', name: 'TermsOfService', component: TermsOfService },
  { path: '/privacy', name: 'PrivacyPolicy', component: PrivacyPolicy }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth state if not already done
  if (!authStore.user && authStore.user !== false) {
    await authStore.init()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page with return URL
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
