import { describe, it, expect, vi, beforeEach } from 'vitest'
import { collection, doc, query, orderBy, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { addFavourite, removeFavourite, subscribeToFavourites } from './favouriteService'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  setDoc: vi.fn(),
  deleteDoc: vi.fn(),
  onSnapshot: vi.fn(),
}))

beforeEach(() => {
  doc.mockImplementation((_db, ...parts) => ({ path: parts.join('/') }))
  collection.mockImplementation((_db, ...parts) => ({ path: parts.join('/') }))
  query.mockImplementation((ref, ...rest) => ({ ref, rest }))
  orderBy.mockImplementation((field, direction) => ({ field, direction }))
})

describe('favouriteService', () => {
  it('addFavourite saves only the snapshot fields under the user', async () => {
    await addFavourite(
      {
        idMeal: '52772',
        strMeal: 'Teriyaki',
        strMealThumb: 'x.jpg',
        strInstructions: 'not saved',
      },
      'u1',
    )

    expect(setDoc).toHaveBeenCalledWith(
      { path: 'users/u1/favourites/52772' },
      {
        idMeal: '52772',
        strMeal: 'Teriyaki',
        strMealThumb: 'x.jpg',
        savedAt: expect.any(Number),
      },
    )
  })

  it('removeFavourite deletes that document', async () => {
    await removeFavourite('52772', 'u1')
    expect(deleteDoc).toHaveBeenCalledWith({ path: 'users/u1/favourites/52772' })
  })

  it('subscribeToFavourites passes each snapshot on as plain objects', async () => {
    const stop = vi.fn()
    onSnapshot.mockImplementation((_q, onNext) => {
      onNext({ docs: [{ data: () => ({ idMeal: '1' }) }] })
      return stop
    })
    const onData = vi.fn()
    const onError = vi.fn()

    const unsubscribe = await subscribeToFavourites('u1', onData, onError)

    expect(onData).toHaveBeenCalledWith([{ idMeal: '1' }])
    expect(orderBy).toHaveBeenCalledWith('savedAt', 'desc')
    expect(onSnapshot).toHaveBeenCalledWith(expect.anything(), expect.any(Function), onError)
    expect(unsubscribe).toBe(stop)
  })
})