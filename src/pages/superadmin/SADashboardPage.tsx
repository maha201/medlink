"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

// TypeScript Interfaces for API Response
interface DashboardStats {
  totalHospitals: number | string;
  totalChange?: string;
  activeCount: number | string;
  activePercentage?: string;
  trialCount: number | string;
  trialNote?: string;
  expiredCount: number | string;
  expiredNote?: string;
}

interface Hospital {
  id?: string | number;
  name: string;
  plan: string;
  status: "Active" | "Trial" | "Expired" | string;
  expiry: string;
  modules: number;
}

interface DashboardData {
  stats?: DashboardStats;
  recentHospitals?: Hospital[];
}

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Trial: "bg-amber-100 text-amber-700",
  Expired: "bg-red-100 text-red-700",
};

export default function SADashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFetch(API_ENDPOINTS.Dashboard);

        if (!response.ok) {
          throw new Error(
            `Server Error: ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();
        // API Payload structure extractor
        setDashboardData(result?.data || result);
      } catch (err: any) {
        console.error("Dashboard API Fetch Error:", err);
        setError(err.message || "Failed to load dashboard data from API.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center space-x-2 text-[#3a9898]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm font-medium">Loading Dashboard...</span>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-700 border border-red-100">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </div>
    );
  }

  // Dynamic values mapped from API Response
  const dynamicStats = [
    {
      label: "Total Hospitals",
      value: dashboardData?.stats?.totalHospitals ?? "0",
      icon: Building2,
      color: "bg-[#3a9898]",
      change: dashboardData?.stats?.totalChange ?? "Updated just now",
    },
    {
      label: "Active",
      value: dashboardData?.stats?.activeCount ?? "0",
      icon: CheckCircle,
      color: "bg-emerald-500",
      change: dashboardData?.stats?.activePercentage ?? "Active state",
    },
    {
      label: "Trial",
      value: dashboardData?.stats?.trialCount ?? "0",
      icon: Clock,
      color: "bg-amber-500",
      change: dashboardData?.stats?.trialNote ?? "In trial period",
    },
    {
      label: "Expired",
      value: dashboardData?.stats?.expiredCount ?? "0",
      icon: XCircle,
      color: "bg-red-500",
      change: dashboardData?.stats?.expiredNote ?? "Requires action",
    },
  ];

  const hospitalsList = dashboardData?.recentHospitals || [];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-[#8b9bae]">{s.label}</p>
              <div
                className={`w-8 h-8 ${s.color} rounded-xl flex items-center justify-center`}
              >
                <s.icon size={15} className="text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1a2632]">{s.value}</p>
            <p className="text-[11px] text-[#8b9bae] mt-1 flex items-center gap-1">
              <TrendingUp size={10} /> {s.change}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Hospitals Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f5]">
          <h2 className="text-sm font-bold text-[#1a2632]">Recent Hospitals</h2>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {["Hospital", "Plan", "Status", "Expiry", "Modules"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left font-semibold text-[#8b9bae]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hospitalsList.length > 0 ? (
              hospitalsList.map((h, i) => (
                <tr
                  key={h.id || i}
                  className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]"
                >
                  <td className="px-6 py-3.5 font-semibold text-[#1a2632]">
                    {h.name}
                  </td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{h.plan}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        statusStyle[h.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{h.expiry}</td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">
                    {h.modules} enabled
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-[#8b9bae]"
                >
                  No hospital data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
