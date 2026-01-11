import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Menu,
    X,
    Sparkles,
    Home,
    Search,
    Calendar,
    Wallet
} from 'lucide-react';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/plan', label: 'Plan Outing', icon: Search },
        { path: '/places', label: 'Discover', icon: MapPin },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <motion.div
                        className="logo-icon"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Sparkles size={24} />
                    </motion.div>
                    <span className="logo-text">PlanMyOuting</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar-links">
                    {navLinks.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`nav-link ${isActive(path) ? 'active' : ''}`}
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                            {isActive(path) && (
                                <motion.div
                                    className="nav-indicator"
                                    layoutId="nav-indicator"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Link to="/plan" className="navbar-cta">
                    <Calendar size={18} />
                    <span>Start Planning</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="navbar-mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`mobile-link ${isActive(path) ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{label}</span>
                            </Link>
                        ))}
                        <Link
                            to="/plan"
                            className="mobile-cta"
                            onClick={() => setIsOpen(false)}
                        >
                            <Calendar size={20} />
                            <span>Start Planning</span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
