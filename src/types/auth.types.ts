// src/types/auth.types.ts

export type UserRole =
  | 'super_admin'
  | 'hospital_admin'
  | 'doctor'
  | 'nurse'
  | 'receptionist'
  | 'pharmacist'
  | 'lab_staff'
  | 'accountant'

export type SubscriptionStatus = 'active' | 'trial' | 'suspended' | 'cancelled'
export type PlanId = 'free' | 'pro' | 'enterprise'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  // Custom claims (from Firebase token)
  tenantId: string | null
  role: UserRole | null
  permissions: string[]
  isSuperAdmin: boolean
  planId: PlanId | null
  subscriptionStatus: SubscriptionStatus | null
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
}
