// Comprehensive Restaurant Data for 6 Indian Cities
// Based on real menu items and 2024-2025 pricing research

export const restaurants = {
    bangalore: [
        {
            id: 'blr_r1',
            name: 'MTR - Mavalli Tiffin Rooms',
            cuisine: 'south_indian',
            address: 'Lalbagh Road, Mavalli',
            rating: 4.6,
            reviewCount: 45000,
            avgCost: 250,
            isVeg: true,
            priceLevel: 2,
            openingHours: '7:00 AM - 11:00 AM, 12:30 PM - 9:00 PM',
            closedOn: 'Monday',
            specialty: 'Rava Idli, Bisibele Bath',
            popularDishes: [
                { name: 'Rava Idli', price: 95 },
                { name: 'Masala Dosa', price: 138 },
                { name: 'Bisibele Bath', price: 105 },
                { name: 'Filter Coffee', price: 45 },
                { name: 'Kesari Bath', price: 85 }
            ],
            mustTry: 'Rava Idli with Coconut Chutney',
            waitTime: '20-30 mins on weekends',
            coordinates: { lat: 12.9489, lng: 77.5847 }
        },
        {
            id: 'blr_r2',
            name: 'Vidyarthi Bhavan',
            cuisine: 'south_indian',
            address: 'Gandhi Bazaar, Basavanagudi',
            rating: 4.5,
            reviewCount: 32000,
            avgCost: 150,
            isVeg: true,
            priceLevel: 1,
            openingHours: '6:30 AM - 11:30 AM, 2:00 PM - 8:00 PM',
            closedOn: 'Wednesday',
            specialty: 'Crispy Masala Dosa',
            popularDishes: [
                { name: 'Masale Dose', price: 90 },
                { name: 'Plain Dose', price: 85 },
                { name: 'Idly (2 pcs)', price: 50 },
                { name: 'Khara Bath', price: 50 },
                { name: 'Kesari Bath', price: 50 }
            ],
            mustTry: 'Masale Dose - Famous for crispy texture',
            waitTime: '15-20 mins',
            coordinates: { lat: 12.9411, lng: 77.5758 }
        },
        {
            id: 'blr_r3',
            name: 'Brahmin\'s Coffee Bar',
            cuisine: 'south_indian',
            address: 'Ranga Rao Road, Shankarapuram',
            rating: 4.4,
            reviewCount: 18000,
            avgCost: 100,
            isVeg: true,
            priceLevel: 1,
            openingHours: '6:30 AM - 12:00 PM, 3:00 PM - 7:30 PM',
            closedOn: 'Open all days',
            specialty: 'Idli Vada Combo',
            popularDishes: [
                { name: 'Idli Vada', price: 40 },
                { name: 'Khara Bath', price: 35 },
                { name: 'Kesari Bath', price: 35 },
                { name: 'Coffee', price: 20 }
            ],
            mustTry: 'Idli Vada at standing tables',
            waitTime: '5-10 mins',
            coordinates: { lat: 12.9478, lng: 77.5695 }
        },
        {
            id: 'blr_r4',
            name: 'Meghana Foods',
            cuisine: 'andhra',
            address: 'Residency Road (Multiple Outlets)',
            rating: 4.3,
            reviewCount: 25000,
            avgCost: 350,
            isVeg: false,
            priceLevel: 2,
            openingHours: '12:00 PM - 3:30 PM, 7:00 PM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'Andhra Biryani',
            popularDishes: [
                { name: 'Chicken Biryani', price: 290 },
                { name: 'Mutton Biryani', price: 380 },
                { name: 'Andhra Meals', price: 220 },
                { name: 'Chicken 65', price: 260 }
            ],
            mustTry: 'Chicken Biryani with Mirchi Ka Salan',
            waitTime: '30-45 mins on weekends',
            coordinates: { lat: 12.9697, lng: 77.5996 }
        },
        {
            id: 'blr_r5',
            name: 'Toit Brewpub',
            cuisine: 'multi_cuisine',
            address: '100 Ft Road, Indiranagar',
            rating: 4.4,
            reviewCount: 28000,
            avgCost: 1200,
            isVeg: false,
            priceLevel: 3,
            openingHours: '12:00 PM - 11:30 PM',
            closedOn: 'Open all days',
            specialty: 'Craft Beer & Wood-fired Pizza',
            popularDishes: [
                { name: 'Tintin Toit Beer', price: 350 },
                { name: 'Margherita Pizza', price: 450 },
                { name: 'BBQ Chicken Wings', price: 395 },
                { name: 'Fish & Chips', price: 545 }
            ],
            mustTry: 'Craft Beer Flight + Pizza',
            waitTime: '45-60 mins on weekends',
            coordinates: { lat: 12.9784, lng: 77.6408 }
        },
        {
            id: 'blr_r6',
            name: 'Nagarjuna',
            cuisine: 'andhra',
            address: 'Residency Road',
            rating: 4.2,
            reviewCount: 15000,
            avgCost: 300,
            isVeg: false,
            priceLevel: 2,
            openingHours: '12:00 PM - 3:30 PM, 7:00 PM - 10:30 PM',
            closedOn: 'Open all days',
            specialty: 'Andhra Meals on Banana Leaf',
            popularDishes: [
                { name: 'Andhra Meals', price: 250 },
                { name: 'Biryani', price: 280 },
                { name: 'Chicken Curry', price: 220 }
            ],
            mustTry: 'Unlimited Andhra Meals',
            waitTime: '20-30 mins',
            coordinates: { lat: 12.9739, lng: 77.6103 }
        },
        {
            id: 'blr_r7',
            name: 'CTR (Central Tiffin Room)',
            cuisine: 'south_indian',
            address: 'Malleshwaram',
            rating: 4.7,
            reviewCount: 38000,
            avgCost: 150,
            isVeg: true,
            priceLevel: 1,
            openingHours: '7:30 AM - 12:30 PM, 4:00 PM - 9:30 PM',
            closedOn: 'Open all days',
            specialty: 'Benne Masala Dosa',
            popularDishes: [
                { name: 'Benne Masala Dosa', price: 85 },
                { name: 'Mangalore Bajji', price: 40 },
                { name: 'Filter Coffee', price: 25 }
            ],
            mustTry: 'Benne Masala Dosa - Butter Dosa',
            waitTime: '30-45 mins',
            coordinates: { lat: 12.9982, lng: 77.5698 }
        },
        {
            id: 'blr_r8',
            name: 'Truffles',
            cuisine: 'cafe',
            address: 'St. Marks Road',
            rating: 4.5,
            reviewCount: 42000,
            avgCost: 500,
            isVeg: false,
            priceLevel: 2,
            openingHours: '11:00 AM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'Burgers & Steaks',
            popularDishes: [
                { name: 'All American Cheese Burger', price: 320 },
                { name: 'Devils Chicken', price: 350 },
                { name: 'Ferrero Rocher Shake', price: 210 }
            ],
            mustTry: 'All American Cheese Burger',
            waitTime: '20-30 mins',
            coordinates: { lat: 12.9719, lng: 77.6011 }
        },
        {
            id: 'blr_r9',
            name: 'The Black Pearl',
            cuisine: 'buffet',
            address: 'Koramangala 5th Block',
            rating: 4.3,
            reviewCount: 25000,
            avgCost: 1200,
            isVeg: false,
            priceLevel: 3,
            openingHours: '12:00 PM - 4:00 PM, 6:30 PM - 11:30 PM',
            closedOn: 'Open all days',
            specialty: 'Pirate Themed Buffet',
            popularDishes: [
                { name: 'Lunch Buffet', price: 899 },
                { name: 'Dinner Buffet', price: 1099 },
                { name: 'Prawns Grill', price: 0 }
            ],
            mustTry: 'Unlimited BBQ Grill',
            waitTime: 'Reservation Recommended',
            coordinates: { lat: 12.9345, lng: 77.6229 }
        },
        {
            id: 'blr_r10',
            name: 'Corner House Ice Cream',
            cuisine: 'dessert',
            address: 'Residency Road',
            rating: 4.8,
            reviewCount: 55000,
            avgCost: 200,
            isVeg: true,
            priceLevel: 1,
            openingHours: '10:00 AM - 11:30 PM',
            closedOn: 'Open all days',
            specialty: 'Death By Chocolate',
            popularDishes: [
                { name: 'DBC (Death By Chocolate)', price: 280 },
                { name: 'Hot Chocolate Fudge', price: 180 },
                { name: 'Fruit Salad', price: 150 }
            ],
            mustTry: 'DBC - A Bangalore Classic',
            waitTime: '10-15 mins',
            coordinates: { lat: 12.9669, lng: 77.6074 }
        }
    ],

    mumbai: [
        {
            id: 'mum_r1',
            name: 'Leopold Cafe',
            cuisine: 'multi_cuisine',
            address: 'Colaba Causeway',
            rating: 4.2,
            reviewCount: 35000,
            avgCost: 800,
            isVeg: false,
            priceLevel: 3,
            openingHours: '7:30 AM - 12:00 AM',
            closedOn: 'Open all days',
            specialty: 'Historic Cafe, Continental',
            popularDishes: [
                { name: 'Beer (Pitcher)', price: 600 },
                { name: 'Chicken Sizzler', price: 450 },
                { name: 'Cheese Omelette', price: 220 },
                { name: 'Club Sandwich', price: 280 }
            ],
            mustTry: 'Experience the historic vibe with beer',
            waitTime: '10-15 mins',
            coordinates: { lat: 18.9225, lng: 72.8318 }
        },
        {
            id: 'mum_r2',
            name: 'Bademiya',
            cuisine: 'mughlai',
            address: 'Tulloch Road, Behind Taj Hotel, Colaba',
            rating: 4.3,
            reviewCount: 25000,
            avgCost: 400,
            isVeg: false,
            priceLevel: 2,
            openingHours: '7:00 PM - 2:00 AM',
            closedOn: 'Open all days',
            specialty: 'Seekh Kebabs & Rolls',
            popularDishes: [
                { name: 'Chicken Seekh Kebab Roll', price: 180 },
                { name: 'Mutton Seekh Roll', price: 220 },
                { name: 'Chicken Tikka', price: 280 },
                { name: 'Baida Roti', price: 150 }
            ],
            mustTry: 'Seekh Kebab Roll (Late night)',
            waitTime: '20-30 mins',
            coordinates: { lat: 18.9220, lng: 72.8332 }
        },
        {
            id: 'mum_r3',
            name: 'Cafe Mondegar',
            cuisine: 'multi_cuisine',
            address: 'Colaba Causeway',
            rating: 4.1,
            reviewCount: 18000,
            avgCost: 600,
            isVeg: false,
            priceLevel: 2,
            openingHours: '8:00 AM - 11:30 PM',
            closedOn: 'Open all days',
            specialty: 'Jukebox Cafe, Western Food',
            popularDishes: [
                { name: 'Chicken Steak', price: 380 },
                { name: 'Fish & Chips', price: 420 },
                { name: 'Cheese Burger', price: 320 },
                { name: 'Beer', price: 250 }
            ],
            mustTry: 'Listen to jukebox with beer & steak',
            waitTime: '15-20 mins',
            coordinates: { lat: 18.9229, lng: 72.8320 }
        },
        {
            id: 'mum_r4',
            name: 'Swati Snacks',
            cuisine: 'gujarati',
            address: 'Tardeo Road',
            rating: 4.5,
            reviewCount: 22000,
            avgCost: 350,
            isVeg: true,
            priceLevel: 2,
            openingHours: '12:00 PM - 10:45 PM',
            closedOn: 'Monday',
            specialty: 'Gujarati Snacks',
            popularDishes: [
                { name: 'Panki', price: 180 },
                { name: 'Dal Dhokli', price: 220 },
                { name: 'Sev Puri', price: 150 },
                { name: 'Mango Shrikhand', price: 180 }
            ],
            mustTry: 'Panki (Rice pancake in banana leaf)',
            waitTime: '30-40 mins',
            coordinates: { lat: 18.9686, lng: 72.8149 }
        },
        {
            id: 'mum_r5',
            name: 'Britannia & Co.',
            cuisine: 'parsi',
            address: 'Ballard Estate',
            rating: 4.4,
            reviewCount: 15000,
            avgCost: 600,
            isVeg: false,
            priceLevel: 2,
            openingHours: '11:30 AM - 4:00 PM',
            closedOn: 'Sunday',
            specialty: 'Berry Pulao',
            popularDishes: [
                { name: 'Berry Pulao', price: 520 },
                { name: 'Chicken Berry Pulao', price: 480 },
                { name: 'Salli Boti', price: 420 },
                { name: 'Caramel Custard', price: 120 }
            ],
            mustTry: 'Berry Pulao - Signature dish since 1923',
            waitTime: '20-30 mins',
            coordinates: { lat: 18.9323, lng: 72.8441 }
        },
        {
            id: 'mum_r6',
            name: 'Sardar Refreshments',
            cuisine: 'street_food',
            address: 'Tardeo, Near AC Market',
            rating: 4.3,
            reviewCount: 12000,
            avgCost: 150,
            isVeg: true,
            priceLevel: 1,
            openingHours: '6:00 AM - 10:00 PM',
            closedOn: 'Open all days',
            specialty: 'Pav Bhaji',
            popularDishes: [
                { name: 'Pav Bhaji', price: 120 },
                { name: 'Masala Pav', price: 80 },
                { name: 'Tawa Pulao', price: 140 }
            ],
            mustTry: 'Best Pav Bhaji in Mumbai',
            waitTime: '10-15 mins',
            coordinates: { lat: 18.9709, lng: 72.8145 }
        },
        {
            id: 'mum_r7',
            name: 'Gajalee',
            cuisine: 'seafood',
            address: 'Vile Parle East',
            rating: 4.5,
            reviewCount: 18000,
            avgCost: 1500,
            isVeg: false,
            priceLevel: 3,
            openingHours: '12:00 PM - 3:30 PM, 7:00 PM - 11:30 PM',
            closedOn: 'Open all days',
            specialty: 'Malvani Seafood',
            popularDishes: [
                { name: 'Tandoori Crab', price: 2200 },
                { name: 'Butter Garlic Prawns', price: 650 },
                { name: 'Bombil Fry', price: 350 }
            ],
            mustTry: 'Tandoori Crab (Market Price)',
            waitTime: '30-45 mins',
            coordinates: { lat: 19.0988, lng: 72.8532 }
        },
        {
            id: 'mum_r8',
            name: 'Pizza By The Bay',
            cuisine: 'italian',
            address: 'Marine Drive',
            rating: 4.4,
            reviewCount: 22000,
            avgCost: 1000,
            isVeg: false,
            priceLevel: 3,
            openingHours: '7:00 AM - 12:30 AM',
            closedOn: 'Open all days',
            specialty: 'Sea View Dining',
            popularDishes: [
                { name: 'Bombay Masala Pizza', price: 795 },
                { name: 'Pasta Alfredo', price: 650 },
                { name: 'Breakfast Platter', price: 550 }
            ],
            mustTry: 'Pizza with a Sunset View',
            waitTime: '20-30 mins',
            coordinates: { lat: 18.9338, lng: 72.8258 }
        },
        {
            id: 'mum_r9',
            name: 'Ashok Vada Pav',
            cuisine: 'street_food',
            address: 'Kirti College, Dadar',
            rating: 4.6,
            reviewCount: 35000,
            avgCost: 50,
            isVeg: true,
            priceLevel: 1,
            openingHours: '11:00 AM - 9:30 PM',
            closedOn: 'Open all days',
            specialty: 'Mumbai Vada Pav',
            popularDishes: [
                { name: 'Vada Pav', price: 30 },
                { name: 'Choora Pav', price: 25 },
                { name: 'Masala Vada Pav', price: 40 }
            ],
            mustTry: 'Choora Pav',
            waitTime: '10 mins (Queue)',
            coordinates: { lat: 19.0195, lng: 72.8354 }
        },
        {
            id: 'mum_r10',
            name: 'Mamagoto',
            cuisine: 'asian',
            address: 'Bandra West (Hill Road)',
            rating: 4.4,
            reviewCount: 15000,
            avgCost: 1200,
            isVeg: false,
            priceLevel: 3,
            openingHours: '12:00 PM - 11:30 PM',
            closedOn: 'Open all days',
            specialty: 'Pan Asian Bowls',
            popularDishes: [
                { name: 'Khow Suey', price: 650 },
                { name: 'Pad Thai', price: 550 },
                { name: 'Rock Shrimp Tempura', price: 595 }
            ],
            mustTry: 'Mama\'s Khow Suey',
            waitTime: '30 mins',
            coordinates: { lat: 19.0544, lng: 72.8339 }
        }
    ],

    delhi: [
        {
            id: 'del_r1',
            name: 'Karim\'s',
            cuisine: 'mughlai',
            address: 'Gali Kababiyan, Jama Masjid',
            rating: 4.4,
            reviewCount: 42000,
            avgCost: 500,
            isVeg: false,
            priceLevel: 2,
            openingHours: '9:00 AM - 12:30 AM',
            closedOn: 'Open all days',
            specialty: 'Mughlai Cuisine since 1913',
            popularDishes: [
                { name: 'Mutton Qeema Naan', price: 220 },
                { name: 'Mutton Seekh Kabab', price: 110 },
                { name: 'Chicken Jahangiri', price: 350 },
                { name: 'Mutton Nihari', price: 280 },
                { name: 'Badam Pasanda', price: 320 }
            ],
            mustTry: 'Mutton Burra Kebab with Naan',
            waitTime: '20-30 mins',
            coordinates: { lat: 28.6505, lng: 77.2335 }
        },
        {
            id: 'del_r2',
            name: 'Paranthe Wali Gali (Babu Ram)',
            cuisine: 'street_food',
            address: 'Chandni Chowk',
            rating: 4.2,
            reviewCount: 25000,
            avgCost: 200,
            isVeg: true,
            priceLevel: 1,
            openingHours: '9:00 AM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'Stuffed Paranthas since 1886',
            popularDishes: [
                { name: 'Aloo Parantha (2 pcs)', price: 120 },
                { name: 'Gobhi Parantha', price: 140 },
                { name: 'Mix Parantha', price: 140 },
                { name: 'Rabdi', price: 80 },
                { name: 'Lassi', price: 80 }
            ],
            mustTry: 'Aloo Parantha with pickles & curd',
            waitTime: '10-15 mins',
            coordinates: { lat: 28.6560, lng: 77.2303 }
        },
        {
            id: 'del_r3',
            name: 'Old Famous Jalebi Wala',
            cuisine: 'street_food',
            address: 'Dariba Kalan, Chandni Chowk',
            rating: 4.3,
            reviewCount: 18000,
            avgCost: 100,
            isVeg: true,
            priceLevel: 1,
            openingHours: '8:00 AM - 9:00 PM',
            closedOn: 'Open all days',
            specialty: 'Hot Jalebis since 1884',
            popularDishes: [
                { name: 'Jalebi (per kg)', price: 500 },
                { name: 'Rabdi with Jalebi', price: 120 },
                { name: 'Samosa', price: 30 }
            ],
            mustTry: 'Hot Jalebi with Rabdi',
            waitTime: '5-10 mins',
            coordinates: { lat: 28.6555, lng: 77.2310 }
        },
        {
            id: 'del_r4',
            name: 'Al Jawahar',
            cuisine: 'mughlai',
            address: 'Jama Masjid',
            rating: 4.3,
            reviewCount: 15000,
            avgCost: 400,
            isVeg: false,
            priceLevel: 2,
            openingHours: '7:00 AM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'Mughlai since 1947',
            popularDishes: [
                { name: 'Chicken Biryani', price: 280 },
                { name: 'Mutton Korma', price: 320 },
                { name: 'Shahi Tukda', price: 120 }
            ],
            mustTry: 'Nihari with Kulcha',
            waitTime: '15-20 mins',
            coordinates: { lat: 28.6507, lng: 77.2332 }
        },
        {
            id: 'del_r5',
            name: 'Sagar Ratna',
            cuisine: 'south_indian',
            address: 'Defence Colony (Multiple Outlets)',
            rating: 4.2,
            reviewCount: 22000,
            avgCost: 300,
            isVeg: true,
            priceLevel: 2,
            openingHours: '8:00 AM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'South Indian Chain',
            popularDishes: [
                { name: 'Masala Dosa', price: 180 },
                { name: 'Paper Dosa', price: 200 },
                { name: 'Idli Sambhar', price: 140 },
                { name: 'Filter Coffee', price: 80 }
            ],
            mustTry: 'Rava Masala Dosa',
            waitTime: '15-20 mins',
            coordinates: { lat: 28.5709, lng: 77.2325 }
        },
        {
            id: 'del_r6',
            name: 'Wenger\'s',
            cuisine: 'bakery',
            address: 'Connaught Place',
            rating: 4.4,
            reviewCount: 12000,
            avgCost: 250,
            isVeg: true,
            priceLevel: 2,
            openingHours: '10:00 AM - 8:00 PM',
            closedOn: 'Open all days',
            specialty: 'Historic Bakery since 1926',
            popularDishes: [
                { name: 'Chicken Patty', price: 85 },
                { name: 'Veg Patty', price: 65 },
                { name: 'Pastries', price: 120 },
                { name: 'Cookies', price: 80 }
            ],
            mustTry: 'Chicken Patty - Iconic',
            waitTime: '5-10 mins',
            coordinates: { lat: 28.6322, lng: 77.2196 }
        }
    ],

    hyderabad: [
        {
            id: 'hyd_r1',
            name: 'Paradise Biryani',
            cuisine: 'hyderabadi',
            address: 'Secunderabad (Multiple Outlets)',
            rating: 4.3,
            reviewCount: 55000,
            avgCost: 400,
            isVeg: false,
            priceLevel: 2,
            openingHours: '11:00 AM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'Hyderabadi Biryani since 1953',
            popularDishes: [
                { name: 'Chicken Biryani', price: 320 },
                { name: 'Mutton Biryani', price: 420 },
                { name: 'Chicken 65', price: 280 },
                { name: 'Double Ka Meetha', price: 120 }
            ],
            mustTry: 'Chicken Biryani with Mirchi Ka Salan',
            waitTime: '20-30 mins',
            coordinates: { lat: 17.4400, lng: 78.4988 }
        },
        {
            id: 'hyd_r2',
            name: 'Bawarchi',
            cuisine: 'hyderabadi',
            address: 'RTC X Roads',
            rating: 4.2,
            reviewCount: 35000,
            avgCost: 350,
            isVeg: false,
            priceLevel: 2,
            openingHours: '11:00 AM - 11:30 PM',
            closedOn: 'Open all days',
            specialty: 'Authentic Hyderabadi Biryani',
            popularDishes: [
                { name: 'Special Chicken Biryani', price: 280 },
                { name: 'Mutton Biryani', price: 380 },
                { name: 'Haleem (Seasonal)', price: 200 }
            ],
            mustTry: 'Special Dum Biryani',
            waitTime: '30-45 mins on weekends',
            coordinates: { lat: 17.4053, lng: 78.4909 }
        },
        {
            id: 'hyd_r3',
            name: 'Shah Ghouse',
            cuisine: 'hyderabadi',
            address: 'Tolichowki (Multiple Outlets)',
            rating: 4.4,
            reviewCount: 28000,
            avgCost: 400,
            isVeg: false,
            priceLevel: 2,
            openingHours: '5:00 AM - 1:00 AM',
            closedOn: 'Open all days',
            specialty: 'Biryani & Haleem',
            popularDishes: [
                { name: 'Chicken Biryani', price: 320 },
                { name: 'Haleem', price: 220 },
                { name: 'Paya', price: 180 }
            ],
            mustTry: 'Haleem during Ramadan',
            waitTime: '20-30 mins',
            coordinates: { lat: 17.4019, lng: 78.4087 }
        },
        {
            id: 'hyd_r4',
            name: 'Chutneys',
            cuisine: 'south_indian',
            address: 'Banjara Hills',
            rating: 4.4,
            reviewCount: 18000,
            avgCost: 300,
            isVeg: true,
            priceLevel: 2,
            openingHours: '7:30 AM - 10:30 PM',
            closedOn: 'Open all days',
            specialty: 'South Indian with 25+ Chutneys',
            popularDishes: [
                { name: 'Masala Dosa', price: 150 },
                { name: 'Pesarattu', price: 130 },
                { name: 'Idli (4 pcs)', price: 100 },
                { name: 'Filter Coffee', price: 60 }
            ],
            mustTry: 'Pesarattu with Upma',
            waitTime: '15-20 mins',
            coordinates: { lat: 17.4265, lng: 78.4389 }
        },
        {
            id: 'hyd_r5',
            name: 'Nimrah Cafe',
            cuisine: 'irani',
            address: 'Near Charminar',
            rating: 4.3,
            reviewCount: 15000,
            avgCost: 100,
            isVeg: true,
            priceLevel: 1,
            openingHours: '5:00 AM - 10:30 PM',
            closedOn: 'Open all days',
            specialty: 'Irani Chai & Osmania Biscuits',
            popularDishes: [
                { name: 'Irani Chai', price: 25 },
                { name: 'Osmania Biscuit', price: 15 },
                { name: 'Dilkush', price: 30 }
            ],
            mustTry: 'Irani Chai dipped with Osmania Biscuit',
            waitTime: '5 mins',
            coordinates: { lat: 17.3614, lng: 78.4739 }
        }
    ],

    pune: [
        {
            id: 'pun_r1',
            name: 'Vaishali',
            cuisine: 'south_indian',
            address: 'FC Road',
            rating: 4.3,
            reviewCount: 28000,
            avgCost: 200,
            isVeg: true,
            priceLevel: 1,
            openingHours: '7:00 AM - 10:30 PM',
            closedOn: 'Open all days',
            specialty: 'Iconic College Hangout',
            popularDishes: [
                { name: 'Masala Dosa', price: 120 },
                { name: 'Idli Sambhar', price: 90 },
                { name: 'Filter Coffee', price: 50 },
                { name: 'Sambar Vada', price: 80 }
            ],
            mustTry: 'Masala Dosa with college crowd vibe',
            waitTime: '15-20 mins',
            coordinates: { lat: 18.5236, lng: 73.8422 }
        },
        {
            id: 'pun_r2',
            name: 'Shreemaya Celebration',
            cuisine: 'maharashtrian',
            address: 'Sinhagad Road',
            rating: 4.4,
            reviewCount: 15000,
            avgCost: 350,
            isVeg: false,
            priceLevel: 2,
            openingHours: '11:00 AM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'Maharashtrian Thali',
            popularDishes: [
                { name: 'Veg Thali', price: 280 },
                { name: 'Non-Veg Thali', price: 380 },
                { name: 'Puran Poli', price: 80 }
            ],
            mustTry: 'Unlimited Maharashtrian Thali',
            waitTime: '20-30 mins',
            coordinates: { lat: 18.4870, lng: 73.8323 }
        },
        {
            id: 'pun_r3',
            name: 'Kayani Bakery',
            cuisine: 'bakery',
            address: 'East Street, Camp',
            rating: 4.5,
            reviewCount: 22000,
            avgCost: 150,
            isVeg: true,
            priceLevel: 1,
            openingHours: '7:00 AM - 1:00 PM, 4:00 PM - 8:00 PM',
            closedOn: 'Sunday',
            specialty: 'Shrewsbury Biscuits since 1955',
            popularDishes: [
                { name: 'Shrewsbury Biscuits (500g)', price: 350 },
                { name: 'Mawa Cake', price: 120 },
                { name: 'Khari Biscuit', price: 80 }
            ],
            mustTry: 'Shrewsbury Biscuits - Must carry',
            waitTime: '10-15 mins (queue)',
            coordinates: { lat: 18.5140, lng: 73.8802 }
        },
        {
            id: 'pun_r4',
            name: 'Bedekar',
            cuisine: 'maharashtrian',
            address: 'Narayan Peth',
            rating: 4.3,
            reviewCount: 12000,
            avgCost: 200,
            isVeg: true,
            priceLevel: 1,
            openingHours: '8:00 AM - 9:00 PM',
            closedOn: 'Open all days',
            specialty: 'Misal Pav',
            popularDishes: [
                { name: 'Misal Pav', price: 100 },
                { name: 'Sabudana Khichdi', price: 80 },
                { name: 'Batata Bhaji', price: 60 }
            ],
            mustTry: 'Spicy Misal Pav',
            waitTime: '10-15 mins',
            coordinates: { lat: 18.5167, lng: 73.8478 }
        }
    ],

    chennai: [
        {
            id: 'che_r1',
            name: 'Murugan Idli Shop',
            cuisine: 'south_indian',
            address: 'T. Nagar (Multiple Outlets)',
            rating: 4.4,
            reviewCount: 35000,
            avgCost: 150,
            isVeg: true,
            priceLevel: 1,
            openingHours: '6:30 AM - 10:30 PM',
            closedOn: 'Open all days',
            specialty: 'Soft Idlis',
            popularDishes: [
                { name: 'Idli (4 pcs)', price: 60 },
                { name: 'Podi Idli', price: 80 },
                { name: 'Ghee Pongal', price: 100 },
                { name: 'Filter Coffee', price: 40 }
            ],
            mustTry: 'Soft Idlis with varieties of chutneys',
            waitTime: '10-15 mins',
            coordinates: { lat: 13.0418, lng: 80.2341 }
        },
        {
            id: 'che_r2',
            name: 'Saravana Bhavan',
            cuisine: 'south_indian',
            address: 'T. Nagar (Multiple Outlets)',
            rating: 4.3,
            reviewCount: 45000,
            avgCost: 250,
            isVeg: true,
            priceLevel: 2,
            openingHours: '6:00 AM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'South Indian Thali',
            popularDishes: [
                { name: 'Mini Tiffin', price: 180 },
                { name: 'Ghee Roast Dosa', price: 150 },
                { name: 'Meals', price: 200 },
                { name: 'Badam Milk', price: 80 }
            ],
            mustTry: 'South Indian Meals (Lunch)',
            waitTime: '20-30 mins',
            coordinates: { lat: 13.0403, lng: 80.2344 }
        },
        {
            id: 'che_r3',
            name: 'Ratna Cafe',
            cuisine: 'south_indian',
            address: 'Triplicane',
            rating: 4.4,
            reviewCount: 20000,
            avgCost: 180,
            isVeg: true,
            priceLevel: 1,
            openingHours: '6:30 AM - 10:00 PM',
            closedOn: 'Open all days',
            specialty: 'Sambar Idli',
            popularDishes: [
                { name: 'Sambar Idli', price: 70 },
                { name: 'Ghee Pongal', price: 90 },
                { name: 'Curd Vada', price: 60 },
                { name: 'Kesari', price: 50 }
            ],
            mustTry: 'Sambar Idli - Iconic Chennai breakfast',
            waitTime: '15-20 mins',
            coordinates: { lat: 13.0590, lng: 80.2689 }
        },
        {
            id: 'che_r4',
            name: 'Buhari',
            cuisine: 'biryani',
            address: 'Mount Road',
            rating: 4.2,
            reviewCount: 18000,
            avgCost: 400,
            isVeg: false,
            priceLevel: 2,
            openingHours: '12:00 PM - 11:00 PM',
            closedOn: 'Open all days',
            specialty: 'Buhari Biryani since 1951',
            popularDishes: [
                { name: 'Chicken Biryani', price: 280 },
                { name: 'Mutton Biryani', price: 380 },
                { name: 'Chicken 65', price: 250 }
            ],
            mustTry: 'Chicken Biryani - Chennai style',
            waitTime: '20-30 mins',
            coordinates: { lat: 13.0614, lng: 80.2612 }
        },
        {
            id: 'che_r5',
            name: 'A2B - Adyar Ananda Bhavan',
            cuisine: 'south_indian',
            address: 'Adyar (Multiple Outlets)',
            rating: 4.3,
            reviewCount: 32000,
            avgCost: 200,
            isVeg: true,
            priceLevel: 1,
            openingHours: '7:00 AM - 10:00 PM',
            closedOn: 'Open all days',
            specialty: 'Sweets & South Indian',
            popularDishes: [
                { name: 'Mysore Pak', price: 60 },
                { name: 'Masala Dosa', price: 120 },
                { name: 'Jangri', price: 40 }
            ],
            mustTry: 'Mysore Pak - Signature sweet',
            waitTime: '10-15 mins',
            coordinates: { lat: 13.0067, lng: 80.2565 }
        }
    ]
};

// Helper Functions
export function getRestaurantsByCity(cityId) {
    return restaurants[cityId] || restaurants.bangalore;
}

export function filterRestaurantsByPreference(cityRestaurants, preference) {
    if (preference === 'veg') {
        return cityRestaurants.filter(r => r.isVeg);
    }
    return cityRestaurants;
}

export function filterByBudget(cityRestaurants, maxBudget) {
    return cityRestaurants.filter(r => r.avgCost <= maxBudget);
}

export function rankRestaurants(cityRestaurants) {
    return [...cityRestaurants].sort((a, b) => b.rating - a.rating);
}

export function getRestaurantById(cityId, restaurantId) {
    const cityRestaurants = getRestaurantsByCity(cityId);
    return cityRestaurants.find(r => r.id === restaurantId);
}
