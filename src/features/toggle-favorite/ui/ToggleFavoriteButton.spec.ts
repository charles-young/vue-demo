import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

const toggleFavoriteMock = vi.fn()
const isFavoriteMock = vi.fn()

vi.mock('../model/favorites', () => ({
  useFavorites: () => ({
    toggleFavorite: toggleFavoriteMock,
    isFavorite: isFavoriteMock
  })
}))

import FavoriteButton from './ToggleFavoriteButton.vue'

describe('<FavoriteButton />', () => {
  const recipeId = 42

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders 🤍 when not a favorite', () => {
    isFavoriteMock.mockReturnValue(false)

    const wrapper = mount(FavoriteButton, {
      props: { recipeId }
    })

    expect(wrapper.text()).toContain('🤍')
    expect(wrapper.attributes('title')).toBe('Add to favorites')
  })

  it('renders ❤️ when it is a favorite', () => {
    isFavoriteMock.mockReturnValue(true)

    const wrapper = mount(FavoriteButton, {
      props: { recipeId }
    })

    expect(wrapper.text()).toContain('❤️')
    expect(wrapper.attributes('title')).toBe('Remove from favorites')
  })

  it('calls toggleFavorite with the correct recipeId when clicked', async () => {
    isFavoriteMock.mockReturnValue(false)

    const wrapper = mount(FavoriteButton, {
      props: { recipeId }
    })

    await wrapper.find('button').trigger('click')

    expect(toggleFavoriteMock).toHaveBeenCalledWith(recipeId)
  })
})
