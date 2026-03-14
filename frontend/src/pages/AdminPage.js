import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { PlusCircle, Trash2, Package, Edit } from 'lucide-react';

const AdminPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });
    
    // Edit mode state
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const { user } = useContext(AuthContext);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            if (editMode && editId) {
                // Update product
                await axios.put(
                    `http://localhost:5000/api/products/${editId}`,
                    { title, description, price: Number(price), image },
                    config
                );
                setMessage({ text: 'Product updated successfully!', type: 'success' });
                handleCancelEdit();
            } else {
                // Add new product
                await axios.post(
                    'http://localhost:5000/api/products',
                    { title, description, price: Number(price), image },
                    config
                );
                setMessage({ text: 'Product added successfully!', type: 'success' });
                setTitle('');
                setDescription('');
                setPrice('');
                setImage('');
            }
            fetchProducts();
        } catch (err) {
            setMessage({
                text: err.response && err.response.data.message ? err.response.data.message : err.message,
                type: 'error'
            });
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.delete(`http://localhost:5000/api/products/${id}`, config);
            setMessage({ text: 'Product deleted successfully!', type: 'success' });
            
            // If deleting the product currently being edited, cancel edit mode
            if (editId === id) {
                handleCancelEdit();
            } else {
                fetchProducts();
            }
        } catch (err) {
            setMessage({
                text: err.response && err.response.data.message ? err.response.data.message : err.message,
                type: 'error'
            });
        }
    };

    const handleEditClick = (product) => {
        setEditMode(true);
        setEditId(product._id);
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.image);
        window.scrollTo(0, 0); // Scroll up to the form
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditId(null);
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
    };

    return (
        <div className="page-container admin-container">
            <div className="admin-header">
                <h2 className="serif-font">Admin Dashboard</h2>
                <p>Manage your store products and inventory</p>
            </div>

            {message.text && (
                <div className={`message-box ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="admin-layout">
                <div className="admin-card glass-panel">
                    <h3>
                        {editMode ? <Edit size={20} className="inline-icon" /> : <PlusCircle size={20} className="inline-icon" />} 
                        {editMode ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Product Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="e.g. Premium Wireless Headphones"
                            />
                        </div>

                        <div className="form-group">
                            <label>Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="e.g. 199.99"
                            />
                        </div>

                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows="4"
                                placeholder="Detailed description of the product..."
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={loading}
                                style={{ flex: 1 }}
                            >
                                {loading ? 'Saving...' : (editMode ? 'Update Product' : 'Add Product')}
                            </button>
                            {editMode && (
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={handleCancelEdit}
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="admin-card glass-panel">
                    <h3><Package size={20} className="inline-icon" /> Existing Products ({products.length})</h3>
                    <div className="admin-product-list">
                        {products.length === 0 ? (
                            <p className="empty-text">No products found.</p>
                        ) : (
                            products.map((product) => (
                                <div key={product._id} className="admin-product-item">
                                    <img 
                                        src={product.image} 
                                        alt={product.title} 
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80';
                                        }}
                                    />
                                    <div className="admin-product-info">
                                        <h4>{product.title}</h4>
                                        <p>${product.price.toFixed(2)}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        <button 
                                            onClick={() => handleEditClick(product)}
                                            className="btn-danger-icon"
                                            title="Edit Product"
                                            style={{ color: 'var(--text-soft)' }}
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product._id)}
                                            className="btn-danger-icon"
                                            title="Delete Product"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
