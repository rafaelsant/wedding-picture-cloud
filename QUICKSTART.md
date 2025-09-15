# Wedding Picture Cloud - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project: "wedding-picture-cloud"
3. Enable Authentication → Sign-in method → Google
4. Create Firestore database (Start in test mode)
5. Create Storage bucket

### 2. Get Firebase Configuration
1. Go to Project Settings → General
2. Add a web app
3. Copy the Firebase configuration object

### 3. Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Security Rules

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /photos/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /wedding-photos/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run the Application
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and enjoy your wedding photo cloud! 📸💒

## 🎯 Key Features
- ✅ Google Authentication
- ✅ Drag & Drop Photo Upload
- ✅ Real-time Photo Gallery
- ✅ Download & Delete Photos
- ✅ Mobile Responsive
- ✅ User Isolation & Security

## 🚀 Deploy to Vercel
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

Need help? Check the detailed README.md or CONTRIBUTING.md files.