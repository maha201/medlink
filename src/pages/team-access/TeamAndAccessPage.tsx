import { useState } from "react";
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
} from "lucide-react";
import AddStaffModal from "./AddStaffModal";

interface StaffMember {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  role: "Doctor" | "Nurse" | "Receptionist" | "Pharmacist" | "Admin";
  department: string;
  shift: string;
  status: "Active" | "Inactive";
  accessModules: string[];
  joinedDate: string;
  highlight?: boolean;
}

const MODULE_LIST = [
  { id: "Dashboard", label: "Dashboard & Analytics" },
  { id: "Visitors", label: "Visitors Register" },
  { id: "Consultation", label: "Consultation & OPD" },
  { id: "Follow-ups", label: "Patient Follow-ups" },
  { id: "Pharmacy", label: "Pharmacy & Prescriptions" },
  { id: "Billing", label: "Billing & Invoices" },
  { id: "Reports", label: "Medical Reports" },
  { id: "Settings", label: "Hospital Settings" },
];

const initialStaffList: StaffMember[] = [
  {
    id: "1",
    empId: "EMP-2035-01",
    name: "Dr. Sriram",
    email: "sriram@hospital.com",
    phone: "+91 98765 43210",
    role: "Doctor",
    department: "Dental",
    shift: "Morning (08:00 AM - 04:00 PM)",
    status: "Active",
    accessModules: ["Consultation", "Visitors", "Follow-ups", "Reports"],
    joinedDate: "Jan 10, 2024",
  },
  {
    id: "2",
    empId: "EMP-2035-12",
    name: "Priya Sundar",
    email: "priya@hospital.com",
    phone: "+91 98765 12345",
    role: "Receptionist",
    department: "Front Desk",
    shift: "General (09:00 AM - 05:00 PM)",
    status: "Active",
    accessModules: ["Visitors", "Consultation"],
    joinedDate: "Mar 15, 2024",
  },
  {
    id: "3",
    empId: "EMP-2035-24",
    name: "Karthik Raja",
    email: "karthik@hospital.com",
    phone: "+91 98123 45678",
    role: "Pharmacist",
    department: "Pharmacy",
    shift: "Evening (02:00 PM - 10:00 PM)",
    status: "Inactive",
    accessModules: ["Pharmacy", "Billing"],
    joinedDate: "Jun 01, 2025",
  },
  {
    id: "4",
    empId: "EMP-2035-31",
    name: "Dr. Meena Swaminathan",
    email: "meena@hospital.com",
    phone: "+91 97890 12345",
    role: "Doctor",
    department: "Pediatrics",
    shift: "Morning (08:00 AM - 04:00 PM)",
    status: "Active",
    accessModules: ["Consultation", "Follow-ups", "Reports"],
    joinedDate: "Aug 20, 2025",
    highlight: true,
  },
];

export default function TeamAndAccessPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaffList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Detail View Drawer State
  const [viewStaff, setViewStaff] = useState<StaffMember | null>(null);

  // Edit Access Modal State
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null);
  const [editModules, setEditModules] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter] = useState("All");

  // Handle Adding New Staff
  const handleAddStaff = (newStaff: any) => {
    const newEntry: StaffMember = {
      id: String(Date.now()),
      empId: `EMP-2035-${Math.floor(10 + Math.random() * 89)}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone || "+91 90000 00000",
      role: newStaff.role,
      department: newStaff.department,
      shift: newStaff.shift || "General",
      status: "Active",
      accessModules: newStaff.accessModules || ["Dashboard"],
      joinedDate: newStaff.joinedDate || "Today",
    };
    setStaffList([newEntry, ...staffList]);
  };

  // Open Edit Access Modal
  const handleOpenEdit = (staff: StaffMember, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditStaff(staff);
    setEditModules([...staff.accessModules]);
    setEditStatus(staff.status);
  };

  // Save Edit Access & Status Changes
  const handleSaveEditAccess = () => {
    if (!editStaff) return;
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === editStaff.id
          ? { ...s, accessModules: editModules, status: editStatus }
          : s,
      ),
    );
    if (viewStaff && viewStaff.id === editStaff.id) {
      setViewStaff({
        ...viewStaff,
        accessModules: editModules,
        status: editStatus,
      });
    }
    setEditStaff(null);
  };

  const toggleModuleInEdit = (moduleLabel: string) => {
    setEditModules((prev) =>
      prev.includes(moduleLabel)
        ? prev.filter((m) => m !== moduleLabel)
        : [...prev, moduleLabel],
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
                    onClick={() => setEditStatus("Active")}
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
                    onClick={() => setEditStatus("Inactive")}
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
                  {MODULE_LIST.map((mod) => {
                    const isGranted = editModules.includes(mod.label);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => toggleModuleInEdit(mod.label)}
                        className={`px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between text-xs font-semibold transition-all ${
                          isGranted
                            ? "border-[#3a9898] bg-[#eaf6f5] text-[#3a9898]"
                            : "border-[#e2e8ed] bg-[#f8fafb] text-[#8b9bae] hover:border-[#c4d4dc]"
                        }`}
                      >
                        <span>{mod.label}</span>
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
                className="px-4 py-2 text-xs font-semibold text-[#8b9bae] hover:text-[#1a2632]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditAccess}
                className="px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
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
                    <span>{viewStaff.phone}</span>
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
                  {viewStaff.accessModules.map((mod, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold bg-[#eaf6f5] text-[#3a9898] px-3 py-1 rounded-lg border border-[#c4e4e0]"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
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
        <div className="overflow-x-auto">
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
              {filteredStaff.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    onClick={() => setViewStaff(row)}
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
