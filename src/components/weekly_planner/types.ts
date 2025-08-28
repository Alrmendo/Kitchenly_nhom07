export type Ingredient = { name: string; qty: number; unit?: string };

export type Recipe = {
  id: number;
  name: string;
  time?: string;
  difficulty?: string;
  tags?: string[];
  ingredients: Ingredient[];
};

export type DayPlan = {
  date: string;       
  recipeIds: number[]; 
};

export type WeeklyPlan = {
  days: DayPlan[];
};
