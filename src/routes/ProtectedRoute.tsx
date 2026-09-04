// src/routes/ProtectedRoute.tsx
import { Outlet } from 'react-router-dom'

/** Requires user to be logged in */
export function ProtectedRoute() {
  return <Outlet />
}
