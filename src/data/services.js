export const guides = [];

export const transport = [
  {
    id: 'transport-raj',
    name: 'Raj Mizoram Travels',
    owner: 'Rajesh Chhakchhuak',
    avatar: 'RC',
    type: 'Car & SUV Rental',
    vehicles: [
      { name: 'Toyota Innova Crysta', capacity: 7, price: 3500, priceUnit: 'per day (fuel incl.)' },
      { name: 'Maruti Ertiga', capacity: 7, price: 2500, priceUnit: 'per day (fuel incl.)' },
      { name: 'Mahindra Bolero', capacity: 9, price: 3000, priceUnit: 'per day (fuel incl.)' },
    ],
    rating: 4.8, reviews: 76,
    phone: '+91 98765 44444',
    email: 'raj.travels@lushaitrips.com',
    location: 'Aizawl (airport pickup available)',
    coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
      'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80',
    ],
    description: 'Raj Mizoram Travels offers reliable, comfortable transport across Mizoram\'s mountain roads with experienced local drivers who know every route. Airport pickup, multi-day hire, and custom itinerary drops available.',
    features: ['Airport Pickup', 'AC Vehicles', 'Experienced Drivers', 'Night Driving', 'All Districts'],
    verified: true, available: true,
  },
  {
    id: 'transport-zara',
    name: 'Zara Mountain Bikes',
    owner: 'Zaramsanga Colney',
    avatar: 'ZC',
    type: 'Motorcycle & Bike Rental',
    vehicles: [
      { name: 'Royal Enfield Himalayan', capacity: 2, price: 1800, priceUnit: 'per day' },
      { name: 'Honda CB350', capacity: 2, price: 1400, priceUnit: 'per day' },
      { name: 'Mountain Bicycle', capacity: 1, price: 400, priceUnit: 'per day' },
    ],
    rating: 4.6, reviews: 38,
    phone: '+91 87654 55555',
    email: 'zara.bikes@lushaitrips.com',
    location: 'Aizawl',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80',
    ],
    description: 'Explore Mizoram the way it was meant to be explored - on two wheels. Our fleet of well-maintained Royal Enfields and Honda bikes are ideal for the winding mountain roads of Mizoram. Helmets, riding gear, and maps provided.',
    features: ['Helmets Included', 'Riding Gear', 'Route Maps', 'Breakdown Assistance', 'Delivery to Hotel'],
    verified: true, available: true,
  },
  {
    id: 'transport-lal',
    name: 'Lal Shared Sumo Service',
    owner: 'Lalbiakzuala',
    avatar: 'LB',
    type: 'Shared Sumo / Van',
    vehicles: [
      { name: 'Tata Sumo (Shared)', capacity: 10, price: 350, priceUnit: 'per seat per route' },
      { name: 'Force Traveller Van', capacity: 16, price: 4500, priceUnit: 'per day (private)' },
    ],
    rating: 4.4, reviews: 55,
    phone: '+91 76543 66666',
    email: 'lal.sumo@lushaitrips.com',
    location: 'Aizawl (all major routes)',
    coverImage: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80',
      'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    ],
    description: 'Budget-friendly shared Sumo services connect all major towns and tourist spots. Perfect for solo travellers or groups on a budget. Private van hire also available for custom tours and group trips.',
    features: ['Budget Friendly', 'All Major Routes', 'Daily Departures', 'Group Discounts', 'Private Option'],
    verified: true, available: true,
  },
];

export const seedGuides = guides.map(g => ({
  ...g,
  cover_image: g.coverImage,
  reviews_count: g.reviews,
  price_unit: g.priceUnit,
}));

export const seedTransport = transport.map(t => ({
  ...t,
  cover_image: t.coverImage,
  reviews_count: t.reviews,
  owner_name: t.owner,
}));
