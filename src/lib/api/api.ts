const DEFAULT_API_BASE_URL = "http://localhost:8000";
const AUTH_STORAGE_KEY = "medlink_auth";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/$/, "");

export const API_ENDPOINTS = {
  hospitalDashboard: "hospital/dashboard",
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
