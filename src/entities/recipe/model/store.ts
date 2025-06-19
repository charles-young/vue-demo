import { ref, computed } from 'vue';
import type { Recipe } from './types';
import { recipeApi } from '../api/recipeApi';

const recipes = ref<Recipe[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const useRecipeStore = () => {
  const fetchRecipes = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const data = await recipeApi.getRecipes();
      recipes.value = data.recipes;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch recipes';
    } finally {
      loading.value = false;
    }
  };

  const cuisines = computed(() => {
    const uniqueCuisines = [...new Set(recipes.value.map(recipe => recipe.cuisine))];
    return uniqueCuisines.sort();
  });

  return {
    recipes,
    loading,
    error,
    cuisines,
    fetchRecipes
  };
};

export const __resetRecipeStore = () => {
  recipes.value = []
  loading.value = false
  error.value = null
}
