import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

interface Photo {
  id: string;
  userId: string;
  fileName: string;
  downloadURL: string;
  uploadedAt: any;
  size: number;
  type: string;
}

interface PhotoGalleryProps {
  userId: string;
}

export default function PhotoGallery({ userId }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    // Check if Firebase is configured
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'photos'),
      where('userId', '==', userId),
      orderBy('uploadedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const photosData: Photo[] = [];
      querySnapshot.forEach((doc) => {
        photosData.push({ id: doc.id, ...doc.data() } as Photo);
      });
      setPhotos(photosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  // Check if Firebase is configured
  if (!db) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Photo Gallery</h3>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p className="font-bold">Firebase Firestore not configured</p>
          <p className="text-sm">Please configure Firebase Firestore to view photo gallery.</p>
        </div>
      </div>
    );
  }

  const deletePhoto = async (photo: Photo) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      // Delete from Storage
      const photoRef = ref(storage, `wedding-photos/${userId}/${photo.fileName}`);
      await deleteObject(photoRef);

      // Delete from Firestore
      await deleteDoc(doc(db, 'photos', photo.id));

      alert('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Error deleting photo. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Photo Gallery</h3>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading photos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Photo Gallery ({photos.length} photo{photos.length !== 1 ? 's' : ''})
      </h3>

      {photos.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            />
          </svg>
          <p className="text-gray-500 text-lg">No photos uploaded yet</p>
          <p className="text-gray-400">Start by uploading your first wedding photo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={photo.downloadURL}
                alt={photo.fileName}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                  <button
                    onClick={() => setSelectedPhoto(photo)}
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="View full size"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  
                  <a
                    href={photo.downloadURL}
                    download={photo.fileName}
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors inline-block"
                    title="Download"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                  
                  <button
                    onClick={() => deletePhoto(photo)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Photo info */}
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate" title={photo.fileName}>
                  {photo.fileName}
                </p>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatFileSize(photo.size)}</span>
                  <span>{formatDate(photo.uploadedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h4 className="text-lg font-semibold truncate">{selectedPhoto.fileName}</h4>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <img
                src={selectedPhoto.downloadURL}
                alt={selectedPhoto.fileName}
                className="max-w-full max-h-96 mx-auto object-contain"
              />
              
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p><strong>Size:</strong> {formatFileSize(selectedPhoto.size)}</p>
                <p><strong>Uploaded:</strong> {formatDate(selectedPhoto.uploadedAt)}</p>
                <p><strong>Type:</strong> {selectedPhoto.type}</p>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <a
                  href={selectedPhoto.downloadURL}
                  download={selectedPhoto.fileName}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Download
                </a>
                <button
                  onClick={() => {
                    deletePhoto(selectedPhoto);
                    setSelectedPhoto(null);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}