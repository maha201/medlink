// src/routes/index.tsx
import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { SuperAdminRoute } from "./SuperAdminRoute";
import VisitorsPage from "@/pages/visitors/VisitorsPage";
import ConsultationPage from "@/pages/consultation/consultationPage";
import FollowUpPage from "@/pages/follow-up/followUpPage";
import TeamAndAccessPage from "@/pages/team-access/TeamAndAccessPage";
import ClinicSettingsPage from "@/components/settings/ClinicSettingsPage";
import TreatmentPlanList from "@/pages/treatment-plan/TreatmentPlanList";
import DoctorProfile from "@/pages/doctor-profile/DoctorProfilePage";
import OpdTodayPage from "@/pages/OpdTodayPage/OpdTodayPage";

// ── Layouts ────────────────────────────────────────────────
const AuthLayout = lazy(() => import("@/components/layout/AuthLayout"));
const AppLayout = lazy(() => import("@/components/layout/AppLayout"));
const SuperAdminLayout = lazy(
  () => import("@/components/layout/SuperAdminLayout"),
);

// ── Auth Pages ─────────────────────────────────────────────
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const CreateAccountPage = lazy(() => import("@/pages/auth/CreateAccountPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/ForgotPasswordPage"),
);

// ── Hospital App Pages ─────────────────────────────────────
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const PatientsPage = lazy(() => import("@/pages/patients/PatientsPage"));
const PatientDetailPage = lazy(
  () => import("@/pages/patients/PatientDetailPage"),
);
const AddPatientPage = lazy(() => import("@/pages/patients/AddPatientPage"));
const DoctorsPage = lazy(() => import("@/pages/doctors/DoctorsPage"));
const DoctorDetailPage = lazy(() => import("@/pages/doctors/DoctorDetailPage"));
const AppointmentsPage = lazy(
  () => import("@/pages/appointments/AppointmentsPage"),
);
const AppointmentCalendarPage = lazy(
  () => import("@/pages/appointments/AppointmentCalendarPage"),
);
const DepartmentsPage = lazy(
  () => import("@/pages/departments/DepartmentsPage"),
);
const InventoryDashboardPage = lazy(
  () => import("@/pages/inventory/InvDashboard"),
);
const AddItemModal = lazy(() => import("@/pages/inventory/AddItemModal"));
const PharmacyPage = lazy(() => import("@/pages/pharmacy/PharmacyPage"));
const LaboratoryPage = lazy(() => import("@/pages/visitors/VisitorsPage"));
const BillingPage = lazy(() => import("@/pages/billing/BillingPage"));
const ReportsPage = lazy(() => import("@/pages/reports/ReportsPage"));
const MessagesPage = lazy(() => import("@/pages/messages/MessagesPage"));
const NotFoundPage = lazy(() => import("@/pages/errors/NotFoundPage"));

// ── POS Pages (Temporary pointing to PosDashboard or respective files) ──
const PosDashboard = lazy(() => import("@/pages/pos/dashboard/PosDashboard"));
const PosBilling = lazy(() => import("@/pages/pos/billing/PosBilling"));
const AllSales = lazy(() => import("@/pages/pos/sales/AllSales"));
const SalesReturns = lazy(() => import("@/pages/pos/sales/SalesReturns"));
const SalesPayments = lazy(() => import("@/pages/pos/sales/SalesPayments"));
const ProductsList = lazy(() => import("@/pages/pos/products/ProductsList"));
const Categories = lazy(() => import("@/pages/pos/products/Categories"));
const Brands = lazy(() => import("@/pages/pos/products/Brands"));
const Units = lazy(() => import("@/pages/pos/products/Units"));
const StockOverview = lazy(() => import("@/pages/pos/inventory/StockOverview"));
const StockAdjustment = lazy(
  () => import("@/pages/pos/inventory/StockAdjustment"),
);
const StockMovement = lazy(() => import("@/pages/pos/inventory/StockMovement"));
const LowStock = lazy(() => import("@/pages/pos/inventory/LowStock"));
const PurchasesList = lazy(() => import("@/pages/pos/purchases/PurchasesList"));
const Suppliers = lazy(() => import("@/pages/pos/purchases/Suppliers"));
const PurchaseReturns = lazy(
  () => import("@/pages/pos/purchases/PurchaseReturns"),
);
const CustomersList = lazy(() => import("@/pages/pos/customers/CustomersList"));
const CustomerPayments = lazy(
  () => import("@/pages/pos/customers/CustomerPayments"),
);
const ExpensesList = lazy(() => import("@/pages/pos/expenses/ExpensesList"));
const CashRegister = lazy(
  () => import("@/pages/pos/cash-register/CashRegister"),
);
const SalesReport = lazy(() => import("@/pages/pos/reports/SalesReport"));
const PurchaseReport = lazy(() => import("@/pages/pos/reports/PurchaseReport"));
const InventoryReport = lazy(
  () => import("@/pages/pos/reports/InventoryReport"),
);
const ExpenseReport = lazy(() => import("@/pages/pos/reports/ExpenseReport"));
const ProfitReport = lazy(() => import("@/pages/pos/reports/ProfitReport"));
const StaffList = lazy(() => import("@/pages/pos/staff/StaffList"));
const StaffRoles = lazy(() => import("@/pages/pos/staff/Roles"));
const StaffPermissions = lazy(() => import("@/pages/pos/staff/Permissions"));
const PosSettings = lazy(() => import("@/pages/pos/settings/PosSettings"));

// ── Super Admin Pages ──────────────────────────────────────
const SADashboardPage = lazy(
  () => import("@/pages/superadmin/SADashboardPage"),
);
const SAHospitalsPage = lazy(
  () => import("@/pages/superadmin/SAHospitalsPage"),
);
const SAHospitalSetupPage = lazy(
  () => import("@/pages/superadmin/SAHospitalSetupPage"),
);
const SAPlansPage = lazy(() => import("@/pages/superadmin/SAPlansPage"));
const SAModuleControlPage = lazy(
  () => import("@/pages/superadmin/SAModuleControlPage"),
);
const SAUsersPage = lazy(() => import("@/pages/superadmin/SAUsersPage"));
const SAAuditLogsPage = lazy(
  () => import("@/pages/superadmin/SAAuditLogsPage"),
);

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-[--color-bg-page]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[--color-primary-200] border-t-[--color-primary-700]" />
  </div>
);

const S = (component: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>{component}</Suspense>
);

const InventoryRoute = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  return (
    <>
      <InventoryDashboardPage
        onAddItem={() => setShowAddItemModal(true)}
        onCreatePO={() => {}}
      />
      {showAddItemModal &&
        S(<AddItemModal onClose={() => setShowAddItemModal(false)} />)}
    </>
  );
};

export const router = createBrowserRouter([
  // ── Public Routes ──────────────────────────────────────
  {
    element: S(<PublicRoute />),
    children: [
      {
        element: S(<AuthLayout />),
        children: [
          { path: "/login", element: S(<LoginPage />) },
          { path: "/create-account", element: S(<CreateAccountPage />) },
          { path: "/forgot-password", element: S(<ForgotPasswordPage />) },
        ],
      },
    ],
  },

  // ── Hospital App (Protected) ───────────────────────────
  {
    element: S(<ProtectedRoute />),
    children: [
      {
        element: S(<AppLayout />),
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: S(<DashboardPage />) },
          { path: "/patients", element: S(<PatientsPage />) },
          { path: "/opd", element: S(<OpdTodayPage />) },
          { path: "/visitors", element: S(<VisitorsPage />) },
          { path: "/team-access", element: S(<TeamAndAccessPage />) },
          { path: "/doctor-profile", element: S(<DoctorProfile />) },
          { path: "/treatment-plan", element: S(<TreatmentPlanList />) },
          { path: "/follow-up", element: S(<FollowUpPage />) },
          { path: "/consultation", element: S(<ConsultationPage />) },
          { path: "/patients/new", element: S(<AddPatientPage />) },
          { path: "/patients/:id", element: S(<PatientDetailPage />) },
          { path: "/doctors", element: S(<DoctorsPage />) },
          { path: "/doctors/:id", element: S(<DoctorDetailPage />) },
          { path: "/appointments", element: S(<AppointmentsPage />) },
          {
            path: "/appointments/calendar",
            element: S(<AppointmentCalendarPage />),
          },
          { path: "/departments", element: S(<DepartmentsPage />) },
          { path: "/inventory", element: S(<InventoryRoute />) },
          { path: "/pharmacy", element: S(<PharmacyPage />) },
          { path: "/laboratory", element: S(<LaboratoryPage />) },
          { path: "/billing", element: S(<BillingPage />) },
          { path: "/reports", element: S(<ReportsPage />) },
          { path: "/messages", element: S(<MessagesPage />) },
          { path: "/settings", element: S(<ClinicSettingsPage />) },

          // ── POS Routes ─────────────────────────────────
          { path: "/pos/dashboard", element: S(<PosDashboard />) },
          { path: "/pos/billing", element: S(<PosBilling />) },
          { path: "/pos/sales/all", element: S(<AllSales />) },
          { path: "/pos/sales/returns", element: S(<SalesReturns />) },
          { path: "/pos/sales/payments", element: S(<SalesPayments />) },
          { path: "/pos/products", element: S(<ProductsList />) },
          { path: "/pos/products/categories", element: S(<Categories />) },
          { path: "/pos/products/brands", element: S(<Brands />) },
          { path: "/pos/products/units", element: S(<Units />) },
          { path: "/pos/inventory/overview", element: S(<StockOverview />) },
          {
            path: "/pos/inventory/adjustment",
            element: S(<StockAdjustment />),
          },
          { path: "/pos/inventory/movement", element: S(<StockMovement />) },
          { path: "/pos/inventory/low-stock", element: S(<LowStock />) },
          { path: "/pos/purchases", element: S(<PurchasesList />) },
          { path: "/pos/purchases/suppliers", element: S(<Suppliers />) },
          { path: "/pos/purchases/returns", element: S(<PurchaseReturns />) },
          { path: "/pos/customers", element: S(<CustomersList />) },
          { path: "/pos/customers/payments", element: S(<CustomerPayments />) },
          { path: "/pos/expenses", element: S(<ExpensesList />) },
          { path: "/pos/cash-register", element: S(<CashRegister />) },
          {
            path: "/pos/reports/sales",
            element: S(<SalesReport />),
          },
          { path: "/pos/reports/purchase", element: S(<PurchaseReport />) },
          { path: "/pos/reports/inventory", element: S(<InventoryReport />) },
          { path: "/pos/reports/expense", element: S(<ExpenseReport />) },
          { path: "/pos/reports/profit", element: S(<ProfitReport />) },
          { path: "/pos/staff", element: S(<StaffList />) },
          { path: "/pos/staff/roles", element: S(<StaffRoles />) },
          { path: "/pos/staff/permissions", element: S(<StaffPermissions />) },
          { path: "/pos/settings", element: S(<PosSettings />) },
        ],
      },
    ],
  },

  // ── Super Admin Portal ─────────────────────────────────
  {
    element: S(<SuperAdminRoute />),
    children: [
      {
        element: S(<SuperAdminLayout />),
        children: [
          { path: "/superadmin", element: S(<SADashboardPage />) },
          { path: "/superadmin/hospitals", element: S(<SAHospitalsPage />) },
          {
            path: "/superadmin/hospital-setup",
            element: S(<SAHospitalSetupPage />),
          },
          { path: "/superadmin/plans", element: S(<SAPlansPage />) },
          { path: "/superadmin/modules", element: S(<SAModuleControlPage />) },
          { path: "/superadmin/users", element: S(<SAUsersPage />) },
          { path: "/superadmin/audit-logs", element: S(<SAAuditLogsPage />) },
        ],
      },
    ],
  },

  // ── 404 ────────────────────────────────────────────────
  { path: "*", element: S(<NotFoundPage />) },
]);
