export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  calories?: number;
  protein?: number;
  badge?: string;
}

export const products: Product[] = [
  // Bebidas Funcionais - Energia
  {
    id: "1",
    name: "Chá NRG",
    description: "Bebida à base de chá preto e guaraná, ótima fonte de cafeína e guaraná. Dá mais energia e disposição. Aprox. 0 kcal.",
    price: 7.00,
    category: "Bebidas Funcionais",
    subcategory: "Energia",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
    calories: 0,
  },
  {
    id: "2",
    name: "Chá Herbal",
    description: "Bebida à base de chá verde, chá preto e ervas aromáticas. Acelera o metabolismo.",
    price: 7.00,
    category: "Bebidas Funcionais",
    subcategory: "Energia",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
  },
  {
    id: "3",
    name: "Chá NRG + Chá Herbal",
    description: "Fonte de cafeína, guaraná, chá verde e chá preto. Dá mais energia, disposição e acelera o metabolismo.",
    price: 14.00,
    category: "Bebidas Funcionais",
    subcategory: "Combo",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
  },
  {
    id: "4",
    name: "Fiber Drink",
    description: "Bebida à base de fibra. Sabores: manga, uva ou limão e mel — com água com gás.",
    price: 21.00,
    category: "Bebidas Funcionais",
    subcategory: "Energia",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
  },
  {
    id: "5",
    name: "Mega Tea",
    description: "Contém chá NRG + chá Herbal + fibra. Sabores: manga, uva ou limão e mel.",
    price: 21.00,
    category: "Bebidas Funcionais",
    subcategory: "Energia",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
  },
  // Bebidas Funcionais - Detox
  {
    id: "6",
    name: "Sunset Drink",
    description: "Bebida detox que diminui a retenção, acelera o metabolismo e melhora o funcionamento do intestino. Aprox. 20 kcal.",
    price: 30.00,
    category: "Bebidas Funcionais",
    subcategory: "Detox",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/885ff5f36_WhatsAppImage2026-05-16at162335.jpg",
    calories: 20,
    badge: "#2 Mais Pedido",
  },
  {
    id: "7",
    name: "Litrão Detox",
    description: "Bebida detox que diminui a retenção, acelera o metabolismo e melhora o funcionamento do intestino. Aprox. 20 kcal.",
    price: 30.00,
    category: "Bebidas Funcionais",
    subcategory: "Detox",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
    calories: 20,
  },
  {
    id: "8",
    name: "Shot da Imunidade",
    description: "Fortalece o sistema imunológico, diminui a retenção de líquidos e melhora o sistema imunológico.",
    price: 21.00,
    category: "Bebidas Funcionais",
    subcategory: "Detox",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
  },
  {
    id: "9",
    name: "Beauty Drink",
    description: "Bebida à base de colágeno, whey, vitaminas e minerais. Sabor: frutas vermelhas.",
    price: 25.00,
    category: "Bebidas Funcionais",
    subcategory: "Detox",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
    calories: 43,
    protein: 84,
  },
  {
    id: "10",
    name: "Whey Protein",
    description: "Sabor baunilha. Rica em proteína, ideal para o pós-treino.",
    price: 30.00,
    category: "Bebidas Funcionais",
    subcategory: "Detox",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
    calories: 128,
    protein: 25,
  },
  // Shakes Proteicos
  {
    id: "11",
    name: "Shake Trufado Prestígio",
    description: "O queridinho! Shake cremoso sabor prestígio com borda trufada especial.",
    price: 35.00,
    category: "Shakes Proteicos",
    subcategory: "Premium",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/885ff5f36_WhatsAppImage2026-05-16at162335.jpg",
    badge: "#1 Mais Pedido",
  },
  {
    id: "12",
    name: "Shake Tópissimo",
    description: "Sabor à escolha + Waffle Quentinho",
    price: 69.00,
    category: "Shakes Proteicos",
    subcategory: "Premium",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
  },
  // Salgados Proteicos
  {
    id: "13",
    name: "Waffle Sobremesa",
    description: "Waffle proteico com sorvete, calda de frutas vermelhas e borda crocante.",
    price: 32.00,
    category: "Salgados Proteicos",
    subcategory: "Waffles",
    image: "https://media.base44.com/images/public/6a08c3ca1ef36ec77508a4d3/8d69960e7_generated_acc3aa78.png",
    badge: "#3 Mais Pedido",
  },
];

export const categories = [
  "Bebidas Funcionais",
  "Shakes Proteicos",
  "Salgados Proteicos",
  "Sobremesas Proteicas",
  "Combos",
];

export const topProducts = products.filter(p => p.badge);
