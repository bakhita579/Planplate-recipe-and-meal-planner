import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchMeals, getMealById, getCategories, getMealsByCategory } from './mealService'

const fetchMock = vi.fn()

function reply(body, ok = true) {
  fetchMock.mockResolvedValue({ ok, json: async () => body })
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('searchMeals', () => {
  it('asks the search endpoint with an encoded word', async () => {
    reply({ meals: [] })
    await searchMeals('pasta bake')
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/search.php?s=pasta%20bake'))
  })

  it('returns the list of meals', async () => {
    reply({ meals: [{ idMeal: '1' }] })
    expect(await searchMeals('chicken')).toEqual([{ idMeal: '1' }])
  })

  it('returns an empty list when nothing matches', async () => {
    reply({ meals: null })
    expect(await searchMeals('zzzz')).toEqual([])
  })

  it('throws when the server answers with an error', async () => {
    reply({}, false)
    await expect(searchMeals('chicken')).rejects.toThrow()
  })
})

describe('getMealById', () => {
  it('asks the lookup endpoint', async () => {
    reply({ meals: [{ idMeal: '52772' }] })
    await getMealById('52772')
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/lookup.php?i=52772'))
  })

  it('returns the first meal', async () => {
    reply({ meals: [{ idMeal: '52772', strMeal: 'Teriyaki' }] })
    expect(await getMealById('52772')).toEqual({ idMeal: '52772', strMeal: 'Teriyaki' })
  })

  it('returns null for an unknown id', async () => {
    reply({ meals: null })
    expect(await getMealById('abc')).toBeNull()
  })

  it('throws when the server answers with an error', async () => {
    reply({}, false)
    await expect(getMealById('1')).rejects.toThrow()
  })
})

describe('getCategories', () => {
  it('asks the category list endpoint and returns just the names', async () => {
    reply({ meals: [{ strCategory: 'Beef' }, { strCategory: 'Seafood' }] })
    expect(await getCategories()).toEqual(['Beef', 'Seafood'])
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/list.php?c=list'))
  })

  it('returns an empty list when nothing comes back', async () => {
    reply({ meals: null })
    expect(await getCategories()).toEqual([])
  })

  it('throws when the server answers with an error', async () => {
    reply({}, false)
    await expect(getCategories()).rejects.toThrow()
  })
})

describe('getMealsByCategory', () => {
  it('asks the filter endpoint with an encoded category', async () => {
    reply({ meals: [] })
    await getMealsByCategory('Side Dish')
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/filter.php?c=Side%20Dish'))
  })

  it('returns the list, or an empty list', async () => {
    reply({ meals: [{ idMeal: '1' }] })
    expect(await getMealsByCategory('Seafood')).toEqual([{ idMeal: '1' }])

    reply({ meals: null })
    expect(await getMealsByCategory('Seafood')).toEqual([])
  })

  it('throws when the server answers with an error', async () => {
    reply({}, false)
    await expect(getMealsByCategory('Seafood')).rejects.toThrow()
  })
})