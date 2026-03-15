import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loginWithGoogleToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/products');
        } else {
            setError(res.message);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const res = await loginWithGoogleToken(credentialResponse.credential);
        if (res.success) {
            navigate('/products');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to continue to ShopX</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </form>

                <div className="google-login-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <GoogleLogin 
                        onSuccess={handleGoogleSuccess} 
                        onError={() => setError('Google Login Failed')}
                        useOneTap
                        shape="rectangular"
                        theme="outline"
                        text="signin_with"
                        size="large"
                        width={250}
                    />
                </div>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
