import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Sparkles,
    MapPin,
    Wallet,
    Clock,
    Users,
    ArrowRight,
    Star,
    Bus,
    Utensils,
    Film,
    Church,
    Zap,
    Shield,
    TrendingUp
} from 'lucide-react';
import './LandingPage.css';

function LandingPage() {
    const features = [
        {
            icon: Wallet,
            title: 'Budget-First Planning',
            description: 'Tell us your budget and we\'ll find the perfect plan that fits'
        },
        {
            icon: MapPin,
            title: 'Smart Discovery',
            description: 'Discover famous places, restaurants, and entertainment nearby'
        },
        {
            icon: Bus,
            title: 'Transport Comparison',
            description: 'Compare public and private transport with accurate fare estimates'
        },
        {
            icon: Zap,
            title: 'AI Optimization',
            description: 'Intelligent recommendations to maximize enjoyment within budget'
        }
    ];

    const categories = [
        { icon: Film, label: 'Movies', color: '#EC4899' },
        { icon: Utensils, label: 'Food', color: '#F59E0B' },
        { icon: MapPin, label: 'Places', color: '#8B5CF6' },
        { icon: Church, label: 'Temples', color: '#F97316' }
    ];

    const stats = [
        { value: '6+', label: 'Cities' },
        { value: '100+', label: 'Places' },
        { value: '50+', label: 'Restaurants' },
        { value: '∞', label: 'Possibilities' }
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-pattern" />

                {/* Floating Elements */}
                <motion.div
                    className="floating-element el-1"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <MapPin size={24} />
                </motion.div>
                <motion.div
                    className="floating-element el-2"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Wallet size={24} />
                </motion.div>
                <motion.div
                    className="floating-element el-3"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Star size={24} />
                </motion.div>

                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="hero-badge">
                            <Sparkles size={16} />
                            <span>AI-Powered Outing Planner</span>
                        </div>

                        <h1 className="hero-title">
                            Plan Your Perfect
                            <span className="text-gradient"> Outing </span>
                            Within Budget
                        </h1>

                        <p className="hero-description">
                            Discover the best places, compare transport, find great food, and book entertainment
                            — all optimized for your budget. No surprises, just amazing experiences.
                        </p>

                        <div className="hero-actions">
                            <Link to="/plan" className="btn btn-primary btn-lg">
                                <span>Start Planning</span>
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/places" className="btn btn-secondary btn-lg">
                                Explore Places
                            </Link>
                        </div>
                    </motion.div>

                    {/* Category Pills */}
                    <motion.div
                        className="hero-categories"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.label}
                                className="category-pill"
                                style={{ '--cat-color': cat.color }}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <cat.icon size={18} />
                                <span>{cat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="stat-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Why PlanMyOuting?</h2>
                        <p>Smart planning for unforgettable experiences</p>
                    </motion.div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="feature-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="feature-icon">
                                    <feature.icon size={28} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>How It Works</h2>
                        <p>Three simple steps to your perfect outing</p>
                    </motion.div>

                    <div className="steps-grid">
                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="step-number">1</div>
                            <h3>Set Your Budget</h3>
                            <p>Enter total budget, group size, and preferences. We'll analyze what's possible.</p>
                        </motion.div>

                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="step-number">2</div>
                            <h3>Choose Places</h3>
                            <p>Browse AI-ranked destinations, compare options, and pick your favorites.</p>
                        </motion.div>

                        <motion.div
                            className="step-card"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="step-number">3</div>
                            <h3>Get Your Plan</h3>
                            <p>Receive a complete itinerary with transport, food, and activities within budget.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <motion.div
                        className="cta-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="cta-content">
                            <h2>Ready to Plan Your Next Adventure?</h2>
                            <p>Join thousands of happy explorers who save money while having the best time.</p>
                            <Link to="/plan" className="btn btn-accent btn-lg">
                                <Sparkles size={20} />
                                <span>Start Planning Now</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div className="cta-decoration">
                            <motion.div
                                className="cta-circle c1"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                className="cta-circle c2"
                                animate={{ scale: [1.2, 1, 1.2] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Sparkles size={24} />
                            <span>PlanMyOuting</span>
                        </div>
                        <p className="footer-text">
                            Made with ❤️ for budget-conscious explorers
                        </p>
                        <p className="footer-disclaimer">
                            All prices are estimates. Please verify before booking.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
