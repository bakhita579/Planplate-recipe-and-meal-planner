import { describe, it, expect } from 'vitest'
import { getErrorMessages } from './AuthErrors'

const FALLBACK = 'Something went wrong. Try again'

describe('getErrorMessages', () => {
  it('translates the email-already-in-use code', () => {
    expect(getErrorMessages({ code: 'auth/email-already-in-use' })).toBe(
      'This account already exists. Try logging in',
    )
  })

  it('translates the weak-password code', () => {
    expect(getErrorMessages({ code: 'auth/weak-password' })).toBe(
      'Choose a strong password with 8 characters',
    )
  })

  it('gives the same message for every wrong-credentials code', () => {
    const codes = ['auth/invalid-credential', 'auth/user-not-found', 'auth/wrong-password']
    for (const code of codes) {
      expect(getErrorMessages({ code })).toBe('Invalid email/password')
    }
  })

  it('translates the sign-in window and provider codes', () => {
    expect(getErrorMessages({ code: 'auth/popup-blocked' })).toBe(
      'Your browser blocked the sign-in window. Allow pop-ups and try again',
    )
    expect(getErrorMessages({ code: 'auth/operation-not-allowed' })).toBe(
      'This sign-in method is not enabled yet',
    )
    expect(getErrorMessages({ code: 'auth/account-exists-with-different-credential' })).toBe(
      'An account with this email already exists using a different sign-in method',
    )
  })

  it.each(['auth/popup-closed-by-user', 'auth/cancelled-popup-request'])(
    'shows nothing when the person closes the sign-in window (%s)',
    (code) => {
      expect(getErrorMessages({ code })).toBe('')
    },
  )

  it('falls back for a code it does not know', () => {
    expect(getErrorMessages({ code: 'auth/something-new' })).toBe(FALLBACK)
  })

  it('falls back when there is no error or no code', () => {
    expect(getErrorMessages(undefined)).toBe(FALLBACK)
    expect(getErrorMessages({})).toBe(FALLBACK)
  })
})