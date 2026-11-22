import { describe, it, expect } from 'vitest'
import { getIngredients } from './getIngredients'

describe('getIngredients', () => {
  it('keeps filled ingredients, trims them, and skips empty ones', () => {
    const meal = {
      strIngredient1: 'Chicken',
      strMeasure1: ' 1 kg ',
      strIngredient2: '  Onion ',
      strMeasure2: '2',
      strIngredient3: '',
      strMeasure3: '',
      strIngredient4: null,
      strMeasure4: null,
      strIngredient5: ' ',
      strMeasure5: ' ',
      strIngredient6: 'Salt',
      strMeasure6: null,
    }

    expect(getIngredients(meal)).toEqual([
      { name: 'Chicken', measure: '1 kg' },
      { name: 'Onion', measure: '2' },
      { name: 'Salt', measure: '' },
    ])
  })

  it('reads up to ingredient 20 and no further', () => {
    const meal = {
      strIngredient20: 'Pepper',
      strMeasure20: 'a pinch',
      strIngredient21: 'Ignored',
      strMeasure21: 'a lot',
    }

    expect(getIngredients(meal)).toEqual([{ name: 'Pepper', measure: 'a pinch' }])
  })

  it('returns an empty list when the meal has no ingredients', () => {
    expect(getIngredients({})).toEqual([])
  })
})