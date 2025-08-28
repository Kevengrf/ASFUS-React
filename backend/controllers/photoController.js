
// Mock data for photos
let photos = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/150',
    caption: 'Photo 1',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/150',
    caption: 'Photo 2',
  },
];

// Get all photos
export const getPhotos = (req, res) => {
  res.json(photos);
};

// Add a new photo
export const addPhoto = (req, res) => {
  const { imageUrl, caption } = req.body;
  const newPhoto = {
    id: photos.length + 1,
    imageUrl,
    caption,
  };
  photos.push(newPhoto);
  res.status(201).json(newPhoto);
};

// Delete a photo
export const deletePhoto = (req, res) => {
  const { id } = req.params;
  photos = photos.filter((photo) => photo.id !== parseInt(id));
  res.status(204).send();
};
