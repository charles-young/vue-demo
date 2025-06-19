import { ref } from 'vue';
import { storage } from '@/shared/lib/storage';

const STORAGE_KEY = 'favoriteRecipes';

const favoriteIds = ref<number[]>(storage.get<number[]>(STORAGE_KEY) || []);

export const useFavorites = () => {
  const toggleFavorite = (recipeId: number) => {
    const index = favoriteIds.value.indexOf(recipeId);
    
    if (index > -1) {
      favoriteIds.value.splice(index, 1);
    } else {
      favoriteIds.value.push(recipeId);
    }
    
    storage.set(STORAGE_KEY, favoriteIds.value);
  };

  const isFavorite = (recipeId: number) => {
    return favoriteIds.value.includes(recipeId);
  };

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite
  };
};