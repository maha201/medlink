// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { AuthState, AuthUser } from '@/types/auth.types'
import { apiFetch, API_ENDPOINTS } from '@/lib/api/api'

const AUTH_STORAGE_KEY = 'medlink_auth'

const getStoredAuth = (): { user: AuthUser | null; token: string | null } => {
  if (typeof window === 'undefined') {
    return { user: null, token: null }
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (!raw) {
      return { user: null, token: null }
    }

    const parsed = JSON.parse(raw) as { user?: AuthUser; token?: string | null }

    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
    }
  } catch {
    return { user: null, token: null }
  }
}

const AuthContext = createContext<AuthState | null>(null)

type MeResponse = {
  success?: boolean
  message?: string
  data?: {
    user?: {
      id?: number
      email?: string | null
      name?: string | null
      role?: string | null
    }
    modules?: string[]
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedAuth = getStoredAuth()
  const [user, setUser] = useState<AuthUser | null>(storedAuth.user)
  const [token, setToken] = useState<string | null>(storedAuth.token)
  const [modules, setModules] = useState<string[]>([])
  const [loading, setLoading] = useState(Boolean(storedAuth.token))
  const [error, setError] = useState<string | null>(null)

  const persistAuth = (nextUser: AuthUser | null, nextToken: string | null) => {
    if (typeof window === 'undefined') return

    if (nextUser && nextToken) {
      window.localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: nextUser,
          token: nextToken,
        }),
      )
      return
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const loadProfile = async (authToken: string, fallbackUser: AuthUser | null) => {
    try {
      const response = await apiFetch(API_ENDPOINTS.authMe)
      const result = (await response.json()) as MeResponse

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || 'Unable to load user profile')
      }

      const profileUser = result.data.user
      const nextUser = profileUser
        ? {
            ...(fallbackUser ?? {
              uid: '',
              email: null,
              displayName: null,
              photoURL: null,
              tenantId: null,
              role: null,
              permissions: [],
              isSuperAdmin: false,
              planId: null,
              subscriptionStatus: null,
            }),
            uid: String(profileUser.id ?? fallbackUser?.uid ?? ''),
            email: profileUser.email ?? fallbackUser?.email ?? null,
            displayName: profileUser.name ?? fallbackUser?.displayName ?? null,
            role: (profileUser.role as AuthUser['role']) ?? fallbackUser?.role ?? null,
          }
        : fallbackUser

      setUser(nextUser)
      setModules(
        Array.isArray(result.data.modules)
          ? result.data.modules.map((module) => module.trim().toUpperCase())
          : [],
      )
      persistAuth(nextUser, authToken)
    } catch (err) {
      console.warn('Unable to load authenticated user profile:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (storedAuth.token) {
      void loadProfile(storedAuth.token, storedAuth.user)
    }
  }, [])

  const login = async (email: string, password: string): Promise<AuthUser> => {
    setLoading(true)
    setError(null)

    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '')
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = (await response.json()) as {
        success?: boolean
        message?: string
        data?: {
          token?: string
          user?: {
            id?: number
            email?: string | null
            name?: string | null
            role?: string | null
          }
        }
      }

      if (!response.ok || !result.success || !result.data?.token || !result.data?.user) {
        throw new Error(result.message || 'Login failed')
      }

      const nextUser: AuthUser = {
        uid: String(result.data.user.id ?? ''),
        email: result.data.user.email ?? email,
        displayName: result.data.user.name ?? null,
        photoURL: null,
        tenantId: null,
        role: (result.data.user.role as AuthUser['role']) ?? null,
        permissions: [],
        isSuperAdmin: result.data.user.role === 'super_admin' || result.data.user.role === 'admin',
        planId: null,
        subscriptionStatus: null,
      }

      setUser(nextUser)
      setToken(result.data.token)
      persistAuth(nextUser, result.data.token)
      void loadProfile(result.data.token, nextUser)

      return nextUser
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '')
      await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
    } catch {
      // proceed with local logout even if API fails
    } finally {
      setUser(null)
      setToken(null)
      setModules([])
      setError(null)
      persistAuth(null, null)
    }
  }

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      modules,
      loading,
      error,
      login,
      logout,
    }),
    [user, token, modules, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuthContext must be used inside AuthProvider')
  }

  return ctx
}
