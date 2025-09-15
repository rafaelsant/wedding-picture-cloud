# Contributing to Wedding Picture Cloud

Thank you for your interest in contributing to the Wedding Picture Cloud application!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wedding-picture-cloud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── AuthComponent.tsx      # Authentication handling
│   │   ├── PhotoUploader.tsx      # File upload interface
│   │   └── PhotoGallery.tsx       # Photo viewing and management
│   ├── lib/                 # Utility libraries
│   │   └── firebase.ts            # Firebase configuration
│   ├── pages/               # Next.js pages
│   │   ├── _app.tsx              # App wrapper
│   │   └── index.tsx             # Home page
│   └── styles/              # CSS styles
│       └── globals.css           # Global Tailwind styles
├── public/                  # Static assets
├── .env.local.example      # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Component Architecture

### AuthComponent
- Handles user authentication flow
- Manages Firebase configuration validation
- Displays appropriate UI based on auth state

### PhotoUploader
- Drag-and-drop file upload interface
- Progress tracking for uploads
- Firebase Storage integration
- File validation and error handling

### PhotoGallery
- Real-time photo gallery using Firestore
- Photo viewing, downloading, and deletion
- Modal view for full-size images
- Responsive grid layout

## Code Style

- **TypeScript**: All components are written in TypeScript
- **React Hooks**: Use functional components with hooks
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Error Handling**: Graceful error handling throughout
- **Loading States**: Proper loading indicators

## Development Guidelines

### Adding New Features

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Write TypeScript interfaces**
   Define proper types for new data structures

3. **Implement component**
   Follow existing patterns for consistency

4. **Test thoroughly**
   - Test with and without Firebase configuration
   - Test error scenarios
   - Test responsive design

5. **Submit pull request**
   Include clear description of changes

### Code Quality

- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Ensure TypeScript strict mode compliance
- Use semantic HTML elements
- Implement proper accessibility features

### Firebase Integration

When working with Firebase:
- Always check if services are configured before use
- Handle authentication state changes properly
- Implement proper error handling for Firebase operations
- Follow Firebase security best practices

## Testing

Currently, the application focuses on manual testing:

1. **Authentication Flow**
   - Test Google sign-in
   - Test sign-out
   - Test unauthorized access

2. **Photo Upload**
   - Test drag-and-drop functionality
   - Test file selection
   - Test upload progress
   - Test error scenarios

3. **Photo Gallery**
   - Test photo viewing
   - Test photo deletion
   - Test download functionality
   - Test responsive layout

## Common Issues

### Firebase Configuration
- Ensure all environment variables are set
- Check Firebase project settings
- Verify security rules are configured

### Build Issues
- Run `npm run build` to check for TypeScript errors
- Check Next.js configuration
- Verify all imports are correct

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check for responsive design on all screen sizes
- Test dark/light mode compatibility

## Performance Considerations

- Use Next.js Image component for optimized images
- Implement proper loading states
- Consider implementing pagination for large photo galleries
- Optimize Firebase queries

## Security Considerations

- Never commit environment variables
- Follow Firebase security rules best practices
- Validate file uploads on client and server side
- Implement proper user isolation

## Future Enhancements

Potential areas for contribution:

1. **User Experience**
   - Photo sharing between users
   - Photo albums/collections
   - Photo tagging and search
   - Bulk upload functionality

2. **Technical Improvements**
   - Image optimization and resizing
   - Progressive Web App features
   - Offline support
   - Performance monitoring

3. **Admin Features**
   - User management
   - Storage usage monitoring
   - Analytics dashboard

## Getting Help

- Check existing issues and documentation
- Review Firebase documentation
- Check Next.js documentation
- Ask questions in pull requests or issues

Thank you for contributing!