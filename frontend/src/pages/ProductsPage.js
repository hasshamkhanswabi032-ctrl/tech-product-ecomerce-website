import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const res = await axios.get('http://localhost:5000/api/products', config);
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [user]);

    if (loading) return <div className="loader">Loading products...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="page-container">
            <h2 className="section-title">Our Products</h2>

            {products.length === 0 ? (
                <div className="empty-state">No products found.</div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-img-wrapper">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="product-img"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80';
                                    }}
                                />
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-footer">
                                    <span className="product-price">${product.price.toFixed(2)}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn btn-outline btn-icon"
                                    >
                                        <ShoppingCart size={18} /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
