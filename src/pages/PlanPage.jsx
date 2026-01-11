import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    MapPin,
    Bus,
    Utensils,
    Film,
    Church,
    Clock,
    IndianRupee,
    Check,
    Sparkles,
    RefreshCw
} from 'lucide-react';
import { usePlan } from '../context/PlanContext';
import { getTransportOptions, getBestTransportOptions, calculateDistance, cityStartLocations } from '../data/transport';
import { getRestaurantsByCity, filterRestaurantsByPreference, rankRestaurants } from '../data/restaurants';
import { movies, getTheatresByCity, showtimes, rankMovies } from '../data/movies';
import TransportCard from '../components/TransportCard';
import FoodCard from '../components/FoodCard';
import MovieCard from '../components/MovieCard';
import BudgetTracker from '../components/BudgetTracker';
import './PlanPage.css';

const tabs = [
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'entertainment', label: 'Movies', icon: Film },
];

function PlanPage() {
    const navigate = useNavigate();
    const {
        budget,
        numberOfPeople,
        city,
        selectedPlace,
        foodPreference,
        travelPreference,
        outingType,
        selectedTransport,
        selectedRestaurants,
        selectedMovie,
        selectTransport,
        addRestaurant,
        removeRestaurant,
        selectMovie,
        budgetUsed
    } = usePlan();

    const [activeTab, setActiveTab] = useState('transport');
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [selectedSeatCategory, setSelectedSeatCategory] = useState(null);

    // Redirect if no place selected
    useEffect(() => {
        if (!selectedPlace) {
            navigate('/places');
        }
    }, [selectedPlace, navigate]);

    // Calculate distance to selected place
    const distance = useMemo(() => {
        if (!selectedPlace || !city) return 10; // Default 10km
        const startLoc = cityStartLocations[city] || cityStartLocations.bangalore;
        return calculateDistance(
            startLoc.lat,
            startLoc.lng,
            selectedPlace.coordinates.lat,
            selectedPlace.coordinates.lng
        );
    }, [selectedPlace, city]);

    // Get transport options
    const transportOptions = useMemo(() => {
        return getTransportOptions(city || 'bangalore', distance, numberOfPeople);
    }, [city, distance, numberOfPeople]);

    const { cheapest, fastest } = useMemo(() => {
        return getBestTransportOptions(transportOptions);
    }, [transportOptions]);

    // Sort transport (public first, then by preference)
    const sortedTransport = useMemo(() => {
        const publicOpts = transportOptions.filter(t => t.type === 'public');
        const privateOpts = transportOptions.filter(t => t.type === 'private');

        const sortFn = travelPreference === 'fastest'
            ? (a, b) => a.estimatedTime - b.estimatedTime
            : (a, b) => a.totalFare - b.totalFare;

        return [...publicOpts.sort(sortFn), ...privateOpts.sort(sortFn)];
    }, [transportOptions, travelPreference]);

    // Get restaurants
    const restaurants = useMemo(() => {
        const allRestaurants = getRestaurantsByCity(city || 'bangalore');
        const filtered = filterRestaurantsByPreference(allRestaurants, foodPreference);
        return rankRestaurants(filtered);
    }, [city, foodPreference]);

    // Get movies and theatres
    const rankedMovies = useMemo(() => rankMovies(movies), []);
    const theatres = useMemo(() => getTheatresByCity(city || 'bangalore'), [city]);

    const handleTransportSelect = (transport) => {
        selectTransport(transport);
    };

    const handleRestaurantSelect = (restaurant) => {
        const isSelected = selectedRestaurants.some(r => r.id === restaurant.id);
        if (isSelected) {
            removeRestaurant(restaurant.id);
        } else {
            addRestaurant(restaurant);
        }
    };

    const handleMovieSelect = (movie) => {
        if (selectedTheatre && selectedSeatCategory) {
            selectMovie(movie, selectedTheatre, selectedShowtime, selectedSeatCategory.price);
        }
    };

    const handleContinue = () => {
        navigate('/summary');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'transport':
                return (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h2>
                                <Bus size={24} />
                                Choose Transport
                            </h2>
                            <p>
                                Distance: <strong>{distance} km</strong> to {selectedPlace?.name}
                            </p>
                        </div>

                        <div className="transport-note">
                            <Sparkles size={16} />
                            <span>Public transport shown first for best value!</span>
                        </div>

                        <div className="transport-list">
                            {sortedTransport.map((transport, index) => (
                                <motion.div
                                    key={transport.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <TransportCard
                                        transport={transport}
                                        onSelect={handleTransportSelect}
                                        isSelected={selectedTransport?.id === transport.id}
                                        isCheapest={cheapest?.id === transport.id}
                                        isFastest={fastest?.id === transport.id}
                                        numberOfPeople={numberOfPeople}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'food':
                return (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h2>
                                <Utensils size={24} />
                                Choose Restaurants
                            </h2>
                            <p>Select one or more places to eat</p>
                        </div>

                        <div className="food-grid">
                            {restaurants.slice(0, 8).map((restaurant, index) => (
                                <motion.div
                                    key={restaurant.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <FoodCard
                                        restaurant={restaurant}
                                        onSelect={handleRestaurantSelect}
                                        isSelected={selectedRestaurants.some(r => r.id === restaurant.id)}
                                        numberOfPeople={numberOfPeople}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'entertainment':
                return (
                    <div className="tab-content">
                        <div className="tab-header">
                            <h2>
                                <Film size={24} />
                                Movies & Entertainment
                            </h2>
                            <p>Select a movie, theatre, and showtime</p>
                        </div>

                        {/* Theatre Selection */}
                        <div className="selection-section">
                            <h3>1. Select Theatre</h3>
                            <div className="theatre-list">
                                {theatres.map(theatre => (
                                    <button
                                        key={theatre.id}
                                        className={`theatre-btn ${selectedTheatre?.id === theatre.id ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedTheatre(theatre);
                                            setSelectedSeatCategory(theatre.seatCategories[0]);
                                        }}
                                    >
                                        <span className="theatre-name">{theatre.name}</span>
                                        <span className="theatre-features">
                                            {theatre.hasIMAX && <span className="feature">IMAX</span>}
                                            {theatre.has4DX && <span className="feature">4DX</span>}
                                        </span>
                                        <span className="theatre-price">from ₹{Math.min(...theatre.seatCategories.map(c => c.price))}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Seat Category */}
                        {selectedTheatre && (
                            <motion.div
                                className="selection-section"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3>2. Select Seat Category</h3>
                                <div className="seat-categories">
                                    {selectedTheatre.seatCategories.map(cat => (
                                        <button
                                            key={cat.name}
                                            className={`seat-btn ${selectedSeatCategory?.name === cat.name ? 'active' : ''}`}
                                            onClick={() => setSelectedSeatCategory(cat)}
                                        >
                                            <span className="seat-name">{cat.name}</span>
                                            <span className="seat-price">₹{cat.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Showtime */}
                        {selectedSeatCategory && (
                            <motion.div
                                className="selection-section"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3>3. Select Showtime</h3>
                                <div className="showtime-list">
                                    {showtimes.map(time => (
                                        <button
                                            key={time}
                                            className={`showtime-btn ${selectedShowtime === time ? 'active' : ''}`}
                                            onClick={() => setSelectedShowtime(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Movies */}
                        <div className="selection-section">
                            <h3>4. Select Movie</h3>
                            <div className="movies-grid">
                                {rankedMovies.slice(0, 6).map((movie, index) => (
                                    <motion.div
                                        key={movie.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <MovieCard
                                            movie={movie}
                                            onSelect={handleMovieSelect}
                                            isSelected={selectedMovie?.id === movie.id}
                                            showDetails={false}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (!selectedPlace) return null;

    return (
        <div className="plan-page">
            <div className="plan-container">
                {/* Left Panel - Budget & Summary */}
                <aside className="plan-sidebar">
                    <button className="back-btn" onClick={() => navigate('/places')}>
                        <ArrowLeft size={18} />
                        <span>Change Place</span>
                    </button>

                    <div className="selected-place-card">
                        <h3>Your Destination</h3>
                        <div className="place-info">
                            <MapPin size={18} />
                            <div>
                                <span className="place-name">{selectedPlace.name}</span>
                                <span className="place-address">{selectedPlace.address}</span>
                            </div>
                        </div>
                        <div className="place-stats">
                            <span>⭐ {selectedPlace.rating}</span>
                            <span>🕐 {selectedPlace.timeRequired} min</span>
                            <span>💰 ₹{selectedPlace.entryCost * numberOfPeople}</span>
                        </div>
                    </div>

                    <BudgetTracker
                        totalBudget={budget}
                        budgetUsed={{
                            ...budgetUsed,
                            tickets: (selectedPlace?.entryCost || 0) * numberOfPeople + (budgetUsed.tickets || 0)
                        }}
                        numberOfPeople={numberOfPeople}
                    />

                    {/* Quick Summary */}
                    <div className="quick-summary">
                        <h4>Your Selections</h4>
                        <div className="summary-items">
                            <div className={`summary-item ${selectedTransport ? 'done' : ''}`}>
                                <Bus size={16} />
                                <span>{selectedTransport ? selectedTransport.name : 'Choose transport'}</span>
                                {selectedTransport && <Check size={16} className="check" />}
                            </div>
                            <div className={`summary-item ${selectedRestaurants.length > 0 ? 'done' : ''}`}>
                                <Utensils size={16} />
                                <span>{selectedRestaurants.length > 0 ? `${selectedRestaurants.length} restaurant(s)` : 'Choose food'}</span>
                                {selectedRestaurants.length > 0 && <Check size={16} className="check" />}
                            </div>
                            <div className={`summary-item ${selectedMovie ? 'done' : ''}`}>
                                <Film size={16} />
                                <span>{selectedMovie ? selectedMovie.title : 'Choose movie (optional)'}</span>
                                {selectedMovie && <Check size={16} className="check" />}
                            </div>
                        </div>
                    </div>

                    <button
                        className="generate-btn"
                        onClick={handleContinue}
                        disabled={!selectedTransport}
                    >
                        <Sparkles size={18} />
                        <span>Generate Plan</span>
                        <ArrowRight size={18} />
                    </button>
                </aside>

                {/* Main Content */}
                <main className="plan-main">
                    {/* Tabs */}
                    <div className="plan-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <tab.icon size={18} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderTabContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

export default PlanPage;
