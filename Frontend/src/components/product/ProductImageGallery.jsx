import { useState } from 'react';

const ProductImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return <div><p>No image available</p></div>;
  }

  return (
    <div>
      <div>
        <img src={images[selectedImage]?.url} alt="Product" />
      </div>
      {images.length > 1 && (
        <div>
          {images.map((image, index) => (
            <button key={index} onClick={() => setSelectedImage(index)}>
              <img src={image.url} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;