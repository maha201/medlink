import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { loading, login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const user = await login(email.trim(), password)
      navigate(user.isSuperAdmin ? '/superadmin' : '/dashboard')
    } catch {
      setErrorMessage('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-[#1a2632] mb-3">Welcome Back to Medlink</h2>
        <p className="text-[#8b9bae] text-sm px-4">
          Sign in to continue managing patients, appointments, and hospital operations in real time.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#5a6a76]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input your email"
            className="w-full bg-[#f5f7f8] border border-[#dde5e7] rounded-xl px-4 py-3.5 text-sm text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all placeholder:text-[#a8b8c8]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-[#5a6a76]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input your password"
              className="w-full bg-[#f5f7f8] border border-[#dde5e7] rounded-xl pl-4 pr-12 py-3.5 text-sm text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all placeholder:text-[#a8b8c8]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b9bae] hover:text-[#5a6a76] transition-colors"
            >
              {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8]"
            />
            <span className="text-xs text-[#5a6a76] group-hover:text-[#1a2632] transition-colors">Remember Me</span>
          </label>
          <Link to="/forgot-password" className="text-xs font-medium text-[#3a9898] hover:text-[#2b6e6e] transition-colors">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3a9898] hover:bg-[#2b6e6e] disabled:cursor-not-allowed disabled:opacity-70 text-white font-medium rounded-xl py-3.5 text-sm transition-all shadow-[0_4px_12px_rgba(58,152,152,0.25)]"
        >
          {loading ? 'Signing In...' : 'Login'}
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-[#8b9bae]">
        New to Medlink?{' '}
        <Link to="/create-account" className="font-medium text-[#3a9898] hover:text-[#2b6e6e] transition-colors">
          Create an account
        </Link>
      </div>
    </div>
  )
}
