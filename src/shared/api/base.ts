// export const API_BASE_URL = 'https://dummyjson.com';
export const API_BASE_URL = 'http://localhost:5014/api';

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}