// data.js

// Products based on your provided table
export const products = [
  {
    id: 1,
    name: 'Cheetah Table',
    subtitle: 'Ascent Table',
    designer: 'By Gilt Wilds Studio',
    itemCode: 'GW-CHEETAH-01',
    cat: 'furniture',
    col: 'pride',
    desc: 'An extraordinary accent table featuring a majestic cheetah...',
    dims: '56 x 46 cm',
    colors: ['#C9A961', '#8B7355', '#2C2C2C'],
    images: [
      'https://i.postimg.cc/J7sMwFsk/cheetah-table-491f2ce4de188a6259e6.png',
      'https://i.postimg.cc/3rkvzNwL/Close-up-Cheetah.jpg',
      'https://i.postimg.cc/h4XdNvGM/Front-View-Cheetah.jpg',
      'https://i.postimg.cc/h4XdNvGZ/Side-View-Cheetah.jpg',
      'https://i.postimg.cc/T2KDB1PJ/Back-Image-Cheetah.jpg',
      'https://i.postimg.cc/7P52jhLQ/Top-View-Cheetah.jpg'
    ],
    alt: 'Cheetah Table – hand-cast brass accent table'
  },
  {
    id: 2,
    name: 'Crocodile Table',
    subtitle: 'Ascent Table',
    designer: 'By Gilt Wilds Studio',
    itemCode: 'GW-CROCODILE-02',
    cat: 'furniture',
    col: 'savannah',
    desc: 'A bold statement piece featuring a coiled crocodile...',
    dims: '51 x 53 x 46 cm',
    colors: ['#C9A961', '#8B7355'],
    images: [
      'https://i.postimg.cc/k4B3mVg3/crocodile-table.png',
      'https://i.postimg.cc/BQWXyCkJ/Top-view.jpg'
    ],
    alt: 'Crocodile Table – textured brass side table'
  },
  // Add remaining products (Elephant, Falcon, Giraffe, Leopard, Monkey, Sea Horse, Snake, Starfish) similarly...
  // For brevity, only two are shown; follow the same pattern.
];

// Categories (used for filtering)
export const categories = {
  all: 'All Products',
  furniture: 'Furniture',
  lighting: 'Lighting',
  sculpture: 'Sculpture',
  accessories: 'Accessories'
};

// Collections (if needed for collection pages)
export const collections = {
  pride: {
    name: 'Royal Indian Collection',
    description: 'Majestic pieces inspired by India’s regal heritage...',
    image: 'path-to-image.png'  // you can use a placeholder or actual collection image
  },
  savannah: { name: 'Wilderness Series', description: '...' },
  exotic: { name: 'Artisan Collection', description: '...' },
  limited: { name: 'Limited Editions', description: '...' }
};
