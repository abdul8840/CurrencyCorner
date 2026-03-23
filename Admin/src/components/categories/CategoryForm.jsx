import { useState, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const CategoryForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '', description: '', order: 0, isActive: true
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        order: initialData.order || 0,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true
      });
      if (initialData.image?.url) setExistingImage(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setExistingImage(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('order', formData.order);
    submitData.append('isActive', formData.isActive);
    if (image) submitData.append('image', image);
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category Name *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} />
      </div>
      <div>
        <div>
          <label>Display Order</label>
          <input type="number" name="order" value={formData.order} onChange={handleChange} min="0" />
        </div>
        <label>
          <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
          Active
        </label>
      </div>
      <div>
        <label>Category Image</label>
        {existingImage && (
          <div>
            <img src={existingImage.url} alt="Category" />
          </div>
        )}
        {preview && (
          <div>
            <img src={preview} alt="Preview" />
            <button type="button" onClick={handleRemoveImage}><FiX /></button>
          </div>
        )}
        <label>
          <FiUpload /> Upload Image
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Category' : 'Create Category'}
      </button>
    </form>
  );
};

export default CategoryForm;