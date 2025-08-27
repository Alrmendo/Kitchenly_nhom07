import type { Recipe } from "./types";

export const RECIPES: Recipe[] = [
  // 1
  {
    id: 1,
    name: "Grilled Chicken Salad",
    time: "25 min",
    difficulty: "Medium",
    tags: ["Low-carb", "High-protein"],
    ingredients: [
      { name: "Dưa leo", qty: 1, unit: "quả" },
      { name: "Giấm balsamic", qty: 15, unit: "ml" },
    ],
  },
  // 2
  {
    id: 2,
    name: "Vegetarian Stir Fry",
    time: "20 min",
    difficulty: "Easy",
    tags: ["Vegan", "Low-salt"],
    ingredients: [
      { name: "Nấm", qty: 200, unit: "g" },
    ],
  },
  // 3
  {
    id: 3,
    name: "Overnight Oats",
    time: "5 min",
    difficulty: "Easy",
    tags: ["Vegetarian", "High-fiber"],
    ingredients: [
      { name: "Yến mạch", qty: 60, unit: "g" },
      { name: "Sữa hạnh nhân", qty: 200, unit: "ml" },
      { name: "Chuối", qty: 1, unit: "quả" },
      { name: "Hạt chia", qty: 1, unit: "tbsp" },
    ],
  },
  // 4
  {
    id: 4,
    name: "Salmon Teriyaki",
    time: "30 min",
    difficulty: "Medium",
    tags: ["Low-carb", "Omega-3"],
    ingredients: [
      { name: "Cá hồi phi lê", qty: 2, unit: "miếng" },
      { name: "Nước tương Teriyaki", qty: 60, unit: "ml" },
      { name: "Gừng", qty: 1, unit: "tsp" },
      { name: "Tỏi", qty: 2, unit: "tép" },
    ],
  },
  // 5
  {
    id: 5,
    name: "Quinoa Buddha Bowl",
    time: "35 min",
    difficulty: "Medium",
    tags: ["Vegan", "High-protein"],
    ingredients: [
      { name: "Hạt quinoa", qty: 100, unit: "g" },
    ],
  },
  // 6
  {
    id: 6,
    name: "Greek Yogurt Parfait",
    time: "5 min",
    difficulty: "Easy",
    tags: ["Vegetarian", "High-protein"],
    ingredients: [
      { name: "Sữa chua Hy Lạp", qty: 200, unit: "g" },
      { name: "Granola", qty: 50, unit: "g" },
      { name: "Dâu tây", qty: 100, unit: "g" },
      { name: "Mật ong", qty: 1, unit: "tbsp" },
    ],
  },
  // 7
  {
    id: 7,
    name: "Turkey Wrap",
    time: "10 min",
    difficulty: "Easy",
    tags: ["High-protein", "Low-fat"],
    ingredients: [
      { name: "Bánh tortilla", qty: 2, unit: "cái" },
      { name: "Thịt gà", qty: 100, unit: "g" },
      { name: "Cà chua", qty: 1, unit: "quả" },
      { name: "Phô mai lát", qty: 2, unit: "lát" },
    ],
  },
  // 8
  {
    id: 8,
    name: "Mushroom Risotto",
    time: "45 min",
    difficulty: "Hard",
    tags: ["Vegetarian"],
    ingredients: [
      { name: "Nấm mỡ", qty: 200, unit: "g" },
      { name: "Rượu trắng", qty: 60, unit: "ml" },
      { name: "Bơ lạt", qty: 20, unit: "g" },
    ],
  },
  // 9
  {
    id: 9,
    name: "Avocado Toast",
    time: "10 min",
    difficulty: "Easy",
    tags: ["All-day", "Vegan"],
    ingredients: [
      { name: "Bánh mì", qty: 2, unit: "lát" },
      { name: "Chanh", qty: 1, unit: "miếng" },
    ],
  },
  // 10
  {
    id: 10,
    name: "Shrimp Tacos",
    time: "20 min",
    difficulty: "Easy",
    tags: ["Seafood", "Quick"],
    ingredients: [
      { name: "Tôm", qty: 200, unit: "g" },
      { name: "Sốt mayo", qty: 2, unit: "tbsp" },
      { name: "Ngò rí", qty: 1, unit: "nhánh" },
    ],
  },
  // 11
  {
    id: 11,
    name: "Beef Bulgogi Bowl",
    time: "30 min",
    difficulty: "Medium",
    tags: ["High-protein", "Asian"],
    ingredients: [
      { name: "Thịt bò", qty: 250, unit: "g" },
      { name: "Nước tương", qty: 40, unit: "ml" },
      { name: "Đường nâu", qty: 1, unit: "tbsp" },
    ],
  },
  // 12
  {
    id: 12,
    name: "Tofu Curry",
    time: "30 min",
    difficulty: "Medium",
    tags: ["Vegan", "Spiced"],
    ingredients: [
      { name: "Nước cốt dừa", qty: 200, unit: "ml" },
      { name: "Khoai tây", qty: 1, unit: "củ" },
    ],
  },
  // 13
  {
    id: 13,
    name: "Caprese Sandwich",
    time: "10 min",
    difficulty: "Easy",
    tags: ["Vegetarian", "All-day"],
    ingredients: [
      { name: "Phô mai mozzarella", qty: 80, unit: "g" },
      { name: "Lá húng quế", qty: 1, unit: "nắm" },
      { name: "Balsamic", qty: 10, unit: "ml" },
    ],
  },
  // 14
  {
    id: 14,
    name: "Pesto Pasta",
    time: "20 min",
    difficulty: "Easy",
    tags: ["Vegetarian", "Comfort"],
    ingredients: [
      { name: "Mì ý", qty: 160, unit: "g" },
      { name: "Xốt pesto", qty: 3, unit: "tbsp" },
      { name: "Muối", qty: 1, unit: "nhúm" },
    ],
  },
  // 15
  {
    id: 15,
    name: "Lentil Soup",
    time: "35 min",
    difficulty: "Easy",
    tags: ["Vegan", "High-fiber"],
    ingredients: [
      { name: "Đậu lăng khô", qty: 150, unit: "g" },
      { name: "Lá nguyệt quế", qty: 1, unit: "lá" },
    ],
  },
  // 16
  {
    id: 16,
    name: "Chicken Pho",
    time: "45 min",
    difficulty: "Medium",
    tags: ["Low-fat", "Asian"],
    ingredients: [
      { name: "Ức gà", qty: 300, unit: "g" },
      { name: "Bánh phở", qty: 200, unit: "g" },
      { name: "Nước mắm", qty: 1, unit: "tbsp" },
    ],
  },
  // 17
  {
    id: 17,
    name: "Baked Sweet Potato",
    time: "40 min",
    difficulty: "Easy",
    tags: ["Vegetarian", "Fiber"],
    ingredients: [
      { name: "Khoai lang", qty: 2, unit: "củ" },
      { name: "Tiêu đen", qty: 1, unit: "nhúm" },
    ],
  },
  // 18
  {
    id: 18,
    name: "Caesar Salad",
    time: "15 min",
    difficulty: "Easy",
    tags: ["Low-carb", "Quick"],
    ingredients: [
      { name: "Xà lách Romaine", qty: 1, unit: "bó" },
      { name: "Gà nướng", qty: 200, unit: "g" },
      { name: "Bánh mì nướng (croutons)", qty: 50, unit: "g" },
    ],
  },
  // 19
  {
    id: 19,
    name: "Shakshuka",
    time: "25 min",
    difficulty: "Easy",
    tags: ["Eggs", "Brunch"],
    ingredients: [
      { name: "Ớt chuông", qty: 1, unit: "quả" },
      { name: "Bột paprika", qty: 1, unit: "tsp" },
    ],
  },
  // 20
  {
    id: 20,
    name: "Tuna Poke Bowl",
    time: "20 min",
    difficulty: "Medium",
    tags: ["Seafood", "High-protein"],
    ingredients: [
      { name: "Cá ngừ sashimi", qty: 200, unit: "g" },
      { name: "Dầu mè", qty: 1, unit: "tsp" },
      { name: "Rong biển khô", qty: 1, unit: "ít" },
      { name: "Mè rang", qty: 1, unit: "tsp" },
    ],
  },
  // 21
  {
    id: 21,
    name: "Egg Fried Rice",
    time: "15 min",
    difficulty: "Easy",
    tags: ["Quick", "Comfort"],
    ingredients: [
      { name: "Gạo", qty: 2, unit: "chén" },
      { name: "Trứng gà", qty: 2, unit: "quả" },
      { name: "Đậu Hà Lan", qty: 80, unit: "g" },
      { name: "Hành lá", qty: 2, unit: "nhánh" },
      { name: "Xì dầu", qty: 20, unit: "ml" },
      { name: "Dầu ăn", qty: 15, unit: "ml" },
    ],
  },
];

export const RECIPES_BY_ID = new Map(RECIPES.map((r) => [r.id, r]));
