import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Package,
  Search,
  Bell,
  Settings,
  FileText,
  LogOut,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  User,
} from "lucide-react";
import SignOutModal from "@/components/modal/signout";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  {
    name: "Dashboard",
    module: "DASHBOARD",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Appointments",
    module: "APPOINTMENTS",
    path: "/appointments",
    icon: CalendarCheck,
  },
  {
    name: "Treatment Plan",
    module: "APPOINTMENTS",
    path: "/treatment-plan",
    icon: FileText,
  },
  { name: "Doctors", module: "DOCTORS", path: "/doctors", icon: Stethoscope },
  { name: "Follow up", module: "FOLLOW_UP", path: "/follow-up", icon: Users },
  {
    name: "Consultation",
    module: "CONSULTATION",
    path: "/consultation",
    icon: Stethoscope,
  },
  { name: "Patients", module: "PATIENTS", path: "/patients", icon: Users },
  {
    name: "Visitors",
    module: "APPOINTMENTS",
    path: "/visitors",
    icon: UserCheck,
  },
  { name: "Inventory", module: "INVENTORY", path: "/inventory", icon: Package },
  { name: "Reports", module: "REPORTS", path: "/reports", icon: FileText },
  {
    name: "Team & Access",
    module: "TEAM_ACCESS",
    path: "/team-access",
    icon: ShieldCheck,
  },
  {
    name: "Clinic Settings",
    module: "CLINIC_SETTINGS",
    path: "/settings",
    icon: Settings,
  },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, modules } = useAuth();
  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f7f8] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[200px] bg-white flex flex-col hidden md:flex shrink-0 z-20">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 gap-2 shrink-0">
          <div className="w-7 h-7 text-[#3a9898] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="text-[#1a2632] text-lg font-bold tracking-tight">
            Medlink
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems
            .filter((item) => modules.includes(item.module))
            .map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#3a9898] text-white shadow-sm shadow-[#3a9898]/20"
                      : "text-[#5a6a76] hover:bg-[#f0f4f5] hover:text-[#1a2632]"
                  }`}
                >
                  <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  {item.name}
                </Link>
              );
            })}
        </nav>

        {/* Upgrade Card & Sign Out */}
        <div className="p-3 mt-auto shrink-0">
          <div className="bg-[#eaf6f5] rounded-2xl p-3.5 text-center relative mt-6 mb-2 border border-[#c4e4e0]">
            <div className="w-8 h-8 mx-auto -mt-7 mb-1 bg-[#3a9898] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-xs font-bold">⚡</span>
            </div>

            <div>
              <h4 className="font-bold text-[#1a2632] text-xs">
                Upgrade to Pro
              </h4>
              <p className="text-[9px] text-[#5a6a76] mt-1 mb-3 leading-tight px-0.5">
                Unlock premium features & enhance your experience!
              </p>
              <button className="w-full bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[11px] font-bold py-2 rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowSignOut(true)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-full text-xs font-semibold text-[#5a6a76] hover:bg-[#f0f4f5] hover:text-[#1a2632] w-full transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-w-0 h-full bg-white">
        {/* Topbar Header */}
        <header className="h-20 px-8 flex items-center justify-between bg-white shrink-0 sticky top-0 z-10">
          <div>
            {location.pathname === "/dashboard" && (
              <h1 className="text-2xl font-bold text-[#1a2632]">Dashboard</h1>
            )}
            {location.pathname === "/patients" && (
              <h1 className="text-2xl font-bold text-[#1a2632]">Patients</h1>
            )}
            {location.pathname === "/appointments" && (
              <h1 className="text-2xl font-bold text-[#1a2632]">
                Appointments
              </h1>
            )}
            {location.pathname === "/doctor-profile" && (
              <h1 className="text-2xl font-bold text-[#1a2632]">
                Doctor Profile & Timings
              </h1>
            )}
            {location.pathname === "/dashboard" && (
              <p className="text-[#8b9bae] text-xs font-medium mt-0.5">
                Hello Dr. James, welcome back!
              </p>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64 hidden lg:block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9bae]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search anything"
                className="w-full bg-[#f5f7f8] border border-transparent rounded-full pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:bg-white focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* CLICKABLE DOCTOR PROFILE HEADER */}
              <Link
                to="/doctor-profile"
                className="flex items-center gap-3 pr-4 border-r border-[#dde5e7] hover:opacity-80 transition-opacity cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-[#eaf6f5] border border-[#c4e4e0] flex items-center justify-center text-[#3a9898] font-bold group-hover:border-[#3a9898] transition-all">
                  <User size={20} />
                </div>
                <div className="flex flex-col hidden sm:flex">
                  <span className="text-sm font-bold text-[#1a2632] group-hover:text-[#3a9898] transition-colors">
                    Dr. James Cartis
                  </span>
                  <span className="text-[10px] font-medium text-[#8b9bae]">
                    Doctor / Admin
                  </span>
                </div>
              </Link>

              <button className="w-9 h-9 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898] hover:bg-[#d4efed] transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#ef4444] rounded-full border border-white"></span>
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="w-9 h-9 rounded-full bg-[#f0f4f5] flex items-center justify-center text-[#5a6a76] hover:bg-[#dde5e7] transition-colors"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Container Wrapper */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-4 pb-4 sm:pr-6 sm:pb-6">
          <div className="flex-1 bg-[#f5f7f8] rounded-2xl p-3 sm:p-4 flex flex-col min-h-0">
            <div className="flex-1 bg-[#f5f7f8] rounded-2xl flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-4 pt-2 flex flex-col sm:flex-row justify-between items-center text-[11px] font-medium text-[#8b9bae] shrink-0">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <span>Copyright © 2025 MedLink</span>
              <a href="#" className="hover:text-[#3a9898]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#3a9898]">
                Term and conditions
              </a>
            </div>
          </footer>
        </div>
      </main>

      <SignOutModal
        isopen={showSignOut}
        onClose={() => setShowSignOut(false)}
        onConfirm={async () => {
          await logout();
          setShowSignOut(false);
          navigate("/login");
        }}
      />
    </div>
  );
}
