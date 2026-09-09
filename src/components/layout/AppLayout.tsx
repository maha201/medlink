import { Outlet, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Package,
  Search,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Appointments", path: "/appointments", icon: CalendarCheck },
  { name: "Patients", path: "/patients", icon: Users },
  // { name: "Doctors", path: "/doctors", icon: Stethoscope },
  // { name: "Departments", path: "/departments", icon: Building2 },
  // { name: "Calendar", path: "/appointments/calendar", icon: Calendar },
  { name: "Inventory", path: "/inventory", icon: Package },
  // { name: "Messages", path: "/messages", icon: Mail },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#f5f7f8] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white flex flex-col hidden md:flex shrink-0 z-20">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 gap-2 shrink-0">
          <div className="w-8 h-8 text-[#3a9898]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="text-[#1a2632] text-xl font-bold tracking-tight">
            Medlink
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#3a9898] text-white shadow-sm shadow-[#3a9898]/20"
                    : "text-[#5a6a76] hover:bg-[#f0f4f5] hover:text-[#1a2632]"
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Card & Sign Out */}
        <div className="p-4 mt-auto shrink-0">
          <div className="bg-[#eaf6f5] rounded-3xl p-5 text-center relative mt-12 mb-4 border border-[#c4e4e0]">
            {/* Mock Illustration */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center">
              <div className="w-[100px] h-[80px] bg-white rounded-t-full border-4 border-white overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-100 flex items-end justify-center">
                  {/* Mock characters */}
                  <div className="w-16 h-12 bg-[#3a9898] rounded-t-full"></div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-bold text-[#1a2632] text-sm">
                Upgrade to Pro
              </h4>
              <p className="text-[10px] text-[#5a6a76] mt-1.5 mb-4 leading-relaxed px-1">
                Unlock premium features & enhance your LMS experience!
              </p>
              <button className="w-full bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          <button className="flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold text-[#5a6a76] hover:bg-[#f0f4f5] hover:text-[#1a2632] w-full transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Topbar Header */}
        <header className="h-20 px-4 flex items-center justify-between bg-white shrink-0 sticky top-0 z-10 border-b border-[#dde5e7]">
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
            {location.pathname === "/dashboard" && (
              <p className="text-[#8b9bae] text-xs font-medium mt-0.5">
                Hello James, welcome back!
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
              <div className="flex items-center gap-3 pr-4 border-r border-[#dde5e7]">
                <div className="w-10 h-10 rounded-full bg-[#c8d4dc] flex items-center justify-center text-white overflow-hidden">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
                <div className="flex flex-col hidden sm:flex">
                  <span className="text-sm font-bold text-[#1a2632]">
                    James Cartis
                  </span>
                  <span className="text-[10px] font-medium text-[#8b9bae]">
                    Admin
                  </span>
                </div>
              </div>

              <button className="w-9 h-9 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898] hover:bg-[#d4efed] transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#ef4444] rounded-full border border-white"></span>
              </button>

              <button className="w-9 h-9 rounded-full bg-[#f0f4f5] flex items-center justify-center text-[#5a6a76] hover:bg-[#dde5e7] transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 flex flex-col rounded-tl-[2rem] bg-[#f5f7f8]">
          <div className="flex-1">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] font-medium text-[#8b9bae] shrink-0 border-t border-[#dde5e7]">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <span>Copyright © 2025 Peterdraw</span>
              <a href="#" className="hover:text-[#3a9898]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#3a9898]">
                Term and conditions
              </a>
              <a href="#" className="hover:text-[#3a9898]">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-[#3a9898]">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#3a9898]">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#3a9898]">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#3a9898]">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
              <a href="#" className="hover:text-[#3a9898]">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
