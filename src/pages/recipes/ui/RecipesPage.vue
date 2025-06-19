<template>
  <div class="app">
    <div class="header">
      <h1>🍳 Recipe Discovery</h1>
      <p>Discover amazing recipes from around the world</p>
    </div>
    
    <RecipeFilters
      v-model:search-query="searchQuery"
      v-model:selected-cuisine="selectedCuisine"
      v-model:selected-difficulty="selectedDifficulty"
      v-model:sort-by="sortBy"
      v-model:favorites-only="favoritesOnly"
      :cuisines="cuisines"
    />
    
    <RecipeGrid
      :recipes="sortedAndFilteredRecipes"
      :total-recipes="recipes.length"
      :loading="loading"
      :favorite-count="favoriteIds.length"
      @select-recipe="selectedRecipe = $event"
    />
    
    <ViewRecipeModal
      :recipe="selectedRecipe"
      v-model:is-open="isModalOpen"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRecipeStore } from '@/entities/recipe';
import { useFavorites } from '@/features/toggle-favorite';
import { RecipeFilters } from '@/widgets/recipe-filters';
import { RecipeGrid } from '@/widgets/recipe-grid';
import { ViewRecipeModal } from '@/features/view-recipe';
import { sortRecipes } from '@/shared/lib/sort';
import type { Recipe, SortOption } from '@/entities/recipe';

const { recipes, loading, cuisines, fetchRecipes } = useRecipeStore();
const { favoriteIds } = useFavorites();

const searchQuery = ref('');
const selectedCuisine = ref('');
const selectedDifficulty = ref('');
const selectedRecipe = ref<Recipe | null>(null);
const sortBy = ref<SortOption>('newest');
const favoritesOnly = ref<boolean>(false);

const isModalOpen = computed({
  get: () => selectedRecipe.value !== null,
  set: (value) => {
    if (!value) selectedRecipe.value = null;
  }
});

const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        recipe.ingredients.some(ingredient => 
                          ingredient.toLowerCase().includes(searchQuery.value.toLowerCase())
                        );
    const matchesCuisine = !selectedCuisine.value || recipe.cuisine === selectedCuisine.value;
    const matchesDifficulty = !selectedDifficulty.value || recipe.difficulty === selectedDifficulty.value;
    const matchesFavoriteFilter = favoritesOnly.value ? favoriteIds.value.includes(recipe.id) : true;
    
    return matchesSearch && matchesCuisine && matchesDifficulty && matchesFavoriteFilter;
  });
});

const sortedAndFilteredRecipes = computed(() => {
  return sortRecipes(filteredRecipes.value, sortBy.value);
});

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && selectedRecipe.value) {
    selectedRecipe.value = null;
  }
};

onMounted(() => {
  fetchRecipes();
  document.addEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
}
</style>