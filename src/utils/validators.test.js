import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateLoginForm,
  validateRegisterForm,
  hasErrors,
} from './Validators'

describe('validateEmail', () => {
  it('requires a value', () => {
    expect(validateEmail('')).toBe('Email is required')
    expect(validateEmail('   ')).toBe('Email is required')
  })

  it.each(['abc', 'a@@b.com', '@b.com', 'a@', 'a@b', 'a@.com', 'a@b.'])(
    'rejects %s',
    (value) => {
      expect(validateEmail(value)).toBe('Enter valid email')
    },
  )

  it('accepts a normal address and ignores spaces around it', () => {
    expect(validateEmail('sam@gmail.com')).toBeNull()
    expect(validateEmail('  sam@gmail.com  ')).toBeNull()
  })
})

describe('validatePassword', () => {
  it('requires a value', () => {
    expect(validatePassword('')).toBe('Password is required')
  })

  it('requires at least 8 characters', () => {
    expect(validatePassword('abc')).toBe('Password must be atleast 8 characters')
    expect(validatePassword('abcdefgh')).toBeNull()
  })
})

describe('validateConfirmPassword', () => {
  it('requires the confirmation', () => {
    expect(validateConfirmPassword('abcdefgh', '')).toBe('Confirm password')
  })

  it('checks that both passwords match', () => {
    expect(validateConfirmPassword('abcdefgh', 'abcdefgx')).toBe('Password does not match ')
    expect(validateConfirmPassword('abcdefgh', 'abcdefgh')).toBeNull()
  })
})

describe('validateLoginForm', () => {
  it('reports both fields when they are empty', () => {
    expect(validateLoginForm({ email: '', password: '' })).toEqual({
      email: 'Email is required',
      password: 'Password is required ',
    })
  })

  it('does not apply the 8-character rule to existing users', () => {
    expect(validateLoginForm({ email: 'sam@gmail.com', password: 'abc' })).toEqual({
      email: null,
      password: null,
    })
  })
})

describe('validateRegisterForm', () => {
  it('reports every problem at once', () => {
    expect(
      validateRegisterForm({ email: 'nope', password: 'abc', confirmPassword: 'xyz' }),
    ).toEqual({
      email: 'Enter valid email',
      password: 'Password must be atleast 8 characters',
      confirmPassword: 'Password does not match ',
    })
  })

  it('returns null for every field when the form is valid', () => {
    expect(
      validateRegisterForm({
        email: 'sam@gmail.com',
        password: 'abcdefgh',
        confirmPassword: 'abcdefgh',
      }),
    ).toEqual({ email: null, password: null, confirmPassword: null })
  })
})

describe('hasErrors', () => {
  it('is false when every value is null', () => {
    expect(hasErrors({ email: null, password: null })).toBe(false)
  })

  it('is true when any value is a message', () => {
    expect(hasErrors({ email: 'Email is required', password: null })).toBe(true)
  })
})