import { describe, it, expect, vi, beforeEach } from 'vitest'
import { __resetRecipeStore, useRecipeStore } from './store'
import { recipeApi } from '../api/recipeApi'
import type { Recipe } from './types'

vi.mock('../api/recipeApi', () => ({
  recipeApi: {
    getRecipes: vi.fn()
  }
}))

beforeEach(() => {
  vi.clearAllMocks()
  __resetRecipeStore()
})

const mockRecipes: Recipe[] = [
  {
      id: 1, name: 'Tacos', cuisine: 'Mexican',
      ingredients: [],
      instructions: [],
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 0,
      difficulty: 'Easy',
      caloriesPerServing: 0,
      tags: [],
      userId: 0,
      image: '',
      rating: 0,
      reviewCount: 0,
      mealType: []
  },
  {
      id: 2, name: 'Pizza', cuisine: 'Italian',
      ingredients: [],
      instructions: [],
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 0,
      difficulty: 'Easy',
      caloriesPerServing: 0,
      tags: [],
      userId: 0,
      image: '',
      rating: 0,
      reviewCount: 0,
      mealType: []
  },
  {
      id: 3, name: 'Burrito', cuisine: 'Mexican',
      ingredients: [],
      instructions: [],
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 0,
      difficulty: 'Easy',
      caloriesPerServing: 0,
      tags: [],
      userId: 0,
      image: '',
      rating: 0,
      reviewCount: 0,
      mealType: []
  }
]

describe('useRecipeStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches recipes successfully and sets state', async () => {
    (recipeApi.getRecipes as any).mockResolvedValue({ recipes: mockRecipes })

    const store = useRecipeStore()
    await store.fetchRecipes()

    expect(store.loading.value).toBe(false)
    expect(store.error.value).toBeNull()
    expect(store.recipes.value).toEqual(mockRecipes)
    expect(store.cuisines.value).toEqual(['Italian', 'Mexican']) // sorted
  })

  it('handles API error gracefully', async () => {
    (recipeApi.getRecipes as any).mockRejectedValue(new Error('API down'))

    const store = useRecipeStore()
    await store.fetchRecipes()

    expect(store.loading.value).toBe(false)
    expect(store.error.value).toBe('API down')
    expect(store.recipes.value).toEqual([])
    expect(store.cuisines.value).toEqual([])
  })
})
