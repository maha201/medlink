import {
  ChevronDown,
  Plus,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  AlertTriangle,
  X,
  ShieldCheck,
  Phone,
  User,
  Calendar,
  Droplet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import RegisterPatientModal from "./AddPatientPage";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface Patient {
  id: number;
  mrn?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  phone?: string;
  appointmentDate?: string;
  status?: string;
  photoUrl?: string | null;
  [key: string]: any;
}

export default function PatientsPage() {
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Selected Patient for Edit / View Drawer
  const [selectedPatientForEdit, setSelectedPatientForEdit] = useState<
    any | null
  >(null);
  const [viewPatient, setViewPatient] = useState<Patient | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalEntries, setTotalEntries] = useState<number>(0);

  // Delete Confirmation Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawResponse = await apiFetch(
        `${API_ENDPOINTS.hospitalPatients}?page=${currentPage}&limit=10`,
        { method: "GET" },
      );

      const res =
        typeof rawResponse.json === "function"
          ? await rawResponse.json()
          : rawResponse;

      const dataList = Array.isArray(res) ? res : res?.data || [];
      setPatients(dataList);

      const totalCount = res?.meta?.total ?? res?.total ?? dataList.length;
      const totalPagesCount =
        (res?.meta?.last_page ??
          res?.totalPages ??
          Math.ceil(totalCount / 10)) ||
        1;

      setTotalEntries(totalCount);
      setTotalPages(totalPagesCount);
    } catch (err: any) {
      console.error("Fetch Patients Error:", err);
      setError(err?.message || "Patients data-vai load seyyavillai.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Helper to calculate age if dob is available
  const calculateAge = (dobString?: string): number | string => {
    if (!dobString) return "N/A";
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return "N/A";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleOpenAddModal = () => {
    setSelectedPatientForEdit(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (patient: Patient) => {
    setSelectedPatientForEdit(patient);
    setShowModal(true);
  };

  // Trigger Delete Confirmation Modal
  const confirmDelete = (patient: Patient) => {
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  };

  // Execute Delete
  const handleDeleteExecute = async () => {
    if (!patientToDelete) return;
    setIsDeleting(true);
    try {
      setPatients((prev) => prev.filter((p) => p.id !== patientToDelete.id));
      if (viewPatient?.id === patientToDelete.id) {
        setViewPatient(null);
      }
      setDeleteModalOpen(false);
      setPatientToDelete(null);
    } catch (err: any) {
      console.error("Delete Patient Error:", err);
      setPatients((prev) => prev.filter((p) => p.id !== patientToDelete.id));
      setDeleteModalOpen(false);
      setPatientToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 font-sans">
      {showModal && (
        <RegisterPatientModal
          initialData={selectedPatientForEdit}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchPatients();
            setShowModal(false);
          }}
        />
      )}

      {/* ── View Patient Details Slide-over Drawer (No Footer) ── */}
      {viewPatient && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
          <div className="w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col border-l border-[#dde5e7] animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#f0f4f5] flex items-center justify-between bg-[#f8fafb]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3a9898] text-white flex items-center justify-center font-bold text-lg overflow-hidden shrink-0">
                  {viewPatient.photoUrl ? (
                    <img
                      src={viewPatient.photoUrl}
                      alt={viewPatient.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    viewPatient.firstName?.charAt(0).toUpperCase() || "P"
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a2632]">
                    {viewPatient.firstName} {viewPatient.lastName}
                  </h3>
                  <p className="text-xs text-[#3a9898] font-semibold">
                    {viewPatient.mrn || `MRN-${viewPatient.id}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewPatient(null)}
                className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-[#8b9bae] border border-transparent hover:border-[#dde5e7] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
                <span className="text-xs font-semibold text-[#5a6a76]">
                  Patient Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 capitalize">
                  <ShieldCheck size={13} />
                  {viewPatient.status || "Active"}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Contact & Personal Info
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-[#1a2632]">
                    <Phone size={14} className="text-[#3a9898]" />
                    <span>{viewPatient.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#1a2632]">
                    <User size={14} className="text-[#3a9898]" />
                    <span>
                      Gender:{" "}
                      <strong className="capitalize">
                        {viewPatient.gender || "N/A"}
                      </strong>{" "}
                      / Age:{" "}
                      <strong>{calculateAge(viewPatient.dateOfBirth)}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#1a2632]">
                    <Droplet size={14} className="text-[#e11d48]" />
                    <span>
                      Blood Group:{" "}
                      <strong>{viewPatient.bloodGroup || "N/A"}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                  Appointment Log
                </h4>
                <div className="space-y-2 text-xs bg-[#f8fafb] p-3.5 rounded-xl border border-[#e8edf2]">
                  <div className="flex items-center justify-between text-[#1a2632]">
                    <span className="flex items-center gap-1.5 text-[#5a6a76]">
                      <Calendar size={13} className="text-[#3a9898]" />{" "}
                      Appointment Date:
                    </span>
                    <span className="font-semibold">
                      {viewPatient.appointmentDate || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Global Delete Confirmation Modal ── */}
      {deleteModalOpen && patientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[420px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] overflow-hidden">
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-base font-bold text-[#1a2632]">
                Delete Patient Record?
              </h3>
              <p className="text-xs text-[#8b9bae] leading-relaxed">
                Are you sure you want to delete patient{" "}
                <strong className="text-[#1a2632]">
                  {patientToDelete.firstName || ""}{" "}
                  {patientToDelete.lastName || ""}
                </strong>{" "}
                ({patientToDelete.mrn || `MRN-${patientToDelete.id}`})? This
                action cannot be undone.
              </p>
            </div>

            <div className="px-6 py-4 border-t border-[#f0f4f5] bg-[#f8fafb] flex items-center gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalOpen(false)}
                className="w-full py-2.5 bg-white border border-[#dde5e7] hover:bg-[#f0f4f5] text-[#5a6a76] text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteExecute}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#1a2632]">
              Patient Directory
            </h2>
            <button
              onClick={fetchPatients}
              title="Refresh Data"
              className="p-1.5 text-[#8b9bae] hover:text-[#3a9898] hover:bg-[#f5f7f8] rounded-full transition-all cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              {["Status", "Gender", "Blood Group"].map((filter) => (
                <button
                  key={filter}
                  className="flex items-center gap-2 px-4 py-2 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5] cursor-pointer"
                >
                  {filter}
                  <ChevronDown size={14} />
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-[#dde5e7] mx-1 hidden sm:block"></div>

            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20 cursor-pointer"
            >
              <Plus size={16} strokeWidth={2.5} />
              Add New Patient
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={fetchPatients}
              className="underline font-bold hover:text-red-800 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table Body */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-3">
              <Loader2 size={32} className="animate-spin text-[#3a9898]" />
              <p className="text-xs font-semibold">Loading patients list...</p>
            </div>
          ) : patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8b9bae] gap-2">
              <p className="text-sm font-semibold text-[#1a2632]">
                No Patients Found
              </p>
              <p className="text-xs">
                Click "Add New Patient" to register a record.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#dde5e7]">
                  <th className="py-4 pl-6 pr-4 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Patient Name ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Gender / Age ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Blood ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Phone Number ↕
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Appointment Date ↕
                  </th>
                  <th className="py-4 px-4 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Status ↕
                  </th>
                  <th className="py-4 px-6 text-center text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Actions ↕
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde5e7]">
                {patients.map((row, i) => {
                  const mrnCode = row.mrn || `MRN-${row.id}`;
                  const fullName =
                    `${row.firstName || ""} ${row.lastName || ""}`.trim() ||
                    "N/A";
                  const ageDisplay = calculateAge(row.dateOfBirth);
                  const status = row.status || "active";

                  return (
                    <tr
                      key={row.id || i}
                      className="hover:bg-[#f5f7f8] transition-colors group"
                    >
                      <td className="py-4 pl-6 pr-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer"
                        />
                      </td>

                      {/* Name & MRN */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#dde5e7] shrink-0 overflow-hidden flex items-center justify-center text-[#5a6a76] font-bold text-xs">
                            {row.photoUrl ? (
                              <img
                                src={row.photoUrl}
                                alt={fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              fullName.charAt(0)
                            )}
                          </div>
                          <div>
                            <span
                              onClick={() => setViewPatient(row)}
                              className="text-sm font-bold text-[#1a2632] hover:text-[#3a9898] transition-colors cursor-pointer"
                            >
                              {fullName}
                            </span>
                            <div className="text-xs text-[#8b9bae]">
                              {mrnCode}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Gender / Age */}
                      <td className="py-4 px-4 text-sm text-[#5a6a76]">
                        <span className="inline-flex items-center gap-1.5 capitalize">
                          {row.gender?.toLowerCase() === "female" ? (
                            <span className="text-[#3a9898] font-bold">♀</span>
                          ) : (
                            <span className="text-[#8b9bae] font-bold">♂</span>
                          )}
                          / {ageDisplay}
                        </span>
                      </td>

                      {/* Blood Group */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-full bg-[#f0f4f5] text-xs font-bold text-[#e11d48]">
                          {row.bloodGroup || "N/A"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                        {row.phone || "—"}
                      </td>

                      {/* Appointment Date */}
                      <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                        {row.appointmentDate || "N/A"}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 text-center">
                        {status.toLowerCase() === "active" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0] capitalize">
                            <CheckCircle2 size={14} strokeWidth={2.5} />
                            {status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#8b9bae] text-xs font-bold border border-[#dde5e7] capitalize">
                            <Clock size={14} strokeWidth={2.5} />
                            {status}
                          </span>
                        )}
                      </td>

                      {/* Actions (View, Edit, Delete) */}
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setViewPatient(row)}
                            className="p-1.5 rounded-lg border border-[#dde5e7] hover:bg-[#eaf6f5] hover:text-[#3a9898] text-[#8b9bae] transition-colors cursor-pointer"
                            title="View Profile"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(row)}
                            className="p-1.5 rounded-lg border border-[#dde5e7] hover:bg-[#eaf6f5] hover:text-[#3a9898] text-[#8b9bae] transition-colors cursor-pointer"
                            title="Edit Record"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => confirmDelete(row)}
                            className="p-1.5 rounded-lg border border-[#dde5e7] hover:bg-rose-50 hover:text-rose-600 text-[#8b9bae] transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76] flex-wrap gap-3">
          <div>
            Showing {patients.length === 0 ? 0 : (currentPage - 1) * 10 + 1} to{" "}
            {Math.min(currentPage * 10, totalEntries)} of {totalEntries} entries
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded font-medium transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#3a9898] text-white"
                      : "hover:bg-[#f0f4f5]"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={
                currentPage === totalPages || loading || totalPages === 0
              }
              className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7] disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
