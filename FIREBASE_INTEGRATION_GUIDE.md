# Firebase Integration Guide

## Overview
The 420Vibe application has been updated to connect to Firebase Firestore and display products from the `products` collection. The integration handles base64 encoded images and displays comprehensive product information.

## Features Implemented

### 1. Firebase Products Store (`src/stores/products.js`)
- ✅ Fetches products from Firestore `products` collection
- ✅ Handles base64 encoded images from document `image` field
- ✅ Maps all product fields: `name`, `description`, `price`, `rating`, `thc`, `cbd`, `strainType`, `effects`, `featured`, etc.
- ✅ Fallback to mock data if Firebase connection fails
- ✅ Proper error handling and loading states

### 2. Products View (`src/views/Products.vue`)
- ✅ Displays products in responsive grid layout
- ✅ Shows product details: THC/CBD percentages, strain type, effects
- ✅ Handles base64 images with fallback for missing images
- ✅ Filtering and sorting functionality
- ✅ Search functionality

### 3. Home View (`src/views/Home.vue`)
- ✅ Displays featured products on homepage
- ✅ Same base64 image handling as Products view
- ✅ Login-required state for non-authenticated users

## Firebase Document Structure

Based on the provided image, the expected document structure is:

```javascript
{
  name: "King Kong",
  description: "Coolo",
  price: 50,
  rating: 5,
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAI...", // Base64 string
  category: "flower", // or "vape", "edibles", "concentrates", "accessories"
  featured: false,
  thc: 20,
  cbd: 50,
  strainType: "Hybrid",
  effects: "Happy",
  createdAt: "30 September 2025 at 12:11:20 UTC+2",
  updatedAt: "30 September 2025 at 12:11:20 UTC+2"
}
```

## Setup Instructions

### 1. Firebase Configuration
1. Copy `env.example` to `.env`
2. Replace the placeholder values with your actual Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_actual_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   VITE_FIREBASE_APP_ID=your_actual_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
   ```

### 2. Firestore Security Rules
Ensure your Firestore rules allow read access to the products collection:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} {
      allow read: if true; // Allow public read access for products
    }
  }
}
```

### 3. Running the Application
```bash
npm install
npm run dev
```

## Image Handling

The application automatically handles:
- ✅ Base64 encoded images (starts with `data:image/`)
- ✅ Regular HTTP/HTTPS image URLs
- ✅ Fallback placeholder images for missing or broken images
- ✅ Error handling for failed image loads

## Product Display Features

### Product Cards Show:
- Product image (base64 or URL)
- Product name and description
- Category badge
- Rating stars
- THC/CBD percentage badges
- Strain type badge
- Effects description
- Price
- Add to Cart button

### Filtering Options:
- Category filter (Flower, Vape, Edibles, Concentrates, Accessories)
- Sort by: Name, Price (Low to High), Price (High to Low), Rating
- Search by name, description, or category

## Testing

1. **With Firebase Connected**: Products will load from your Firestore database
2. **Without Firebase**: The app will show mock data and display a demo mode warning
3. **Image Testing**: Base64 images will display directly, URLs will load normally

## Troubleshooting

### Common Issues:
1. **"Firebase configuration missing"**: Check your `.env` file has correct values
2. **"No products found"**: Verify your Firestore has a `products` collection
3. **Images not loading**: Check that base64 strings are complete and valid
4. **CORS errors**: Ensure your Firebase project allows your domain

### Debug Information:
- Check browser console for Firebase connection logs
- Look for "✅ Successfully fetched X products from Firebase" message
- Check for any error messages in the console

## Next Steps

1. Set up your Firebase project
2. Add products to your Firestore `products` collection
3. Configure your `.env` file with Firebase credentials
4. Test the application with your data

The application is now ready to display your Firebase products with full base64 image support!
