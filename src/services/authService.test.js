import { describe, it, expect, vi } from 'vitest'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth } from './firebase'
import { registerUser, logIn, loginWithGoogle, signOut as logout } from './authService'

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}))

describe('authService', () => {
  it('registerUser creates the account and returns the result', async () => {
    const result = { user: { uid: 'u1' } }
    createUserWithEmailAndPassword.mockResolvedValue(result)

    expect(await registerUser('sam@gmail.com', 'abcdefgh')).toBe(result)
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'sam@gmail.com', 'abcdefgh')
  })

  it('logIn signs in and returns the result', async () => {
    const result = { user: { uid: 'u1' } }
    signInWithEmailAndPassword.mockResolvedValue(result)

    expect(await logIn('sam@gmail.com', 'abcdefgh')).toBe(result)
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'sam@gmail.com', 'abcdefgh')
  })

  it('loginWithGoogle opens the popup with a Google provider', async () => {
    const result = { user: { uid: 'u1' } }
    signInWithPopup.mockResolvedValue(result)

    expect(await loginWithGoogle()).toBe(result)
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.anything())
  })

  it('signOut signs the person out', async () => {
    firebaseSignOut.mockResolvedValue()

    await logout()
    expect(firebaseSignOut).toHaveBeenCalledWith(auth)
  })

  it('lets Firebase errors reach the caller', async () => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/email-already-in-use' })
    signInWithEmailAndPassword.mockRejectedValue({ code: 'auth/invalid-credential' })

    await expect(registerUser('a@b.com', 'abcdefgh')).rejects.toEqual({
      code: 'auth/email-already-in-use',
    })
    await expect(logIn('a@b.com', 'abcdefgh')).rejects.toEqual({
      code: 'auth/invalid-credential',
    })
  })
})