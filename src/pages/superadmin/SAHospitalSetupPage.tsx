"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

const modulesList = [
  "Dashboard",
  "Patients",
  "Doctors",
  "Appointments",
  "Pharmacy",
  "Laboratory",
  "Billing",
  "Inventory",
  "Reports",
  "Messages",
];

interface HospitalSetupPageProps {
  hospitalId?: string | number; // Pass hospitalId to load/update existing setup
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: FieldProps) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-[#5a6a76]">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder || label}
      value={value}
      onChange={onChange}
      className="w-full bg-[#f5f7f8] border border-transparent rounded-xl px-4 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898] transition-all placeholder:text-[#a8b8c8]"
    />
  </div>
);

export default function SAHospitalSetupPage({
  hospitalId,
}: HospitalSetupPageProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
    adminPassword: "", // Added newly required Admin Password field
    planId: "1", // Mapped with backend integer plan_id
    status: "trial",
    expiryDate: "",
    maxDoctors: "",
    maxPatients: "",
  });

  const [enabledModules, setEnabledModules] = useState<string[]>([
    "Dashboard",
    "Patients",
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Helper change handler for inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 1. Fetch Existing Hospital Setup Details (GET)
  useEffect(() => {
    if (!hospitalId) return;

    const fetchSetupData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Dynamic Endpoint replacement: /api/v1/master/hospitals/{id}/setup
        const endpoint = API_ENDPOINTS.hospitalSetup
          ? API_ENDPOINTS.hospitalSetup.replace("{id}", String(hospitalId))
          : `master/hospitals/${hospitalId}/setup`;

        const response = await apiFetch(endpoint);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        const data = result?.data || result;

        if (data) {
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            city: data.city || "",
            state: data.state || "",
            address: data.address || "",
            adminName: data.admin_name || "",
            adminEmail: data.admin_email || "",
            adminPhone: data.admin_phone || "",
            adminPassword: "", // Password remains empty on edit for security
            planId: String(data.plan_id || "1"),
            status: data.status || "trial",
            expiryDate: data.expiry_date || "",
            maxDoctors: data.max_doctors ? String(data.max_doctors) : "",
            maxPatients: data.max_patients ? String(data.max_patients) : "",
          });

          if (Array.isArray(data.modules)) {
            setEnabledModules(data.modules);
          }
        }
      } catch (err: any) {
        console.error("Fetch Hospital Setup Error:", err);
        setError(err.message || "Failed to load hospital setup details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSetupData();
  }, [hospitalId]);

  const toggleModule = (m: string) => {
    setEnabledModules((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );
  };

  // 2. Submit Logic (Create or Update API Payload)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    // Clean phone numbers: remove all non-numeric characters except leading +
    const sanitizePhone = (val: string) => {
      if (!val) return "";
      const cleaned = val.replace(/[^\d+]/g, "");
      return cleaned.slice(0, 20);
    };

    // Backend compatible payload format with password included
    const payload: Record<string, any> = {
      name: form.name,
      email: form.email,
      phone: sanitizePhone(form.phone),
      admin_phone: sanitizePhone(form.adminPhone),
      city: form.city,
      state: form.state,
      address: form.address,
      admin_name: form.adminName,
      admin_email: form.adminEmail,
      password: form.adminPassword || undefined, // Sent to backend to create user entry
      admin_password: form.adminPassword || undefined,
      plan_id: form.planId ? parseInt(form.planId, 10) : null,
      status: form.status.toLowerCase(),
      expiry_date: form.expiryDate || null,
      max_doctors: form.maxDoctors ? parseInt(form.maxDoctors, 10) : null,
      max_patients: form.maxPatients ? parseInt(form.maxPatients, 10) : null,
      modules: enabledModules,
    };

    try {
      let endpoint: string = API_ENDPOINTS.createHospital;
      let method = "POST";

      if (hospitalId) {
        endpoint = API_ENDPOINTS.hospitalSetup.replace(
          "{id}",
          String(hospitalId),
        );
        method = "PUT";
      }

      const response = await apiFetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || `Failed to save setup (${response.status})`,
        );
      }

      setSuccessMessage(
        hospitalId
          ? "Hospital setup updated successfully!"
          : "Hospital created successfully!",
      );

      // Clear password field after successful save
      setForm((prev) => ({ ...prev, adminPassword: "" }));

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error("Save Hospital Setup Error:", err);
      setError(err.message || "Failed to save hospital setup.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center space-x-2 text-[#3a9898]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm font-medium">Loading Setup Data...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-[#1a2632]">
          {hospitalId ? "Edit Hospital Setup" : "Hospital Setup"}
        </h1>

        {/* Notifications */}
        {successMessage && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
            <CheckCircle2 size={14} /> {successMessage}
          </span>
        )}
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-100 text-xs">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hospital Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#1a2632] mb-2">
            Hospital Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Hospital Name"
              name="name"
              placeholder="e.g. Apollo Clinic"
              value={form.name}
              onChange={handleInputChange}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="admin@hospital.com"
              value={form.email}
              onChange={handleInputChange}
            />
            <Field
              label="Phone"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleInputChange}
            />
            <Field
              label="City"
              name="city"
              placeholder="Chennai"
              value={form.city}
              onChange={handleInputChange}
            />
            <Field
              label="State"
              name="state"
              placeholder="Tamil Nadu"
              value={form.state}
              onChange={handleInputChange}
            />
            <Field
              label="Address"
              name="address"
              placeholder="Full address"
              value={form.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Admin Account Metadata */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#1a2632] mb-2">
            Hospital Admin Metadata
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field
              label="Admin Name"
              name="adminName"
              placeholder="Dr. John"
              value={form.adminName}
              onChange={handleInputChange}
            />
            <Field
              label="Admin Email"
              name="adminEmail"
              type="email"
              placeholder="john@hospital.com"
              value={form.adminEmail}
              onChange={handleInputChange}
            />
            <Field
              label="Admin Phone"
              name="adminPhone"
              placeholder="+91 98765 43210"
              value={form.adminPhone}
              onChange={handleInputChange}
            />
            <Field
              label="Admin Password"
              name="adminPassword"
              type="password"
              placeholder="Min 6 characters"
              value={form.adminPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Plan & Limits */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#1a2632] mb-2">
            Plan & Limits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a6a76]">
                Plan
              </label>
              <select
                value={form.planId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, planId: e.target.value }))
                }
                className="w-full bg-[#f5f7f8] border border-transparent rounded-xl px-4 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]"
              >
                <option value="1">Basic Plan</option>
                <option value="2">Pro Plan</option>
                <option value="3">Enterprise Plan</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a6a76]">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
                className="w-full bg-[#f5f7f8] border border-transparent rounded-xl px-4 py-2.5 text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] focus:ring-1 focus:ring-[#3a9898]"
              >
                <option value="trial">Trial</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <Field
              label="Expiry Date"
              name="expiryDate"
              type="date"
              value={form.expiryDate}
              onChange={handleInputChange}
            />
            <Field
              label="Max Doctors"
              name="maxDoctors"
              type="number"
              placeholder="e.g. 20"
              value={form.maxDoctors}
              onChange={handleInputChange}
            />
            <Field
              label="Max Patients"
              name="maxPatients"
              type="number"
              placeholder="e.g. 500"
              value={form.maxPatients}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Modules */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-sm font-bold text-[#1a2632] mb-4">
            Enable Modules
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {modulesList.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => toggleModule(m)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  enabledModules.includes(m)
                    ? "bg-[#3a9898] text-white border-[#3a9898]"
                    : "bg-[#f5f7f8] text-[#5a6a76] border-transparent hover:border-[#3a9898]/30"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {saving ? "Saving Setup..." : "Save Hospital"}
          </button>
        </div>
      </form>
    </div>
  );
}
