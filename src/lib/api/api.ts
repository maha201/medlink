const DEFAULT_API_BASE_URL = "http://localhost:8000";
const AUTH_STORAGE_KEY = "medlink_auth";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/$/, "");

export const API_ENDPOINTS = {
  // Hospital APIs
  hospitalDashboard: "hospital/dashboard",
  hospitalPatients: "hospital/patients",
  hospitalAppointments: "hospital/appointments",
  hospitalInventoryItems: "hospital/inventory/items",
  hospitalStockTransaction: "hospital/inventory/stock-transaction",

  // Master Hospital APIs
  hospitalList: "master/hospitals",
  createHospital: "master/hospitals",
  hospitalDetails: "master/hospitals/{id}",
  updateHospital: "master/hospitals/{id}",
  updateHospitalStatus: "master/hospitals/{id}/status",

  // Hospital Setup
  hospitalSetup: "master/hospitals/{id}/setup",
  updateHospitalSetup: "master/hospitals/{id}/setup",

  // Modules
  modules: "master/modules",
  hospitalModules: "master/hospitals/{id}/modules",
  updateHospitalModules: "master/hospitals/{id}/modules",

  // Plans and Subscriptions
  plans: "master/plans",
  subscriptions: "master/subscriptions",
  hospitalSubscription: "master/hospitals/{id}/subscription",
  updateHospitalSubscription: "master/hospitals/{id}/subscription",

  // Admin Users
  users: "master/users",
  createUser: "master/users",
  updateUserStatus: "master/users/{id}/status",
  deleteUser: "master/users/{id}",

  // Audit Logs
  auditLogs: "master/audit-logs",
} as const;

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  try {
    const auth = JSON.parse(
      window.localStorage.getItem(AUTH_STORAGE_KEY) ?? "null",
    ) as { token?: string | null } | null;

    return auth?.token ?? null;
  } catch {
    return null;
  }
};

export const apiFetch = (endpoint: string, init?: RequestInit) => {
  const token = getAuthToken();

  return fetch(`${API_BASE_URL}/${endpoint.replace(/^\/+/, "")}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
};
