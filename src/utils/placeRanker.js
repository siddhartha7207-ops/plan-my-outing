// Place Ranking Algorithm
// Smart ranking based on multiple factors

// Weight configuration for ranking
const rankingWeights = {
    rating: 0.30,
    popularity: 0.25,
    value: 0.20,
    categoryMatch: 0.15,
    timeMatch: 0.10
};

// Category preferences based on outing type
const categoryPreferences = {
    entertainment: ['entertainment', 'mall', 'multiplex', 'park'],
    religious: ['religious'],
    fun_food: ['mall', 'park', 'lake', 'entertainment'],
    mixed: ['mall', 'park', 'historical', 'entertainment', 'religious']
};

// Calculate overall score for a place
export function calculatePlaceScore(place, preferences) {
    const {
        budget,
        numberOfPeople,
        outingType,
        timeWindow
    } = preferences;

    // Rating score (0-1)
    const ratingScore = place.rating / 5;

    // Popularity score (0-1)
    const popularityScore = Math.min(place.popularity / 100, 1);

    // Value score - how affordable relative to budget
    const totalCost = (place.entryCost + place.averageSpend) * numberOfPeople;
    const budgetRatio = totalCost / budget;
    const valueScore = Math.max(0, 1 - budgetRatio);

    // Category match score
    const preferredCategories = categoryPreferences[outingType] || categoryPreferences.mixed;
    const categoryScore = preferredCategories.includes(place.category) ? 1 : 0.3;

    // Time match score - does the place fit in available time
    let timeScore = 1;
    if (timeWindow && timeWindow.duration) {
        const timeRatio = place.timeRequired / timeWindow.duration;
        timeScore = timeRatio <= 0.5 ? 1 : timeRatio <= 0.8 ? 0.7 : 0.4;
    }

    // Calculate weighted score
    const totalScore =
        (ratingScore * rankingWeights.rating) +
        (popularityScore * rankingWeights.popularity) +
        (valueScore * rankingWeights.value) +
        (categoryScore * rankingWeights.categoryMatch) +
        (timeScore * rankingWeights.timeMatch);

    return {
        ...place,
        scores: {
            rating: ratingScore,
            popularity: popularityScore,
            value: valueScore,
            category: categoryScore,
            time: timeScore,
            total: totalScore
        },
        score: totalScore
    };
}

// Rank places based on preferences
export function rankPlaces(places, preferences) {
    if (!places || places.length === 0) return [];

    // Calculate scores for all places
    const scoredPlaces = places.map(place =>
        calculatePlaceScore(place, preferences)
    );

    // Sort by total score (descending)
    scoredPlaces.sort((a, b) => b.score - a.score);

    // Add rank
    scoredPlaces.forEach((place, index) => {
        place.rank = index + 1;
    });

    return scoredPlaces;
}

// Filter places by budget
export function filterByBudget(places, budget, numberOfPeople) {
    const maxCostPerPerson = budget / numberOfPeople;

    return places.filter(place => {
        const costPerPerson = place.entryCost + place.averageSpend;
        return costPerPerson <= maxCostPerPerson * 0.6; // Leave room for other expenses
    });
}

// Filter places by category
export function filterByCategory(places, category) {
    if (!category || category === 'all') return places;
    return places.filter(place => place.category === category);
}

// Filter places by time required
export function filterByTime(places, maxMinutes) {
    if (!maxMinutes) return places;
    return places.filter(place => place.timeRequired <= maxMinutes);
}

// Get place recommendations based on current selection
export function getRecommendations(selectedPlace, allPlaces, preferences) {
    if (!selectedPlace) return [];

    // Filter out selected place
    const otherPlaces = allPlaces.filter(p => p.id !== selectedPlace.id);

    // Find places in same category or nearby
    const sameCategory = otherPlaces.filter(p => p.category === selectedPlace.category);
    const differentCategory = otherPlaces.filter(p => p.category !== selectedPlace.category);

    // Rank remaining places
    const rankedSame = rankPlaces(sameCategory, preferences).slice(0, 2);
    const rankedDifferent = rankPlaces(differentCategory, preferences).slice(0, 2);

    return {
        similar: rankedSame,
        different: rankedDifferent
    };
}

// Generate place summary
export function generatePlaceSummary(place, numberOfPeople) {
    const totalEntryCost = place.entryCost * numberOfPeople;
    const totalEstimatedSpend = (place.entryCost + place.averageSpend) * numberOfPeople;

    return {
        name: place.name,
        category: place.category,
        entryCostTotal: totalEntryCost,
        estimatedSpendTotal: totalEstimatedSpend,
        perPersonCost: place.entryCost + place.averageSpend,
        timeRequired: place.timeRequired,
        rating: place.rating,
        highlights: place.highlights
    };
}

// Get category icon
export function getCategoryIcon(category) {
    const icons = {
        mall: 'ShoppingBag',
        multiplex: 'Film',
        historical: 'Landmark',
        park: 'TreePine',
        museum: 'Building2',
        religious: 'Church',
        entertainment: 'Gamepad2',
        lake: 'Waves'
    };
    return icons[category] || 'MapPin';
}

// Get category color
export function getCategoryColor(category) {
    const colors = {
        mall: '#8B5CF6',
        multiplex: '#EC4899',
        historical: '#F59E0B',
        park: '#10B981',
        museum: '#6366F1',
        religious: '#F97316',
        entertainment: '#EF4444',
        lake: '#06B6D4'
    };
    return colors[category] || '#6B7280';
}

export default {
    calculatePlaceScore,
    rankPlaces,
    filterByBudget,
    filterByCategory,
    filterByTime,
    getRecommendations,
    generatePlaceSummary,
    getCategoryIcon,
    getCategoryColor
};
