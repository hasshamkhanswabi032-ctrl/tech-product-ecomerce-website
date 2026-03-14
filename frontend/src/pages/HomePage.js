import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title serif-font">Elevate Your Lifestyle with ShopX</h1>
                    <p className="hero-subtitle">
                        Experience premium quality products curated just for you. Discover a world of elegance,
                        cutting-edge technology, and unparalleled customer service.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn btn-primary btn-large">Start Shopping Now</Link>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <h3>Premium Quality</h3>
                    <p>Handpicked products that meet our rigorous standards for excellence.</p>
                </div>
                <div className="feature-card">
                    <h3>Fast Delivery</h3>
                    <p>Get your items quickly and reliably with our expedited shipping network.</p>
                </div>
                <div className="feature-card">
                    <h3>Secure Checkout</h3>
                    <p>Your data is safe with our industry-leading secure payment processing.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
