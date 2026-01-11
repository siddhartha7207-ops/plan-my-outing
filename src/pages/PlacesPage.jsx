import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search,
    MapPin,
    SlidersHorizontal
} from 'lucide-react';
import { usePlan } from '../context/PlanContext';
import { getPlacesByCity, placeCategories, cities } from '../data/places';
import { rankPlaces } from '../utils/placeRanker';
import PlaceCard from '../components/PlaceCard';
import './PlacesPage.css';

function PlacesPage() {
    const navigate = useNavigate();
    const {
        budget,
        numberOfPeople,
        city,
        outingType,
        timeWindow,
        selectPlace,
        updateInputs
    } = usePlan();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCity, setSelectedCity] = useState(city ? city.toLowerCase() : 'bangalore');
    const [showFilters, setShowFilters] = useState(false);

    // Redirect if no budget set
    useEffect(() => {
        if (!budget || budget === 0) {
            navigate('/plan');
        }
    }, [budget, navigate]);

    // Get and rank places
    const allPlaces = useMemo(() => {
        const places = getPlacesByCity(selectedCity);
        return rankPlaces(places, {
            budget,
            numberOfPeople,
            outingType,
            timeWindow
        });
    }, [selectedCity, budget, numberOfPeople, outingType, timeWindow]);

    // Filter places
    const filteredPlaces = useMemo(() => {
        let places = allPlaces;

        // Filter by category
        if (selectedCategory !== 'all') {
            places = places.filter(p => p.category === selectedCategory);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            places = places.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.address.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Filter by budget (show affordable places first)
        return places;
    }, [allPlaces, selectedCategory, searchQuery]);

    // Separate affordable and expensive places
    const { affordablePlaces, expensivePlaces } = useMemo(() => {
        const budgetPerPerson = budget / numberOfPeople;
        const affordable = filteredPlaces.filter(p =>
            (p.entryCost + p.averageSpend) <= budgetPerPerson * 0.5
        );
        const expensive = filteredPlaces.filter(p =>
            (p.entryCost + p.averageSpend) > budgetPerPerson * 0.5
        );
        return { affordablePlaces: affordable, expensivePlaces: expensive };
    }, [filteredPlaces, budget, numberOfPeople]);

    const handleSelectPlace = (place) => {
        updateInputs({ city: selectedCity });
        selectPlace(place);
    };

    return (
        <div className="places-page">
            <div className="places-container">
                {/* Sidebar */}
                <aside className="places-sidebar">

                    <div className="sidebar-section">
                        <h3>Categories</h3>
                        <div className="category-list">
                            <button
                                className={`category-item ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                <span>All Places</span>
                                <span className="cat-count">{allPlaces.length}</span>
                            </button>
                            {placeCategories.map(cat => {
                                const count = allPlaces.filter(p => p.category === cat.id).length;
                                if (count === 0) return null;
                                return (
                                    <button
                                        key={cat.id}
                                        className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        <span>{cat.name}</span>
                                        <span className="cat-count">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </aside>

                {/* Main Content */}
                <main className="places-main">
                    {/* Header */}
                    <div className="places-header">
                        <div className="header-info">
                            <h1>Discover Places</h1>
                            <div className="city-selector-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: '#666' }}>
                                <MapPin size={16} />
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="city-dropdown"
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        border: '1px solid #e0e0e0',
                                        backgroundColor: 'white',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        outline: 'none',
                                        color: '#333'
                                    }}
                                >
                                    {cities.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="search-bar">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search places..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                className="filter-btn"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Affordable Places */}
                    {affordablePlaces.length > 0 && (
                        <section className="places-section">
                            <div className="section-header">
                                <h2>Recommended for You</h2>
                                <span className="section-badge">Within Budget</span>
                            </div>
                            <div className="places-grid">
                                {affordablePlaces.map((place, index) => (
                                    <motion.div
                                        key={place.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <PlaceCard
                                            place={place}
                                            onSelect={handleSelectPlace}
                                            numberOfPeople={numberOfPeople}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Other Places */}
                    {expensivePlaces.length > 0 && (
                        <section className="places-section">
                            <div className="section-header">
                                <h2>More Options</h2>
                                <span className="section-badge warning">May exceed budget</span>
                            </div>
                            <div className="places-grid">
                                {expensivePlaces.map((place, index) => (
                                    <motion.div
                                        key={place.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <PlaceCard
                                            place={place}
                                            onSelect={handleSelectPlace}
                                            numberOfPeople={numberOfPeople}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* No Results */}
                    {filteredPlaces.length === 0 && (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>No places found</h3>
                            <p>Try adjusting your search or filters</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default PlacesPage;
