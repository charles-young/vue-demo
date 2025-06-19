import { fetchJson } from '@/shared/api/base';
import { API_BASE_URL } from '@/shared/api/base';
import type { RecipesResponse } from '../model/types';

export const recipeApi = {
  async getRecipes(limit = 50): Promise<RecipesResponse> {
    return fetchJson<RecipesResponse>(`${API_BASE_URL}/recipes?limit=${limit}`);
  }
};