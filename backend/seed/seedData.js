const categories = [
  {
    name: 'Biker Jackets',
    slug: 'biker-jackets',
    description: 'Iconic asymmetrical and café racer silhouettes crafted from premium full-grain leather.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    itemCount: 2,
    isFeatured: true
  },
  {
    name: 'Bomber Jackets',
    slug: 'bomber-jackets',
    description: 'Military-heritage flight jackets reimagined with shearling collars and luxury linings.',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    itemCount: 1,
    isFeatured: true
  },
  {
    name: 'Trench Coats',
    slug: 'trench-coats',
    description: 'Architectural outerwear engineered for tempestuous weather and refined occasions.',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
    itemCount: 2,
    isFeatured: true
  },
  {
    name: 'Leather Blousons',
    slug: 'leather-blousons',
    description: 'Understated minimalist luxury tailored in supple suede and buttery aniline lambskin.',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80',
    itemCount: 2,
    isFeatured: true
  },
  {
    name: 'Puffer Jackets',
    slug: 'puffer-jackets',
    description: 'Ultralight technical goose down baffles encased in Japanese water-repellent ripstop.',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    itemCount: 2,
    isFeatured: true
  },
  {
    name: 'Shearling Aviators',
    slug: 'shearling-aviators',
    description: 'Heavyweight Icelandic fleece and hand-waxed leather crafted for extreme warmth.',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80',
    itemCount: 1,
    isFeatured: true
  }
];

const products = [
  {
    title: 'The Sovereign Double Rider Biker',
    slug: 'the-sovereign-double-rider-biker',
    description: 'The definitive asymmetrical leather motorcycle jacket. Handcrafted from hand-selected 1.2mm Italian full-grain calfskin that molds to your silhouette over time. Features custom antiqued palladium zippers, action-back shoulder gussets for mobility, and a rich quilted cupro interior lining.',
    category: 'Biker Jackets',
    basePrice: 890,
    discountedPrice: 790,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorVariants: [
      {
        name: 'Obsidian Black',
        hex: '#111111',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Oxblood Burgundy',
        hex: '#4A1521',
        image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Vintage Cognac',
        hex: '#6E3B1F',
        image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: '1.2mm Italian Full-Grain Calfskin',
    fit: 'Tailored Slim Fit',
    sku: 'ATN-BKR-001',
    stockQuantity: 14,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 38,
    details: [
      'Hand-finished 1.2mm Italian full-grain calfskin',
      'Antiqued matte palladium zippers with dual-way front closure',
      'Integrated waist belt with engraved Atelier buckle',
      '100% Japanese cupro twill lining with inner welt pocket',
      'Bi-swing back pleats for effortless driving posture'
    ],
    careInstructions: 'Professional leather cleaning only. Store on wide wooden hanger away from heat sources.'
  },
  {
    title: 'Aero Commander Shearling Bomber',
    slug: 'aero-commander-shearling-bomber',
    description: 'Inspired by high-altitude RAF flight jackets of the 1940s. Handcrafted from dense Spanish merino shearling with a plush 18mm wool depth. Bound leather seams, twin buckle collar latches, and heavy-gauge brass closures offer maximum thermal barrier.',
    category: 'Bomber Jackets',
    basePrice: 1250,
    discountedPrice: 1100,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colorVariants: [
      {
        name: 'Espresso Brown',
        hex: '#2B1E16',
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Midnight Charcoal',
        hex: '#1C1D21',
        image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Camel Tan',
        hex: '#966B43',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'Spanish Merino Shearling & Nappa Trims',
    fit: 'Classic Aviator Silhouette',
    sku: 'ATN-BMB-002',
    stockQuantity: 8,
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 22,
    details: [
      'Natural 18mm Spanish merino wool interior fleece',
      'Reinforced exterior seams bound in supple nappa leather',
      'Double collar straps with solid brass roller buckles',
      'Side waist adjusters for adjustable wind protection',
      'Heavy-duty Raccagni brass zip'
    ],
    careInstructions: 'Specialist fur and shearling dry cleaner only.'
  },
  {
    title: 'Westminster Storm Technical Trench',
    slug: 'westminster-storm-technical-trench',
    description: 'An architectural double-breasted trench coat built from weather-resistant triple-weave gabardine twill. Accented with full-grain calfskin cuff straps and storm flap piping. Includes a removable quilted thermal vest for seamless season-to-season transitions.',
    category: 'Trench Coats',
    basePrice: 950,
    discountedPrice: null,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorVariants: [
      {
        name: 'English Khaki',
        hex: '#8B7D6B',
        image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Deep Navy',
        hex: '#121929',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Carbon Black',
        hex: '#1B1B1B',
        image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'Weather-Resistant Gabardine Twill & Leather Trim',
    fit: 'Structured Regular Fit',
    sku: 'ATN-TRN-003',
    stockQuantity: 12,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 19,
    details: [
      'Triple-layer waterproof, breathable cotton-poly gabardine',
      'Hand-stitched leather throat latch and sleeve buckles',
      'Storm shield gun flap with horn button closure',
      'Removable diamond-quilted primaloft liner',
      'Deep welt pockets with secure internal zip compartments'
    ],
    careInstructions: 'Dry clean only. Reproof water repellency every 2 years.'
  },
  {
    title: 'Milano Suede Minimalist Blouson',
    slug: 'milano-suede-minimalist-blouson',
    description: 'The epitome of Italian nonchalance. Cut from velvety split-calf suede tanned in Tuscany, this blouson features a clean band collar, seamless shoulder line, and refined horn buttons. Incredibly lightweight and tactile.',
    category: 'Leather Blousons',
    basePrice: 780,
    discountedPrice: null,
    images: [
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colorVariants: [
      {
        name: 'Sandstone Beige',
        hex: '#A3907C',
        image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Tobacco Brown',
        hex: '#5C3D28',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Slate Grey',
        hex: '#474B4E',
        image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'Ultra-Soft Florentine Suede',
    fit: 'European Modern Tailored',
    sku: 'ATN-BLS-004',
    stockQuantity: 15,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 14,
    details: [
      '0.8mm silky split calfskin suede from Florence',
      'Ribbed virgin wool blend hem and interior cuffs',
      'Genuine smoke mother-of-pearl buttons',
      'Silk-blend partial lining for breathable drapery'
    ],
    careInstructions: 'Protect with suede protector spray. Brush gently with natural crepe brush.'
  },
  {
    title: 'Apex Quilted Down Puffer Jacket',
    slug: 'apex-quilted-down-puffer-jacket',
    description: 'Technical alpine performance meets urban haute couture. Built with matte micro-ripstop shell and stuffed with 800 fill-power European white goose down. Engineered baffled chambers prevent cold spots while maintaining an ultra-sleek silhouette.',
    category: 'Puffer Jackets',
    basePrice: 680,
    discountedPrice: 590,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorVariants: [
      {
        name: 'Matte Onyx',
        hex: '#141416',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Forest Pine',
        hex: '#1B3022',
        image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Titanium Silver',
        hex: '#8A8D91',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'DWR Ripstop Nylon & 800-Fill Goose Down',
    fit: 'Thermal Contoured Fit',
    sku: 'ATN-PUF-005',
    stockQuantity: 20,
    inStock: true,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 31,
    details: [
      'Ethically sourced 90/10 goose down with 800 fill power',
      'Japanese high-density 20D matte nylon shell with DWR finish',
      'AquaGuard water-repellent magnetic zipper closure',
      'Fleece-lined hand warmer pockets and internal media port'
    ],
    careInstructions: 'Machine wash delicate cold with down wash; tumble dry low with wool dryer balls.'
  },
  {
    title: 'Vanguard Heritage Shearling Aviator',
    slug: 'vanguard-heritage-shearling-aviator',
    description: 'An imposing statement piece forged for sub-zero climes. Made from double-faced heavyweight Icelandic sheepskin with hand-waxed exterior patina. Solid iron buckles, dual storm collar, and reinforced kidney panel make this a lifetime heirloom piece.',
    category: 'Shearling Aviators',
    basePrice: 1450,
    discountedPrice: null,
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['M', 'L', 'XL'],
    colorVariants: [
      {
        name: 'Distressed Walnut',
        hex: '#3E2723',
        image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Phantom Black',
        hex: '#0F0F10',
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'Heavyweight Icelandic Shearling',
    fit: 'Heavy Duty Aviator',
    sku: 'ATN-SHR-006',
    stockQuantity: 6,
    inStock: true,
    isFeatured: true,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 16,
    details: [
      '22mm dense curly wool fleece interior',
      'Hand-burnished vegetable tanned outer surface',
      'Gunmetal hardware forged in Birmingham',
      'Heavy-duty storm cuff adjusters'
    ],
    careInstructions: 'Professional leather and shearling restoration only.'
  },
  {
    title: 'Monaco Café Racer Leather Jacket',
    slug: 'monaco-cafe-racer-leather-jacket',
    description: 'Sleek, minimalist, and stripped of excess. The Monaco racer honors Grand Prix heritage with a mandarin snap collar, horizontal chest zip, and pre-curved sleeves engineered for comfort. Finished with subtle tonal leather racing stripes.',
    category: 'Biker Jackets',
    basePrice: 820,
    discountedPrice: null,
    images: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colorVariants: [
      {
        name: 'Jet Black',
        hex: '#0D0D0D',
        image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Caramel Vintage',
        hex: '#7C4724',
        image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Racing British Green',
        hex: '#162B1D',
        image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'Washed Vegetable-Tanned Lambskin',
    fit: 'Streamlined Track Fit',
    sku: 'ATN-BKR-007',
    stockQuantity: 11,
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.7,
    reviewsCount: 26,
    details: [
      '1.0mm glove-tanned French lambskin',
      'Mandarin collar with dual brass snap locks',
      'Articulated elbows with diagonal quilted stitching',
      'Side waist cinch buckles'
    ],
    careInstructions: 'Apply organic beeswax balm annually to preserve patina.'
  },
  {
    title: 'Savile Row Cashmere-Wool Trench Overcoat',
    slug: 'savile-row-cashmere-wool-trench-overcoat',
    description: 'The pinnacle of bespoke formal outerwear. Crafted in London tailoring tradition from 650g heavy cashmere and virgin wool blend. Broad peak lapels, horn buttons, deep central back vent, and a flowing silhouette.',
    category: 'Trench Coats',
    basePrice: 1180,
    discountedPrice: null,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorVariants: [
      {
        name: 'Camel Melange',
        hex: '#B58B55',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Charcoal Herringbone',
        hex: '#292B2E',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Midnight Obsidian',
        hex: '#10131A',
        image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: '90% Virgin Wool / 10% Mongolian Cashmere',
    fit: 'Tailored Double-Breasted',
    sku: 'ATN-TRN-008',
    stockQuantity: 9,
    inStock: true,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 17,
    details: [
      'Hand-padded lapel roll and horsehair canvas chest piece',
      'Real polished Buffalo horn buttons',
      'Silk twill sleeve lining for frictionless gliding over suits',
      'Hidden interior cigar and passport pockets'
    ],
    careInstructions: 'Specialist dry clean only. Steam gently; do not iron directly.'
  },
  {
    title: 'Kensington Zip-Front Lambskin Blouson',
    slug: 'kensington-zip-front-lambskin-blouson',
    description: 'An effortless daily jacket constructed from ultra-lightweight naked lambskin. Featuring a point collar, discreet slash pockets, and gunmetal two-way zipper. As comfortable as a second skin.',
    category: 'Leather Blousons',
    basePrice: 860,
    discountedPrice: 740,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    colorVariants: [
      {
        name: 'Dark Espresso',
        hex: '#241611',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Vintage Navy',
        hex: '#1A233A',
        image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'Full-Aniline Buttery Soft Lambskin',
    fit: 'Sleek Athletic Fit',
    sku: 'ATN-BLS-009',
    stockQuantity: 16,
    inStock: true,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 20,
    details: [
      'Uncorrected natural grain with silky hand feel',
      'Signature engraved pullers',
      'Elasticized rear waistband detail',
      'Breathable Bemberg lining'
    ],
    careInstructions: 'Clean with damp microfiber cloth and neutral leather cream.'
  },
  {
    title: 'Nordic Expedition Arctic Puffer',
    slug: 'nordic-expedition-arctic-puffer',
    description: 'Architected for sub-zero exploration. Features an insulated storm hood, waterproof welded seams, and high-tenacity Cordura shoulder panels to resist abrasion. Currently archived in limited release.',
    category: 'Puffer Jackets',
    basePrice: 720,
    discountedPrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorVariants: [
      {
        name: 'Glacier White',
        hex: '#E5E7EB',
        image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Carbon Graphite',
        hex: '#262626',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Alpine Blue',
        hex: '#1E3A5F',
        image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    material: 'Waterproof Micro-Ripstop with Thermal Baffles',
    fit: 'Ergonomic Winter Fit',
    sku: 'ATN-PUF-010',
    stockQuantity: 0,
    inStock: false,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 25,
    details: [
      'Hydrophobic 850 fill goose down',
      'Reinforced Cordura ballistics shoulder patches',
      'Removable storm face mask and internal snow skirt',
      'Reflective tonal 3M branding on cuff'
    ],
    careInstructions: 'Spot clean outer shell; professional down cleaning only.'
  }
];

const sampleOrders = [
  {
    orderNumber: 'ATN-ORD-1082',
    customerName: 'Marcus Sterling',
    customerPhone: '+1 (555) 234-9812',
    customerEmail: 'm.sterling@example.com',
    shippingAddress: '432 Park Avenue, Penthouse 64B, New York, NY 10022',
    items: [
      {
        title: 'The Sovereign Double Rider Biker',
        sku: 'ATN-BKR-001',
        color: 'Obsidian Black',
        size: 'L',
        quantity: 1,
        price: 790,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80'
      }
    ],
    totalAmount: 790,
    status: 'Confirmed via WhatsApp',
    orderType: 'WhatsApp Direct',
    whatsappMessage: 'Client Marcus Sterling confirmed order for The Sovereign Double Rider Biker (Size L, Obsidian Black). Expedited courier requested.'
  },
  {
    orderNumber: 'ATN-ORD-1083',
    customerName: 'Elena Rostova',
    customerPhone: '+44 7700 900451',
    customerEmail: 'elena.rostova@mayfair.co.uk',
    shippingAddress: '14 Berkeley Square, Mayfair, London W1J 6BL, UK',
    items: [
      {
        title: 'Aero Commander Shearling Bomber',
        sku: 'ATN-BMB-002',
        color: 'Espresso Brown',
        size: 'M',
        quantity: 1,
        price: 1100,
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=500&q=80'
      }
    ],
    totalAmount: 1100,
    status: 'In Tailoring',
    orderType: 'WhatsApp Direct',
    whatsappMessage: 'Elena confirmed Aero Commander Bomber in Espresso Brown (M). Tailor checking sleeve measurement.'
  },
  {
    orderNumber: 'ATN-ORD-1084',
    customerName: 'Henri Dubois',
    customerPhone: '+33 6 12 34 56 78',
    customerEmail: 'henri.dubois@luxeparis.fr',
    shippingAddress: '28 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
    items: [
      {
        title: 'Savile Row Cashmere-Wool Trench Overcoat',
        sku: 'ATN-TRN-008',
        color: 'Camel Melange',
        size: 'XL',
        quantity: 1,
        price: 1180,
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80'
      }
    ],
    totalAmount: 1180,
    status: 'Pending Concierge Verification',
    orderType: 'WhatsApp Direct',
    whatsappMessage: 'Inquiry received via website WhatsApp CTA. Awaiting sizing confirmation for chest 42".'
  }
];

module.exports = { categories, products, sampleOrders };
