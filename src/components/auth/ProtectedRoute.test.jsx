import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../../hooks/useAuth'

vi.mock('../../hooks/useAuth', () => ({ useAuth: vi.fn() }))

function LoginProbe() {
  const location = useLocation()
  return <p>Login page, came from {location.state?.from?.pathname}</p>
}

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/Login" element={<LoginProbe />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Planner" element={<p>Planner page</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('waits while Firebase restores the session', () => {
    useAuth.mockReturnValue({ user: null, loading: true })
    renderAt('/Planner')

    expect(screen.getByText(/checking your session/i)).toBeInTheDocument()
    expect(screen.queryByText('Planner page')).not.toBeInTheDocument()
  })

  it('sends a signed-out visitor to login and remembers the page they wanted', () => {
    useAuth.mockReturnValue({ user: null, loading: false })
    renderAt('/Planner')

    expect(screen.getByText('Login page, came from /Planner')).toBeInTheDocument()
  })

  it('shows the page to a signed-in user', () => {
    useAuth.mockReturnValue({ user: { uid: 'u1' }, loading: false })
    renderAt('/Planner')

    expect(screen.getByText('Planner page')).toBeInTheDocument()
  })
})