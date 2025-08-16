// For dropdown options
export const UNIT_OPTIONS = [
  { value: "", label: "Trống" },
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
  { value: "mg", label: "mg" },
  { value: "ml", label: "ml" },
  { value: "l", label: "l" },
];

export const getUnitDropdownOptions = () => UNIT_OPTIONS;

export interface FoodCategory {
  id: string;
  label: string;
  icon: string;
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: "rau-cu-qua",
    label: "Rau củ quả",
    icon: "🥕",
  },
  {
    id: "thit-ca-hai-san",
    label: "Thịt, cá, hải sản",
    icon: "🐟",
  },
  {
    id: "sua-trung-pho-mai",
    label: "Sữa, trứng, phô mai",
    icon: "🥛",
  },
  {
    id: "gao-bun-my",
    label: "Gạo, bún, mỳ",
    icon: "🍚",
  },
  {
    id: "dau-hat-do-kho",
    label: "Đậu, hạt, đồ khô",
    icon: "🫘",
  },
  {
    id: "gia-vi-tuong",
    label: "Gia vị, tương",
    icon: "🧂",
  },
  {
    id: "dau-an-mo-thuc-vat",
    label: "Dầu ăn, mỡ thực vật",
    icon: "🫒",
  },
  {
    id: "do-uong-nuoc-dung",
    label: "Đồ uống, nước dùng",
    icon: "🥤",
  },
];

// Create convenient lookup maps
export const CATEGORY_MAP = FOOD_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = category.label;
    return acc;
  },
  {} as Record<string, string>
);

export const CATEGORY_ICON_MAP = FOOD_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = category.icon;
    return acc;
  },
  {} as Record<string, string>
);

export const CATEGORY_LABEL_TO_ID_MAP = FOOD_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.label] = category.id;
    return acc;
  },
  {} as Record<string, string>
);

// Helper functions
export const getCategoryLabel = (categoryId: string): string => {
  return CATEGORY_MAP[categoryId] || "Khác";
};

export const getCategoryIcon = (categoryId: string): string => {
  return CATEGORY_ICON_MAP[categoryId] || "🍽️";
};

export const getCategoryId = (categoryLabel: string): string => {
  return CATEGORY_LABEL_TO_ID_MAP[categoryLabel] || "";
};

// For dropdown options
export const getCategoryDropdownOptions = () => {
  return FOOD_CATEGORIES.map((category) => ({
    value: category.id,
    label: category.label,
  }));
};
