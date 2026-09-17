"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, AlertCircle } from "lucide-react";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

interface HospitalModuleData {
  id: number | string;
  hospital: string;
  plan: string;
  modules: string[];
}

export default function SAModuleControlPage() {
  const [hospitals, setHospitals] = useState<HospitalModuleData[]>([]);
  const [allModules, setAllModules] = useState<string[]>([
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
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingId, setSavingId] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch available system modules
        try {
          const modResponse = await apiFetch(API_ENDPOINTS.modules);
          if (modResponse.ok) {
            const modResult = await modResponse.json();
            const modData = modResult?.data || modResult;
            if (Array.isArray(modData) && modData.length > 0) {
              setAllModules(
                modData.map((m: any) =>
                  typeof m === "string" ? m : m.name || m.slug,
                ),
              );
            }
          }
        } catch (err) {
          console.warn("Using default modules fallback list:", err);
        }

        // 2. Fetch hospital list
        const hospResponse = await apiFetch(API_ENDPOINTS.hospitalList);
        if (!hospResponse.ok) {
          throw new Error(
            `Failed to fetch hospitals: ${hospResponse.statusText}`,
          );
        }

        const hospResult = await hospResponse.json();
        const hospList = hospResult?.data || hospResult;

        if (Array.isArray(hospList)) {
          const formattedHospitals = await Promise.all(
            hospList.map(async (h: any) => {
              let activeModules = h.modules || [];

              // If modules are not embedded, fetch via hospitalModules endpoint
              if (!h.modules && API_ENDPOINTS.hospitalModules) {
                try {
                  const endpoint = API_ENDPOINTS.hospitalModules.replace(
                    "{id}",
                    String(h.id),
                  );
                  const mRes = await apiFetch(endpoint);
                  if (mRes.ok) {
                    const mJson = await mRes.json();
                    const mData = mJson?.data || mJson;
                    activeModules = Array.isArray(mData)
                      ? mData.map((m: any) =>
                          typeof m === "string" ? m : m.name || m.slug,
                        )
                      : [];
                  }
                } catch (e) {
                  console.error(
                    `Failed to fetch modules for hospital ${h.id}`,
                    e,
                  );
                }
              }

              return {
                id: h.id,
                hospital: h.name,
                plan: h.plan_name || h.plan || "Basic",
                modules: activeModules,
              };
            }),
          );
          setHospitals(formattedHospitals);
        }
      } catch (err: any) {
        console.error("Module Control Data Fetch Error:", err);
        setError(err.message || "Failed to load module control data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggle = (hospitalId: string | number, mod: string) => {
    setHospitals((prev) =>
      prev.map((h) => {
        if (h.id !== hospitalId) return h;
        const has = h.modules.includes(mod);
        return {
          ...h,
          modules: has
            ? h.modules.filter((m) => m !== mod)
            : [...h.modules, mod],
        };
      }),
    );
  };

  const save = async (hospitalId: string | number) => {
    const hospital = hospitals.find((h) => h.id === hospitalId);
    if (!hospital) return;

    try {
      setSavingId(hospitalId);
      setError(null);

      const endpoint = API_ENDPOINTS.updateHospitalModules.replace(
        "{id}",
        String(hospitalId),
      );

      const response = await apiFetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modules: hospital.modules }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || `Failed to update modules (${response.status})`,
        );
      }

      setSuccessId(hospitalId);
      setTimeout(() => setSuccessId(null), 2000);
    } catch (err: any) {
      console.error("Save Modules Error:", err);
      setError(err.message || "Failed to update hospital modules.");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center space-x-2 text-[#3a9898]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-sm font-medium">Loading Module Controls...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-bold text-[#1a2632]">Module Control</h1>
      <p className="text-xs text-[#8b9bae]">
        Enable or disable modules per hospital. Changes take effect immediately
        after saving.
      </p>

      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-100 text-xs">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {hospitals.length > 0 ? (
          hospitals.map((h) => (
            <div key={h.id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#1a2632]">
                    {h.hospital}
                  </h3>
                  <p className="text-[11px] text-[#8b9bae]">
                    {h.plan} Plan · {h.modules.length} modules enabled
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => save(h.id)}
                  disabled={savingId === h.id}
                  className="flex items-center gap-1.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                >
                  {savingId === h.id ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Saving...
                    </>
                  ) : successId === h.id ? (
                    "✓ Saved"
                  ) : (
                    <>
                      <Save size={12} /> Save
                    </>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {allModules.map((m) => {
                  const enabled = h.modules.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggle(h.id, m)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        enabled
                          ? "bg-[#3a9898] text-white border-[#3a9898]"
                          : "bg-[#f5f7f8] text-[#8b9bae] border-transparent hover:border-[#3a9898]/30"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-xs text-[#8b9bae]">
            No hospital records found for module configuration.
          </div>
        )}
      </div>
    </div>
  );
}
