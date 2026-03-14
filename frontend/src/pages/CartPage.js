import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="page-container empty-cart-container">
                <ShoppingBag size={64} className="empty-cart-icon" />
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any premium items to your cart yet.</p>
                <Link to="/products" className="btn btn-primary mt-4">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2 className="section-title">Shopping Cart</h2>

            <div className="cart-layout">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.product} className="cart-item glass-panel">
                            <img src={item.image} alt={item.name} className="cart-item-img" />

                            <div className="cart-item-details">
                                <Link to={`/product/${item.product}`}><h3>{item.name}</h3></Link>
                                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                            </div>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.product, item.qty - 1)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQuantity(item.product, item.qty + 1)}>+</button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.product)}
                                    className="btn-danger-icon"
                                    title="Remove Item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary glass-panel">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <button
                        className="btn btn-primary btn-block btn-lg mt-4"
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
