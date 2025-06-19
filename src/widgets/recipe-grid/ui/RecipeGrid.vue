<template>
  <div>
    <div class="stats" v-if="!loading">
      Showing {{ recipes.length }} of {{ totalRecipes }} recipes
      <span v-if="favoriteCount > 0">| {{ favoriteCount }} favorites</span>
    </div>
    
    <div v-if="loading" class="loading">
      Loading delicious recipes... 🍽️
    </div>
    
    <div v-else-if="recipes.length === 0" class="no-results">
      No recipes found. Try adjusting your search or filters! 🔍
    </div>
    
    <div v-else class="recipes-grid">
      <RecipeCard 
        v-for="recipe in recipes" 
        :key="recipe.id" 
        :recipe="recipe"
        @click="$emit('select-recipe', recipe)"
      >
        <template #favorite>
          <ToggleFavoriteButton :recipe-id="recipe.id" />
        </template>
      </RecipeCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RecipeCard } from '@/entities/recipe';
import { ToggleFavoriteButton } from '@/features/toggle-favorite';
import type { Recipe } from '@/entities/recipe';

defineProps<{
  recipes: Recipe[];
  totalRecipes: number;
  loading: boolean;
  favoriteCount: number;
}>();

defineEmits<{
  'select-recipe': [recipe: Recipe];
}>();
</script>

<style scoped>
.stats {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.loading {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 50px;
}

.no-results {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  margin: 20px;
}

@media (max-width: 768px) {
  .recipes-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>