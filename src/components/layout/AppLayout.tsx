import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, ComponentType } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Package,
  Search,
  Bell,
  Settings,
  FileText,
  ClipboardList,
  LogOut,
  UserCheck,
  UserCog,
  Stethoscope,
  ShieldCheck,
  User,
  Store,
  Receipt,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Activity,
  TrendingUp,
  ShoppingBag,
  Truck,
  DollarSign,
  PieChart,
} from "lucide-react";
import SignOutModal from "@/components/modal/signout";
import { useAuth } from "@/hooks/useAuth";

// ============================================================
// Interface Definitions
// ============================================================

interface SubNavItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  module: string;
  path?: string;
  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  children?: SubNavItem[];
}

// ============================================================
// Main Medlink / HMS Navigation
// DO NOT CHANGE
// ============================================================

const navItems: NavItem[] = [
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
    name: "Patients",
    module: "PATIENTS",
    path: "/patients",
    icon: Users,
  },
  {
    name: "OPD - Today",
    module: "CONSULTATION",
    path: "/opd",
    icon: Activity,
  },
  {
    name: "Consultation",
    module: "CONSULTATION",
    path: "/consultation",
    icon: Stethoscope,
  },

  {
    name: "Treatment Plan",
    module: "APPOINTMENTS",
    path: "/treatment-plan",
    icon: ClipboardList,
  },
  {
    name: "Follow up",
    module: "CONSULTATION",
    path: "/follow-up",
    icon: Users,
  },
  {
    name: "Finance",
    module: "APPOINTMENTS",
    path: "/finance",
    icon: DollarSign,
  },
  {
    name: "Visitors",
    module: "APPOINTMENTS",
    path: "/visitors",
    icon: UserCheck,
  },
  {
    name: "Staff Management",
    module: "APPOINTMENTS",
    path: "/staff-management",
    icon: UserCog,
  },
  {
    name: "Team & Access",
    module: "TEAM_ACCESS",
    path: "/team-access",
    icon: ShieldCheck,
  },
  {
    name: "Doctors",
    module: "DOCTORS",
    path: "/doctors",
    icon: Stethoscope,
  },

  {
    name: "Inventory",
    module: "INVENTORY",
    path: "/inventory",
    icon: Package,
  },
  {
    name: "Reports",
    module: "REPORTS",
    path: "/reports",
    icon: PieChart,
  },

  {
    name: "Clinic Settings",
    module: "CLINIC_SETTINGS",
    path: "/settings",
    icon: Settings,
  },
];

// ============================================================
// Standalone POS Navigation
// ============================================================

const posNavItems: NavItem[] = [
  {
    name: "Dashboard",
    module: "DASHBOARD",
    path: "/pos/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "POS / Billing",
    module: "POS_BILLING",
    path: "/pos/billing",
    icon: Receipt,
  },

  {
    name: "Sales",
    module: "POS_SALES",
    icon: TrendingUp,
    children: [
      {
        name: "All Sales",
        path: "/pos/sales/all",
      },
      {
        name: "Returns",
        path: "/pos/sales/returns",
      },
      {
        name: "Payments",
        path: "/pos/sales/payments",
      },
    ],
  },

  {
    name: "Products",
    module: "POS_PRODUCTS",
    icon: ShoppingBag,
    children: [
      {
        name: "Products",
        path: "/pos/products",
      },
      {
        name: "Categories",
        path: "/pos/products/categories",
      },
      {
        name: "Brands",
        path: "/pos/products/brands",
      },
      {
        name: "Units",
        path: "/pos/products/units",
      },
    ],
  },

  {
    name: "Inventory",
    module: "POS_INVENTORY",
    icon: Package,
    children: [
      {
        name: "Stock Overview",
        path: "/pos/inventory/overview",
      },
      {
        name: "Stock Adjustment",
        path: "/pos/inventory/adjustment",
      },
      {
        name: "Stock Movement",
        path: "/pos/inventory/movement",
      },
      {
        name: "Low Stock",
        path: "/pos/inventory/low-stock",
      },
    ],
  },

  {
    name: "Purchases",
    module: "POS_PURCHASES",
    icon: Truck,
    children: [
      {
        name: "Purchases",
        path: "/pos/purchases",
      },
      {
        name: "Suppliers",
        path: "/pos/purchases/suppliers",
      },
      {
        name: "Purchase Returns",
        path: "/pos/purchases/returns",
      },
    ],
  },

  {
    name: "Customers",
    module: "POS_CUSTOMERS",
    icon: Users,
    children: [
      {
        name: "Customers",
        path: "/pos/customers",
      },
      {
        name: "Customer Payments",
        path: "/pos/customers/payments",
      },
    ],
  },

  {
    name: "Expenses",
    module: "POS_EXPENSES",
    path: "/pos/expenses",
    icon: DollarSign,
  },

  {
    name: "Cash Register",
    module: "POS_CASH_REGISTER",
    path: "/pos/cash-register",
    icon: ShoppingCart,
  },

  {
    name: "Reports",
    module: "POS_REPORTS",
    icon: PieChart,
    children: [
      {
        name: "Sales Report",
        path: "/pos/reports/sales",
      },
      {
        name: "Purchase Report",
        path: "/pos/reports/purchase",
      },
      {
        name: "Inventory Report",
        path: "/pos/reports/inventory",
      },
      {
        name: "Expense Report",
        path: "/pos/reports/expense",
      },
      {
        name: "Profit Report",
        path: "/pos/reports/profit",
      },
    ],
  },

  {
    name: "Staff & Access",
    module: "POS_TEAM_ACCESS",
    icon: ShieldCheck,
    children: [
      {
        name: "Staff",
        path: "/pos/staff",
      },
      {
        name: "Roles",
        path: "/pos/staff/roles",
      },
      {
        name: "Permissions",
        path: "/pos/staff/permissions",
      },
    ],
  },

  {
    name: "Settings",
    module: "POS_SETTINGS",
    path: "/pos/settings",
    icon: Settings,
  },
];

// ============================================================
// App Layout
// ============================================================

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, modules } = useAuth();

  const [showSignOut, setShowSignOut] = useState<boolean>(false);

  // POS Version Switcher
  const [isPosVersion, setIsPosVersion] = useState<boolean>(false);

  // POS submenu state
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  // ============================================================
  // Toggle POS submenu
  // ============================================================

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // ============================================================
  // Automatically open submenu based on current POS route
  // ============================================================

  useEffect(() => {
    if (!isPosVersion) return;

    const activeParent = posNavItems.find((item) =>
      item.children?.some((child) => location.pathname.startsWith(child.path)),
    );

    if (activeParent) {
      setOpenSubMenus((prev) => ({
        ...prev,
        [activeParent.name]: true,
      }));
    }
  }, [isPosVersion, location.pathname]);

  // ============================================================
  // Navigation based on current version
  // ============================================================

  const activeNavItems = isPosVersion ? posNavItems : navItems;

  return (
    <div className="flex h-screen bg-[#f5f7f8] overflow-hidden font-sans">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside className="w-[200px] bg-white flex flex-col hidden md:flex shrink-0 z-20">
        {/* ====================================================
            LOGO
        ==================================================== */}

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
            {isPosVersion ? "Medlink POS" : "Medlink"}
          </span>
        </div>

        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <div className="space-y-1">
            {activeNavItems

              // HMS permissions remain exactly as before.
              // POS view bypasses HMS module filtering.
              .filter((item) => isPosVersion || modules.includes(item.module))

              .map((item) => {
                const hasChildren = !!item.children && item.children.length > 0;

                const isSubMenuOpen = openSubMenus[item.name];

                const isActive = item.path
                  ? location.pathname === item.path ||
                    location.pathname.startsWith(`${item.path}/`)
                  : item.children?.some(
                      (child) =>
                        location.pathname === child.path ||
                        location.pathname.startsWith(`${child.path}/`),
                    );

                const IconComponent = item.icon;

                // ==================================================
                // ITEMS WITH SUBMENU
                // ==================================================

                if (hasChildren) {
                  return (
                    <div key={item.name}>
                      <button
                        type="button"
                        onClick={() => toggleSubMenu(item.name)}
                        className={`
                          w-full
                          h-10
                          flex
                          items-center
                          justify-between
                          px-3
                          rounded-lg
                          text-xs
                          font-semibold
                          transition-all
                          duration-200

                          ${
                            isActive
                              ? "bg-[#3a9898] text-white shadow-sm shadow-[#3a9898]/20"
                              : "text-[#5a6a76] hover:bg-[#f5f7f8] hover:text-[#1a2632]"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <IconComponent
                            size={16}
                            strokeWidth={isActive ? 2.5 : 2}
                            className="shrink-0"
                          />

                          <span className="truncate">{item.name}</span>
                        </div>

                        <span className="shrink-0 ml-2">
                          {isSubMenuOpen ? (
                            <ChevronDown size={14} strokeWidth={2} />
                          ) : (
                            <ChevronRight size={14} strokeWidth={2} />
                          )}
                        </span>
                      </button>

                      {/* ============================================
                          SUBMENU
                      ============================================ */}

                      {isSubMenuOpen && (
                        <div className="ml-5 pl-3 mt-1 mb-1 border-l border-[#dde5e7] space-y-0.5">
                          {item.children?.map((child) => {
                            const isChildActive = location.pathname.startsWith(
                              child.path,
                            );

                            return (
                              <Link
                                key={child.name}
                                to={child.path}
                                className={`
                                    flex
                                    items-center
                                    min-h-8
                                    px-3
                                    rounded-md
                                    text-[11px]
                                    font-medium
                                    transition-all
                                    duration-150

                                    ${
                                      isChildActive
                                        ? "bg-[#f0f8f7] text-[#3a9898] font-semibold"
                                        : "text-[#71808c] hover:bg-[#f7f9fa] hover:text-[#1a2632]"
                                    }
                                  `}
                              >
                                {child.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // ==================================================
                // NORMAL NAVIGATION ITEM
                // ==================================================

                return (
                  <Link
                    key={item.name}
                    to={item.path || "#"}
                    className={`
                      h-10
                      flex
                      items-center
                      gap-3
                      px-3
                      rounded-lg
                      text-xs
                      font-semibold
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-[#3a9898] text-white shadow-sm shadow-[#3a9898]/20"
                          : "text-[#5a6a76] hover:bg-[#f5f7f8] hover:text-[#1a2632]"
                      }
                    `}
                  >
                    <IconComponent
                      size={16}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="shrink-0"
                    />

                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
          </div>
        </nav>

        {/* ====================================================
            BOTTOM SIDEBAR
        ==================================================== */}

        <div className="p-3 mt-auto shrink-0">
          {/* ==================================================
              POS VERSION SWITCHER
          ================================================== */}

          <div className="bg-[#f0f4f5] rounded-xl p-2.5 mb-3 border border-[#dde5e7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store size={15} className="text-[#3a9898]" />

              <span className="text-[11px] font-bold text-[#1a2632]">
                POS View
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPosVersion(!isPosVersion)}
              className={`
                w-8
                h-4
                flex
                items-center
                rounded-full
                p-0.5
                transition-colors
                duration-300
                cursor-pointer

                ${isPosVersion ? "bg-[#3a9898]" : "bg-[#cbd5e1]"}
              `}
            >
              <div
                className={`
                  bg-white
                  w-3
                  h-3
                  rounded-full
                  shadow-md
                  transform
                  transition-transform
                  duration-300

                  ${isPosVersion ? "translate-x-4" : "translate-x-0"}
                `}
              />
            </button>
          </div>

          {/* ==================================================
              UPGRADE CARD
          ================================================== */}
          {!isPosVersion && (
            <div className="bg-[#eaf6f5] rounded-2xl p-3.5 text-center relative mt-4 mb-2 border border-[#c4e4e0]">
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

                <button
                  type="button"
                  className="w-full bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-[11px] font-bold py-2 rounded-lg transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {/* ==================================================
              SIGN OUT
          ================================================== */}

          <button
            type="button"
            onClick={() => setShowSignOut(true)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-full text-xs font-semibold text-[#5a6a76] hover:bg-[#f0f4f5] hover:text-[#1a2632] w-full transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="flex-1 flex flex-col min-w-0 h-full bg-white">
        {/* ====================================================
            TOPBAR
        ==================================================== */}

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

          {/* ==================================================
              HEADER RIGHT
          ================================================== */}

          <div className="flex items-center gap-6">
            {/* Search */}

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
              {/* ==================================================
                  PROFILE
              ================================================== */}

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

              {/* Notification */}

              <button
                type="button"
                className="w-9 h-9 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898] hover:bg-[#d4efed] transition-colors relative"
              >
                <Bell size={18} />

                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#ef4444] rounded-full border border-white" />
              </button>

              {/* Settings */}

              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="w-9 h-9 rounded-full bg-[#f0f4f5] flex items-center justify-center text-[#5a6a76] hover:bg-[#dde5e7] transition-colors"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* ====================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-4 pb-4 sm:pr-6 sm:pb-6">
          <div className="flex-1 bg-[#f5f7f8] rounded-lg p-3 sm:p-4 flex flex-col min-h-0">
            <div className="flex-1 bg-[#f5f7f8] rounded-2xl flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                <Outlet />
              </div>
            </div>
          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

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

      {/* ======================================================
          SIGN OUT MODAL
      ====================================================== */}

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
