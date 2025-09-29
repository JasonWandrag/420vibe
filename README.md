# 420Vibe - Premium Cannabis E-commerce Store

A modern, elegant e-commerce platform for cannabis products built with Vue.js, Firebase, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog** - Browse and search through premium cannabis products
- 🛒 **Shopping Cart** - Add, remove, and manage items with persistent storage
- 👤 **User Authentication** - Secure login/register with Firebase Auth
- 📱 **Responsive Design** - Clean, modern UI that works on all devices
- 🔥 **Firebase Integration** - Real-time database, authentication, and file storage
- 🚀 **Netlify Ready** - Optimized for deployment on Netlify

## Tech Stack

- **Frontend**: Vue.js 3, Vue Router, Pinia
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Deployment**: Netlify
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd 420Vibe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Storage
   - Copy your Firebase config

4. **Environment Configuration**
   - Copy `env.example` to `.env`
   - Fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Firebase Setup

### Authentication
1. Go to Firebase Console > Authentication > Sign-in method
2. Enable Email/Password authentication
3. Optionally enable Google and Facebook providers

### Firestore Database
1. Go to Firebase Console > Firestore Database
2. Create database in production mode
3. Set up security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Carts are user-specific
       match /carts/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Products are readable by all authenticated users
       match /products/{productId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.token.admin == true;
       }
     }
   }
   ```

### Storage
1. Go to Firebase Console > Storage
2. Create storage bucket
3. Set up security rules for product images

## Deployment

### Netlify Deployment

1. **Connect your repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your Git repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables**
   - Add your Firebase environment variables in Netlify dashboard
   - Go to Site settings > Environment variables
   - Add all the `VITE_FIREBASE_*` variables

3. **Deploy**
   - Netlify will automatically deploy on every push to your main branch

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Navbar.vue      # Navigation component
│   └── Footer.vue      # Footer component
├── views/              # Page components
│   ├── Home.vue        # Homepage
│   ├── Products.vue    # Product listing
│   ├── ProductDetail.vue # Product details
│   ├── Cart.vue        # Shopping cart
│   ├── Login.vue       # Login page
│   ├── Register.vue    # Registration page
│   └── Profile.vue     # User profile
├── stores/             # Pinia stores
│   ├── auth.js         # Authentication store
│   └── cart.js         # Shopping cart store
├── firebase/           # Firebase configuration
│   └── config.js       # Firebase setup
├── assets/             # Static assets
├── App.vue             # Root component
├── main.js             # Application entry point
└── style.css           # Global styles
```

## Features Overview

### 🏠 Homepage
- Hero section with call-to-action
- Featured products showcase
- Why choose us section
- Newsletter signup

### 🛍️ Product Catalog
- Product grid with filtering and sorting
- Search functionality
- Category filtering
- Product detail pages with reviews

### 🛒 Shopping Cart
- Add/remove items
- Quantity management
- Persistent cart (localStorage + Firestore)
- Order summary with tax and shipping

### 👤 User Authentication
- Email/password registration and login
- User profile management
- Order history
- Secure authentication with Firebase

### 📱 Responsive Design
- Mobile-first approach
- Clean, modern UI
- Cannabis-themed color scheme
- Smooth animations and transitions

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary: Green tones (cannabis theme)
- Secondary: Yellow/gold accents
- Accent: Purple highlights

### Products
Product data is currently mocked in the components. To connect to Firebase:
1. Create a `products` collection in Firestore
2. Update the components to fetch from Firebase
3. Add product management functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@420vibe.com or create an issue in the repository.

---

**Note**: This is a demo application. Ensure compliance with local laws and regulations regarding cannabis sales in your jurisdiction.