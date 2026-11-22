import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Firebase must never start for real inside a test.
vi.mock('../services/firebase', () => ({ auth: {}, db: {} }))

afterEach(() => {
  cleanup()
})