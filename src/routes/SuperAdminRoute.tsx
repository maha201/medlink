// src/routes/SuperAdminRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

/** Only accessible by Super Admins */
export function SuperAdminRoute() {
  const { isAuthenticated, isSuperAdmin, loading } = useAuth()

  if (loading) return null

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!isSuperAdmin) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
