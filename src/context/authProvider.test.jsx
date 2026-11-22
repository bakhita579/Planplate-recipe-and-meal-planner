import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { onAuthStateChanged } from 'firebase/auth'
import AuthProvider from './authProvider'
import { useAuth } from '../hooks/useAuth'

vi.mock('firebase/auth', () => ({ onAuthStateChanged: vi.fn() }))

function Probe() {
  const { user, loading } = useAuth()
  if (loading) return <p>loading</p>
  return <p>{user ? `signed in as ${user.email}` : 'signed out'}</p>
}

function renderProbe() {
  return render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  )
}

describe('AuthProvider and useAuth', () => {
  it('shows loading until Firebase has answered', () => {
    onAuthStateChanged.mockReturnValue(vi.fn())
    renderProbe()
    expect(screen.getByText('loading')).toBeInTheDocument()
  })

  it('provides the signed-in user', () => {
    onAuthStateChanged.mockImplementation((_auth, callback) => {
      callback({ email: 'sam@gmail.com' })
      return vi.fn()
    })
    renderProbe()
    expect(screen.getByText('signed in as sam@gmail.com')).toBeInTheDocument()
  })

  it('stops loading when nobody is signed in', () => {
    onAuthStateChanged.mockImplementation((_auth, callback) => {
      callback(null)
      return vi.fn()
    })
    renderProbe()
    expect(screen.getByText('signed out')).toBeInTheDocument()
  })

  it('stops listening when it unmounts', () => {
    const stop = vi.fn()
    onAuthStateChanged.mockReturnValue(stop)
    const { unmount } = renderProbe()

    unmount()
    expect(stop).toHaveBeenCalledTimes(1)
  })

  it('useAuth throws a clear error outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
   expect(() => render(<Probe />)).toThrow(/hidden by the provider/)
    spy.mockRestore()
  })
})