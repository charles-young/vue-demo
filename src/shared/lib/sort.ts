import type { Recipe, SortOption } from '@/entities/recipe';

export const sortRecipes = (recipes: Recipe[], sortBy: SortOption): Recipe[] => {
  const sorted = [...recipes];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'cookTime':
      return sorted.sort((a, b) => 
        (a.cookTimeMinutes + a.prepTimeMinutes) - (b.cookTimeMinutes + b.prepTimeMinutes)
      );
    
    case 'difficulty':
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return sorted.sort((a, b) => 
        difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    
    case 'newest':
    default:
      // Assuming higher ID means newer recipe
      return sorted.sort((a, b) => b.id - a.id);
  }
};