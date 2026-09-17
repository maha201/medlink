"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

interface AdminUser {
  id: number | string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

export default function SAUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [actionLoadingId, setActionLoadingId] = useState<
    number | string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Support Admin",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch(API_ENDPOINTS.users);
      if (!response.ok) {
        throw new Error(`Failed to fetch admin users (${response.status})`);
      }

      const result = await response.json();
      const rawUsers = result?.data || result;

      if (Array.isArray(rawUsers)) {
        const formattedUsers: AdminUser[] = rawUsers.map((u: any) => ({
          id: u.id,
          name: u.name || u.full_name || "N/A",
          email: u.email || "N/A",
          role: u.role_name || u.role || "Support Admin",
          status:
            u.status?.toLowerCase() === "active" || u.status === 1
              ? "Active"
              : "Inactive",
          joined:
            u.created_at || u.joined_date
              ? new Date(u.created_at || u.joined_date)
                  .toISOString()
                  .split("T")[0]
              : new Date().toISOString().split("T")[0],
        }));
        setUsers(formattedUsers);
      }
    } catch (err: any) {
      console.error("Fetch Admin Users Error:", err);
      setError(err.message || "Failed to load admin users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      const response = await apiFetch(API_ENDPOINTS.createUser, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || `Failed to send invite (${response.status})`,
        );
      }

      setForm({ name: "", email: "", role: "Support Admin" });
      setShowForm(false);
      await fetchUsers(); // Refresh users list
    } catch (err: any) {
      console.error("Invite Admin Error:", err);
      setError(err.message || "Failed to invite user.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (user: AdminUser) => {
    try {
      setActionLoadingId(user.id);
      setError(null);

      const newStatus = user.status === "Active" ? "inactive" : "active";
      const endpoint = API_ENDPOINTS.updateUserStatus.replace(
        "{id}",
        String(user.id),
      );

      const response = await apiFetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || `Failed to update status (${response.status})`,
        );
      }

      await fetchUsers();
    } catch (err: any) {
      console.error("Update Status Error:", err);
      setError(err.message || "Failed to update user status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const deleteUser = async (id: number | string) => {
    if (!confirm("Are you sure you want to remove this admin user?")) return;

    try {
      setActionLoadingId(id);
      setError(null);

      const endpoint = API_ENDPOINTS.deleteUser.replace("{id}", String(id));

      const response = await apiFetch(endpoint, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || `Failed to delete user (${response.status})`,
        );
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      console.error("Delete User Error:", err);
      setError(err.message || "Failed to delete user.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center space-x-2 text-[#3a9898]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm font-medium">Loading Admin Users...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#1a2632]">Admin Users</h1>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={14} /> Invite User
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-100 text-xs">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Invite Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-sm font-bold text-[#1a2632] mb-4">
            Invite New Admin
          </h2>
          <form onSubmit={addUser} className="flex items-end gap-4 flex-wrap">
            <div className="space-y-1.5 flex-1 min-w-[160px]">
              <label className="text-xs font-semibold text-[#5a6a76]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ravi Kumar"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                required
                className="w-full bg-[#f5f7f8] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
              />
            </div>

            <div className="space-y-1.5 flex-1 min-w-[160px]">
              <label className="text-xs font-semibold text-[#5a6a76]">
                Email
              </label>
              <input
                type="email"
                placeholder="ravi@medlink.io"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                required
                className="w-full bg-[#f5f7f8] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a6a76]">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm((p) => ({ ...p, role: e.target.value }))
                }
                className="bg-[#f5f7f8] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Support Admin">Support Admin</option>
                <option value="Billing Admin">Billing Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Sending...
                </>
              ) : (
                "Send Invite"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {["Name", "Email", "Role", "Status", "Joined", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left font-semibold text-[#8b9bae]"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]"
                >
                  <td className="px-6 py-3.5 font-semibold text-[#1a2632]">
                    {u.name}
                  </td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{u.email}</td>
                  <td className="px-6 py-3.5">
                    <span className="bg-[#eaf6f5] text-[#3a9898] px-2.5 py-1 rounded-full text-[10px] font-bold">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button
                      type="button"
                      onClick={() => toggleStatus(u)}
                      disabled={actionLoadingId === u.id}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-opacity ${
                        u.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {actionLoadingId === u.id ? "Updating..." : u.status}
                    </button>
                  </td>
                  <td className="px-6 py-3.5 text-[#5a6a76]">{u.joined}</td>
                  <td className="px-6 py-3.5">
                    <button
                      type="button"
                      onClick={() => deleteUser(u.id)}
                      disabled={actionLoadingId === u.id}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#8b9bae] hover:text-red-500 transition-colors disabled:opacity-50"
                      title="Delete User"
                    >
                      {actionLoadingId === u.id ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-xs text-[#8b9bae]"
                >
                  No admin users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
