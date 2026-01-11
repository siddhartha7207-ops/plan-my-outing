// Movies database - simulates TMDB API data
// Currently running movies in Indian theatres

export const genres = [
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'thriller', name: 'Thriller' },
    { id: 'romance', name: 'Romance' },
    { id: 'horror', name: 'Horror' },
    { id: 'sci_fi', name: 'Sci-Fi' },
    { id: 'animation', name: 'Animation' },
    { id: 'family', name: 'Family' }
];

export const languages = [
    { id: 'hindi', name: 'Hindi' },
    { id: 'english', name: 'English' },
    { id: 'tamil', name: 'Tamil' },
    { id: 'telugu', name: 'Telugu' },
    { id: 'kannada', name: 'Kannada' },
    { id: 'malayalam', name: 'Malayalam' },
    { id: 'marathi', name: 'Marathi' }
];

export const movies = [
    {
        id: 'mov_1',
        title: 'Pathaan 2',
        language: 'hindi',
        genres: ['action', 'thriller'],
        rating: 8.2,
        duration: 155,
        releaseDate: '2026-01-03',
        poster: '/api/placeholder/200/300',
        description: 'The spy returns with a new mission that will shake the world.',
        cast: ['Shah Rukh Khan', 'Deepika Padukone', 'John Abraham'],
        director: 'Siddharth Anand',
        popularity: 98,
        isNew: true
    },
    {
        id: 'mov_2',
        title: 'Avatar 4',
        language: 'english',
        genres: ['sci_fi', 'action', 'drama'],
        rating: 8.5,
        duration: 180,
        releaseDate: '2025-12-20',
        poster: '/api/placeholder/200/300',
        description: 'The epic saga continues as Jake Sully faces new challenges.',
        cast: ['Sam Worthington', 'Zoe Saldana'],
        director: 'James Cameron',
        popularity: 95,
        isNew: false
    },
    {
        id: 'mov_3',
        title: 'Pushpa 3: The Rampage',
        language: 'telugu',
        genres: ['action', 'drama'],
        rating: 8.4,
        duration: 175,
        releaseDate: '2026-01-10',
        poster: '/api/placeholder/200/300',
        description: 'Pushpa Raj continues his journey in the red sandalwood smuggling syndicate.',
        cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil'],
        director: 'Sukumar',
        popularity: 97,
        isNew: true
    },
    {
        id: 'mov_4',
        title: 'Stree 3',
        language: 'hindi',
        genres: ['comedy', 'horror'],
        rating: 7.8,
        duration: 140,
        releaseDate: '2026-01-05',
        poster: '/api/placeholder/200/300',
        description: 'The gang faces a new supernatural threat in their town.',
        cast: ['Rajkummar Rao', 'Shraddha Kapoor', 'Pankaj Tripathi'],
        director: 'Amar Kaushik',
        popularity: 92,
        isNew: true
    },
    {
        id: 'mov_5',
        title: 'Mission Impossible 8',
        language: 'english',
        genres: ['action', 'thriller'],
        rating: 8.0,
        duration: 165,
        releaseDate: '2025-12-25',
        poster: '/api/placeholder/200/300',
        description: 'Ethan Hunt embarks on his most dangerous mission yet.',
        cast: ['Tom Cruise', 'Rebecca Ferguson'],
        director: 'Christopher McQuarrie',
        popularity: 90,
        isNew: false
    },
    {
        id: 'mov_6',
        title: 'Leo 2',
        language: 'tamil',
        genres: ['action', 'thriller'],
        rating: 7.9,
        duration: 160,
        releaseDate: '2026-01-01',
        poster: '/api/placeholder/200/300',
        description: 'The cafe owner returns with his dark past.',
        cast: ['Vijay', 'Trisha'],
        director: 'Lokesh Kanagaraj',
        popularity: 94,
        isNew: true
    },
    {
        id: 'mov_7',
        title: 'Rocky Aur Rani 2',
        language: 'hindi',
        genres: ['romance', 'comedy', 'family'],
        rating: 7.5,
        duration: 150,
        releaseDate: '2025-12-28',
        poster: '/api/placeholder/200/300',
        description: 'Rocky and Rani continue their family adventures.',
        cast: ['Ranveer Singh', 'Alia Bhatt'],
        director: 'Karan Johar',
        popularity: 85,
        isNew: false
    },
    {
        id: 'mov_8',
        title: 'KGF Chapter 3',
        language: 'kannada',
        genres: ['action', 'drama'],
        rating: 8.6,
        duration: 185,
        releaseDate: '2026-01-08',
        poster: '/api/placeholder/200/300',
        description: 'The legend of Rocky Bhai reaches its climax.',
        cast: ['Yash', 'Srinidhi Shetty'],
        director: 'Prashanth Neel',
        popularity: 99,
        isNew: true
    },
    {
        id: 'mov_9',
        title: 'Kung Fu Panda 5',
        language: 'english',
        genres: ['animation', 'comedy', 'family'],
        rating: 7.6,
        duration: 100,
        releaseDate: '2025-12-22',
        poster: '/api/placeholder/200/300',
        description: 'Po faces his greatest challenge as the Dragon Warrior.',
        cast: ['Jack Black', 'Awkwafina'],
        director: 'Mike Mitchell',
        popularity: 82,
        isNew: false
    },
    {
        id: 'mov_10',
        title: 'Salaar 2',
        language: 'telugu',
        genres: ['action', 'drama'],
        rating: 8.1,
        duration: 170,
        releaseDate: '2026-01-06',
        poster: '/api/placeholder/200/300',
        description: 'Deva continues his violent journey in the underworld.',
        cast: ['Prabhas', 'Prithviraj Sukumaran'],
        director: 'Prashanth Neel',
        popularity: 93,
        isNew: true
    }
];

// Theatre data for cities
export const theatres = {
    bangalore: [
        {
            id: 'blr_t1',
            name: 'PVR Orion Mall',
            address: 'Brigade Gateway, Malleswaram',
            rating: 4.5,
            hasIMAX: true,
            has4DX: false,
            hasDolbyAtmos: true,
            coordinates: { lat: 13.0117, lng: 77.5542 },
            screens: 11,
            seatCategories: [
                { name: 'Classic', price: 180 },
                { name: 'Prime', price: 280 },
                { name: 'Recliner', price: 450 },
                { name: 'IMAX', price: 550 }
            ]
        },
        {
            id: 'blr_t2',
            name: 'INOX Forum Mall',
            address: 'Koramangala',
            rating: 4.4,
            hasIMAX: false,
            has4DX: true,
            hasDolbyAtmos: true,
            coordinates: { lat: 12.9352, lng: 77.6245 },
            screens: 7,
            seatCategories: [
                { name: 'Classic', price: 200 },
                { name: 'Prime', price: 300 },
                { name: 'Recliner', price: 480 },
                { name: '4DX', price: 600 }
            ]
        },
        {
            id: 'blr_t3',
            name: 'Cinepolis Royal Meenakshi Mall',
            address: 'Bannerghatta Road',
            rating: 4.3,
            hasIMAX: false,
            has4DX: false,
            hasDolbyAtmos: true,
            coordinates: { lat: 12.9021, lng: 77.5969 },
            screens: 6,
            seatCategories: [
                { name: 'Classic', price: 150 },
                { name: 'Prime', price: 220 },
                { name: 'Recliner', price: 400 }
            ]
        },
        {
            id: 'blr_t4',
            name: 'PVR Phoenix Marketcity',
            address: 'Whitefield',
            rating: 4.4,
            hasIMAX: true,
            has4DX: false,
            hasDolbyAtmos: true,
            coordinates: { lat: 12.9947, lng: 77.7004 },
            screens: 9,
            seatCategories: [
                { name: 'Classic', price: 170 },
                { name: 'Prime', price: 270 },
                { name: 'Recliner', price: 420 },
                { name: 'IMAX', price: 520 }
            ]
        }
    ],
    mumbai: [
        {
            id: 'mum_t1',
            name: 'PVR IMAX Lower Parel',
            address: 'Phoenix Palladium',
            rating: 4.6,
            hasIMAX: true,
            has4DX: true,
            hasDolbyAtmos: true,
            coordinates: { lat: 18.9977, lng: 72.8252 },
            screens: 8,
            seatCategories: [
                { name: 'Classic', price: 250 },
                { name: 'Prime', price: 380 },
                { name: 'Recliner', price: 550 },
                { name: 'IMAX', price: 650 }
            ]
        },
        {
            id: 'mum_t2',
            name: 'INOX Nariman Point',
            address: 'Metro Junction',
            rating: 4.4,
            hasIMAX: false,
            has4DX: false,
            hasDolbyAtmos: true,
            coordinates: { lat: 18.9256, lng: 72.8242 },
            screens: 5,
            seatCategories: [
                { name: 'Classic', price: 220 },
                { name: 'Prime', price: 320 },
                { name: 'Recliner', price: 500 }
            ]
        }
    ],
    delhi: [
        {
            id: 'del_t1',
            name: 'PVR Director\'s Cut',
            address: 'Select Citywalk, Saket',
            rating: 4.7,
            hasIMAX: false,
            has4DX: false,
            hasDolbyAtmos: true,
            coordinates: { lat: 28.5286, lng: 77.2192 },
            screens: 4,
            seatCategories: [
                { name: 'Luxe', price: 800 },
                { name: 'Premium', price: 1200 }
            ]
        },
        {
            id: 'del_t2',
            name: 'INOX Nehru Place',
            address: 'Nehru Place',
            rating: 4.3,
            hasIMAX: true,
            has4DX: true,
            hasDolbyAtmos: true,
            coordinates: { lat: 28.5491, lng: 77.2533 },
            screens: 7,
            seatCategories: [
                { name: 'Classic', price: 200 },
                { name: 'Prime', price: 300 },
                { name: 'Recliner', price: 450 },
                { name: 'IMAX', price: 550 }
            ]
        }
    ],
    hyderabad: [
        {
            id: 'hyd_t1',
            name: 'PVR Next Galleria',
            address: 'Hitech City',
            rating: 4.5,
            hasIMAX: true,
            has4DX: true,
            hasDolbyAtmos: true,
            coordinates: { lat: 17.4239, lng: 78.4473 },
            screens: 10,
            seatCategories: [
                { name: 'Classic', price: 180 },
                { name: 'Prime', price: 280 },
                { name: 'Recliner', price: 450 },
                { name: 'IMAX', price: 550 }
            ]
        },
        {
            id: 'hyd_t2',
            name: 'Prasads Multiplex',
            address: 'Necklace Road',
            rating: 4.6,
            hasIMAX: true,
            has4DX: false,
            hasDolbyAtmos: true,
            coordinates: { lat: 17.4106, lng: 78.4711 },
            screens: 9,
            seatCategories: [
                { name: 'Classic', price: 150 },
                { name: 'Prime', price: 250 },
                { name: 'Platinum', price: 380 },
                { name: 'IMAX', price: 480 }
            ]
        }
    ],
    pune: [
        {
            id: 'pun_t1',
            name: 'PVR Phoenix Marketcity',
            address: 'Viman Nagar',
            rating: 4.4,
            hasIMAX: false,
            has4DX: true,
            hasDolbyAtmos: true,
            coordinates: { lat: 18.5623, lng: 73.9166 },
            screens: 8,
            seatCategories: [
                { name: 'Classic', price: 170 },
                { name: 'Prime', price: 260 },
                { name: 'Recliner', price: 420 },
                { name: '4DX', price: 550 }
            ]
        }
    ],
    chennai: [
        {
            id: 'che_t1',
            name: 'SPI Cinema Express Avenue',
            address: 'Royapettah',
            rating: 4.5,
            hasIMAX: true,
            has4DX: false,
            hasDolbyAtmos: true,
            coordinates: { lat: 13.0580, lng: 80.2636 },
            screens: 10,
            seatCategories: [
                { name: 'Classic', price: 160 },
                { name: 'Prime', price: 240 },
                { name: 'Recliner', price: 400 },
                { name: 'IMAX', price: 500 }
            ]
        }
    ]
};

// Showtimes (sample - would be dynamic in real app)
export const showtimes = ['10:00 AM', '12:30 PM', '3:00 PM', '6:30 PM', '9:30 PM', '10:45 PM'];

// Helper functions
export function getMoviesByLanguage(language) {
    if (!language || language === 'all') return movies;
    return movies.filter(m => m.language === language);
}

export function getMoviesByGenre(genreId) {
    if (!genreId || genreId === 'all') return movies;
    return movies.filter(m => m.genres.includes(genreId));
}

export function getTheatresByCity(cityId) {
    return theatres[cityId] || [];
}

export function rankMovies(moviesList) {
    return [...moviesList].sort((a, b) => {
        // Prioritize new releases, then rating, then popularity
        const newScore = (a.isNew ? 0.3 : 0) - (b.isNew ? 0.3 : 0);
        const ratingScore = (b.rating - a.rating) * 0.4;
        const popularityScore = (b.popularity - a.popularity) * 0.003;
        return newScore + ratingScore + popularityScore;
    });
}

export function getTheatreLowestPrice(theatre) {
    return Math.min(...theatre.seatCategories.map(c => c.price));
}

export default { movies, theatres, showtimes, genres, languages };
