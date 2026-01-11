import { createContext, useContext, useState, useCallback } from 'react';

const PlanContext = createContext(null);

const initialState = {
    // User Inputs
    budget: 0,
    numberOfPeople: 1,
    startLocation: null,
    locationName: '',
    city: 'Bangalore',
    timeWindow: {
        start: '',
        end: '',
        duration: 0
    },
    outingType: 'mixed', // entertainment, religious, fun_food, mixed
    foodPreference: 'any', // veg, non_veg, any
    travelPreference: 'cheapest', // cheapest, fastest

    // Budget Allocation
    budgetAllocation: {
        transport: 0,
        food: 0,
        tickets: 0,
        buffer: 0
    },

    // Selected Items
    selectedPlace: null,
    selectedTransport: null,
    selectedRestaurants: [],
    selectedMovie: null,
    selectedTheatre: null,

    // Plan Details
    plan: {
        places: [],
        transport: [],
        restaurants: [],
        movies: [],
        religiousPlaces: [],
        timeline: []
    },

    // AI Generated Timeline
    aiTimeline: null,

    // Budget Tracking
    budgetUsed: {
        transport: 0,
        food: 0,
        tickets: 0,
        misc: 0
    },

    // Step tracking
    currentStep: 0
};

export function PlanProvider({ children }) {
    const [state, setState] = useState(initialState);

    // Update user inputs
    const updateInputs = useCallback((inputs) => {
        setState(prev => ({
            ...prev,
            ...inputs
        }));
    }, []);

    // Update AI Timeline
    const updateAiTimeline = useCallback((timeline) => {
        setState(prev => ({
            ...prev,
            aiTimeline: timeline
        }));
    }, []);

    // Calculate budget allocation based on inputs
    const calculateBudgetAllocation = useCallback(() => {
        const { budget, outingType } = state;

        let allocation = {
            transport: 0.25,
            food: 0.30,
            tickets: 0.35,
            buffer: 0.10
        };

        // Adjust based on outing type
        if (outingType === 'entertainment') {
            allocation = { transport: 0.20, food: 0.25, tickets: 0.45, buffer: 0.10 };
        } else if (outingType === 'religious') {
            allocation = { transport: 0.30, food: 0.35, tickets: 0.15, buffer: 0.20 };
        } else if (outingType === 'fun_food') {
            allocation = { transport: 0.20, food: 0.50, tickets: 0.20, buffer: 0.10 };
        }

        setState(prev => ({
            ...prev,
            budgetAllocation: {
                transport: Math.floor(budget * allocation.transport),
                food: Math.floor(budget * allocation.food),
                tickets: Math.floor(budget * allocation.tickets),
                buffer: Math.floor(budget * allocation.buffer)
            }
        }));
    }, [state.budget, state.outingType]);

    // Select a place
    const selectPlace = useCallback((place) => {
        setState(prev => ({
            ...prev,
            selectedPlace: place
        }));
    }, []);

    // Select transport
    const selectTransport = useCallback((transport) => {
        setState(prev => ({
            ...prev,
            selectedTransport: transport,
            budgetUsed: {
                ...prev.budgetUsed,
                transport: transport.totalCost
            }
        }));
    }, []);

    // Add restaurant (appends to list)
    const addRestaurant = useCallback((restaurant) => {
        setState(prev => {
            const newRestaurants = [...prev.selectedRestaurants, restaurant];
            const totalFoodCost = newRestaurants.reduce((sum, r) => sum + (r.avgCost * prev.numberOfPeople), 0);
            return {
                ...prev,
                selectedRestaurants: newRestaurants,
                budgetUsed: {
                    ...prev.budgetUsed,
                    food: totalFoodCost
                }
            };
        });
    }, []);

    // Set restaurant (replaces all - for auto-plan)
    const setRestaurant = useCallback((restaurant) => {
        setState(prev => {
            const totalFoodCost = restaurant.avgCost * prev.numberOfPeople;
            return {
                ...prev,
                selectedRestaurants: [restaurant],
                budgetUsed: {
                    ...prev.budgetUsed,
                    food: totalFoodCost
                }
            };
        });
    }, []);

    // Remove restaurant
    const removeRestaurant = useCallback((restaurantId) => {
        setState(prev => {
            const newRestaurants = prev.selectedRestaurants.filter(r => r.id !== restaurantId);
            const totalFoodCost = newRestaurants.reduce((sum, r) => sum + (r.avgCost * state.numberOfPeople), 0);
            return {
                ...prev,
                selectedRestaurants: newRestaurants,
                budgetUsed: {
                    ...prev.budgetUsed,
                    food: totalFoodCost
                }
            };
        });
    }, [state.numberOfPeople]);

    // Select movie and theatre
    const selectMovie = useCallback((movie, theatre, showtime, ticketPrice) => {
        const ticketCost = ticketPrice * state.numberOfPeople;
        setState(prev => ({
            ...prev,
            selectedMovie: movie,
            selectedTheatre: theatre,
            selectedShowtime: showtime,
            budgetUsed: {
                ...prev.budgetUsed,
                tickets: ticketCost
            }
        }));
    }, [state.numberOfPeople]);

    // Update current step
    const setCurrentStep = useCallback((step) => {
        setState(prev => ({
            ...prev,
            currentStep: step
        }));
    }, []);

    // Calculate remaining budget
    const getRemainingBudget = useCallback(() => {
        const { budget, budgetUsed } = state;
        const totalUsed = Object.values(budgetUsed).reduce((sum, val) => sum + val, 0);
        return budget - totalUsed;
    }, [state.budget, state.budgetUsed]);

    // Get per person cost
    const getPerPersonCost = useCallback(() => {
        const { budgetUsed, numberOfPeople } = state;
        const totalUsed = Object.values(budgetUsed).reduce((sum, val) => sum + val, 0);
        return Math.ceil(totalUsed / numberOfPeople);
    }, [state.budgetUsed, state.numberOfPeople]);

    // Reset plan
    const resetPlan = useCallback(() => {
        setState(initialState);
    }, []);

    // Update plan with discovered data
    const updatePlan = useCallback((planData) => {
        setState(prev => ({
            ...prev,
            plan: {
                ...prev.plan,
                ...planData
            }
        }));
    }, []);

    const value = {
        ...state,
        updateInputs,
        updateAiTimeline,
        calculateBudgetAllocation,
        selectPlace,
        selectTransport,
        addRestaurant,
        setRestaurant,
        removeRestaurant,
        selectMovie,
        setCurrentStep,
        getRemainingBudget,
        getPerPersonCost,
        resetPlan,
        updatePlan
    };

    return (
        <PlanContext.Provider value={value}>
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error('usePlan must be used within a PlanProvider');
    }
    return context;
}

export default PlanContext;
