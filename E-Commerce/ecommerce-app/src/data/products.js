// Product Categories
export const categories = [
  { id: 'phone-cases', name: 'Phone Cases', icon: 'smartphone' },
  { id: 'chargers', name: 'Chargers & Cables', icon: 'battery-charging' },
  { id: 'headphones', name: 'Headphones & Earbuds', icon: 'headphones' },
  { id: 'screen-protectors', name: 'Screen Protectors', icon: 'shield' },
  { id: 'power-banks', name: 'Power Banks', icon: 'battery' },
  { id: 'speakers', name: 'Bluetooth Speakers', icon: 'volume-2' },
  { id: 'smartwatches', name: 'Smartwatches', icon: 'watch' },
  { id: 'car-accessories', name: 'Car Accessories', icon: 'car' },
  { id: 'camera-accessories', name: 'Camera Accessories', icon: 'camera' },
  { id: 'storage', name: 'Storage Devices', icon: 'hard-drive' }
];

// Generate 50+ products with variants
export const products = [
  // Phone Cases (6 products x 2 variants = 12)
  {
    id: 'pc-001',
    name: 'Slim Armor Phone Case',
    category: 'phone-cases',
    description: 'Military-grade drop protection with slim profile. Raised bezels protect camera and screen. Anti-slip grip texture.',
    basePrice: 24.99,
    rating: 4.5,
    reviews: 1243,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    variants: [
      { id: 'pc-001-black', color: 'Black', price: 24.99, stock: 45 },
      { id: 'pc-001-blue', color: 'Navy Blue', price: 24.99, stock: 32 }
    ],
    features: ['Drop Protection', 'Anti-Slip', 'Wireless Charging Compatible']
  },
  {
    id: 'pc-002',
    name: 'Leather Wallet Case',
    category: 'phone-cases',
    description: 'Premium genuine leather case with card slots and cash pocket. Magnetic closure and kickstand function.',
    basePrice: 34.99,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
    variants: [
      { id: 'pc-002-brown', color: 'Brown', price: 34.99, stock: 28 },
      { id: 'pc-002-black', color: 'Black', price: 34.99, stock: 35 }
    ],
    features: ['Genuine Leather', 'Card Slots', 'Kickstand']
  },
  {
    id: 'pc-003',
    name: 'Clear Crystal Case',
    category: 'phone-cases',
    description: 'Ultra-clear hard PC back with soft TPU bumper. Shows off your phone design while providing protection.',
    basePrice: 18.99,
    rating: 4.3,
    reviews: 2104,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500',
    variants: [
      { id: 'pc-003-clear', color: 'Crystal Clear', price: 18.99, stock: 67 },
      { id: 'pc-003-frost', color: 'Frosted', price: 18.99, stock: 54 }
    ],
    features: ['Crystal Clear', 'Anti-Yellowing', 'Shock Absorbing']
  },
  {
    id: 'pc-004',
    name: 'Rugged Defender Case',
    category: 'phone-cases',
    description: 'Heavy-duty protection for extreme conditions. Dust and debris proof with built-in screen protector.',
    basePrice: 39.99,
    rating: 4.8,
    reviews: 756,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
    variants: [
      { id: 'pc-004-black', color: 'Black', price: 39.99, stock: 23 },
      { id: 'pc-004-green', color: 'Olive Green', price: 39.99, stock: 19 }
    ],
    features: ['Military Grade', 'Port Covers', 'Belt Clip']
  },
  {
    id: 'pc-005',
    name: 'Silicone Grip Case',
    category: 'phone-cases',
    description: 'Soft liquid silicone with microfiber lining. Comfortable grip and excellent drop protection.',
    basePrice: 21.99,
    rating: 4.6,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    variants: [
      { id: 'pc-005-red', color: 'Red', price: 21.99, stock: 41 },
      { id: 'pc-005-purple', color: 'Purple', price: 21.99, stock: 38 }
    ],
    features: ['Liquid Silicone', 'Microfiber Lining', 'Anti-Fingerprint']
  },
  {
    id: 'pc-006',
    name: 'Carbon Fiber Case',
    category: 'phone-cases',
    description: 'Sleek carbon fiber texture with shock-absorbing TPU. Lightweight yet durable protection.',
    basePrice: 27.99,
    rating: 4.4,
    reviews: 634,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500',
    variants: [
      { id: 'pc-006-black', color: 'Black', price: 27.99, stock: 29 },
      { id: 'pc-006-blue', color: 'Blue', price: 27.99, stock: 25 }
    ],
    features: ['Carbon Fiber Texture', 'TPU Material', 'Precise Cutouts']
  },

  // Chargers & Cables (6 products x 2 variants = 12)
  {
    id: 'ch-001',
    name: 'Fast Charging Cable USB-C',
    category: 'chargers',
    description: '60W Power Delivery fast charging cable. Braided nylon exterior for durability. Data transfer up to 480Mbps.',
    basePrice: 15.99,
    rating: 4.6,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500',
    variants: [
      { id: 'ch-001-1m', color: '1 Meter', price: 15.99, stock: 120 },
      { id: 'ch-001-2m', color: '2 Meter', price: 19.99, stock: 89 }
    ],
    features: ['60W Fast Charging', 'Braided Cable', 'USB-C to USB-C']
  },
  {
    id: 'ch-002',
    name: 'Wireless Charging Pad',
    category: 'chargers',
    description: '15W Qi-certified wireless charger. Non-slip surface with LED indicator. Compatible with all Qi devices.',
    basePrice: 29.99,
    rating: 4.5,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1591290619762-c588f0e8f1e9?w=500',
    variants: [
      { id: 'ch-002-black', color: 'Black', price: 29.99, stock: 56 },
      { id: 'ch-002-white', color: 'White', price: 29.99, stock: 48 }
    ],
    features: ['15W Fast Wireless', 'Qi Certified', 'LED Indicator']
  },
  {
    id: 'ch-003',
    name: 'Multi-Port Wall Charger',
    category: 'chargers',
    description: '65W GaN charger with 3 USB-C and 1 USB-A port. Compact design with foldable plug.',
    basePrice: 44.99,
    rating: 4.8,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    variants: [
      { id: 'ch-003-black', color: 'Black', price: 44.99, stock: 34 },
      { id: 'ch-003-white', color: 'White', price: 44.99, stock: 41 }
    ],
    features: ['65W GaN Technology', '4 Ports', 'Foldable Plug']
  },
  {
    id: 'ch-004',
    name: 'Magnetic Wireless Charger',
    category: 'chargers',
    description: 'MagSafe compatible 15W charger. Strong magnetic alignment for perfect charging every time.',
    basePrice: 34.99,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1591290619762-c588f0e8f1e9?w=500',
    variants: [
      { id: 'ch-004-black', color: 'Black', price: 34.99, stock: 45 },
      { id: 'ch-004-silver', color: 'Silver', price: 34.99, stock: 38 }
    ],
    features: ['MagSafe Compatible', 'Strong Magnets', '15W Charging']
  },
  {
    id: 'ch-005',
    name: 'Car Charger Dual USB',
    category: 'chargers',
    description: '36W dual port car charger with intelligent power distribution. LED display shows voltage.',
    basePrice: 19.99,
    rating: 4.4,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    variants: [
      { id: 'ch-005-black', color: 'Black', price: 19.99, stock: 78 },
      { id: 'ch-005-silver', color: 'Silver', price: 19.99, stock: 62 }
    ],
    features: ['36W Total Power', 'LED Display', 'Smart Charging']
  },
  {
    id: 'ch-006',
    name: 'Lightning to USB Cable',
    category: 'chargers',
    description: 'MFi certified lightning cable. Durable braided design with aluminum connectors.',
    basePrice: 16.99,
    rating: 4.5,
    reviews: 4532,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500',
    variants: [
      { id: 'ch-006-1m', color: '1 Meter', price: 16.99, stock: 95 },
      { id: 'ch-006-2m', color: '2 Meter', price: 20.99, stock: 71 }
    ],
    features: ['MFi Certified', 'Braided Cable', 'Fast Charging']
  },

  // Headphones & Earbuds (6 products x 2 variants = 12)
  {
    id: 'hp-001',
    name: 'Wireless Noise Cancelling Headphones',
    category: 'headphones',
    description: 'Premium ANC headphones with 40mm drivers. 30-hour battery life and comfortable memory foam cushions.',
    basePrice: 129.99,
    rating: 4.8,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    variants: [
      { id: 'hp-001-black', color: 'Black', price: 129.99, stock: 23 },
      { id: 'hp-001-silver', color: 'Silver', price: 129.99, stock: 18 }
    ],
    features: ['Active Noise Cancelling', '30H Battery', 'Premium Sound']
  },
  {
    id: 'hp-002',
    name: 'True Wireless Earbuds Pro',
    category: 'headphones',
    description: 'Premium TWS earbuds with active noise cancellation. IPX7 waterproof with 6-hour playtime.',
    basePrice: 89.99,
    rating: 4.7,
    reviews: 5678,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    variants: [
      { id: 'hp-002-black', color: 'Black', price: 89.99, stock: 42 },
      { id: 'hp-002-white', color: 'White', price: 89.99, stock: 37 }
    ],
    features: ['ANC', 'IPX7 Waterproof', '24H Total Battery']
  },
  {
    id: 'hp-003',
    name: 'Sports Wireless Earbuds',
    category: 'headphones',
    description: 'Secure-fit sports earbuds with ear hooks. Sweat and water resistant with 8-hour battery.',
    basePrice: 49.99,
    rating: 4.5,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    variants: [
      { id: 'hp-003-black', color: 'Black', price: 49.99, stock: 58 },
      { id: 'hp-003-red', color: 'Red', price: 49.99, stock: 46 }
    ],
    features: ['Secure Fit', 'IPX6 Waterproof', 'Deep Bass']
  },
  {
    id: 'hp-004',
    name: 'Studio Monitor Headphones',
    category: 'headphones',
    description: 'Professional studio headphones with 50mm drivers. Detachable cable and foldable design.',
    basePrice: 159.99,
    rating: 4.9,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    variants: [
      { id: 'hp-004-black', color: 'Black', price: 159.99, stock: 15 },
      { id: 'hp-004-brown', color: 'Brown', price: 159.99, stock: 12 }
    ],
    features: ['Studio Quality', '50mm Drivers', 'Detachable Cable']
  },
  {
    id: 'hp-005',
    name: 'Budget Wireless Earbuds',
    category: 'headphones',
    description: 'Affordable true wireless earbuds with good sound quality. Touch controls and voice assistant.',
    basePrice: 29.99,
    rating: 4.2,
    reviews: 8765,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    variants: [
      { id: 'hp-005-black', color: 'Black', price: 29.99, stock: 124 },
      { id: 'hp-005-white', color: 'White', price: 29.99, stock: 108 }
    ],
    features: ['Touch Controls', 'Voice Assistant', '20H Battery']
  },
  {
    id: 'hp-006',
    name: 'Gaming Headset RGB',
    category: 'headphones',
    description: '7.1 surround sound gaming headset with RGB lighting. Noise-cancelling mic and memory foam.',
    basePrice: 79.99,
    rating: 4.6,
    reviews: 1543,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    variants: [
      { id: 'hp-006-black', color: 'Black', price: 79.99, stock: 31 },
      { id: 'hp-006-white', color: 'White', price: 79.99, stock: 27 }
    ],
    features: ['7.1 Surround', 'RGB Lighting', 'Noise-Cancelling Mic']
  },

  // Screen Protectors (5 products x 2 variants = 10)
  {
    id: 'sp-001',
    name: 'Tempered Glass Screen Protector',
    category: 'screen-protectors',
    description: '9H hardness tempered glass with oleophobic coating. Easy bubble-free installation.',
    basePrice: 12.99,
    rating: 4.4,
    reviews: 6543,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    variants: [
      { id: 'sp-001-single', color: 'Single Pack', price: 12.99, stock: 156 },
      { id: 'sp-001-double', color: 'Double Pack', price: 19.99, stock: 89 }
    ],
    features: ['9H Hardness', 'Bubble-Free', 'Case Friendly']
  },
  {
    id: 'sp-002',
    name: 'Privacy Screen Protector',
    category: 'screen-protectors',
    description: 'Anti-spy tempered glass blocks side viewing. Protects privacy in public spaces.',
    basePrice: 18.99,
    rating: 4.6,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    variants: [
      { id: 'sp-002-single', color: 'Single Pack', price: 18.99, stock: 67 },
      { id: 'sp-002-double', color: 'Double Pack', price: 29.99, stock: 42 }
    ],
    features: ['Privacy Filter', '9H Hardness', 'Anti-Glare']
  },
  {
    id: 'sp-003',
    name: 'Matte Anti-Glare Protector',
    category: 'screen-protectors',
    description: 'Matte finish reduces fingerprints and glare. Maintains touch sensitivity.',
    basePrice: 14.99,
    rating: 4.3,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    variants: [
      { id: 'sp-003-single', color: 'Single Pack', price: 14.99, stock: 93 },
      { id: 'sp-003-double', color: 'Double Pack', price: 22.99, stock: 61 }
    ],
    features: ['Matte Finish', 'Anti-Fingerprint', 'Anti-Glare']
  },
  {
    id: 'sp-004',
    name: 'Liquid Screen Protector',
    category: 'screen-protectors',
    description: 'Invisible liquid nano coating. Works on curved screens and compatible with all devices.',
    basePrice: 24.99,
    rating: 4.5,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    variants: [
      { id: 'sp-004-single', color: 'Single Device', price: 24.99, stock: 45 },
      { id: 'sp-004-double', color: 'Two Devices', price: 39.99, stock: 28 }
    ],
    features: ['Liquid Coating', 'Curved Screen', 'Invisible Protection']
  },
  {
    id: 'sp-005',
    name: 'Blue Light Blocking Protector',
    category: 'screen-protectors',
    description: 'Tempered glass with blue light filter. Reduces eye strain during extended use.',
    basePrice: 16.99,
    rating: 4.4,
    reviews: 2345,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    variants: [
      { id: 'sp-005-single', color: 'Single Pack', price: 16.99, stock: 71 },
      { id: 'sp-005-double', color: 'Double Pack', price: 26.99, stock: 53 }
    ],
    features: ['Blue Light Filter', 'Eye Protection', '9H Hardness']
  },

  // Power Banks (5 products x 2 variants = 10)
  {
    id: 'pb-001',
    name: 'Ultra Slim Power Bank 10000mAh',
    category: 'power-banks',
    description: 'Compact 10000mAh power bank with dual USB output. LED indicator and fast charging support.',
    basePrice: 34.99,
    rating: 4.6,
    reviews: 4321,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    variants: [
      { id: 'pb-001-black', color: 'Black', price: 34.99, stock: 52 },
      { id: 'pb-001-white', color: 'White', price: 34.99, stock: 46 }
    ],
    features: ['10000mAh', 'Dual USB', 'Fast Charging']
  },
  {
    id: 'pb-002',
    name: 'High Capacity Power Bank 20000mAh',
    category: 'power-banks',
    description: '20000mAh with 65W PD charging. Can charge laptops, tablets, and phones simultaneously.',
    basePrice: 59.99,
    rating: 4.8,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    variants: [
      { id: 'pb-002-black', color: 'Black', price: 59.99, stock: 31 },
      { id: 'pb-002-gray', color: 'Gray', price: 59.99, stock: 27 }
    ],
    features: ['20000mAh', '65W PD', 'Multi-Device']
  },
  {
    id: 'pb-003',
    name: 'Wireless Power Bank 10000mAh',
    category: 'power-banks',
    description: '10000mAh with Qi wireless charging pad. Can charge wirelessly and via cable simultaneously.',
    basePrice: 44.99,
    rating: 4.5,
    reviews: 3214,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    variants: [
      { id: 'pb-003-black', color: 'Black', price: 44.99, stock: 38 },
      { id: 'pb-003-blue', color: 'Blue', price: 44.99, stock: 34 }
    ],
    features: ['Wireless Charging', '10000mAh', 'Dual Charging']
  },
  {
    id: 'pb-004',
    name: 'Solar Power Bank 30000mAh',
    category: 'power-banks',
    description: 'Rugged solar power bank for outdoor use. Built-in flashlight and compass.',
    basePrice: 49.99,
    rating: 4.4,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    variants: [
      { id: 'pb-004-black', color: 'Black', price: 49.99, stock: 29 },
      { id: 'pb-004-orange', color: 'Orange', price: 49.99, stock: 25 }
    ],
    features: ['Solar Charging', '30000mAh', 'Waterproof']
  },
  {
    id: 'pb-005',
    name: 'MagSafe Power Bank 5000mAh',
    category: 'power-banks',
    description: 'Magnetic wireless power bank that attaches to iPhone. Ultra portable design.',
    basePrice: 39.99,
    rating: 4.7,
    reviews: 2543,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    variants: [
      { id: 'pb-005-black', color: 'Black', price: 39.99, stock: 43 },
      { id: 'pb-005-white', color: 'White', price: 39.99, stock: 39 }
    ],
    features: ['MagSafe Compatible', '5000mAh', 'Ultra Portable']
  },

  // Bluetooth Speakers (4 products x 2 variants = 8)
  {
    id: 'bs-001',
    name: 'Waterproof Bluetooth Speaker',
    category: 'speakers',
    description: 'IPX7 waterproof speaker with 360° sound. 12-hour battery life and powerful bass.',
    basePrice: 69.99,
    rating: 4.7,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    variants: [
      { id: 'bs-001-black', color: 'Black', price: 69.99, stock: 34 },
      { id: 'bs-001-blue', color: 'Blue', price: 69.99, stock: 29 }
    ],
    features: ['IPX7 Waterproof', '360° Sound', '12H Battery']
  },
  {
    id: 'bs-002',
    name: 'Portable Mini Speaker',
    category: 'speakers',
    description: 'Pocket-sized speaker with surprisingly loud sound. Built-in mic for hands-free calls.',
    basePrice: 29.99,
    rating: 4.4,
    reviews: 5432,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    variants: [
      { id: 'bs-002-black', color: 'Black', price: 29.99, stock: 78 },
      { id: 'bs-002-red', color: 'Red', price: 29.99, stock: 64 }
    ],
    features: ['Ultra Portable', 'Loud Sound', 'Built-in Mic']
  },
  {
    id: 'bs-003',
    name: 'Premium Stereo Speaker',
    category: 'speakers',
    description: 'High-fidelity stereo speaker with dual drivers. Connect two for true stereo sound.',
    basePrice: 129.99,
    rating: 4.8,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    variants: [
      { id: 'bs-003-black', color: 'Black', price: 129.99, stock: 18 },
      { id: 'bs-003-white', color: 'White', price: 129.99, stock: 15 }
    ],
    features: ['Hi-Fi Sound', 'Dual Drivers', 'TWS Pairing']
  },
  {
    id: 'bs-004',
    name: 'Smart Speaker with Voice Assistant',
    category: 'speakers',
    description: 'Voice-controlled smart speaker with AI assistant. Stream music and control smart home.',
    basePrice: 89.99,
    rating: 4.6,
    reviews: 2876,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    variants: [
      { id: 'bs-004-black', color: 'Black', price: 89.99, stock: 27 },
      { id: 'bs-004-gray', color: 'Gray', price: 89.99, stock: 23 }
    ],
    features: ['Voice Control', 'AI Assistant', 'Smart Home']
  },

  // Smartwatches (4 products x 2 variants = 8)
  {
    id: 'sw-001',
    name: 'Fitness Tracker Smartwatch',
    category: 'smartwatches',
    description: 'Track heart rate, steps, sleep, and 20+ workout modes. 7-day battery life.',
    basePrice: 79.99,
    rating: 4.5,
    reviews: 4321,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    variants: [
      { id: 'sw-001-black', color: 'Black', price: 79.99, stock: 41 },
      { id: 'sw-001-pink', color: 'Pink', price: 79.99, stock: 37 }
    ],
    features: ['Heart Rate Monitor', '20+ Sports Modes', '7-Day Battery']
  },
  {
    id: 'sw-002',
    name: 'Premium Smartwatch Pro',
    category: 'smartwatches',
    description: 'AMOLED display with GPS and cellular. ECG, blood oxygen, and advanced health tracking.',
    basePrice: 299.99,
    rating: 4.8,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    variants: [
      { id: 'sw-002-black', color: 'Black', price: 299.99, stock: 15 },
      { id: 'sw-002-silver', color: 'Silver', price: 299.99, stock: 12 }
    ],
    features: ['AMOLED Display', 'GPS + Cellular', 'ECG & SpO2']
  },
  {
    id: 'sw-003',
    name: 'Kids Smartwatch GPS',
    category: 'smartwatches',
    description: 'GPS tracking watch for kids. Two-way calling, SOS button, and geofencing.',
    basePrice: 59.99,
    rating: 4.4,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    variants: [
      { id: 'sw-003-blue', color: 'Blue', price: 59.99, stock: 52 },
      { id: 'sw-003-pink', color: 'Pink', price: 59.99, stock: 48 }
    ],
    features: ['GPS Tracking', 'Two-Way Call', 'SOS Button']
  },
  {
    id: 'sw-004',
    name: 'Rugged Outdoor Smartwatch',
    category: 'smartwatches',
    description: 'Military-grade durability with offline maps. Altimeter, compass, and weather alerts.',
    basePrice: 199.99,
    rating: 4.7,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    variants: [
      { id: 'sw-004-black', color: 'Black', price: 199.99, stock: 19 },
      { id: 'sw-004-green', color: 'Green', price: 199.99, stock: 16 }
    ],
    features: ['Military Grade', 'Offline Maps', 'Weather Alerts']
  },

  // Car Accessories (3 products x 2 variants = 6)
  {
    id: 'ca-001',
    name: 'Magnetic Phone Car Mount',
    category: 'car-accessories',
    description: 'Strong magnetic mount for dashboard or vent. 360° rotation and one-hand operation.',
    basePrice: 24.99,
    rating: 4.6,
    reviews: 5432,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
    variants: [
      { id: 'ca-001-black', color: 'Black', price: 24.99, stock: 67 },
      { id: 'ca-001-silver', color: 'Silver', price: 24.99, stock: 59 }
    ],
    features: ['Strong Magnet', '360° Rotation', 'Universal Fit']
  },
  {
    id: 'ca-002',
    name: 'Wireless Car Charger Mount',
    category: 'car-accessories',
    description: '15W fast wireless charging mount with automatic clamping. Vent and dashboard options.',
    basePrice: 39.99,
    rating: 4.7,
    reviews: 3214,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
    variants: [
      { id: 'ca-002-black', color: 'Black', price: 39.99, stock: 43 },
      { id: 'ca-002-white', color: 'White', price: 39.99, stock: 38 }
    ],
    features: ['15W Wireless', 'Auto Clamp', 'Dual Mount']
  },
  {
    id: 'ca-003',
    name: 'Bluetooth FM Transmitter',
    category: 'car-accessories',
    description: 'Stream music via FM radio. Dual USB charging ports and hands-free calling.',
    basePrice: 29.99,
    rating: 4.5,
    reviews: 6543,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
    variants: [
      { id: 'ca-003-black', color: 'Black', price: 29.99, stock: 71 },
      { id: 'ca-003-silver', color: 'Silver', price: 29.99, stock: 64 }
    ],
    features: ['FM Transmitter', 'Bluetooth 5.0', 'USB Charging']
  },

  // Camera Accessories (3 products x 2 variants = 6)
  {
    id: 'cm-001',
    name: 'Smartphone Camera Lens Kit',
    category: 'camera-accessories',
    description: '5-in-1 lens kit: wide angle, macro, fisheye, telephoto, and CPL filter. Universal clip.',
    basePrice: 44.99,
    rating: 4.6,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500',
    variants: [
      { id: 'cm-001-black', color: 'Black', price: 44.99, stock: 34 },
      { id: 'cm-001-silver', color: 'Silver', price: 44.99, stock: 29 }
    ],
    features: ['5-in-1 Kit', 'HD Optical Glass', 'Universal Clip']
  },
  {
    id: 'cm-002',
    name: 'Flexible Phone Tripod',
    category: 'camera-accessories',
    description: 'Flexible legs wrap around objects. Bluetooth remote and phone holder included.',
    basePrice: 29.99,
    rating: 4.5,
    reviews: 4321,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500',
    variants: [
      { id: 'cm-002-black', color: 'Black', price: 29.99, stock: 56 },
      { id: 'cm-002-white', color: 'White', price: 29.99, stock: 48 }
    ],
    features: ['Flexible Legs', 'Bluetooth Remote', 'Phone Holder']
  },
  {
    id: 'cm-003',
    name: 'LED Ring Light for Phones',
    category: 'camera-accessories',
    description: '10-inch ring light with adjustable brightness and color temperature. Phone holder and tripod.',
    basePrice: 49.99,
    rating: 4.7,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500',
    variants: [
      { id: 'cm-003-10inch', color: '10 inch', price: 49.99, stock: 38 },
      { id: 'cm-003-12inch', color: '12 inch', price: 64.99, stock: 31 }
    ],
    features: ['Ring Light', 'Adjustable', 'Tripod Included']
  },

  // Storage Devices (3 products x 2 variants = 6)
  {
    id: 'st-001',
    name: 'USB Flash Drive 128GB',
    category: 'storage',
    description: 'High-speed USB 3.2 flash drive. Compact metal design with keychain hole.',
    basePrice: 24.99,
    rating: 4.5,
    reviews: 5432,
    image: 'https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500',
    variants: [
      { id: 'st-001-128gb', color: '128GB', price: 24.99, stock: 89 },
      { id: 'st-001-256gb', color: '256GB', price: 39.99, stock: 67 }
    ],
    features: ['USB 3.2', 'Metal Design', 'Fast Transfer']
  },
  {
    id: 'st-002',
    name: 'Portable SSD 1TB',
    category: 'storage',
    description: 'Ultra-fast portable SSD with USB-C. Up to 1050MB/s read speed. Compact and durable.',
    basePrice: 129.99,
    rating: 4.8,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500',
    variants: [
      { id: 'st-002-1tb', color: '1TB', price: 129.99, stock: 23 },
      { id: 'st-002-2tb', color: '2TB', price: 229.99, stock: 18 }
    ],
    features: ['1050MB/s Speed', 'USB-C', 'Shockproof']
  },
  {
    id: 'st-003',
    name: 'MicroSD Card 256GB',
    category: 'storage',
    description: 'High-performance microSD with A2 rating. Perfect for phones, cameras, and drones.',
    basePrice: 34.99,
    rating: 4.6,
    reviews: 7654,
    image: 'https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=500',
    variants: [
      { id: 'st-003-256gb', color: '256GB', price: 34.99, stock: 124 },
      { id: 'st-003-512gb', color: '512GB', price: 59.99, stock: 89 }
    ],
    features: ['A2 Rating', 'UHS-I', 'Waterproof']
  }
];

// Helper function to get all products with flattened variants
export const getAllProductsWithVariants = () => {
  const allProducts = [];
  products.forEach(product => {
    product.variants.forEach(variant => {
      allProducts.push({
        ...product,
        variantId: variant.id,
        selectedVariant: variant,
        price: variant.price,
        stock: variant.stock
      });
    });
  });
  return allProducts;
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(p => p.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (categoryId) => {
  return products.filter(p => p.category === categoryId);
};
