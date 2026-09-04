// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react'
import type { AuthState, AuthUser } from '@/types/auth.types'

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<AuthUser | null>(null)
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}
