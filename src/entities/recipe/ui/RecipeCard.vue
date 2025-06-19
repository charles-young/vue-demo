<template>
  <article class="recipe-card" @click="$emit('click', recipe)">
    <img :src="recipe.image" :alt="recipe.name" class="recipe-image">
    <div class="favorite-slot">
      <slot name="favorite" />
    </div>
    <div class="recipe-content">
      <h3 class="recipe-title">{{ recipe.name }}</h3>
      <div class="recipe-meta">
        <div class="meta-item">
          <span>⏱️</span>
          <span>{{ totalTime }} min</span>
        </div>
        <div class="meta-item">
          <span>👥</span>
          <span>{{ recipe.servings }} servings</span>
        </div>
        <div class="meta-item">
          <span>⭐</span>
          <span>{{ recipe.rating }}/5</span>
        </div>
      </div>
      <div class="recipe-meta">
        <span class="cuisine-tag">{{ recipe.cuisine }}</span>
        <span class="difficulty" :class="recipe.difficulty">{{ recipe.difficulty }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Recipe } from '../model/types';

const props = defineProps<{
  recipe: Recipe;
}>();

defineEmits<{
  click: [recipe: Recipe];
}>();

const totalTime = computed(() => props.recipe.cookTimeMinutes + props.recipe.prepTimeMinutes);
</script>

<style scoped>
.recipe-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.recipe-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg)
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
}

.favorite-slot {
  position: absolute;
  top: 15px;
  right: 15px;
}

.recipe-content {
  padding: 25px;
}

.recipe-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.3;
}

.recipe-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.cuisine-tag {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 5px 12px;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty.Easy {
  background: #d4edda;
  color: #155724;
}

.difficulty.Medium {
  background: #fff3cd;
  color: #856404;
}

.difficulty.Hard {
  background: #f8d7da;
  color: #721c24;
}
</style>