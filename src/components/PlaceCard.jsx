import { motion } from 'framer-motion';
import {
    Star,
    Clock,
    MapPin,
    IndianRupee,
    Users,
    ShoppingBag,
    Film,
    Landmark,
    TreePine,
    Building2,
    Church,
    Gamepad2,
    Waves
} from 'lucide-react';
import './PlaceCard.css';

// Icon mapping
const categoryIcons = {
    mall: ShoppingBag,
    multiplex: Film,
    historical: Landmark,
    park: TreePine,
    museum: Building2,
    religious: Church,
    entertainment: Gamepad2,
    lake: Waves
};

// Color mapping
const categoryColors = {
    mall: '#8B5CF6',
    multiplex: '#EC4899',
    historical: '#F59E0B',
    park: '#10B981',
    museum: '#6366F1',
    religious: '#F97316',
    entertainment: '#EF4444',
    lake: '#06B6D4'
};

function PlaceCard({ place, onSelect, isSelected, numberOfPeople = 1, showDetails = true }) {
    const CategoryIcon = categoryIcons[place.category] || MapPin;
    const categoryColor = categoryColors[place.category] || '#6B7280';

    const totalEntryCost = place.entryCost * numberOfPeople;
    const formatTime = (minutes) => {
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    return (
        <motion.div
            className={`place-card ${isSelected ? 'selected' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelect?.(place)}
            style={{ '--category-color': categoryColor }}
        >
            {/* Category Badge */}
            <div className="place-category-badge" style={{ background: categoryColor }}>
                <CategoryIcon size={14} />
                <span>{place.category.replace('_', ' ')}</span>
            </div>

            {/* Image Placeholder */}
            <div className="place-image">
                <div className="place-image-gradient" />
                <div className="place-image-content">
                    <CategoryIcon size={48} strokeWidth={1} />
                </div>

                {/* Rating Badge */}
                <div className="place-rating-badge">
                    <Star size={14} fill="currentColor" />
                    <span>{place.rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="place-content">
                <h3 className="place-name">{place.name}</h3>

                <div className="place-address">
                    <MapPin size={14} />
                    <span>{place.address}</span>
                </div>

                {showDetails && (
                    <>
                        {/* Highlights */}
                        {place.highlights && (
                            <div className="place-highlights">
                                {place.highlights.slice(0, 3).map((highlight, index) => (
                                    <span key={index} className="highlight-tag">
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Meta Info */}
                        <div className="place-meta">
                            <div className="meta-item">
                                <Clock size={14} />
                                <span>{formatTime(place.timeRequired)}</span>
                            </div>
                            <div className="meta-item">
                                <Users size={14} />
                                <span>{(place.reviewCount / 1000).toFixed(1)}k reviews</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Price & Action */}
                <div className="place-footer">
                    <div className="place-price">
                        {place.entryCost === 0 ? (
                            <span className="free-badge">Free Entry</span>
                        ) : (
                            <>
                                <IndianRupee size={16} />
                                <span className="price-amount">{totalEntryCost}</span>
                                <span className="price-label">
                                    {numberOfPeople > 1 ? `for ${numberOfPeople}` : 'entry'}
                                </span>
                            </>
                        )}
                    </div>


                </div>
            </div>

            {/* Selected Overlay */}
            {isSelected && (
                <motion.div
                    className="selected-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="selected-check">✓</div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default PlaceCard;
