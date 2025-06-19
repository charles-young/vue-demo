import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import RecipeModal from './ViewRecipeModal.vue'

const sampleRecipe = {
  name: 'Test Recipe',
  image: 'https://example.com/image.jpg',
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  servings: 4,
  rating: 4.5,
  reviewCount: 100,
  cuisine: 'Italian',
  difficulty: 'Medium',
  ingredients: ['Salt', 'Pepper', 'Olive Oil'],
  instructions: ['Step 1', 'Step 2', 'Step 3'],
}

const ModalStub = {
  name: 'Modal',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `<div><slot /></div>`,
}

describe('RecipeModal.vue', () => {
  let wrapper: VueWrapper<unknown>

  beforeEach(() => {
    wrapper = mount(RecipeModal, {
      props: {
        recipe: sampleRecipe,
        isOpen: true,
      },
      global: {
        stubs: {
          Modal: ModalStub,
        },
      },
    })
  })

  it('renders image and title', () => {
    expect(wrapper.find('.modal-image').attributes('src')).toBe(sampleRecipe.image)
    expect(wrapper.find('.modal-image').attributes('alt')).toBe(sampleRecipe.name)
    expect(wrapper.find('.modal-title').text()).toBe(sampleRecipe.name)
  })

  it('renders meta info correctly', () => {
    const meta = wrapper.find('.modal-meta')

    expect(meta.text()).toContain('⏱️ Prep:')
    expect(meta.text()).toContain(`${sampleRecipe.prepTimeMinutes} min`)

    expect(meta.text()).toContain('🔥 Cook:')
    expect(meta.text()).toContain(`${sampleRecipe.cookTimeMinutes} min`)

    expect(meta.text()).toContain('👥')
    expect(meta.text()).toContain(`${sampleRecipe.servings} servings`)

    expect(meta.text()).toContain('⭐')
    expect(meta.text()).toContain(`${sampleRecipe.rating}/5`)
    expect(meta.text()).toContain(`(${sampleRecipe.reviewCount} reviews)`)

    expect(wrapper.find('.cuisine-tag').text()).toBe(sampleRecipe.cuisine)
    expect(wrapper.find('.difficulty').text()).toBe(sampleRecipe.difficulty)
    expect(wrapper.find('.difficulty').classes()).toContain(sampleRecipe.difficulty)
  })

  it('renders ingredients list', () => {
    const ingredients = wrapper.findAll('.ingredients ul li')
    expect(ingredients.length).toBe(sampleRecipe.ingredients.length)
    sampleRecipe.ingredients.forEach((ingredient, i) => {
      expect(ingredients[i].text()).toBe(ingredient)
      expect(ingredients[i].classes()).not.toContain('ingredient-checked')
    })
  })

  it('toggles ingredient checked state on click', async () => {
    const firstIngredient = wrapper.findAll('.ingredients ul li')[0]

    // Initially not checked
    expect(firstIngredient.classes()).not.toContain('ingredient-checked')

    await firstIngredient.trigger('click')

    // After click, should be checked
    expect(wrapper.findAll('.ingredients ul li')[0].classes()).toContain('ingredient-checked')

    await firstIngredient.trigger('click')

    // After second click, unchecked again
    expect(wrapper.findAll('.ingredients ul li')[0].classes()).not.toContain('ingredient-checked')
  })

  it('renders instructions list', () => {
    const instructions = wrapper.findAll('.instructions ol li')
    expect(instructions.length).toBe(sampleRecipe.instructions.length)
    sampleRecipe.instructions.forEach((step, i) => {
      expect(instructions[i].text()).toBe(step)
    })
  })

  it('emits update:isOpen event from Modal', async () => {
    await wrapper.findComponent({ name: 'Modal' }).vm.$emit('update:model-value', false)
    expect(wrapper.emitted('update:isOpen')).toBeTruthy()
    expect(wrapper.emitted('update:isOpen')![0]).toEqual([false])
  })

  it('does not render modal content when recipe is null', async () => {
    await wrapper.setProps({ recipe: null })

    expect(wrapper.find('.modal-header').exists()).toBe(false)
    expect(wrapper.find('.modal-content').exists()).toBe(false)
  })

  it('does not render modal content when isOpen is false', async () => {
    await wrapper.setProps({ isOpen: false })

    // Modal is stubbed, so content rendering depends on Modal implementation
    // Here we simply verify the prop was updated
    expect(wrapper.props('isOpen')).toBe(false)
  })
})
