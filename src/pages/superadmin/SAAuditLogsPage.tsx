"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

interface AuditLog {
  id: number | string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: string;
}

const typeStyle: Record<string, string> = {
  Create: "bg-emerald-100 text-emerald-700",
  Update: "bg-blue-100 text-blue-700",
  Delete: "bg-red-100 text-red-700",
};

export default function SAAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Falls back to auditLogs or logs endpoint depending on config
      const endpoint = API_ENDPOINTS.auditLogs;
      const response = await apiFetch(endpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch audit logs (${response.status})`);
      }

      const result = await response.json();
      const rawLogs = result?.data || result;

      if (Array.isArray(rawLogs)) {
        const formattedLogs: AuditLog[] = rawLogs.map(
          (l: any, index: number) => {
            // Normalize log type (Create, Update, Delete)
            let type = l.type || l.event_type || l.action_type || "Update";
            type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

            if (!typeStyle[type]) {
              type = "Update"; // Default fallback type
            }

            return {
              id: l.id || index + 1,
              user: l.user_name || l.user || l.admin_name || "System",
              action: l.action || l.event || "Performed Action",
              target: l.target || l.resource || l.details || "N/A",
              time:
                l.created_at || l.time || l.timestamp
                  ? new Date(l.created_at || l.time || l.timestamp)
                      .toLocaleString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(",", "")
                  : "N/A",
              type,
            };
          },
        );

        setLogs(formattedLogs);
      }
    } catch (err: any) {
      console.error("Fetch Audit Logs Error:", err);
      setError(err.message || "Failed to load audit logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filtered = logs.filter((l) => {
    const matchSearch =
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || l.type === filter;
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center space-x-2 text-[#3a9898]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm font-medium">Loading Audit Logs...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold text-[#1a2632]">Audit Logs</h1>

      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-100 text-xs">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f5] flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]"
              size={14}
            />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#f5f7f8] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
            />
          </div>

          <div className="flex gap-2">
            {["All", "Create", "Update", "Delete"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filter === f
                    ? "bg-[#3a9898] text-white"
                    : "bg-[#f5f7f8] text-[#5a6a76] hover:bg-[#e8f0f0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {["Time", "User", "Action", "Target", "Type"].map((h) => (
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
            {filtered.length > 0 ? (
              filtered.map((l) => (
                <tr
                  key={l.id}
                  className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]"
                >
                  <td className="px-6 py-3.5 text-[#8b9bae] whitespace-nowrap">
                    {l.time}
                  </td>
                  <td className="px-6 py-3.5 font-semibold text-[#1a2632]">
                    {l.user}
                  </td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{l.action}</td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{l.target}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        typeStyle[l.type] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {l.type}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-xs text-[#8b9bae]"
                >
                  No logs found matching your query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
