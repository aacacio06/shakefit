export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  image?: string;
  calories?: string;
  protein?: string;
  carbs?: string;
  fiber?: string;
  flavors?: string[];
  badge?: string;
}

// Adicionais
export const adicionais: Product[] = [
  {
    id: "add-1",
    name: "Borda Trufada",
    description: "Borda para shake",
    price: 10.00,
    category: "Adicionais",
    calories: "97",
    protein: "10g",
    carbs: "10g",
  },
  {
    id: "add-2",
    name: "Calda de Fibras",
    description: "Sabores: manga, uva ou limão com mel",
    price: 10.00,
    category: "Adicionais",
    calories: "8",
    fiber: "5g",
  },
  {
    id: "add-3",
    name: "Protein Crunch",
    description: "Sabor chocolate (1/2 porção)",
    price: 5.00,
    category: "Adicionais",
    calories: "18",
    protein: "3,5g",
    carbs: "0,7g",
    fiber: "2,8g",
  },
  {
    id: "add-4",
    name: "Whey",
    description: "Sabor baunilha (1 scoop)",
    price: 10.00,
    category: "Adicionais",
    calories: "41",
    protein: "8,3g",
    carbs: "1g",
  },
  {
    id: "add-5",
    name: "Colágeno",
    description: "Sabor frutas vermelhas (1/2 porção)",
    price: 10.00,
    category: "Adicionais",
    calories: "21,5",
    protein: "4,2g",
  },
  {
    id: "add-6",
    name: "Onactive",
    description: "Sabor chocolate (1/2 porção)",
    price: 10.00,
    category: "Adicionais",
    calories: "41",
    protein: "4,5g",
  },
];

// Shakes Proteicos
const shakesTrufadoFlavors = [
  "Prestígio",
  "Brigadeiro",
  "Salada de Frutas",
  "Cocada de Limão",
  "Pink Lemonade",
  "Pina Colada",
  "Flocos",
  "Churros",
  "Banoffe",
  "Pistache",
  "Choco Pistache",
  "Beijinho",
  "Sensação",
  "Delícia de Abacaxi",
  "Cocada",
  "Moranguinho",
  "Dois Amores",
  "Morangoffe",
];

const shakesTopFlavors = [
  "Top Pão de Mel",
  "Frutas Amarelas",
  "Banana Split",
  "Torta de Limão Crunch",
  "Abacaxi Tropical",
  "Moranguinho Crunch",
  "Bubbaloo",
  "Chocolatudo Crunch",
  "Óreo",
  "Laka Óreo",
  "Top Sundae",
  "Mousse de Limão",
  "Amarena",
  "Prestígio Crunch",
  "Pink Shake",
  "Floresta Negra",
  "Choquito",
];

export const products: Product[] = [
  // Shakes Proteicos - Shake Trufado
  {
    id: "shake-trufado",
    name: "Shake Trufado",
    description: "Shake Trufado com diversos sabores",
    price: 35.00,
    category: "Shakes Proteicos",
    flavors: shakesTrufadoFlavors,
    image: "/manus-storage/page-2_dc1b4dd5.png",
    badge: "#1 Mais Pedido",
  },

  // Shakes Proteicos - Shake Top
  {
    id: "shake-top",
    name: "Shake Top",
    description: "Shake Top com diversos sabores",
    price: 45.00,
    category: "Shakes Proteicos",
    flavors: shakesTopFlavors,
    image: "/manus-storage/page-2_dc1b4dd5.png",
  },

  // Shake Tópissimo
  {
    id: "shake-topissimo",
    name: "Shake Tópissimo",
    description: "Sabor à escolha + Waffle quentinho incluso",
    price: 69.00,
    category: "Shakes Proteicos",
    flavors: [...shakesTrufadoFlavors, ...shakesTopFlavors],
    image: "/manus-storage/page-4_505dc15f.png",
    badge: "#3 Mais Pedido",
  },

  // Shake Tradicional
  {
    id: "shake-tradicional",
    name: "Shake Tradicional",
    description: "Shake cremoso ou quente",
    price: 25.00,
    category: "Shakes Proteicos",
    calories: "205",
    protein: "19g",
    carbs: "22g",
    fiber: "6g",
  },

  // Bebidas Funcionais
  {
    id: "cha-nrg",
    name: "Chá NRG",
    description: "Bebida à base de chá preto e guaraná, ótima fonte de cafeína e guaraná. Dá mais energia e disposição.",
    price: 7.00,
    category: "Bebidas Funcionais",
    calories: "0",
  },
  {
    id: "cha-herbal",
    name: "Chá Herbal",
    description: "Bebida à base de chá verde, chá preto e ervas aromáticas. Acelera o metabolismo.",
    price: 7.00,
    category: "Bebidas Funcionais",
  },
  {
    id: "cha-nrg-herbal",
    name: "Chá NRG + Chá Herbal",
    description: "Fonte de cafeína, guaraná, chá verde e chá preto. Dá mais energia, disposição e acelera o metabolismo.",
    price: 14.00,
    category: "Bebidas Funcionais",
  },
  {
    id: "fiber-drink",
    name: "Fiber Drink",
    description: "Bebida à base de fibra. Sabores: manga, uva ou limão e mel — com água com gás.",
    price: 21.00,
    category: "Bebidas Funcionais",
  },
  {
    id: "mega-tea",
    name: "Mega Tea",
    description: "Contém chá NRG + chá Herbal + fibra. Sabores: manga, uva ou limão e mel.",
    price: 21.00,
    category: "Bebidas Funcionais",
  },
  {
    id: "sunset-drink",
    name: "Sunset Drink",
    description: "Bebida detox que diminui a retenção, acelera o metabolismo e melhora o funcionamento do intestino.",
    price: 30.00,
    category: "Bebidas Funcionais",
    calories: "20",
    image: "/manus-storage/page-2_dc1b4dd5.png",
    badge: "#2 Mais Pedido",
  },
  {
    id: "litrao-detox",
    name: "Litrão Detox",
    description: "Bebida detox que diminui a retenção, acelera o metabolismo e melhora o funcionamento do intestino.",
    price: 30.00,
    category: "Bebidas Funcionais",
    calories: "20",
  },
  {
    id: "shot-imunidade",
    name: "Shot da Imunidade",
    description: "Fortalece o sistema imunológico, diminui a retenção de líquidos e melhora o sistema imunológico.",
    price: 21.00,
    category: "Bebidas Funcionais",
  },
  {
    id: "beauty-drink",
    name: "Beauty Drink",
    description: "Bebida à base de colágeno, whey, vitaminas e minerais. Sabor: frutas vermelhas.",
    price: 25.00,
    category: "Bebidas Funcionais",
    calories: "43",
    protein: "84g",
    carbs: "23g",
  },
  {
    id: "whey-protein",
    name: "Whey Protein",
    description: "Sabor baunilha.",
    price: 30.00,
    category: "Bebidas Funcionais",
    calories: "128",
    protein: "25g",
    carbs: "3,3g",
  },
];

export const categories = [
  "Shakes Proteicos",
  "Bebidas Funcionais",
  "Salgados Proteicos",
  "Sobremesas Proteicas",
  "Combos",
];

export const topProducts = [
  products.find(p => p.id === "shake-trufado"),
  products.find(p => p.id === "shake-top"),
  products.find(p => p.id === "sunset-drink"),
].filter(Boolean);
