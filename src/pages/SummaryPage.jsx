import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Bus,
    Utensils,
    Film,
    Clock,
    IndianRupee,
    Users,
    ArrowRight,
    Share2,
    Download,
    RefreshCw,
    Check,
    Sparkles,
    Calendar,
    ShoppingBag
} from 'lucide-react';
import { usePlan } from '../context/PlanContext';
import { formatCurrency, formatDuration, calculateDistance, calculateDynamicFare } from '../utils/budgetOptimizer';
import BudgetTracker from '../components/BudgetTracker';
import './SummaryPage.css';

function SummaryPage() {
    const navigate = useNavigate();
    const {
        budget,
        numberOfPeople,
        city,
        timeWindow,
        selectedPlace,
        selectedTransport,
        selectedRestaurants,
        selectedMovie,
        selectedTheatre,
        selectedShowtime,
        budgetUsed,
        resetPlan,
        additionalPlaces,
        aiTimeline
    } = usePlan();

    // Helper Functions (Hoisted)
    const addMinutes = (time, minutes) => {
        const [hours, mins] = time.split(':').map(Number);
        const totalMins = hours * 60 + mins + minutes;
        const newHours = Math.floor(totalMins / 60) % 24;
        const newMins = totalMins % 60;
        return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
    };

    const formatTimeDisplay = (time) => {
        const [hours, mins] = time.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${String(mins).padStart(2, '0')} ${ampm}`;
    };

    const getIconForType = (type) => {
        switch (type) {
            case 'place': return MapPin;
            case 'food': return Utensils;
            case 'transport': return Bus;
            case 'movie': return Film;
            case 'end': return Check;
            default: return MapPin;
        }
    };

    // Redirect if no plan
    useEffect(() => {
        if (!selectedPlace) {
            navigate('/plan');
        }
    }, [selectedPlace, navigate]);

    // Calculate totals dynamically from timeline
    const calculateTotalCosts = (timeline) => {
        if (!timeline) return { entry: 0, transport: 0, food: 0, movie: 0, total: 0 };

        return timeline.reduce((acc, item) => {
            const cost = item.cost || 0;
            if (item.type === 'place') acc.entry += cost;
            else if (item.type === 'transport') acc.transport += cost;
            else if (item.type === 'food') acc.food += cost;
            else if (item.type === 'movie') acc.movie += cost;
            acc.total += cost;
            return acc;
        }, { entry: 0, transport: 0, food: 0, movie: 0, total: 0 });
    };

    // Generate timeline
    const generateTimeline = () => {
        const timeline = [];
        let currentTime = timeWindow?.start || '10:00';
        const endTime = timeWindow?.end || '18:00';

        // Coordinates Defaults (City Centers)
        const cityCenters = {
            mumbai: { lat: 19.0760, lng: 72.8777 },
            delhi: { lat: 28.6139, lng: 77.2090 },
            bangalore: { lat: 12.9716, lng: 77.5946 },
            hyderabad: { lat: 17.3850, lng: 78.4867 },
            pune: { lat: 18.5204, lng: 73.8567 },
            chennai: { lat: 13.0827, lng: 80.2707 }
        };
        const currentCityCoords = cityCenters[city?.toLowerCase()] || cityCenters.mumbai;
        let prevCoords = currentCityCoords;

        // Constants
        const busTimeBetweenPlaces = 30;
        const minPlaceTime = 90;

        // Helper functions
        const getCurrentHour = (time) => parseInt(time.split(':')[0]);
        const getMinutes = (time) => parseInt(time.split(':')[1]);
        const getCurrentMins = (time) => {
            const [h, m] = time.split(':').map(Number);
            return h * 60 + m;
        };
        const [endHr, endMin] = endTime.split(':').map(Number);
        const endTotalMins = endHr * 60 + endMin;

        // Start journey - Dynamic Fare & Distance
        const distToFirst = calculateDistance(
            prevCoords.lat, prevCoords.lng,
            selectedPlace?.coordinates?.lat, selectedPlace?.coordinates?.lng
        );
        const fareFirst = calculateDynamicFare(distToFirst, numberOfPeople, selectedTransport?.name);

        // Travel time dynamic (20km/h avg speed)
        const travelMinutesFirst = Math.max(30, Math.ceil((distToFirst / 20) * 60));

        timeline.push({
            time: currentTime,
            title: 'Start Journey',
            description: `Depart via ${selectedTransport?.name || 'Bus'}\nEst. Distance: ${distToFirst} km`,
            icon: Bus,
            type: 'transport',
            cost: fareFirst.totalFare,
            data: { ...selectedTransport, totalFare: fareFirst.totalFare, distanceKm: distToFirst, estimatedTime: travelMinutesFirst }
        });
        currentTime = addMinutes(currentTime, travelMinutesFirst);
        prevCoords = selectedPlace?.coordinates || prevCoords;

        // Helper to add lunch
        let hasHadLunch = false;
        const tryAddLunch = (current) => {
            if (hasHadLunch) return { added: false, time: current };

            const h = getCurrentHour(current);
            const mins = getMinutes(current);
            const timeInMins = h * 60 + mins;
            const startLunchMins = 11 * 60 + 30; // 11:30
            const endLunchMins = 14 * 60 + 30;   // 14:30

            if (timeInMins >= startLunchMins && timeInMins < endLunchMins) {
                const restaurant = selectedRestaurants.length > 0 ? selectedRestaurants[0] : {
                    name: 'Local Restaurant',
                    specialty: 'South Indian Thali',
                    avgCost: 200
                };

                timeline.push({
                    time: current,
                    title: `Lunch at ${restaurant.name}`,
                    description: `Try: ${restaurant.mustTry || restaurant.specialty}`,
                    icon: Utensils,
                    type: 'food',
                    cost: (restaurant.avgCost || 200) * numberOfPeople,
                    data: restaurant
                });
                hasHadLunch = true;
                return { added: true, time: addMinutes(current, 60) };
            }
            return { added: false, time: current };
        };

        // Helper to add shopping if huge gap
        let hasShopped = false;
        const tryAddShopping = (current, placesLeft) => {
            if (hasShopped) return { added: false, time: current };

            const timeNeededVal = placesLeft * (busTimeBetweenPlaces + 90) + 60; // 60 for return
            const timeLeftVal = endTotalMins - getCurrentMins(current);

            if (timeLeftVal - timeNeededVal > 90) {
                const shoppingCost = 500 * numberOfPeople;
                timeline.push({
                    time: current,
                    title: 'Local Market & Shopping',
                    description: 'Souvenirs, handicrafts & window shopping',
                    icon: ShoppingBag,
                    type: 'place',
                    cost: shoppingCost,
                    data: { entryCost: 500 }
                });
                hasShopped = true;
                return { added: true, time: addMinutes(current, 60) };
            }
            return { added: false, time: current };
        };

        // Main place
        const placeTime = Math.max(selectedPlace?.timeRequired || 90, minPlaceTime);
        timeline.push({
            time: currentTime,
            title: `Visit ${selectedPlace?.name}`,
            description: `${selectedPlace?.address}`,
            icon: MapPin,
            type: 'place',
            cost: (selectedPlace?.entryCost || 0) * numberOfPeople,
            data: selectedPlace
        });
        currentTime = addMinutes(currentTime, placeTime);

        // Try Lunch after main place
        const afterMain = tryAddLunch(currentTime);
        currentTime = afterMain.time;

        // Additional places
        const extraPlaces = additionalPlaces || [];
        for (let i = 0; i < extraPlaces.length; i++) {
            const place = extraPlaces[i];

            // Calc distance from prev place
            const distNext = calculateDistance(
                prevCoords.lat, prevCoords.lng,
                place.coordinates?.lat, place.coordinates?.lng
            );
            const fareNext = calculateDynamicFare(distNext, numberOfPeople, selectedTransport?.name);
            const travelTimeNext = Math.max(30, Math.ceil((distNext / 20) * 60));

            timeline.push({
                time: currentTime,
                title: 'Travel to next stop',
                description: `Head to ${place.name}\nEst. Distance: ${distNext} km`,
                icon: Bus,
                type: 'transport',
                cost: fareNext.totalFare,
                data: { estimatedTime: travelTimeNext, totalFare: fareNext.totalFare, distanceKm: distNext }
            });
            currentTime = addMinutes(currentTime, travelTimeNext);
            prevCoords = place.coordinates || prevCoords;

            // Try Lunch after travel (before visiting next place)
            const afterTravel = tryAddLunch(currentTime);
            currentTime = afterTravel.time;

            // Try Shopping BEFORE visit
            const remainingPlaces = extraPlaces.length - i;
            const afterShop1 = tryAddShopping(currentTime, remainingPlaces);
            currentTime = afterShop1.time;

            const visitTime = Math.max(place.timeRequired || 90, minPlaceTime);
            timeline.push({
                time: currentTime,
                title: `Visit ${place.name}`,
                description: `${place.address}`,
                icon: MapPin,
                type: 'place',
                cost: (place.entryCost || 0) * numberOfPeople,
                data: place
            });
            currentTime = addMinutes(currentTime, visitTime);

            // Try Lunch after visiting
            const afterVisit = tryAddLunch(currentTime);
            currentTime = afterVisit.time;

            // Try Shopping AFTER
            const afterShop2 = tryAddShopping(currentTime, extraPlaces.length - 1 - i);
            currentTime = afterShop2.time;
        }

        // Evenings & Snacks
        let remainingMins = endTotalMins - getCurrentMins(currentTime) - 30; // Reserve 30 for return

        // Snacks
        if (getCurrentHour(currentTime) >= 16 && getCurrentHour(currentTime) < 18 && remainingMins > 90) {
            const snackCost = 50 * numberOfPeople;
            timeline.push({
                time: currentTime,
                title: 'Evening Snacks',
                description: 'Tea, coffee & street food',
                icon: Utensils,
                type: 'food',
                cost: snackCost,
                data: { avgCost: 50 }
            });
            currentTime = addMinutes(currentTime, 45);
            remainingMins -= 45;
        }

        // Dinner
        if (getCurrentHour(currentTime) >= 18 && remainingMins > 90 && selectedRestaurants.length > 0) {
            const restaurant = selectedRestaurants[0];
            timeline.push({
                time: currentTime,
                title: `Dinner at ${restaurant.name}`,
                description: `Evening meal`,
                icon: Utensils,
                type: 'food',
                cost: (restaurant.avgCost || 200) * numberOfPeople,
                data: restaurant
            });
            currentTime = addMinutes(currentTime, 60);
            remainingMins -= 60;
        }

        // Leisure
        if (remainingMins > 90) {
            timeline.push({
                time: currentTime,
                title: 'Evening Leisure',
                description: 'Local market, photography',
                icon: MapPin,
                type: 'place',
                cost: 0
            });
            currentTime = addMinutes(currentTime, remainingMins - 45);
        }

        // Movie
        if (selectedMovie && selectedShowtime) {
            timeline.push({
                time: selectedShowtime,
                title: `Watch ${selectedMovie.title}`,
                description: `${selectedTheatre?.name}`,
                icon: Film,
                type: 'movie',
                cost: (budgetUsed.tickets || 0),
                data: selectedMovie
            });
            currentTime = addMinutes(selectedShowtime, selectedMovie.duration);
        }

        // Return Home & Budget Savings Logic

        // 1. Calculate costs so far
        const currentSpent = timeline.reduce((sum, item) => sum + (item.cost || 0), 0);

        // 2. Calculate Return Fare
        const distReturn = calculateDistance(
            prevCoords.lat, prevCoords.lng,
            currentCityCoords.lat, currentCityCoords.lng
        );
        const fareReturn = calculateDynamicFare(distReturn, numberOfPeople, selectedTransport?.name);

        // 3. Determine Surplus
        const projectedTotal = currentSpent + fareReturn.totalFare;
        const surplus = budget - projectedTotal;

        // 4. "Save ~300" Logic
        const targetSavings = 300;
        // The money we CAN spend is surplus - savings.
        const spendableAmount = surplus - targetSavings;

        if (spendableAmount > 50) {
            timeline.push({
                time: currentTime,
                title: 'Shopping Spree / Souvenirs',
                description: `Using excess budget (keeping ~₹${targetSavings} saved)!`,
                icon: ShoppingBag,
                type: 'place',
                cost: spendableAmount,
                data: { entryCost: spendableAmount }
            });
            currentTime = addMinutes(currentTime, 45);
        }

        // 5. Final Return Home
        timeline.push({
            time: currentTime,
            title: 'Return Home',
            description: `Trip complete!\nReturn Distance: ${distReturn} km`,
            icon: Check,
            type: 'end',
            cost: fareReturn.totalFare
        });

        return timeline;
    };

    // Use AI timeline or generate local
    const displayTimeline = aiTimeline ? aiTimeline.map(item => ({
        ...item,
        icon: getIconForType(item.type)
    })) : generateTimeline();

    // Calculate final costs based on Display Timeline
    const { entry: entryCost, transport: transportCost, food: foodCost, movie: movieCost, total: totalCost } = calculateTotalCosts(displayTimeline);

    const perPersonCost = Math.ceil(totalCost / numberOfPeople);
    const remaining = budget - totalCost;

    const handleShare = () => {
        const shareText = `🎯 My Outing Plan\n\n📍 ${selectedPlace?.name}\n🚌 ${selectedTransport?.name}\n💰 Total: ₹${totalCost} for ${numberOfPeople} people\n\nPlanned with PlanMyOuting!`;

        if (navigator.share) {
            navigator.share({
                title: 'My Outing Plan',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Plan copied to clipboard!');
        }
    };

    const handleNewPlan = () => {
        resetPlan();
        navigate('/');
    };

    if (!selectedPlace) return null;

    return (
        <div className="summary-page">
            <div className="summary-container">
                {/* Hero */}
                <motion.div
                    className="summary-hero"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Your Perfect Plan</span>
                    </div>
                    <h1>Outing Summary</h1>
                    <p>
                        <MapPin size={16} />
                        {city?.charAt(0).toUpperCase() + city?.slice(1)}
                        <span className="dot">•</span>
                        <Users size={16} />
                        {numberOfPeople} people
                        <span className="dot">•</span>
                        <Calendar size={16} />
                        {timeWindow?.start} - {timeWindow?.end}
                    </p>
                </motion.div>

                <div className="summary-grid">
                    {/* Left Column - Details */}
                    <div className="summary-details">
                        {displayTimeline.map((item, index) => {
                            const isPlace = item.type === 'place';
                            const isFood = item.type === 'food';
                            const isTransport = item.type === 'transport';
                            const isMovie = item.type === 'movie';
                            const isEnd = item.type === 'end';

                            const data = item.data || {};
                            const Icon = item.icon || getIconForType(item.type);

                            return (
                                <motion.div
                                    key={`${item.type}-${index}`}
                                    className={`detail-card ${item.type}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <div className="card-icon">
                                        <Icon size={24} />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-label">
                                            {isPlace ? 'Destination' :
                                                isFood ? 'Food & Drink' :
                                                    isTransport ? 'Travel' :
                                                        isMovie ? 'Entertainment' : 'Status'}
                                            {data.distanceToPlace ? ` (${data.distanceToPlace.toFixed(1)} km)` : ''}
                                        </span>
                                        <h3>{item.title}</h3>
                                        <p style={{ whiteSpace: 'pre-line' }}>{item.description}</p>

                                        {!isEnd && (
                                            <div className="card-meta">
                                                {/* Meta Info */}
                                                {data.rating && <span>⭐ {data.rating}</span>}
                                                {data.timeRequired && <span>🕐 {data.timeRequired} min</span>}
                                                {data.estimatedTime && <span>🕐 {data.estimatedTime} min</span>}
                                                {data.distanceKm && <span>📍 {data.distanceKm} km</span>}

                                                {/* Cost Display */}
                                                <span className="cost">
                                                    {item.cost !== undefined ? `₹${item.cost}` : ''}
                                                </span>
                                            </div>
                                        )}
                                        {isEnd && item.cost > 0 && (
                                            <div className="card-meta">
                                                <span className="cost">Fare: ₹{item.cost}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Column - Budget & Timeline */}
                    <div className="summary-sidebar">

                        {/* Budget Summary */}
                        <motion.div
                            className="budget-summary"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3>Budget Summary</h3>

                            <div className="cost-breakdown">
                                <div className="cost-row">
                                    <span>Entry/Tickets</span>
                                    <span>₹{entryCost}</span>
                                </div>
                                <div className="cost-row">
                                    <span>Transport</span>
                                    <span>₹{transportCost}</span>
                                </div>
                                <div className="cost-row">
                                    <span>Food</span>
                                    <span>₹{foodCost}</span>
                                </div>
                                {movieCost > 0 && (
                                    <div className="cost-row">
                                        <span>Movie</span>
                                        <span>₹{movieCost}</span>
                                    </div>
                                )}
                                <div className="cost-divider" />
                                <div className="cost-row total">
                                    <span>Total</span>
                                    <span>₹{totalCost}</span>
                                </div>
                                <div className="cost-row per-person">
                                    <span>Per Person</span>
                                    <span>₹{perPersonCost}</span>
                                </div>
                            </div>

                            <div className={`remaining-budget ${remaining >= 0 ? 'positive' : 'negative'}`}>
                                <span>{remaining >= 0 ? 'Remaining' : 'Over Budget'}</span>
                                <span>₹{Math.abs(remaining)}</span>
                            </div>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div
                            className="timeline-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3>Your Itinerary</h3>

                            <div className="timeline">
                                {displayTimeline.map((item, index) => (
                                    <div key={index} className={`timeline-item ${item.type}`}>
                                        <div className="timeline-time">
                                            {formatTimeDisplay(item.time)}
                                        </div>
                                        <div className="timeline-marker">
                                            <div className="marker-dot">
                                                <item.icon size={14} />
                                            </div>
                                            {index < displayTimeline.length - 1 && <div className="marker-line" />}
                                        </div>
                                        <div className="timeline-content">
                                            <h4>{item.title}</h4>
                                            {item.description && <p style={{ whiteSpace: 'pre-line' }}>{item.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <div className="summary-actions">
                            <button className="action-btn share" onClick={handleShare}>
                                <Share2 size={18} />
                                <span>Share Plan</span>
                            </button>
                            <button className="action-btn new" onClick={handleNewPlan}>
                                <RefreshCw size={18} />
                                <span>New Plan</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SummaryPage;
