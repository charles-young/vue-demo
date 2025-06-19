<template>
  <Modal :model-value="isOpen" @update:model-value="$emit('update:isOpen', $event)">
    <div class="modal-header" v-if="recipe">
      <img :src="recipe.image" :alt="recipe.name" class="modal-image">
    </div>
    <div class="modal-content" v-if="recipe">
      <h2 class="modal-title">{{ recipe.name }}</h2>
      <div class="modal-meta">
        <div class="meta-item">
          <span>⏱️ Prep:</span>
          <span>{{ recipe.prepTimeMinutes }} min</span>
        </div>
        <div class="meta-item">
          <span>🔥 Cook:</span>
          <span>{{ recipe.cookTimeMinutes }} min</span>
        </div>
        <div class="meta-item">
          <span>👥</span>
          <span>{{ recipe.servings }} servings</span>
        </div>
        <div class="meta-item">
          <span>⭐</span>
          <span>{{ recipe.rating }}/5 ({{ recipe.reviewCount }} reviews)</span>
        </div>
        <span class="cuisine-tag">{{ recipe.cuisine }}</span>
        <span class="difficulty" :class="recipe.difficulty">{{ recipe.difficulty }}</span>
      </div>
      
      <div class="ingredients">
        <h3>Ingredients</h3>
        <ul>
          <li v-for="ingredient in recipe.ingredients"
           :key="ingredient"
            @click="toggleIngredientChecked(ingredient)"
            :class="{ 'ingredient-checked': isChecked(ingredient) }">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      
      <div class="instructions">
        <h3>Instructions</h3>
        <ol>
          <li v-for="(instruction, index) in recipe.instructions" :key="index">
            {{ instruction }}
          </li>
        </ol>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/shared/ui';
import type { Recipe } from '@/entities/recipe';

const ingredientCheckedIndices = ref(new Set());

const toggleIngredientChecked = (index) => {
  if (ingredientCheckedIndices.value.has(index)) {
    ingredientCheckedIndices.value.delete(index)
  } else {
    ingredientCheckedIndices.value.add(index)
  }
};

const isChecked = (index) => ingredientCheckedIndices.value.has(index);

defineProps<{
  recipe: Recipe | null;
  isOpen: boolean;
}>();

defineEmits<{
  'update:isOpen': [value: boolean];
}>();
</script>

<style scoped>
.modal-header {
  position: relative;
  padding: 0;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
}

.modal-content {
  padding: 30px;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.modal-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.9rem;
}

.cuisine-tag {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty {
  padding: 4px 10px;
  border-radius: 12px;
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

.ingredients,
.instructions {
  margin-bottom: 25px;
}

.ingredient-checkbox {
  margin-right: 8px;
}

.ingredient-checked {
  text-decoration: line-through;
  color: gray;
}

.ingredients h3,
.instructions h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 5px;
}

.ingredients ul {
  list-style: none;
  padding: 0;
}

.ingredients li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-left: 20px;
}

.ingredients li:before {
  content: "•";
  color: #667eea;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.instructions ol {
  padding-left: 20px;
}

.instructions li {
  margin-bottom: 10px;
  line-height: 1.6;
}
</style>