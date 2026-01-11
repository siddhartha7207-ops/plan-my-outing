import { motion } from 'framer-motion';
import { Star, IndianRupee, Clock, Leaf, Check } from 'lucide-react';
import './FoodCard.css';

// Cuisine emoji mapping
const cuisineEmojis = {
    indian: '🍛',
    south_indian: '🥘',
    north_indian: '🍲',
    chinese: '🥢',
    italian: '🍕',
    fast_food: '🍔',
    cafe: '☕',
    biryani: '🍚',
    street_food: '🌮',
    desserts: '🍰'
};

function FoodCard({
    restaurant,
    onSelect,
    isSelected,
    numberOfPeople = 1,
    compact = false
}) {
    const emoji = cuisineEmojis[restaurant.cuisine] || '🍽️';
    const totalCost = restaurant.avgCost * numberOfPeople;

    // Price level indicators
    const priceIndicator = '₹'.repeat(restaurant.priceLevel || 2);

    return (
        <motion.div
            className={`food-card ${isSelected ? 'selected' : ''} ${compact ? 'compact' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelect?.(restaurant)}
        >
            {/* Header */}
            <div className="food-header">
                <div className="food-emoji">{emoji}</div>

                <div className="food-badges">
                    {restaurant.isVeg && (
                        <span className="veg-badge">
                            <Leaf size={12} />
                            Pure Veg
                        </span>
                    )}
                    <span className="cuisine-badge">
                        {restaurant.cuisine.replace('_', ' ')}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="food-content">
                <h4 className="food-name">{restaurant.name}</h4>

                <div className="food-meta">
                    <div className="rating">
                        <Star size={14} fill="currentColor" />
                        <span>{restaurant.rating}</span>
                        <span className="review-count">
                            ({(restaurant.reviewCount / 1000).toFixed(1)}k)
                        </span>
                    </div>
                    <span className="price-level">{priceIndicator}</span>
                </div>

                {!compact && (
                    <>
                        <p className="food-address">{restaurant.address}</p>

                        {/* Popular Dishes */}
                        {restaurant.popularDishes && (
                            <div className="popular-dishes">
                                <span className="dishes-label">Popular:</span>
                                <span className="dishes-list">
                                    {restaurant.popularDishes.slice(0, 3).join(' • ')}
                                </span>
                            </div>
                        )}

                        {/* Hours */}
                        <div className="food-hours">
                            <Clock size={12} />
                            <span>{restaurant.openingHours}</span>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="food-footer">
                <div className="food-price">
                    <IndianRupee size={16} />
                    <span className="price-amount">{restaurant.avgCost}</span>
                    <span className="price-label">per person</span>
                </div>

                <div className="food-total">
                    <span className="total-label">For {numberOfPeople}:</span>
                    <span className="total-amount">₹{totalCost}</span>
                </div>
            </div>

            {/* Selection Indicator */}
            {isSelected && (
                <motion.div
                    className="food-selected"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <Check size={16} />
                </motion.div>
            )}
        </motion.div>
    );
}

export default FoodCard;
