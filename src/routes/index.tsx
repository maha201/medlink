// src/routes/index.tsx
import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { SuperAdminRoute } from "./SuperAdminRoute";

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
const LaboratoryPage = lazy(() => import("@/pages/laboratory/LaboratoryPage"));
const BillingPage = lazy(() => import("@/pages/billing/BillingPage"));
const ReportsPage = lazy(() => import("@/pages/reports/ReportsPage"));
const MessagesPage = lazy(() => import("@/pages/messages/MessagesPage"));
const SettingsPage = lazy(() => import("@/pages/settings/SettingsPage"));
const NotFoundPage = lazy(() => import("@/pages/errors/NotFoundPage"));

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
          { path: "/settings", element: S(<SettingsPage />) },
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
