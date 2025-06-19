<template>
  <div class="controls-wrapper">
    <div class="controls">
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search recipes..." 
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        >
      </div>
      <div class="sort-controls">
        <label class="sort-label">Cuisine:</label>
        <select
          class="filter-select" 
          :value="selectedCuisine"
          @change="$emit('update:selectedCuisine', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">All Cuisines</option>
          <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
            {{ cuisine }}
          </option>
        </select>
      </div>
      
      <div class="sort-controls">
        <label class="sort-label">Difficulty:</label>
        <select 
          class="filter-select" 
          :value="selectedDifficulty"
          @change="$emit('update:selectedDifficulty', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div class="sort-controls">
        <label class="sort-label">Sort by:</label>
        <select 
          class="sort-select" 
          :value="sortBy"
          @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value as SortOption)"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div>
        <label class="sort-label">Favorites: </label>
        <input
          type="checkbox"
          :checked="favoritesOnly"
          @change="$emit('update:favoritesOnly', ($event.target as HTMLInputElement).checked)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SORT_OPTIONS } from '@/entities/recipe';
import type { SortOption } from '@/entities/recipe';

defineProps<{
  searchQuery: string;
  selectedCuisine: string;
  selectedDifficulty: string;
  cuisines: string[];
  sortBy: SortOption;
  favoritesOnly: boolean;
}>();

defineEmits<{
  'update:searchQuery': [value: string];
  'update:selectedCuisine': [value: string];
  'update:selectedDifficulty': [value: string];
  'update:sortBy': [value: SortOption];
  'update:favoritesOnly': [value: boolean];
}>();

const sortOptions = SORT_OPTIONS;
</script>

<style scoped>
.controls-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.sort-label {
  color: white;
  font-weight: 500;
  font-size: 1rem;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.filter-select,
.sort-select {
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:hover,
.sort-select:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.sort-select {
  min-width: 180px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-container {
    max-width: none;
  }
  
  .sort-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .sort-select {
    width: 100%;
  }
}
</style>