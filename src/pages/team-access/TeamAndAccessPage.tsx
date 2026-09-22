import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Search,
  Key,
  Eye,
  Edit,
  X,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import AddStaffModal from "./AddStaffModal";
import { API_ENDPOINTS, apiFetch } from "@/lib/api/api";

interface StaffMember {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  shift: string;
  status: "Active" | "Inactive";
  accessModules: string[];
  joinedDate: string;
  highlight?: boolean;
}
const MODULE_LABELS: Record<string, string> = {
  DASHBOARD: "Dashboard & Analytics",
  VISITORS: "Visitors Register",
  CONSULTATION: "Consultation & OPD",
  FOLLOW_UP: "Patient Follow-ups",
  FOLLOWUPS: "Patient Follow-ups",
  PHARMACY: "Pharmacy & Prescriptions",
  BILLING: "Billing & Invoices",
  REPORTS: "Medical Reports",
  SETTINGS: "Hospital Settings",
};

const formatModuleLabel = (module: string) =>
  MODULE_LABELS[module] ??
  module
    .toLowerCase()
    .split(/[_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function TeamAndAccessPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { modules } = useAuth();
  const availableModules = modules.map((module) => module.trim().toUpperCase());

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Detail View Drawer State
  const [viewStaff, setViewStaff] = useState<StaffMember | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  // Edit Access Modal State
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null);
  const [editModules, setEditModules] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");
  const [updating, setUpdating] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter] = useState("All");

  // Helper to normalize Backend API response to Frontend StaffMember Interface
  // Helper to normalize Backend API response to Frontend StaffMember Interface
  const transformStaffData = (item: any): StaffMember => {
    // Normalize status string (handles "active", "Active", 1, true)
    const rawStatus = String(item.status || "").toLowerCase();
    const isActive =
      rawStatus === "active" || item.status === 1 || item.status === true;

    return {
      id: String(item.id ?? item._id),
      empId: item.emp_id || item.empId || `EMP-${item.id}`,
      name: item.name || "",
      email: item.email || "",
      phone: item.phone || "",
      role: item.role || "",
      department: item.department || "",
      shift: item.shift || "General",
      status: isActive ? "Active" : "Inactive",
      accessModules: Array.isArray(item.permissions)
        ? item.permissions
        : Array.isArray(item.modules)
          ? item.modules
          : Array.isArray(item.access_modules)
            ? item.access_modules
            : Array.isArray(item.accessModules)
              ? item.accessModules
              : [],
      joinedDate:
        item.joined_date || item.created_at || item.joinedDate || "N/A",
    };
  };

  // 1. GET ALL STAFF: GET /team-access
  const fetchStaffList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = API_ENDPOINTS?.getTeamAccess || "/team-access";
      const response = await apiFetch(endpoint, { method: "GET" });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || `Failed to load staff list (${response.status})`,
        );
      }

      const rawData = result?.data || result || [];
      const formattedList = Array.isArray(rawData)
        ? rawData.map(transformStaffData)
        : [];
      setStaffList(formattedList);
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while fetching team members.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaffList();
  }, [fetchStaffList]);

  // 2. GET SINGLE STAFF DETAIL: GET /team-access/{id}
  const handleViewStaff = async (staff: StaffMember) => {
    setViewStaff(staff); // Instant preview
    setLoadingDetail(true);
    try {
      const endpoint = `${API_ENDPOINTS?.getTeamAccess || "/team-access"}/${staff.id}`;
      const response = await apiFetch(endpoint, { method: "GET" });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.data) {
        setViewStaff(transformStaffData(result.data));
      }
    } catch (err) {
      console.error("Failed to fetch detailed staff profile:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  // 3. CREATE STAFF: POST /team-access
  const handleAddStaff = async (newStaff: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    department: string;
    shift: string;
    accessModules: string[];
  }) => {
    const endpoint = API_ENDPOINTS?.createHospitalStaff || "/team-access";
    const response = await apiFetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newStaff.name,
        email: newStaff.email,
        password: newStaff.password,
        phone: newStaff.phone,
        role: newStaff.role,
        department: newStaff.department,
        shift: newStaff.shift,
        modules: newStaff.accessModules,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
      throw new Error(
        result?.message || `Failed to save staff (${response.status})`,
      );
    }

    // Refresh list from server or prepend returned record
    if (result?.data) {
      const createdItem = transformStaffData(result.data);
      setStaffList((prev) => [createdItem, ...prev]);
    } else {
      fetchStaffList();
    }
  };

  // Open Edit Access Modal
  const handleOpenEdit = (staff: StaffMember, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditStaff(staff);

    // Normalize existing staff access modules to upper case for exact matching
    const normalizedStaffModules = (staff.accessModules || []).map((m) =>
      m.trim().toUpperCase(),
    );
    setEditModules(normalizedStaffModules);
    setEditStatus(staff.status);
  };
  // 4. UPDATE STAFF PERMISSIONS & PROFILE: PUT /team-access/{id}
  const handleSaveEditAccess = async () => {
    if (!editStaff) return;
    setUpdating(true);

    try {
      const endpoint = `${API_ENDPOINTS?.getTeamAccess || "/team-access"}/${editStaff.id}`;
      const response = await apiFetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editStaff.name,
          email: editStaff.email,
          phone: editStaff.phone,
          role: editStaff.role,
          department: editStaff.department,
          shift: editStaff.shift,
          status: editStatus,
          modules: editModules,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        throw new Error(
          result?.message || `Failed to update access (${response.status})`,
        );
      }

      // Local State Sync
      const updatedStaffMember: StaffMember = result?.data
        ? transformStaffData(result.data)
        : { ...editStaff, accessModules: editModules, status: editStatus };

      setStaffList((prev) =>
        prev.map((s) => (s.id === editStaff.id ? updatedStaffMember : s)),
      );

      if (viewStaff && viewStaff.id === editStaff.id) {
        setViewStaff(updatedStaffMember);
      }

      setEditStaff(null);
    } catch (err: any) {
      alert(err?.message || "Failed to save updates.");
    } finally {
      setUpdating(false);
    }
  };

  // 5. UPDATE STATUS ONLY: PATCH /team-access/{id}/status
  const handleStatusToggle = async (newStatus: "Active" | "Inactive") => {
    if (!editStaff) return;
    setEditStatus(newStatus);

    try {
      const endpoint = `${API_ENDPOINTS?.getTeamAccess || "/team-access"}/${editStaff.id}/status`;
      const response = await apiFetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.warn(
          "Direct PATCH status endpoint failed, fallback to state update.",
        );
      }
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  const toggleModuleInEdit = (moduleId: string) => {
    setEditModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((m) => m !== moduleId)
        : [...prev, moduleId],
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(staffList.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    staffList.length > 0 && staffList.every((s) => selectedIds.includes(s.id));

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.empId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="animate-in fade-in duration-500">
      {/* ── Add Staff Modal ── */}
      {showAddModal && (
        <AddStaffModal
          onClose={() => setShowAddModal(false)}
          onAddStaff={handleAddStaff}
        />
      )}

      {/* ── Edit Access & Status Modal ── */}
      {editStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-[650px] rounded-[20px] shadow-2xl flex flex-col border border-[#e2e8ed] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#f0f4f5]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#eaf6f5] flex items-center justify-center">
                  <Key size={16} className="text-[#3a9898]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a2632]">
                    Edit Software Access & Status
                  </h3>
                  <p className="text-[11px] text-[#8b9bae]">
                    {editStaff.name} ({editStaff.empId})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditStaff(null)}
                disabled={updating}
                className="w-8 h-8 rounded-lg hover:bg-[#f0f4f5] flex items-center justify-center text-[#8b9bae]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Status Toggle (Active / Inactive) */}
              <div className="border border-[#e8edf2] p-4 rounded-xl flex items-center justify-between bg-[#f8fafb]">
                <div>
                  <span className="text-xs font-bold text-[#1a2632] block">
                    Account Status
                  </span>
                  <span className="text-[11px] text-[#8b9bae]">
                    {editStatus === "Active"
                      ? "User can login and use permitted modules"
                      : "User access is temporarily locked"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-[#dde5e7]">
                  <button
                    type="button"
                    onClick={() => handleStatusToggle("Active")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      editStatus === "Active"
                        ? "bg-emerald-500 text-white shadow-xs"
                        : "text-[#5a6a76] hover:text-[#1a2632]"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusToggle("Inactive")}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      editStatus === "Inactive"
                        ? "bg-rose-500 text-white shadow-xs"
                        : "text-[#5a6a76] hover:text-[#1a2632]"
                    }`}
                  >
                    Inactive
                  </button>
                </div>
              </div>

              {/* Module Permissions Checklist */}
              <div>
                <label className="text-xs font-bold text-[#1a2632] mb-2 block">
                  Module Permissions
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {availableModules.map((module) => {
                    const isGranted = editModules.includes(module);
                    return (
                      <button
                        key={module}
                        type="button"
                        onClick={() => toggleModuleInEdit(module)}
                        className={`px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between text-xs font-semibold transition-all ${
                          isGranted
                            ? "border-[#3a9898] bg-[#eaf6f5] text-[#3a9898]"
                            : "border-[#e2e8ed] bg-[#f8fafb] text-[#8b9bae] hover:border-[#c4d4dc]"
                        }`}
                      >
                        <span>{formatModuleLabel(module)}</span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isGranted
                              ? "bg-[#3a9898] text-white"
                              : "bg-[#dde5e7]"
                          }`}
                        >
                          {isGranted && <CheckCircle2 size={11} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#f0f4f5] flex justify-end gap-2 bg-white rounded-b-[20px]">
              <button
                onClick={() => setEditStaff(null)}
                disabled={updating}
                className="px-4 py-2 text-xs font-semibold text-[#8b9bae] hover:text-[#1a2632]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditAccess}
                disabled={updating}
                className="px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                {updating && <Loader2 size={13} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail View Side Drawer ── */}
      {viewStaff && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
          <div className="w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col border-l border-[#dde5e7] animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#f0f4f5] flex items-center justify-between bg-[#f8fafb]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3a9898] text-white flex items-center justify-center font-bold text-lg">
                  {viewStaff.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a2632]">
                    {viewStaff.name}
                  </h3>
                  <p className="text-xs text-[#3a9898] font-semibold">
                    #{viewStaff.empId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewStaff(null)}
                className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-[#8b9bae] border border-transparent hover:border-[#dde5e7]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loadingDetail ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#8b9bae]">
                  <Loader2
                    size={24}
                    className="animate-spin mb-2 text-[#3a9898]"
                  />
                  <p className="text-xs">Fetching latest details...</p>
                </div>
              ) : (
                <>
                  {/* Status Badge */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafb] border border-[#e8edf2]">
                    <span className="text-xs font-semibold text-[#5a6a76]">
                      Access Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        viewStaff.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-rose-50 text-rose-600 border border-rose-200"
                      }`}
                    >
                      {viewStaff.status === "Active" ? (
                        <ShieldCheck size={13} />
                      ) : (
                        <ShieldAlert size={13} />
                      )}
                      {viewStaff.status}
                    </span>
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                      Contact & Staff Profile
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2.5 text-[#1a2632]">
                        <Mail size={14} className="text-[#3a9898]" />
                        <span>{viewStaff.email}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#1a2632]">
                        <Phone size={14} className="text-[#3a9898]" />
                        <span>{viewStaff.phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#1a2632]">
                        <Building2 size={14} className="text-[#3a9898]" />
                        <span>
                          {viewStaff.role} ({viewStaff.department})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Module Access */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider">
                        Permitted Software Modules
                      </h4>
                      <button
                        onClick={() => handleOpenEdit(viewStaff)}
                        className="text-xs font-bold text-[#3a9898] hover:underline flex items-center gap-1"
                      >
                        <Edit size={12} /> Edit Access
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {viewStaff.accessModules.length > 0 ? (
                        viewStaff.accessModules.map((mod, i) => (
                          <span
                            key={i}
                            className="text-xs font-semibold bg-[#eaf6f5] text-[#3a9898] px-3 py-1 rounded-lg border border-[#c4e4e0]"
                          >
                            {mod}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-[#8b9bae]">
                          No permissions assigned.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer Action */}
            <div className="p-4 border-t border-[#f0f4f5] bg-[#f8fafb]">
              <button
                onClick={() => handleOpenEdit(viewStaff)}
                className="w-full py-2.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Key size={14} />
                Modify Staff Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Table Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white flex-col lg:flex-row gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2632]">Team & Access</h2>
            <p className="text-xs text-[#8b9bae] mt-0.5">
              Click on any row to view staff details or manage module access.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search staff, ID or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-[#f8fafb] border border-[#e2e8ed] rounded-full text-xs text-[#1a2632] focus:outline-none focus:border-[#3a9898] w-56"
              />
              <Search
                size={14}
                className="absolute left-3 top-2.5 text-[#b0bec8]"
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchStaffList}
              title="Refresh List"
              className="p-2 border border-[#e2e8ed] rounded-xl hover:bg-[#f8fafb] text-[#5a6a76] transition-all"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>

            {/* Add Staff Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20"
            >
              <UserPlus size={15} strokeWidth={2.5} />
              Add New Staff
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto relative min-h-[250px]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 z-10">
              <Loader2 size={32} className="animate-spin text-[#3a9898] mb-2" />
              <p className="text-xs font-medium text-[#8b9bae]">
                Loading team members...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-sm font-semibold text-rose-500 mb-2">
                {error}
              </p>
              <button
                onClick={fetchStaffList}
                className="px-4 py-1.5 bg-[#3a9898] text-white text-xs font-bold rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafb] border-b border-[#dde5e7]">
                  <th className="py-4 pl-6 pr-4 w-12">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={isAllSelected}
                      className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer accent-[#3a9898]"
                    />
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Staff Member
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Role & Dept
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Software Access Modules
                  </th>
                  <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eef3f5]">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-xs text-[#8b9bae]"
                    >
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((row) => {
                    const isSelected = selectedIds.includes(row.id);
                    return (
                      <tr
                        key={row.id}
                        onClick={() => handleViewStaff(row)}
                        className={`cursor-pointer transition-colors ${
                          row.highlight
                            ? "bg-[#f2faf9] hover:bg-[#eaf6f5]"
                            : "hover:bg-[#f8fafb]"
                        }`}
                      >
                        <td className="py-4 pl-6 pr-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleSelectRow(row.id, e)}
                            className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-white cursor-pointer accent-[#3a9898]"
                          />
                        </td>

                        {/* Staff Name & ID */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#c8d8dc] shrink-0 flex items-center justify-center text-white text-xs font-bold">
                              {row.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#1a2632] flex items-center gap-1.5">
                                {row.name}
                                <Eye
                                  size={12}
                                  className="text-[#8b9bae] hover:text-[#3a9898]"
                                />
                              </div>
                              <div className="text-xs text-[#8b9bae]">
                                {row.email} •{" "}
                                <span className="font-semibold text-[#3a9898]">
                                  {row.empId}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role & Dept */}
                        <td className="py-4 px-4">
                          <div className="text-xs font-bold text-[#1a2632]">
                            {row.role}
                          </div>
                          <div className="text-[11px] text-[#8b9bae]">
                            {row.department}
                          </div>
                        </td>

                        {/* Access Badges */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap max-w-[280px]">
                            {row.accessModules.map((mod, i) => (
                              <span
                                key={i}
                                className="text-[10.5px] font-semibold bg-[#eaf6f5] text-[#3a9898] px-2.5 py-0.5 rounded-full border border-[#c4e4e0]"
                              >
                                {mod}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                              row.status === "Active"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                : "bg-rose-50 text-rose-600 border border-rose-200"
                            }`}
                          >
                            {row.status === "Active" ? (
                              <ShieldCheck size={13} />
                            ) : (
                              <ShieldAlert size={13} />
                            )}
                            {row.status}
                          </span>
                        </td>

                        {/* Action Button */}
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={(e) => handleOpenEdit(row, e)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#3a9898] text-white hover:bg-[#2b6e6e] transition-all"
                          >
                            <Edit size={12} /> Edit Access
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
