// Budget Optimizer - AI decision logic for budget allocation and planning

// Budget allocation percentages based on outing type
const budgetTemplates = {
    entertainment: {
        transport: 0.20,
        food: 0.25,
        tickets: 0.45,
        buffer: 0.10,
        description: 'Prioritizes entertainment activities and tickets'
    },
    religious: {
        transport: 0.30,
        food: 0.35,
        tickets: 0.15,
        buffer: 0.20,
        description: 'Focus on travel and food, minimal ticket expenses'
    },
    fun_food: {
        transport: 0.20,
        food: 0.50,
        tickets: 0.20,
        buffer: 0.10,
        description: 'Food-centric outing with fun activities'
    },
    mixed: {
        transport: 0.25,
        food: 0.30,
        tickets: 0.35,
        buffer: 0.10,
        description: 'Balanced allocation for variety'
    }
};

// Analyze budget feasibility
export function analyzeBudgetFeasibility(budget, numberOfPeople, outingType, city) {
    const budgetPerPerson = budget / numberOfPeople;
    const template = budgetTemplates[outingType] || budgetTemplates.mixed;

    // Minimum budget thresholds based on city
    const cityMultipliers = {
        mumbai: 1.3,
        delhi: 1.2,
        bangalore: 1.1,
        hyderabad: 1.0,
        pune: 1.0,
        chennai: 1.0
    };

    const multiplier = cityMultipliers[city] || 1.0;
    const minimumBudgetPerPerson = 300 * multiplier; // Base minimum

    const feasibility = {
        isViable: budgetPerPerson >= minimumBudgetPerPerson,
        budgetPerPerson,
        recommendation: '',
        allocation: {},
        warnings: [],
        suggestions: []
    };

    // Calculate allocation
    feasibility.allocation = {
        transport: Math.floor(budget * template.transport),
        food: Math.floor(budget * template.food),
        tickets: Math.floor(budget * template.tickets),
        buffer: Math.floor(budget * template.buffer)
    };

    // Generate recommendations
    if (budgetPerPerson < minimumBudgetPerPerson) {
        feasibility.recommendation = 'Budget is too low for a comfortable outing.';
        feasibility.suggestions.push('Consider increasing budget or reducing group size');
        feasibility.suggestions.push('Look for free attractions like parks and temples');
    } else if (budgetPerPerson < 500 * multiplier) {
        feasibility.recommendation = 'Budget is tight but manageable.';
        feasibility.warnings.push('Limited entertainment options');
        feasibility.suggestions.push('Use public transport');
        feasibility.suggestions.push('Consider street food options');
    } else if (budgetPerPerson < 1000 * multiplier) {
        feasibility.recommendation = 'Good budget for a comfortable outing.';
        feasibility.suggestions.push('Mix of public and private transport');
        feasibility.suggestions.push('Good restaurant options available');
    } else {
        feasibility.recommendation = 'Excellent budget for a premium experience!';
        feasibility.suggestions.push('Consider premium experiences');
        feasibility.suggestions.push('IMAX/4DX movie experience possible');
    }

    return feasibility;
}

// Calculate allocation based on actual selections
export function calculateActualSpending(selections, numberOfPeople) {
    const spending = {
        transport: 0,
        food: 0,
        tickets: 0,
        misc: 0
    };

    if (selections.transport) {
        spending.transport = selections.transport.totalFare;
    }

    if (selections.restaurants && selections.restaurants.length > 0) {
        spending.food = selections.restaurants.reduce((sum, r) =>
            sum + (r.avgCost * numberOfPeople), 0);
    }

    if (selections.place) {
        spending.tickets += selections.place.entryCost * numberOfPeople;
    }

    if (selections.movie && selections.ticketPrice) {
        spending.tickets += selections.ticketPrice * numberOfPeople;
    }

    return spending;
}

// Get budget status
export function getBudgetStatus(budget, spending) {
    const totalSpent = Object.values(spending).reduce((sum, val) => sum + val, 0);
    const remaining = budget - totalSpent;
    const percentage = (totalSpent / budget) * 100;

    let status = 'healthy';
    let message = '';

    if (percentage > 100) {
        status = 'exceeded';
        message = `Over budget by ₹${Math.abs(remaining)}`;
    } else if (percentage > 90) {
        status = 'critical';
        message = `Only ₹${remaining} remaining`;
    } else if (percentage > 75) {
        status = 'warning';
        message = `₹${remaining} remaining, plan carefully`;
    } else {
        status = 'healthy';
        message = `₹${remaining} remaining`;
    }

    return {
        totalSpent,
        remaining,
        percentage: Math.min(percentage, 100),
        status,
        message
    };
}

// Suggest alternatives when over budget
export function suggestAlternatives(currentPlan, budget, numberOfPeople) {
    const suggestions = [];
    const spending = calculateActualSpending(currentPlan, numberOfPeople);
    const totalSpent = Object.values(spending).reduce((sum, val) => sum + val, 0);

    if (totalSpent <= budget) {
        return { isOverBudget: false, suggestions: [] };
    }

    const overBy = totalSpent - budget;

    // Suggest transport alternatives
    if (currentPlan.transport && currentPlan.transport.type === 'private') {
        suggestions.push({
            type: 'transport',
            message: 'Switch to public transport',
            potentialSaving: Math.floor(spending.transport * 0.6),
            priority: 'high'
        });
    }

    // Suggest food alternatives
    if (currentPlan.restaurants && currentPlan.restaurants.length > 0) {
        const avgCost = spending.food / numberOfPeople;
        if (avgCost > 300) {
            suggestions.push({
                type: 'food',
                message: 'Consider budget-friendly restaurants or street food',
                potentialSaving: Math.floor(spending.food * 0.4),
                priority: 'medium'
            });
        }
    }

    // Suggest skipping paid attractions
    if (currentPlan.place && currentPlan.place.entryCost > 0) {
        suggestions.push({
            type: 'place',
            message: 'Choose a free attraction instead',
            potentialSaving: currentPlan.place.entryCost * numberOfPeople,
            priority: 'medium'
        });
    }

    // Suggest cheaper movie options
    if (currentPlan.movie && currentPlan.ticketPrice > 300) {
        suggestions.push({
            type: 'movie',
            message: 'Choose regular seating instead of premium',
            potentialSaving: Math.floor((currentPlan.ticketPrice - 200) * numberOfPeople),
            priority: 'low'
        });
    }

    // Sort by potential saving
    suggestions.sort((a, b) => b.potentialSaving - a.potentialSaving);

    return {
        isOverBudget: true,
        overBy,
        suggestions
    };
}

// Generate optimized plan based on budget
export function generateOptimizedPlan(budget, numberOfPeople, preferences, availableOptions) {
    const budgetPerPerson = budget / numberOfPeople;
    const template = budgetTemplates[preferences.outingType] || budgetTemplates.mixed;

    const plan = {
        suggestedPlaces: [],
        suggestedTransport: null,
        suggestedRestaurants: [],
        suggestedMovies: [],
        estimatedTotal: 0,
        confidence: 0
    };

    // Score and rank places
    if (availableOptions.places) {
        plan.suggestedPlaces = availableOptions.places
            .filter(p => p.entryCost + p.averageSpend <= budgetPerPerson * 0.5)
            .slice(0, 5);
    }

    // Find best transport
    if (availableOptions.transport) {
        const affordableTransport = availableOptions.transport
            .filter(t => t.farePerPerson <= budget * template.transport / numberOfPeople);

        if (preferences.travelPreference === 'fastest') {
            plan.suggestedTransport = affordableTransport.sort((a, b) =>
                a.estimatedTime - b.estimatedTime)[0];
        } else {
            plan.suggestedTransport = affordableTransport.sort((a, b) =>
                a.totalFare - b.totalFare)[0];
        }
    }

    // Find suitable restaurants
    if (availableOptions.restaurants) {
        const foodBudgetPerPerson = (budget * template.food) / numberOfPeople;
        plan.suggestedRestaurants = availableOptions.restaurants
            .filter(r => r.avgCost <= foodBudgetPerPerson)
            .filter(r => preferences.foodPreference === 'any' ||
                (preferences.foodPreference === 'veg' ? r.isVeg : true))
            .slice(0, 3);
    }

    // Find movies within budget
    if (availableOptions.movies && availableOptions.theatres) {
        const ticketBudget = (budget * template.tickets) / numberOfPeople;
        plan.suggestedMovies = availableOptions.movies
            .filter(m => {
                const cheapestTheatre = availableOptions.theatres
                    .find(t => t.seatCategories.some(c => c.price <= ticketBudget));
                return !!cheapestTheatre;
            })
            .slice(0, 3);
    }

    return plan;
}

// Format currency
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format time duration
export function formatDuration(minutes) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export default {
    analyzeBudgetFeasibility,
    calculateActualSpending,
    getBudgetStatus,
    suggestAlternatives,
    generateOptimizedPlan,
    formatCurrency,
    formatDuration,
    budgetTemplates
};

// Calculate Distance between two coordinates (Haversine Formula)
export function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;

    // Simulate real distance variation for realism 
    const R = 6371; // Radius of earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Calculate Dynamic Fare
export function calculateDynamicFare(distanceKm, numberOfPeople, transportType = 'Bus') {
    const minDistance = 2;
    const dist = Math.max(distanceKm, minDistance);

    let baseFare = 30;
    let ratePerKm = 5;

    if (transportType.toLowerCase().includes('auto')) {
        baseFare = 50;
        ratePerKm = 15;
    } else if (transportType.toLowerCase().includes('cab')) {
        baseFare = 100;
        ratePerKm = 20;
    }

    const totalFare = Math.ceil((baseFare + (dist * ratePerKm)) * numberOfPeople);
    return {
        totalFare,
        perPerson: Math.ceil(totalFare / numberOfPeople),
        distance: dist
    };
}
