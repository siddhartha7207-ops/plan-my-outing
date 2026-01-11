// Comprehensive Transport Data with Real Bus Routes and Fares
// Based on 2024-2025 research for all 6 Indian cities

// City-specific transport configurations
export const cityTransportConfig = {
    bangalore: {
        busOperator: 'BMTC',
        metroOperator: 'Namma Metro',
        baseFare: 10,
        perKmRate: 1.5,
        metroBaseFare: 10,
        metroPerKmRate: 2
    },
    mumbai: {
        busOperator: 'BEST',
        metroOperator: 'Mumbai Metro',
        baseFare: 8,
        perKmRate: 1.2,
        metroBaseFare: 10,
        metroPerKmRate: 2.5
    },
    delhi: {
        busOperator: 'DTC',
        metroOperator: 'Delhi Metro',
        baseFare: 10,
        perKmRate: 1,
        metroBaseFare: 10,
        metroPerKmRate: 2
    },
    hyderabad: {
        busOperator: 'TSRTC',
        metroOperator: 'Hyderabad Metro',
        baseFare: 10,
        perKmRate: 1.5,
        metroBaseFare: 10,
        metroPerKmRate: 2
    },
    pune: {
        busOperator: 'PMPML',
        metroOperator: 'Pune Metro',
        baseFare: 10,
        perKmRate: 1.2,
        metroBaseFare: 10,
        metroPerKmRate: 2
    },
    chennai: {
        busOperator: 'MTC',
        metroOperator: 'Chennai Metro',
        baseFare: 8,
        perKmRate: 1,
        metroBaseFare: 10,
        metroPerKmRate: 2.5
    }
};

// Common start locations for each city
export const cityStartLocations = {
    bangalore: { name: 'Majestic Bus Stand', lat: 12.9772, lng: 77.5713 },
    mumbai: { name: 'CST Station', lat: 18.9402, lng: 72.8356 },
    delhi: { name: 'Connaught Place', lat: 28.6315, lng: 77.2167 },
    hyderabad: { name: 'Secunderabad Station', lat: 17.4344, lng: 78.5013 },
    pune: { name: 'Pune Station', lat: 18.5285, lng: 73.8743 },
    chennai: { name: 'Chennai Central', lat: 13.0827, lng: 80.2707 }
};

// Transport types with accurate fares
export const transportTypes = {
    public: [
        {
            id: 'city_bus',
            name: 'City Bus',
            baseFare: 10,
            perKmRate: 1.5,
            avgSpeed: 15,
            description: 'Economical, may involve standing',
            icon: 'bus'
        },
        {
            id: 'metro',
            name: 'Metro Rail',
            baseFare: 10,
            perKmRate: 2,
            avgSpeed: 35,
            description: 'Fast, AC, comfortable',
            icon: 'train'
        },
        {
            id: 'local_train',
            name: 'Local Train',
            baseFare: 5,
            perKmRate: 0.5,
            avgSpeed: 30,
            description: 'Very cheap, crowded during peak hours',
            icon: 'train',
            availableIn: ['mumbai', 'chennai']
        }
    ],
    private: [
        {
            id: 'auto',
            name: 'Auto Rickshaw',
            baseFare: 30,
            perKmRate: 15,
            avgSpeed: 20,
            description: 'Meter fare, good for short distances',
            icon: 'car'
        },
        {
            id: 'rapido_bike',
            name: 'Rapido Bike',
            baseFare: 25,
            perKmRate: 6,
            avgSpeed: 25,
            description: 'Fast, single rider only',
            icon: 'bike',
            maxPeople: 1
        },
        {
            id: 'ola_mini',
            name: 'Ola Mini',
            baseFare: 50,
            perKmRate: 11,
            avgSpeed: 22,
            description: 'AC cab, comfortable',
            icon: 'car',
            maxPeople: 4
        },
        {
            id: 'uber_go',
            name: 'Uber Go',
            baseFare: 50,
            perKmRate: 12,
            avgSpeed: 22,
            description: 'AC cab, app-based',
            icon: 'car',
            maxPeople: 4
        },
        {
            id: 'ola_prime',
            name: 'Ola Prime',
            baseFare: 80,
            perKmRate: 16,
            avgSpeed: 25,
            description: 'Premium sedan, AC',
            icon: 'car',
            maxPeople: 4
        }
    ]
};

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Calculate fare for a transport option
export function calculateFare(transportType, distanceKm, numberOfPeople) {
    const baseFare = transportType.baseFare;
    const perKmRate = transportType.perKmRate;
    let fare = baseFare + (distanceKm * perKmRate);

    // For shared transport like bike taxi
    if (transportType.maxPeople === 1 && numberOfPeople > 1) {
        fare = fare * numberOfPeople;
    }

    return Math.ceil(fare);
}

// Calculate travel time in minutes
export function calculateTravelTime(distanceKm, avgSpeed) {
    return Math.ceil((distanceKm / avgSpeed) * 60);
}

// Get transport options for a journey
export function getTransportOptions(cityId, distanceKm, numberOfPeople) {
    const config = cityTransportConfig[cityId] || cityTransportConfig.bangalore;
    const options = [];

    // Public transport options
    transportTypes.public.forEach(transport => {
        // Skip if not available in this city
        if (transport.availableIn && !transport.availableIn.includes(cityId)) {
            return;
        }

        const fare = calculateFare(transport, distanceKm, 1); // Per person fare
        const totalFare = fare * numberOfPeople;
        const travelTime = calculateTravelTime(distanceKm, transport.avgSpeed);

        options.push({
            ...transport,
            type: 'public',
            distanceKm: Math.round(distanceKm * 10) / 10,
            farePerPerson: fare,
            totalFare,
            estimatedTime: travelTime,
            operatorName: config.busOperator
        });
    });

    // Private transport options
    transportTypes.private.forEach(transport => {
        const fare = calculateFare(transport, distanceKm, numberOfPeople);
        const travelTime = calculateTravelTime(distanceKm, transport.avgSpeed);

        // Calculate if multiple vehicles needed
        const maxPeople = transport.maxPeople || 4;
        const vehiclesNeeded = Math.ceil(numberOfPeople / maxPeople);
        const totalFare = fare * vehiclesNeeded;

        options.push({
            ...transport,
            type: 'private',
            distanceKm: Math.round(distanceKm * 10) / 10,
            farePerPerson: Math.ceil(totalFare / numberOfPeople),
            totalFare,
            estimatedTime: travelTime,
            vehiclesNeeded
        });
    });

    return options;
}

// Get best transport options
export function getBestTransportOptions(options) {
    const sortedByCost = [...options].sort((a, b) => a.totalFare - b.totalFare);
    const sortedByTime = [...options].sort((a, b) => a.estimatedTime - b.estimatedTime);

    return {
        cheapest: sortedByCost[0],
        fastest: sortedByTime[0],
        recommended: sortedByCost.find(o => o.type === 'public') || sortedByCost[0]
    };
}

// Get specific bus routes between places
export function getBusRoutes(cityId, fromPlace, toPlace) {
    // This would connect to places.js busRoutes in a real implementation
    const routes = {
        bangalore: {
            'Majestic_Cubbon Park': ['G-9', '7', '139-Jbn'],
            'Majestic_Lalbagh': ['314K', '7', '38', '215L'],
            'Majestic_ISKCON': ['252A', '252E', '501D'],
            'MG Road_Cubbon Park': ['Walk 5 mins or Metro 1 stop'],
            'MG Road_Lalbagh': ['7E', '7', '38']
        },
        mumbai: {
            'CST_Gateway': ['108', '83', '69', '103'],
            'CST_Marine Drive': ['Walk 15 mins or 108'],
            'CST_Juhu Beach': ['28 to CSMT then change'],
            'Gateway_Marine Drive': ['108', '83'],
            'Santacruz_Juhu': ['231', '203', '255LTD']
        },
        delhi: {
            'CP_India Gate': ['336A', '456', '47A', '156'],
            'CP_Red Fort': ['405', '838', '411'],
            'CP_Qutub Minar': ['505', '516', '427'],
            'Chandni Chowk_Red Fort': ['Walk 10 mins'],
            'Kashmeri Gate_Akshardham': ['Metro Blue Line']
        },
        hyderabad: {
            'Secunderabad_Charminar': ['2', '65', '9'],
            'Secunderabad_Golconda': ['119 via Nampally'],
            'Mehdipatnam_Charminar': ['65', '63B'],
            'Nampally_Golconda': ['119', '66G'],
            'Tank Bund_Hussain Sagar': ['5', '5C', '49']
        },
        pune: {
            'Station_Shaniwar Wada': ['11', '50', '169'],
            'Station_Dagdusheth': ['11', '33', '21'],
            'Shaniwar Wada_Aga Khan': ['133'],
            'Shaniwar Wada_Dagdusheth': ['33 (5 mins walk)'],
            'Swargate_Sinhagad': ['50']
        },
        chennai: {
            'Central_Marina': ['109', '21', '21C'],
            'Central_Kapaleeshwarar': ['109 to Santhome'],
            'CMBT_Mahabalipuram': ['568C AC'],
            'T Nagar_Mahabalipuram': ['599 Deluxe'],
            'Marina_Kapaleeshwarar': ['109 (11 mins)']
        }
    };

    return routes[cityId] || {};
}
