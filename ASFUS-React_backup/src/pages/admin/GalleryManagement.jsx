
// src/pages/admin/GalleryManagement.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../api/apiService';
import styles from './AdminPages.module.css';

const GalleryManagement = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPhoto, setNewPhoto] = useState({ caption: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await apiService.get('/photos');
      setPhotos(response.data);
    } catch {
      setError('Falha ao buscar as fotos.');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPhoto({ ...newPhoto, [name]: value });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      setError('Por favor, selecione um arquivo de imagem válido.');
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Por favor, selecione uma imagem.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('caption', newPhoto.caption);
      
      await apiService.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setNewPhoto({ caption: '' });
      setSelectedFile(null);
      fetchPhotos();
    } catch {
      setError('Falha ao adicionar a foto.');
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await apiService.delete(`/photos/${photoId}`);
      fetchPhotos();
    } catch {
      setError('Falha ao excluir a foto.');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Gerenciamento da Galeria</h1>
      
      <form onSubmit={handleAddPhoto} className={styles.form}>
        <h2>Adicionar Nova Foto</h2>
        <div className={styles.fileInputContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className={styles.fileInput}
            required
          />
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            {selectedFile ? selectedFile.name : 'Selecionar Imagem'}
          </label>
        </div>
        <input
          type="text"
          name="caption"
          placeholder="Legenda (opcional)"
          value={newPhoto.caption}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.button}>Adicionar Foto</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>Fotos Atuais</h2>
      <div className={styles.photoGrid}>
        {photos.map(photo => (
          <div key={photo.id} className={styles.photoCard}>
            <img src={photo.imageUrl} alt={photo.caption} />
            <p>{photo.caption}</p>
            <button onClick={() => handleDeletePhoto(photo.id)} className={`${styles.button} ${styles.declineButton}`}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManagement;
