# Deployment Configuration

This file contains deployment instructions and configuration for the Wedding Picture Cloud application.

## Vercel Deployment (Recommended)

### 1. Push to GitHub
Make sure your code is pushed to a GitHub repository.

### 2. Connect to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository

### 3. Configure Environment Variables
In the Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Deploy
Click "Deploy" - Vercel will automatically build and deploy your application.

## Firebase Security Rules

### Firestore Rules
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

### Storage Rules
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

## Other Deployment Options

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway
1. Connect your GitHub repository to Railway
2. Railway will auto-detect Next.js and configure automatically
3. Add environment variables in Railway dashboard

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Domain Configuration

Once deployed, you may want to:
1. Add a custom domain
2. Configure SSL (usually automatic)
3. Set up analytics
4. Configure monitoring

## Performance Optimization

For production use, consider:
1. Enabling Next.js Image optimization
2. Setting up CDN for static assets
3. Configuring proper caching headers
4. Monitoring performance with Vercel Analytics or similar

## Backup Strategy

Important data is stored in Firebase:
1. User authentication data (managed by Firebase)
2. Photo metadata in Firestore
3. Photo files in Firebase Storage

Firebase provides automatic backups, but consider:
1. Setting up regular exports of Firestore data
2. Implementing a photo backup strategy
3. Regular testing of restore procedures