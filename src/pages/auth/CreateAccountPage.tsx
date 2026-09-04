import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function CreateAccountPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock registration for now, redirect to dashboard
    navigate('/dashboard')
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-[#1a2632] mb-3">Join Medlink</h2>
        <p className="text-[#8b9bae] text-sm px-4">
          Create your account to start managing your healthcare facility efficiently.
        </p>
      </div>

      <form onSubmit={handleCreateAccount} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#5a6a76]">Email</label>
          <input
            type="email"
            placeholder="Input your email address"
            className="w-full bg-[#f5f7f8] border border-[#dde5e7] rounded-xl px-4 py-3.5 text-sm text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all placeholder:text-[#a8b8c8]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-[#5a6a76]">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
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

        <div className="space-y-2">
          <label className="text-xs font-medium text-[#5a6a76]">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="w-full bg-[#f5f7f8] border border-[#dde5e7] rounded-xl pl-4 pr-12 py-3.5 text-sm text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all placeholder:text-[#a8b8c8]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b9bae] hover:text-[#5a6a76] transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3a9898] hover:bg-[#2b6e6e] text-white font-medium rounded-xl py-3.5 text-sm transition-all shadow-[0_4px_12px_rgba(58,152,152,0.25)] hover:shadow-[0_6px_16px_rgba(58,152,152,0.35)] mt-4"
        >
          Create Account
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-[#8b9bae]">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-[#3a9898] hover:text-[#2b6e6e] transition-colors">
          Login here
        </Link>
      </div>
    </div>
  )
}
