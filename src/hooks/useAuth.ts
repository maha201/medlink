// src/hooks/useAuth.ts
import { useAuthContext } from '@/context/AuthContext'

export function useAuth() {
  const { user, token, loading, error, login, logout } = useAuthContext()

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    isSuperAdmin: user?.isSuperAdmin ?? false,
    role: user?.role,
    tenantId: user?.tenantId,
    permissions: user?.permissions ?? [],
    hasPermission: (permission: string) =>
      user?.permissions?.includes(permission) ?? false,
    hasRole: (...roles: string[]) =>
      user?.role ? roles.includes(user.role) : false,
  }
}
