// src/routes/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

/** Only accessible when NOT logged in (login, create-account, forgot-password) */
export function PublicRoute() {
  const { isAuthenticated, loading, isSuperAdmin } = useAuth()

  if (loading) return null

  if (isAuthenticated) {
    return <Navigate to={isSuperAdmin ? '/superadmin' : '/dashboard'} replace />
  }

  return <Outlet />
}
