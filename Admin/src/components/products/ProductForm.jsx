import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/categories/adminCategorySlice';
import { PRODUCT_CONDITIONS, PRODUCT_RARITIES } from '../../utils/helpers';
import { FiUpload, FiX } from 'react-icons/fi';

const ProductForm = ({ initialData, onSubmit, loading }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.adminCategory);

  const [formData, setFormData] = useState({
    name: '', description: '', category: '', country: '', year: '',
    condition: 'Good', denomination: '', material: '', weight: '',
    dimensions: '', rarity: 'Common', additionalInfo: '', price: '',
    comparePrice: '', stock: '', isFeatured: false, isActive: true, tags: ''
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category?._id || initialData.category || '',
        country: initialData.country || '',
        year: initialData.year || '',
        condition: initialData.condition || 'Good',
        denomination: initialData.denomination || '',
        material: initialData.material || '',
        weight: initialData.weight || '',
        dimensions: initialData.dimensions || '',
        rarity: initialData.rarity || 'Common',
        additionalInfo: initialData.additionalInfo || '',
        price: initialData.price || '',
        comparePrice: initialData.comparePrice || '',
        stock: initialData.stock || '',
        isFeatured: initialData.isFeatured || false,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        tags: initialData.tags?.join(', ') || ''
      });
      setExistingImages(initialData.images || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveNewImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (publicId) => {
    setExistingImages(prev => prev.filter(img => img.public_id !== publicId));
    setRemoveImages(prev => [...prev, publicId]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();

    Object.keys(formData).forEach(key => {
      if (formData[key] !== '' && formData[key] !== undefined) {
        submitData.append(key, formData[key]);
      }
    });

    images.forEach(image => {
      submitData.append('images', image);
    });

    if (removeImages.length > 0) {
      submitData.append('removeImages', JSON.stringify(removeImages));
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Basic Information</h3>
        <div>
          <label>Product Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} />
        </div>
        <div>
          <div>
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div>
            <label>Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div>
        <h3>Collectible Details</h3>
        <div>
          <div>
            <label>Condition</label>
            <select name="condition" value={formData.condition} onChange={handleChange}>
              {PRODUCT_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label>Denomination</label>
            <input type="text" name="denomination" value={formData.denomination} onChange={handleChange} />
          </div>
          <div>
            <label>Material</label>
            <input type="text" name="material" value={formData.material} onChange={handleChange} />
          </div>
        </div>
        <div>
          <div>
            <label>Weight</label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div>
            <label>Dimensions</label>
            <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} />
          </div>
          <div>
            <label>Rarity</label>
            <select name="rarity" value={formData.rarity} onChange={handleChange}>
              {PRODUCT_RARITIES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label>Additional Information</label>
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} />
        </div>
      </div>

      <div>
        <h3>Pricing & Stock</h3>
        <div>
          <div>
            <label>Price (₹) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
          </div>
          <div>
            <label>Compare Price (₹)</label>
            <input type="number" name="comparePrice" value={formData.comparePrice} onChange={handleChange} min="0" step="0.01" />
          </div>
          <div>
            <label>Stock *</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" />
          </div>
        </div>
        <div>
          <label>Tags (comma separated)</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="rare, vintage, silver" />
        </div>
        <div>
          <label>
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            Featured Product
          </label>
          <label>
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
            Active
          </label>
        </div>
      </div>

      <div>
        <h3>Images</h3>
        {existingImages.length > 0 && (
          <div>
            <p>Existing Images:</p>
            <div>
              {existingImages.map((img) => (
                <div key={img.public_id}>
                  <img src={img.url} alt="Product" />
                  <button type="button" onClick={() => handleRemoveExistingImage(img.public_id)}>
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {previews.length > 0 && (
          <div>
            <p>New Images:</p>
            <div>
              {previews.map((preview, index) => (
                <div key={index}>
                  <img src={preview} alt="Preview" />
                  <button type="button" onClick={() => handleRemoveNewImage(index)}>
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <label>
          <FiUpload /> Upload Images
          <input type="file" accept="image/*" multiple onChange={handleImageChange} hidden />
        </label>
      </div>

      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;