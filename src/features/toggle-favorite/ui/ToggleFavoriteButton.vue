<template>
  <button 
    class="favorite-btn" 
    @click.stop="handleClick"
    :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
  >
    {{ isFavorite ? '❤️' : '🤍' }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavorites } from '../model/favorites';

const props = defineProps<{
  recipeId: number;
}>();

const { toggleFavorite, isFavorite: checkIsFavorite } = useFavorites();

const isFavorite = computed(() => checkIsFavorite(props.recipeId));

const handleClick = () => {
  toggleFavorite(props.recipeId);
};
</script>

<style scoped>
.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
}
</style>