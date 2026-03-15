import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { ShoppingCart, LogOut, Package } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    if (isHomePage) {
        return (
            <nav className="navbar navbar-home">
                <div className="nav-container">
                    <Link to="/" className="nav-logo"><h1>ShopX</h1></Link>
                    <div className="nav-links">
                        <Link to="/login" className="btn btn-outline">Sign In</Link>
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/products" className="nav-logo"><h1>ShopX</h1></Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            {user.isAdmin && (
                                <Link to="/admin" className="nav-item">
                                    <Package size={20} /> Admin
                                </Link>
                            )}
                            <Link to="/products" className="nav-item">Products</Link>
                            <Link to="/cart" className="nav-item cart-item">
                                <ShoppingCart size={20} />
                                {cartItems.length > 0 && (
                                    <span className="cart-badge">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                                )}
                            </Link>
                            <span className="nav-user">Hi, {user.name ? user.name.split(' ')[0] : 'User'}</span>
                            <button onClick={logout} className="btn btn-outline">
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Sign In</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
