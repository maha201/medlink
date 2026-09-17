"use client";

import { useState, useEffect, ReactNode } from "react";
import { Save, Loader2, AlertCircle } from "lucide-react";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

interface Plan {
  id?: number | string;
  name: string;
  price: string;
  features: string[];
}

interface Subscription {
  id: number | string;
  hospital_id?: number | string;
  hospital: string;
  plan: string;
  plan_id?: number | string;
  status: string;
  start: string;
  expiry: string;
  amount: string;
}

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Trial: "bg-amber-100 text-amber-700",
  Expired: "bg-red-100 text-red-700",
  active: "bg-emerald-100 text-emerald-700",
  trial: "bg-amber-100 text-amber-700",
  expired: "bg-red-100 text-red-700",
};

export default function SAPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      name: "Basic",
      price: "₹1,999/mo",
      features: [
        "Up to 5 Doctors",
        "3 Modules",
        "Email Support",
        "500 Patients/mo",
      ],
    },
    {
      name: "Pro",
      price: "₹4,999/mo",
      features: [
        "Unlimited Doctors",
        "All Modules",
        "Priority Support",
        "Unlimited Patients",
      ],
    },
  ]);

  const [subscriptionsList, setSubscriptionsList] = useState<Subscription[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<number | string | null>(null);
  const [savingId, setSavingId] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    plan: "",
    plan_id: "",
    status: "",
    expiry: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Fetch available plans from backend
      try {
        const plansRes = await apiFetch(API_ENDPOINTS.plans);
        if (plansRes.ok) {
          const plansResult = await plansRes.json();
          const plansData = plansResult?.data || plansResult;
          if (Array.isArray(plansData) && plansData.length > 0) {
            setPlans(
              plansData.map((p: any) => ({
                id: p.id,
                name: p.name || p.title,
                price: p.price ? `₹${p.price}/mo` : "Custom",
                features: Array.isArray(p.features)
                  ? p.features
                  : typeof p.features === "string"
                    ? JSON.parse(p.features)
                    : [],
              })),
            );
          }
        }
      } catch (err) {
        console.warn("Using default plans fallback:", err);
      }

      // 2. Fetch subscriptions list
      const subsRes = await apiFetch(API_ENDPOINTS.subscriptions);
      if (!subsRes.ok) {
        throw new Error(`Failed to fetch subscriptions: ${subsRes.statusText}`);
      }

      const subsResult = await subsRes.json();
      const subsData = subsResult?.data || subsResult;

      if (Array.isArray(subsData)) {
        const formattedSubs = subsData.map((s: any) => ({
          id: s.id,
          hospital_id: s.hospital_id || s.hospital?.id,
          hospital: s.hospital_name || s.hospital?.name || "Unknown Hospital",
          plan: s.plan_name || s.plan?.name || "Basic",
          plan_id: s.plan_id || s.plan?.id || "",
          status:
            s.status?.charAt(0).toUpperCase() + s.status?.slice(1) || "Active",
          start: s.start_date || s.created_at || "-",
          expiry: s.expiry_date || s.ends_at || "-",
          amount: s.amount
            ? `₹${s.amount}/mo`
            : s.plan_price
              ? `₹${s.plan_price}/mo`
              : "₹0",
        }));
        setSubscriptionsList(formattedSubs);
      }
    } catch (err: any) {
      console.error("Subscription Data Fetch Error:", err);
      setError(err.message || "Failed to load subscription data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startEdit = (s: Subscription) => {
    setEditing(s.id);
    setEditForm({
      plan: s.plan,
      plan_id: String(s.plan_id || ""),
      status: s.status,
      expiry: s.expiry !== "-" ? s.expiry : "",
    });
  };

  const handleSave = async (s: Subscription) => {
    try {
      setSavingId(s.id);
      setError(null);

      const targetHospitalId = s.hospital_id || s.id;
      const endpoint = API_ENDPOINTS.updateHospitalSubscription.replace(
        "{id}",
        String(targetHospitalId),
      );

      const payload = {
        plan_id: editForm.plan_id || undefined,
        plan_name: editForm.plan,
        status: editForm.status.toLowerCase(),
        expiry_date: editForm.expiry,
      };

      const response = await apiFetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Failed to update subscription (${response.status})`,
        );
      }

      setEditing(null);
      await fetchData(); // Refresh data from backend after update
    } catch (err: any) {
      console.error("Save Subscription Error:", err);
      setError(err.message || "Failed to update subscription.");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center space-x-2 text-[#3a9898]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm font-medium">Loading Subscriptions...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-lg font-bold text-[#1a2632]">
        Subscription Management
      </h1>

      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-100 text-xs">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`bg-white rounded-2xl shadow-sm p-5 border-2 ${
              p.name.toLowerCase() === "pro"
                ? "border-[#3a9898]"
                : "border-transparent"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1a2632]">{p.name}</h3>
              {p.name.toLowerCase() === "pro" && (
                <span className="text-[10px] font-bold bg-[#3a9898] text-white px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-[#3a9898] mb-3">{p.price}</p>
            <ul className="space-y-1.5">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="text-xs text-[#5a6a76] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3a9898] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f5]">
          <h2 className="text-sm font-bold text-[#1a2632]">
            Hospital Subscriptions
          </h2>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#f0f4f5]">
              {[
                "Hospital",
                "Plan",
                "Status",
                "Start",
                "Expiry",
                "Amount",
                "Action",
              ].map((h) => (
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
            {subscriptionsList.length > 0 ? (
              subscriptionsList.map((s) => (
                <FragmentKeyWrapper key={s.id}>
                  <tr className="border-b border-[#f0f4f5] last:border-0 hover:bg-[#f9fafb]">
                    <td className="px-6 py-3.5 font-semibold text-[#1a2632]">
                      {s.hospital}
                    </td>
                    <td className="px-6 py-3.5 text-[#5a6a76]">{s.plan}</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          statusStyle[s.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-[#5a6a76]">{s.start}</td>
                    <td className="px-6 py-3.5 text-[#5a6a76]">{s.expiry}</td>
                    <td className="px-6 py-3.5 text-[#5a6a76]">{s.amount}</td>
                    <td className="px-6 py-3.5">
                      <button
                        type="button"
                        onClick={() =>
                          editing === s.id ? setEditing(null) : startEdit(s)
                        }
                        className="text-[#3a9898] font-semibold hover:underline"
                      >
                        {editing === s.id ? "Cancel" : "Edit"}
                      </button>
                    </td>
                  </tr>

                  {editing === s.id && (
                    <tr className="bg-[#f9fafb] border-b border-[#f0f4f5]">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="flex items-end gap-4 flex-wrap">
                          <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-[#5a6a76]">
                              Plan
                            </label>
                            <select
                              value={editForm.plan}
                              onChange={(e) =>
                                setEditForm((p) => ({
                                  ...p,
                                  plan: e.target.value,
                                }))
                              }
                              className="bg-white border border-[#dde5e7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#3a9898]"
                            >
                              {plans.map((p) => (
                                <option key={p.name} value={p.name}>
                                  {p.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-[#5a6a76]">
                              Status
                            </label>
                            <select
                              value={editForm.status}
                              onChange={(e) =>
                                setEditForm((p) => ({
                                  ...p,
                                  status: e.target.value,
                                }))
                              }
                              className="bg-white border border-[#dde5e7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#3a9898]"
                            >
                              <option value="Trial">Trial</option>
                              <option value="Active">Active</option>
                              <option value="Expired">Expired</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-[#5a6a76]">
                              Expiry Date
                            </label>
                            <input
                              type="date"
                              value={editForm.expiry}
                              onChange={(e) =>
                                setEditForm((p) => ({
                                  ...p,
                                  expiry: e.target.value,
                                }))
                              }
                              className="bg-white border border-[#dde5e7] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#3a9898]"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSave(s)}
                            disabled={savingId === s.id}
                            className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {savingId === s.id ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />{" "}
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save size={12} /> Save
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </FragmentKeyWrapper>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-xs text-[#8b9bae]"
                >
                  No subscription records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Simple wrapper component to handle key prop correctly for table elements
function FragmentKeyWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
