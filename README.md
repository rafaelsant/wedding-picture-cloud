# Wedding Picture Cloud

A beautiful wedding photo sharing application built with Next.js and Firebase, allowing guests to upload and share their wedding photos with Google authentication.

## Features

- 🔐 **Google Authentication** - Secure login using Firebase Auth
- 📸 **Photo Upload** - Drag and drop or click to upload wedding photos
- ☁️ **Cloud Storage** - Photos stored securely in Firebase Storage
- 🗃️ **User Data** - User information stored in Firestore
- 📱 **Responsive Design** - Works beautifully on all devices
- 🖼️ **Photo Gallery** - View, download, and manage uploaded photos
- 🔒 **User Isolation** - Each user can only see and manage their own photos

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth with Google provider
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Hosting**: Vercel (or any Next.js compatible platform)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd wedding-picture-cloud
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication and add Google as a sign-in provider
4. Create a Cloud Firestore database
5. Create a Firebase Storage bucket
6. Go to Project Settings > General and copy your Firebase config

### 4. Configure environment variables

Copy the example environment file and add your Firebase configuration:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Set up Firebase Security Rules

#### Firestore Rules
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

#### Storage Rules
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

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 7. Build for production

```bash
npm run build
npm start
```

## Usage

1. **Sign In**: Click "Sign in with Google" to authenticate
2. **Upload Photos**: Drag and drop photos or click "Choose Files"
3. **View Gallery**: Browse all your uploaded photos
4. **Download Photos**: Click the download button on any photo
5. **Delete Photos**: Remove photos you no longer want to keep

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your project to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js and static site generation.

## Security

- All photos are stored with user-specific paths in Firebase Storage
- Firestore security rules ensure users can only access their own data
- Authentication is handled securely by Firebase Auth
- Environment variables keep sensitive configuration secure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.