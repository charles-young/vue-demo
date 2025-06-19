export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export type SortOption = 'name' | 'rating' | 'cookTime' | 'difficulty' | 'newest';

export interface SortConfig {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortConfig[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'cookTime', label: 'Quickest First' },
  { value: 'difficulty', label: 'Easiest First' }
];