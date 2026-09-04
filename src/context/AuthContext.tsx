// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { AuthUser, AuthState } from '@/types/auth.types'

interface AuthContextValue extends AuthState {
  firebaseUser: User | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser)

      if (fbUser) {
        // Force refresh to get latest custom claims
        const idTokenResult = await fbUser.getIdTokenResult(true)
        const claims = idTokenResult.claims as Record<string, unknown>

        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
          tenantId: (claims.tenantId as string) ?? null,
          role: (claims.role as AuthUser['role']) ?? null,
          permissions: (claims.permissions as string[]) ?? [],
          isSuperAdmin: (claims.superAdmin as boolean) ?? false,
          planId: (claims.planId as AuthUser['planId']) ?? null,
          subscriptionStatus: (claims.subscriptionStatus as AuthUser['subscriptionStatus']) ?? null,
        })
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}
