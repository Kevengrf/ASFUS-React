import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import styles from './GalleryPage.module.css';

// Use Vite's import.meta.glob to get all images from the specified folder
const modules = import.meta.glob('../../assets/home/galery*.jpg', { eager: true, as: 'url' });

const galleryImages = Object.keys(modules).map((path, index) => {
  const match = path.match(/galery(\d+)\.jpg$/);
  if (match) {
    return {
      id: parseInt(match[1]),
      imageUrl: modules[path],
      caption: `Galeria Imagem ${match[1]}`
    };
  }
  return null;
}).filter(Boolean);

galleryImages.sort((a, b) => a.id - b.id);


const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    setPhotos(galleryImages);
  }, []);

  const openViewer = useCallback((index) => {
    setSelectedImageIndex(index);
    setIsViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
    setSelectedImageIndex(null);
  }, []);

  const goToNext = useCallback(() => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
  }, [photos.length]);

  const goToPrev = useCallback(() => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isViewerOpen) return;
      if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrev();
      } else if (event.key === 'Escape') {
        closeViewer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isViewerOpen, goToNext, goToPrev, closeViewer]);


  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.title}>Galeria de Fotos</h1>
      {photos.length === 0 ? (
        <p>Carregando imagens da galeria...</p>
      ) : (
        <div className={styles.photoGrid}>
          {photos.map((photo, index) => (
            <div key={photo.id} className={styles.photoCard} onClick={() => openViewer(index)}>
              <img src={photo.imageUrl} alt={photo.caption || 'Foto da galeria'} />
              <div className={styles.viewMoreOverlay}>
                <p>Ver Mais</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isViewerOpen && selectedImageIndex !== null && (
        <div className={styles.imageViewerOverlay} onClick={closeViewer}>
          <div className={styles.imageViewerContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeViewer}>×</button>
            <img
              src={photos[selectedImageIndex].imageUrl}
              alt={photos[selectedImageIndex].caption || 'Imagem da galeria'}
              className={styles.viewerImage}
            />
            {photos[selectedImageIndex].caption && (
              <p className={styles.viewerCaption}>{photos[selectedImageIndex].caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
