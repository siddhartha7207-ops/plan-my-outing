import { motion } from 'framer-motion';
import {
    Bus,
    Train,
    TrainFront,
    Bike,
    Car,
    CarFront,
    Clock,
    IndianRupee,
    Users,
    Zap,
    Wallet,
    Check
} from 'lucide-react';
import './TransportCard.css';

// Icon mapping
const transportIcons = {
    bus: Bus,
    metro: Train,
    local_train: TrainFront,
    rapido_bike: Bike,
    auto: Car,
    uber_go: Car,
    uber_premier: Car,
    uber_xl: CarFront
};

function TransportCard({
    transport,
    onSelect,
    isSelected,
    isCheapest,
    isFastest,
    numberOfPeople = 1
}) {
    const Icon = transportIcons[transport.id] || Car;
    const isPublic = transport.type === 'public';

    return (
        <motion.div
            className={`transport-card ${isSelected ? 'selected' : ''} ${isPublic ? 'public' : 'private'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelect?.(transport)}
        >
            {/* Badges */}
            <div className="transport-badges">
                {isCheapest && (
                    <span className="badge cheapest">
                        <Wallet size={12} />
                        Cheapest
                    </span>
                )}
                {isFastest && (
                    <span className="badge fastest">
                        <Zap size={12} />
                        Fastest
                    </span>
                )}
                <span className={`badge ${isPublic ? 'public' : 'private'}`}>
                    {isPublic ? 'Public' : 'Private'}
                </span>
            </div>

            {/* Main Content */}
            <div className="transport-main">
                {/* Icon */}
                <div className={`transport-icon ${isPublic ? 'public' : 'private'}`}>
                    <Icon size={28} />
                </div>

                {/* Info */}
                <div className="transport-info">
                    <h4 className="transport-name">{transport.name}</h4>
                    <p className="transport-description">{transport.description}</p>

                    {transport.tips && (
                        <p className="transport-tips">💡 {transport.tips}</p>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="transport-stats">
                <div className="stat">
                    <Clock size={16} />
                    <div className="stat-content">
                        <span className="stat-value">{transport.estimatedTime} min</span>
                        <span className="stat-label">Travel Time</span>
                    </div>
                </div>

                <div className="stat">
                    <IndianRupee size={16} />
                    <div className="stat-content">
                        <span className="stat-value">₹{transport.farePerPerson}</span>
                        <span className="stat-label">Per Person</span>
                    </div>
                </div>

                <div className="stat total">
                    <Users size={16} />
                    <div className="stat-content">
                        <span className="stat-value">₹{transport.totalFare}</span>
                        <span className="stat-label">Total ({numberOfPeople})</span>
                    </div>
                </div>
            </div>

            {/* Distance */}
            <div className="transport-distance">
                <span>📍 {transport.distanceKm} km</span>
                {transport.vehiclesNeeded > 1 && (
                    <span>🚗 {transport.vehiclesNeeded} vehicles needed</span>
                )}
            </div>

            {/* Select Indicator */}
            {isSelected && (
                <motion.div
                    className="selected-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                    <Check size={20} />
                </motion.div>
            )}
        </motion.div>
    );
}

export default TransportCard;
