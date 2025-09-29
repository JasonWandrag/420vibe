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

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="card group cursor-pointer"
          @click="$router.push(`/products/${product.id}`)"
        >
          <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-xl overflow-hidden">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
            <p class="text-gray-600 mb-4 text-sm">{{ product.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
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
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const products = ref([
  {
    id: 1,
    name: 'Premium OG Kush',
    category: 'flower',
    price: 45.00,
    rating: 4.8,
    description: 'Classic indica-dominant strain with earthy, pine flavors and relaxing effects.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Blue Dream Vape Cart',
    category: 'vape',
    price: 35.00,
    rating: 4.9,
    description: 'Smooth sativa-dominant hybrid with sweet berry flavors and uplifting effects.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'CBD Gummies',
    category: 'edibles',
    price: 25.00,
    rating: 4.7,
    description: 'Delicious mixed berry gummies with 10mg CBD each for relaxation and wellness.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Sour Diesel',
    category: 'flower',
    price: 42.00,
    rating: 4.6,
    description: 'Energizing sativa with diesel-like aroma and uplifting cerebral effects.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Gelato Live Resin',
    category: 'concentrates',
    price: 55.00,
    rating: 4.9,
    description: 'Premium live resin with sweet, dessert-like flavors and balanced effects.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'THC Chocolate Bar',
    category: 'edibles',
    price: 30.00,
    rating: 4.5,
    description: 'Rich dark chocolate infused with 100mg THC, divided into 10mg squares.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    id: 7,
    name: 'Glass Bong',
    category: 'accessories',
    price: 85.00,
    rating: 4.8,
    description: 'High-quality borosilicate glass bong with percolator for smooth hits.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    id: 8,
    name: 'Wedding Cake',
    category: 'flower',
    price: 48.00,
    rating: 4.7,
    description: 'Indica-dominant hybrid with sweet, vanilla cake flavors and relaxing effects.',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  }
])

const selectedCategory = ref('')
const sortBy = ref('name')
const searchQuery = ref('')

const filteredProducts = computed(() => {
  let filtered = products.value

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

onMounted(() => {
  cartStore.init()
})
</script>
