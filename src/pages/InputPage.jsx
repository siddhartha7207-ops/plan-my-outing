import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet,
    Users,
    MapPin,
    Clock,
    Utensils,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    PartyPopper,
    Church,
    Pizza,
    Shuffle,
    Leaf,
    Zap,
    Loader2,
    Coffee,
    BookOpen
} from 'lucide-react';
import { usePlan } from '../context/PlanContext';
import { cities, getPlacesByCity } from '../data/places';
import { getTransportOptions, getBestTransportOptions, cityStartLocations, calculateDistance } from '../data/transport';
import { getRestaurantsByCity, filterRestaurantsByPreference, rankRestaurants } from '../data/restaurants';
import { rankPlaces } from '../utils/placeRanker';
import { OpenRouterService } from '../services/openrouter';
import ProgressStepper from '../components/ProgressStepper';
import './InputPage.css';

const steps = [
    { id: 'budget', title: 'Budget', subtitle: 'Set your limit' },
    { id: 'group', title: 'Group', subtitle: 'How many?' },
    { id: 'location', title: 'Location', subtitle: 'Where from?' },
    { id: 'time', title: 'Time', subtitle: 'When?' },
    { id: 'preferences', title: 'Preferences', subtitle: 'What type?' }
];

function InputPage() {
    const navigate = useNavigate();
    const {
        updateInputs,
        updateAiTimeline,
        calculateBudgetAllocation,
        selectPlace,
        selectTransport,
        setRestaurant
    } = usePlan();

    // Read API Key from environment
    const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTE_API_KEY;

    const [currentStep, setCurrentStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        budget: 2000,
        numberOfPeople: 2,
        city: 'bangalore',
        locationName: 'MG Road',
        timeStart: '10:00',
        timeEnd: '20:00',
        outingType: 'mixed',
        foodPreference: 'any',
        travelPreference: 'cheapest'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: null }));
    };

    const validateStep = () => {
        const newErrors = {};

        switch (currentStep) {
            case 0:
                if (formData.budget < 200) {
                    newErrors.budget = 'Minimum budget is ₹200';
                }
                break;
            case 1:
                if (formData.numberOfPeople < 1 || formData.numberOfPeople > 20) {
                    newErrors.numberOfPeople = 'Group size must be 1-20';
                }
                break;
            case 2:
                if (!formData.city) {
                    newErrors.city = 'Please select a city';
                }
                break;
            case 3:
                if (!formData.timeStart || !formData.timeEnd) {
                    newErrors.time = 'Please set your time window';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validateStep()) return;

        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleAutoGeneratePlan();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // AI Auto-Generate Plan
    const handleAutoGeneratePlan = async () => {
        setIsGenerating(true);

        // Calculate time duration in minutes
        const start = formData.timeStart.split(':').map(Number);
        const end = formData.timeEnd.split(':').map(Number);
        const startMinutes = start[0] * 60 + start[1];
        const endMinutes = end[0] * 60 + end[1];
        const totalDuration = endMinutes - startMinutes;

        // Calculate per-person budget
        const budgetPerPerson = formData.budget / formData.numberOfPeople;

        // Simplified food cost assumption: ₹200 per person
        const FOOD_COST_PER_PERSON = 200;
        const totalFoodCost = FOOD_COST_PER_PERSON * formData.numberOfPeople;

        // Update context with user inputs
        updateInputs({
            ...formData,
            timeWindow: {
                start: formData.timeStart,
                end: formData.timeEnd,
                duration: totalDuration
            }
        });

        calculateBudgetAllocation();

        // REAL AI GENERATION
        if (OPENROUTER_API_KEY) {
            try {
                const planDetails = {
                    duration: totalDuration,
                    city: cities.find(c => c.id === formData.city)?.name || formData.city,
                    budget: formData.budget,
                    numberOfPeople: formData.numberOfPeople,
                    startTime: formData.timeStart,
                    endTime: formData.timeEnd,
                    preferences: [formData.outingType, formData.foodPreference, formData.travelPreference],
                    transportType: formData.travelPreference === 'fastest' ? 'Cab' : 'Bus',
                    transportCost: formData.travelPreference === 'fastest' ? 300 : 50,
                    foodCost: FOOD_COST_PER_PERSON
                };

                const aiTimeline = await OpenRouterService.generateItinerary(OPENROUTER_API_KEY, planDetails);

                // Store AI timeline in context
                updateAiTimeline(aiTimeline);
            } catch (error) {
                console.error("AI Generation Failed:", error);
                // Fallback is handled below by standard planner
                updateAiTimeline(null);
            }
        } else {
            console.warn("VITE_OPENROUTE_API_KEY NOT FOUND In ENV");
            updateAiTimeline(null);
        }

        // Simulate AI thinking delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Get all places for the city
        const places = getPlacesByCity(formData.city);

        // Budget tier logic - determine plan type based on per-person budget
        let planType = 'basic';
        let maxEntryCost = 50;
        let preferPublicTransport = true;

        if (budgetPerPerson >= 2000) {
            planType = 'luxury';
            maxEntryCost = 500;
            preferPublicTransport = false;
        } else if (budgetPerPerson >= 1500) {
            planType = 'premium';
            maxEntryCost = 300;
            preferPublicTransport = false;
        } else if (budgetPerPerson >= 1000) {
            planType = 'standard';
            maxEntryCost = 150;
            preferPublicTransport = true;
        } else {
            planType = 'basic';
            maxEntryCost = 50;
            preferPublicTransport = true;
        }

        // Filter places based on budget tier
        const affordablePlaces = places.filter(p =>
            (p.entryCost || 0) <= maxEntryCost
        );

        // Rank places based on outing type preference
        const rankedPlaces = rankPlaces(affordablePlaces.length > 0 ? affordablePlaces : places, {
            budget: formData.budget,
            numberOfPeople: formData.numberOfPeople,
            outingType: formData.outingType,
            timeWindow: { duration: totalDuration }
        });

        // Calculate how many places we can visit based on time
        // Reserve: 30min travel to first place, 30min between places, 60min lunch, 30min return
        const travelTimePerPlace = 30;
        const lunchTime = 60;
        const returnTime = 30;

        // Available time for places = total - initial travel - lunch - return
        const availableTimeForPlaces = totalDuration - travelTimePerPlace - lunchTime - returnTime;

        // Select multiple places to fill the time (2-3 places)
        const selectedPlaces = [];
        let usedTime = 0;
        let usedBudget = 0;
        const maxBudgetForPlaces = budgetPerPerson * 0.4;

        for (const place of rankedPlaces) {
            const placeTime = (place.timeRequired || 90) + travelTimePerPlace; // Include travel between places
            const placeCost = place.entryCost || 0;

            if (usedTime + placeTime <= availableTimeForPlaces &&
                usedBudget + placeCost <= maxBudgetForPlaces &&
                selectedPlaces.length < 3) {
                selectedPlaces.push(place);
                usedTime += placeTime;
                usedBudget += placeCost;
            }
        }

        // Ensure at least one place is selected
        if (selectedPlaces.length === 0 && rankedPlaces.length > 0) {
            selectedPlaces.push(rankedPlaces[0]);
        }

        // Use first place as the main destination
        const bestPlace = selectedPlaces[0];

        if (bestPlace) {
            selectPlace(bestPlace);

            // Store additional places for multi-place itinerary
            if (selectedPlaces.length > 1) {
                updateInputs({
                    additionalPlaces: selectedPlaces.slice(1)
                });
            }

            // AI Logic: Auto-select transport based on budget tier
            const startLoc = cityStartLocations[formData.city] || cityStartLocations.bangalore;
            const distance = calculateDistance(
                startLoc.lat,
                startLoc.lng,
                bestPlace.coordinates.lat,
                bestPlace.coordinates.lng
            );

            const transportOptions = getTransportOptions(formData.city, distance, formData.numberOfPeople);
            const { cheapest, fastest } = getBestTransportOptions(transportOptions);

            // Select transport based on budget tier and user preference
            let bestTransport;
            if (preferPublicTransport || formData.travelPreference === 'cheapest') {
                bestTransport = cheapest;
            } else {
                bestTransport = formData.travelPreference === 'fastest' ? fastest : cheapest;
            }

            if (bestTransport) {
                selectTransport(bestTransport);
            }

            // AI Logic: Select nearby restaurant with simplified cost
            const restaurants = getRestaurantsByCity(formData.city);
            const filteredRestaurants = filterRestaurantsByPreference(restaurants, formData.foodPreference);

            // Find restaurants near the selected place
            const restaurantsWithDistance = filteredRestaurants.map(r => ({
                ...r,
                // Override avgCost with simplified assumption
                avgCost: FOOD_COST_PER_PERSON,
                distanceToPlace: calculateDistance(
                    bestPlace.coordinates.lat,
                    bestPlace.coordinates.lng,
                    r.coordinates.lat,
                    r.coordinates.lng
                )
            })).sort((a, b) => a.distanceToPlace - b.distanceToPlace);

            // Select nearest restaurant
            const selectedRestaurant = restaurantsWithDistance[0];

            if (selectedRestaurant) {
                setRestaurant(selectedRestaurant);
            }
        }

        setIsGenerating(false);
        navigate('/summary');
    };

    const outingTypes = [
        { id: 'entertainment', label: 'Entertainment', icon: PartyPopper, color: '#EC4899' },
        { id: 'religious', label: 'Religious', icon: Church, color: '#F97316' },
        { id: 'fun_food', label: 'Fun + Food', icon: Pizza, color: '#F59E0B' },
        { id: 'educational', label: 'Educational', icon: BookOpen, color: '#3B82F6' },
        { id: 'study_relax', label: 'Study & Relax', icon: Coffee, color: '#10B981' },
        { id: 'mixed', label: 'Mixed', icon: Shuffle, color: '#8B5CF6' }
    ];

    const foodPreferences = [
        { id: 'any', label: 'Any', icon: Utensils },
        { id: 'veg', label: 'Veg Only', icon: Leaf }
    ];

    const travelPreferences = [
        { id: 'cheapest', label: 'Cheapest', icon: Wallet },
        { id: 'fastest', label: 'Fastest', icon: Zap }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="step-content">
                        <div className="step-icon budget">
                            <Wallet size={32} />
                        </div>
                        <h2>What's Your Total Budget?</h2>
                        <p>Enter the total amount for everyone</p>

                        <div className="budget-input-container">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                className="budget-input"
                                value={formData.budget === 0 ? '' : formData.budget}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    handleChange('budget', val === '' ? 0 : parseInt(val, 10) || 0);
                                }}
                                min="200"
                                step="100"
                            />
                        </div>

                        {errors.budget && <p className="error-text">{errors.budget}</p>}

                        <div className="quick-select">
                            {[500, 1000, 2000, 5000, 10000].map(amount => (
                                <button
                                    key={amount}
                                    className={`quick-btn ${formData.budget === amount ? 'active' : ''}`}
                                    onClick={() => handleChange('budget', amount)}
                                >
                                    ₹{amount.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        <div className="budget-note">
                            <Sparkles size={16} />
                            <span>We'll maximize every rupee!</span>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="step-content">
                        <div className="step-icon group">
                            <Users size={32} />
                        </div>
                        <h2>How Many People?</h2>
                        <p>Include everyone in your group</p>

                        <div className="people-selector">
                            <button
                                className="people-btn"
                                onClick={() => handleChange('numberOfPeople', Math.max(1, formData.numberOfPeople - 1))}
                                disabled={formData.numberOfPeople <= 1}
                            >
                                -
                            </button>
                            <div className="people-count">
                                <span className="count">{formData.numberOfPeople}</span>
                                <span className="label">people</span>
                            </div>
                            <button
                                className="people-btn"
                                onClick={() => handleChange('numberOfPeople', Math.min(20, formData.numberOfPeople + 1))}
                                disabled={formData.numberOfPeople >= 20}
                            >
                                +
                            </button>
                        </div>

                        {errors.numberOfPeople && <p className="error-text">{errors.numberOfPeople}</p>}

                        <div className="budget-per-person">
                            <span className="label">Budget per person:</span>
                            <span className="amount">₹{Math.floor(formData.budget / formData.numberOfPeople)}</span>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <div className="step-icon location">
                            <MapPin size={32} />
                        </div>
                        <h2>Select Your City</h2>
                        <p>Choose where you're starting from</p>

                        <div className="city-grid">
                            {cities.map(city => (
                                <button
                                    key={city.id}
                                    className={`city-card ${formData.city === city.id ? 'active' : ''}`}
                                    onClick={() => handleChange('city', city.id)}
                                >
                                    <span className="city-name">{city.name}</span>
                                    <span className="city-state">{city.state}</span>
                                </button>
                            ))}
                        </div>

                        {errors.city && <p className="error-text">{errors.city}</p>}
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <div className="step-icon time">
                            <Clock size={32} />
                        </div>
                        <h2>When's Your Outing?</h2>
                        <p>Select your preferred time slot</p>

                        <div className="time-presets">
                            <button
                                className={`preset-btn ${formData.timeStart === '10:00' && formData.timeEnd === '14:00' ? 'active' : ''}`}
                                onClick={() => { handleChange('timeStart', '10:00'); handleChange('timeEnd', '14:00'); }}
                            >
                                <span>Morning</span>
                                <small>10:00 - 14:00</small>
                            </button>
                            <button
                                className={`preset-btn ${formData.timeStart === '16:00' && formData.timeEnd === '22:00' ? 'active' : ''}`}
                                onClick={() => { handleChange('timeStart', '16:00'); handleChange('timeEnd', '22:00'); }}
                            >
                                <span>Evening</span>
                                <small>16:00 - 22:00</small>
                            </button>
                            <button
                                className={`preset-btn ${formData.timeStart === '10:00' && formData.timeEnd === '22:00' ? 'active' : ''}`}
                                onClick={() => { handleChange('timeStart', '10:00'); handleChange('timeEnd', '22:00'); }}
                            >
                                <span>Full Day</span>
                                <small>10:00 - 22:00</small>
                            </button>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <div className="step-icon preferences">
                            <Sparkles size={32} />
                        </div>
                        <h2>Your Preferences</h2>
                        <p>Help us personalize your experience</p>

                        <div className="preference-section">
                            <h3>
                                What type of outing?
                                <span style={{ display: 'block', fontSize: '0.8rem', color: '#EF4444', marginTop: '4px', fontWeight: 'normal' }}>
                                    * Currently only Mixed version is available, we are working on others
                                </span>
                            </h3>
                            <div className="outing-types">
                                {outingTypes.map(type => (
                                    <button
                                        key={type.id}
                                        className={`outing-type-btn ${formData.outingType === type.id ? 'active' : ''}`}
                                        onClick={() => {
                                            if (type.id !== 'mixed') {
                                                alert("We are working on it");
                                                return;
                                            }
                                            handleChange('outingType', type.id);
                                        }}
                                        style={{ '--type-color': type.id === 'mixed' ? type.color : '#94A3B8' }}
                                    >
                                        <type.icon size={24} />
                                        <span>{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="preference-section">
                            <h3>Food preference</h3>
                            <div className="preference-options">
                                {foodPreferences.map(pref => (
                                    <button
                                        key={pref.id}
                                        className={`pref-btn ${formData.foodPreference === pref.id ? 'active' : ''}`}
                                        onClick={() => handleChange('foodPreference', pref.id)}
                                    >
                                        <pref.icon size={18} />
                                        <span>{pref.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="preference-section">
                            <h3>Travel priority</h3>
                            <div className="preference-options">
                                {travelPreferences.map(pref => (
                                    <button
                                        key={pref.id}
                                        className={`pref-btn ${formData.travelPreference === pref.id ? 'active' : ''}`}
                                        onClick={() => handleChange('travelPreference', pref.id)}
                                    >
                                        <pref.icon size={18} />
                                        <span>{pref.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                );

            default:
                return null;
        }
    };

    // Generating screen
    if (isGenerating) {
        return (
            <div className="input-page">
                <div className="generating-screen">
                    <motion.div
                        className="generating-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="generating-icon">
                            <Loader2 size={48} className="spin" />
                        </div>
                        <h2>Creating Your Perfect Plan</h2>
                        <p>AI is finding the best options for you...</p>
                        <div className="generating-steps">
                            <span>{OPENROUTER_API_KEY ? '✓ Using Gemini AI via OpenRouter' : '✓ Analyzing budget'}</span>
                            <span>✓ Finding best places</span>
                            <span>✓ Selecting transport</span>
                            <span>✓ Choosing restaurants</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="input-page">
            <div className="container">
                <ProgressStepper
                    steps={steps}
                    currentStep={currentStep}
                    onStepClick={setCurrentStep}
                />

                <div className="form-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderStepContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="form-navigation">
                    <button
                        className="nav-btn back"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>

                    <button className="nav-btn next" onClick={handleNext}>
                        <span>{currentStep === steps.length - 1 ? 'Generate Plan' : 'Continue'}</span>
                        {currentStep === steps.length - 1 ? (
                            <Sparkles size={20} />
                        ) : (
                            <ChevronRight size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputPage;
