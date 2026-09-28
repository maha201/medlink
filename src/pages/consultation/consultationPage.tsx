import { useState, useEffect, useCallback } from "react";
import { UserPlus, ChevronDown, Play, Loader2, ArrowLeft } from "lucide-react";
import AddConsultationModal from "./AddConsultationModal";
import PatientConsultationView from "./ConsultationView"; // View component import
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

export interface ConsultationRecord {
  id: string;
  name: string;
  patientId: string;
  gender: "female" | "male";
  age: number;
  reason: string;
  doctor: string;
  specialty: string;
  patientType: "OPD" | "Follow Up" | "Emergency" | "Appointment";
  time: string;
  location: string;
  status: "Start" | "In Treatment" | "Completed";
  highlight?: boolean;
}

export default function ConsultationPage() {
  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);

  // VIEW SCREEN CONNECTIVITY STATE
  const [selectedConsultation, setSelectedConsultation] =
    useState<ConsultationRecord | null>(null);

  // Pagination states
  const [currentPage] = useState<number>(1);

  // Fetch Consultations
  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const hospitalId = localStorage.getItem("hospitalId") || "";
      const patientId = localStorage.getItem("patientId") || "";

      const queryParams = new URLSearchParams({
        page: String(currentPage),
        limit: "20",
        ...(hospitalId && { hospitalId }),
        ...(patientId && { patientId }),
      }).toString();

      const rawResponse = await apiFetch(
        `${API_ENDPOINTS.hospitalAppointments}?${queryParams}`,
        { method: "GET" },
      );

      const res =
        typeof rawResponse?.json === "function"
          ? await rawResponse.json()
          : rawResponse;

      const dataList = Array.isArray(res) ? res : res?.data || [];

      const formattedRecords: ConsultationRecord[] = dataList.map(
        (item: any, index: number) => ({
          id: String(item.id || item._id || index + 1),
          name: item.name || item.patientName || "Daniel Wong",
          patientId: item.patientId || item.patientCode || "PT-2035-078",
          gender:
            item.gender?.toLowerCase() === "female" || item.gender === "♀"
              ? "female"
              : "male",
          age: Number(item.age) || 42,
          reason: item.reason || item.reasonForVisit || "General Consultation",
          doctor: item.doctor || item.doctorName || "Dr. Sriram",
          specialty: item.specialty || item.doctorSpecialty || "Cardiology",
          patientType: item.patientType || "OPD",
          time: item.time || item.appointmentTime || "10:00 AM",
          location: item.location || item.room || "Room 102",
          status: item.status || "Start",
          highlight: item.highlight || false,
        }),
      );

      setRecords(formattedRecords);
    } catch (err: any) {
      console.error("Fetch Consultations Error:", err);
      setError(err?.message || "Consultation data-vai load seyyavillai.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(records.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation(); // Stop row click navigation
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    records.length > 0 && records.every((r) => selectedIds.includes(r.id));

  // 1. IF A PATIENT IS SELECTED, SHOW THE PATIENT CONSULTATION VIEW SCREEN
  if (selectedConsultation) {
    return (
      <div className="animate-in fade-in duration-300">
        <button
          onClick={() => setSelectedConsultation(null)}
          className="mb-3 flex items-center gap-2 px-3 py-1.5 bg-white border border-[#dde5e7] text-[#3a9898] hover:bg-[#eaf6f5] rounded-xl text-xs font-bold transition-all"
        >
          <ArrowLeft size={14} /> Back to Consultation List
        </button>
        <PatientConsultationView
          patientId={selectedConsultation.patientId}
          appointmentId={selectedConsultation.id}
          onClose={() => setSelectedConsultation(null)}
        />
      </div>
    );
  }

  // 2. DEFAULT CONSULTATION LIST SCREEN
  return (
    <div className="animate-in fade-in duration-500">
      {showModal && (
        <AddConsultationModal
          onClose={() => setShowModal(false)}
          onAddConsultation={() => fetchConsultations()}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col sm:flex-row gap-4">
          <h2 className="text-2xl font-bold text-[#1a2632]">Consultation</h2>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eaf6f5] text-[#3a9898] rounded-full text-xs font-semibold border border-[#c4e4e0] cursor-pointer">
              <span>Gender</span>
              <ChevronDown size={14} />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20 ml-2"
            >
              <UserPlus size={15} strokeWidth={2.5} />
              Register Patient
            </button>
          </div>
        </div>

        {/* Consultation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafb] border-b border-[#dde5e7]">
                <th className="py-4 pl-6 pr-4 w-12">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={isAllSelected}
                    disabled={records.length === 0}
                    className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] accent-[#3a9898]"
                  />
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Name
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Gender / Age
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Reason
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Doctor
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Patient Type
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Time
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae]">
                  Location
                </th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eef3f5]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#8b9bae]">
                    <div className="flex items-center justify-center gap-2 text-sm font-medium">
                      <Loader2
                        className="animate-spin text-[#3a9898]"
                        size={20}
                      />
                      Loading consultation records...
                    </div>
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#8b9bae]">
                    No consultation records found.
                  </td>
                </tr>
              ) : (
                records.map((row) => {
                  const isSelected = selectedIds.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedConsultation(row)} // Click row to open View Screen
                      className="transition-colors hover:bg-[#f0f8f7] cursor-pointer"
                    >
                      <td className="py-4 pl-6 pr-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(row.id, e)}
                          className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] accent-[#3a9898]"
                        />
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#c8d8dc] shrink-0 flex items-center justify-center text-white text-xs font-bold">
                            {row.name ? row.name.charAt(0).toUpperCase() : "?"}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#1a2632] hover:underline">
                              {row.name}
                            </div>
                            <div className="text-xs text-[#8b9bae]">
                              #{row.patientId}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-[#3a9898]">
                        {row.gender === "female" ? "♀" : "♂"} / {row.age}
                      </td>

                      <td className="py-4 px-4 text-xs font-bold text-[#3a9898]">
                        {row.reason}
                      </td>
                      <td className="py-4 px-4 text-xs font-bold text-[#1a2632]">
                        {row.doctor}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                        {row.patientType}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                        {row.time}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-[#1a2632]">
                        {row.location}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedConsultation(row); // View Screen opens on button click
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#3a9898] text-white hover:bg-[#2b6e6e]"
                        >
                          <Play size={10} fill="currentColor" />
                          View / Start
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
