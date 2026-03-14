import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (cartItems.length === 0 && !success) {
            navigate('/products');
        }
    }, [cartItems, navigate, success]);

    const placeOrder = async () => {
        setLoading(true);
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(
                'http://localhost:5000/api/orders',
                {
                    orderItems: cartItems,
                    totalPrice: cartTotal,
                    paymentMethod: 'Cash on Delivery',
                },
                config
            );

            setSuccess(true);
            clearCart();
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="page-container success-container">
                <CheckCircle size={80} className="success-icon" />
                <h2>Order Placed Successfully!</h2>
                <p>Your order has been placed and will be delivered shortly.</p>
                <p>Payment Method: <strong>Cash on Delivery</strong></p>
                <button className="btn btn-primary mt-4" onClick={() => navigate('/products')}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2 className="section-title">Checkout</h2>

            <div className="checkout-layout">
                <div className="checkout-details glass-panel">
                    <h3>Payment Method</h3>
                    <div className="payment-method-box">
                        <input type="radio" id="cod" name="paymentMethod" value="Cash on Delivery" checked readOnly />
                        <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                    <p className="text-muted mt-2">You will pay for your order when it is delivered to your address.</p>
                </div>

                <div className="checkout-summary glass-panel">
                    <h3>Order Overview</h3>
                    <div className="checkout-items-list">
                        {cartItems.map((item, index) => (
                            <div key={index} className="checkout-item-row">
                                <span>{item.name} x {item.qty}</span>
                                <span>${(item.qty * item.price).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total">
                        <span>Total Payable:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    {error && <div className="error-message mt-2">{error}</div>}

                    <button
                        className="btn btn-primary btn-block btn-lg mt-4"
                        disabled={loading}
                        onClick={placeOrder}
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
