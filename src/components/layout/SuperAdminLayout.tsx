import { useState } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Building2, Settings, CreditCard, ToggleLeft, Users, ScrollText, LogOut, ChevronRight } from 'lucide-react'
import SignOutModal from '@/components/modal/signout'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { name: 'Dashboard', path: '/superadmin', icon: LayoutDashboard, exact: true },
  { name: 'Hospital List', path: '/superadmin/hospitals', icon: Building2 },
  { name: 'Hospital Setup', path: '/superadmin/hospital-setup', icon: Settings },
  { name: 'Subscription', path: '/superadmin/plans', icon: CreditCard },
  { name: 'Module Control', path: '/superadmin/modules', icon: ToggleLeft },
  { name: 'Admin Users', path: '/superadmin/users', icon: Users },
  { name: 'Audit Logs', path: '/superadmin/audit-logs', icon: ScrollText },
]

export default function SuperAdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showSignOut, setShowSignOut] = useState(false)

  const currentPage = navItems.find(n =>
    n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path)
  )

  return (
    <div className="flex h-screen bg-[#0f1923] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#0f1923] flex flex-col shrink-0 z-20 border-r border-white/5">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 gap-2.5 shrink-0">
          <div className="w-7 h-7 bg-[#3a9898] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <span className="text-white text-sm font-bold tracking-tight">Medlink</span>
            <p className="text-[#3a9898] text-[9px] font-semibold tracking-widest uppercase">Master Control</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#3a9898] text-white'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={15} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-3 shrink-0 border-t border-white/5">
          <button
            onClick={() => setShowSignOut(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/40 hover:bg-white/5 hover:text-white w-full transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-16 px-6 flex items-center justify-between bg-[#0f1923] shrink-0 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Master Control</span>
            {currentPage && currentPage.path !== '/superadmin' && (
              <>
                <ChevronRight size={12} />
                <span className="text-white/80 font-semibold">{currentPage.name}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-white">Super Admin</p>
              <p className="text-[10px] text-white/40">admin@medlink.io</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#3a9898] flex items-center justify-center text-white text-xs font-bold">SA</div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#f5f7f8]">
          <Outlet />
        </div>
      </main>

      <SignOutModal
        isopen={showSignOut}
        onClose={() => setShowSignOut(false)}
        onConfirm={async () => { await logout(); setShowSignOut(false); navigate('/login') }}
      />
    </div>
  )
}
