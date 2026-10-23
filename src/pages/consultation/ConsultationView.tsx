import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Printer,
  Check,
  Phone,
  Mail,
  MapPin,
  User,
  Trash2,
  MoreHorizontal,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";
import { useNavigate } from "react-router-dom";

interface PatientConsultationViewProps {
  patientId?: string;
  appointmentId?: string;
  onClose?: () => void;
}

export default function PatientConsultationView({
  patientId = "APT-2035-078",
  appointmentId,
  onClose,
}: PatientConsultationViewProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("9/8/2026");
  const [successModal, setSuccessModal] = useState<{ open: boolean; isDraft: boolean }>({ open: false, isDraft: false });

  // Clinical Record States
  const [chiefComplaint, setChiefComplaint] = useState(
    "Azithromycin 250mg Film-Coated Tablet",
  );
  const [diagnosis, setDiagnosis] = useState("Rootcanal");
  const [conditions, setConditions] = useState("dangerous");
  const [allergies, setAllergies] = useState("Peanuts");
  const [bodyWeight, setBodyWeight] = useState("90 KG");
  const [bodyHeight, setBodyHeight] = useState("172 CM");
  const [pressure, setPressure] = useState("140");
  const [bloodSugar, setBloodSugar] = useState("120");
  const [heartRate, setHeartRate] = useState("75");
  const [followUpDate, setFollowUpDate] = useState("2026-12-02");
  const [diagnosedBy, setDiagnosedBy] = useState("DR.Sriram");
  const [patientNote, setPatientNote] = useState(
    "Daniel is stable post-op with well-controlled pain, and early mobilization is planned. Continue regular blood pressure monitoring and adjust medication if pain or hypertension worsens.",
  );

  // Prescription Builder States
  const [medSearch, setMedSearch] = useState(
    "Azithromycin 250mg Film-Coated Tablet",
  );
  const [frequency, setFrequency] = useState("Once Daily (1x / 24h)");
  const [duration, setDuration] = useState("5 Days");
  const [dispenseQty, setDispenseQty] = useState("6 Tablets");
  const [dispensePack, setDispensePack] = useState("1 Blister Pack");
  const [estPrice, setEstPrice] = useState("15.00");
  const [foodRelation, setFoodRelation] = useState("After Meals (PC)");
  const [sigNotes, setSigNotes] = useState(
    "Take 2 tablets on Day 1 as a single initial dose, followed by 1 tablet once daily on Days 2 through 5. Administer after meals with a full glass of water.",
  );

  // Fee Details States
  const [doctorFee, setDoctorFee] = useState("50.00");
  const [treatmentFee, setTreatmentFee] = useState("150.00");

  // Prescribed Medication List
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "1",
      name: "Cetirizine Hydrochloride 10mg",
      detail: "Qty: 5 Tablets • \$1.00 / tab",
      price: "5.00",
    },
    {
      id: "2",
      name: "Salbutamol 100mcg Inhaler",
      detail: "Qty: 1 Canister (200 Doses) • \$18.50 / unit",
      price: "18.50",
    },
    {
      id: "3",
      name: "Clarithromycin 500mg",
      detail: "Qty: 10 Tablets • \$2.20 / tab",
      price: "22.00",
    },
  ]);

  const handleAddMedication = () => {
    if (!medSearch.trim()) {
      alert("Please enter medication name!");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: medSearch,
      detail: `Qty: ${dispenseQty} • ${frequency}`,
      price: estPrice || "0.00",
    };

    setPrescriptions((prev) => [newItem, ...prev]);
    setMedSearch("");
    setDispenseQty("");
    setEstPrice("");
  };

  const handleDeleteMedication = (id: string) => {
    setPrescriptions((prev) => prev.filter((item) => item.id !== id));
  };

  const totalRxPrice = prescriptions.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0,
  );

  const totalPayable = (
    (parseFloat(doctorFee) || 0) +
    (parseFloat(treatmentFee) || 0) +
    totalRxPrice
  ).toFixed(2);

  const handleSaveConsultation = async (saveMode: "draft" | "completed" = "completed") => {
    setSaving(true);
    try {
      const payload = {
        patientId,
        appointmentId,
        chiefComplaint,
        diagnosis,
        conditions,
        allergies,
        bodyWeight,
        bodyHeight,
        pressure,
        bloodSugar,
        heartRate,
        followUpDate,
        diagnosedBy,
        patientNote,
        prescriptions,
        doctorFee: parseFloat(doctorFee) || 0,
        treatmentFee: parseFloat(treatmentFee) || 0,
        totalRxPrice,
        totalPayable: parseFloat(totalPayable) || 0,
        status: saveMode,
      };

      const res = await apiFetch(API_ENDPOINTS.hospitalConsultations, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data?.success || res?.ok) {
        setSuccessModal({ open: true, isDraft: saveMode === "draft" });
      } else {
        alert(data?.message || "Failed to save consultation.");
      }
    } catch (err: any) {
      console.error("Save Consultation Error:", err);
      alert(err?.message || "Failed to save consultation.");
    } finally {
      setSaving(false);
    }
  };

  const fetchConsultationDetails = useCallback(async () => {
    if (!patientId && !appointmentId) return;
    setLoading(true);
    try {
      const res = await apiFetch(
        `${API_ENDPOINTS.hospitalAppointments}/${appointmentId || patientId}`,
        { method: "GET" },
      );
      const data = typeof res?.json === "function" ? await res.json() : res;

      if (data) {
        if (data.chiefComplaint) setChiefComplaint(data.chiefComplaint);
        if (data.diagnosis) setDiagnosis(data.diagnosis);
      }
    } catch (err) {
      console.error("Error fetching patient details:", err);
    } finally {
      setLoading(false);
    }
  }, [patientId, appointmentId]);

  useEffect(() => {
    fetchConsultationDetails();
  }, [fetchConsultationDetails]);

  return (
    <div className="bg-[#f0f4f5] min-h-screen p-4 md:p-6 text-[#1a2632] font-sans">
      {/* ── SUCCESS MODAL ── */}
      {successModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center gap-4 border border-[#dde5e7]">
            <div className="w-16 h-16 rounded-full bg-[#eaf6f5] flex items-center justify-center">
              <CheckCircle2 size={36} className="text-[#0b5c54]" />
            </div>
            <h2 className="text-base font-bold text-[#1a2632]">
              {successModal.isDraft ? "Draft Saved" : "Consultation Complete"}
            </h2>
            <p className="text-xs text-[#5a6a76] text-center">
              {successModal.isDraft
                ? "Consultation has been saved as a draft. You can continue editing anytime."
                : `Consultation for ${patientId} has been finalized and the follow-up has been scheduled for ${followUpDate}.`}
            </p>
            <button
              onClick={() => { setSuccessModal({ open: false, isDraft: false }); navigate("/consultation"); }}
              className="mt-2 w-full py-2.5 bg-[#0b5c54] hover:bg-[#084842] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Check size={14} /> Go to Consultations
            </button>
          </div>
        </div>
      )}
      {/* ── 1. PATIENT HEADER BANNER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Profile Card */}
        <div className="lg:col-span-9 bg-white rounded-2xl p-5 border border-[#dde5e7] shadow-xs flex flex-col justify-between">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#eef3f5] pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#c8d8dc] shrink-0"></div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-[#1a2632]">
                    Daniel Wong
                  </h1>
                  <span className="px-2.5 py-0.5 bg-[#f0f4f5] text-[#3a9898] font-bold text-xs rounded-md border border-[#dde5e7]">
                    #{patientId}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6e8294] mt-1.5 font-medium">
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> +62 812-9012-4477
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> daniel.wong@hospital.com
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> Jl. Kaliurang No. 88, Yogyakarta,
                    Indonesia
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} /> +62 812-9788-4411 (Michelle Wong/Spouse)
                  </span>
                </div>
              </div>
            </div>
            <button className="text-[#8b9bae] hover:text-[#1a2632]">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-4 text-xs">
            <div>
              <p className="text-[#8b9bae] font-semibold">Age & Gender</p>
              <p className="font-bold text-[#1a2632] mt-0.5">42/Male</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-semibold">DOB</p>
              <p className="font-bold text-[#1a2632] mt-0.5">23 July 1993</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-semibold">Blood Type</p>
              <p className="font-bold text-[#1a2632] mt-0.5">O+</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-semibold">Occupation</p>
              <p className="font-bold text-[#1a2632] mt-0.5">Project Manager</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-semibold">Status</p>
              <p className="font-bold text-[#1a2632] mt-0.5">
                Post-Op (Inpatient)
              </p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-semibold">Insurance</p>
              <p className="font-bold text-[#1a2632] mt-0.5">BPJS - Class 1</p>
            </div>
          </div>
        </div>

        {/* Allergies Card */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#dde5e7] shadow-xs flex flex-col justify-between">
          <h2 className="text-xs font-bold text-[#1a2632] mb-2">Allergies</h2>
          <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold text-[#5a6a76]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0b5c54]"></span>{" "}
              Penicillin
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0b5c54]"></span>{" "}
              Aspirin
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0b5c54]"></span>{" "}
              Shellfish
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0b5c54]"></span> Dust
              Mites
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0b5c54]"></span>{" "}
              Peanuts
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. DATE TABS ── */}
      <div className="flex items-center gap-3 mb-4">
        {["9/8/2026", "9/8/2026", "9/8/2026"].map((d, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(d)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              idx === 0
                ? "bg-[#0b5c54] text-white shadow-sm"
                : "bg-white text-[#0b5c54] border border-[#dde5e7] hover:bg-[#eaf6f5]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* ── 3. MAIN SPLIT SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: Clinical Record */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#dde5e7] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1a2632]">
                Patient Clinical Record & Prescription
              </h2>
              <p className="text-[10.5px] text-[#8b9bae] mt-0.5">
                Reference Frame: 974 • Electronic Medical Record Entry
              </p>
            </div>
            <span className="px-3 py-1 bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] text-[11px] font-bold rounded-full flex items-center gap-1">
              • Active Encounter
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Chief Complaint/ Symptoms
            </label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#dde5e7] rounded-lg bg-[#fcfdfe] focus:outline-none focus:border-[#3a9898]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Diagnosis
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#dde5e7] rounded-lg bg-[#fcfdfe] focus:outline-none focus:border-[#3a9898]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Conditions
            </label>
            <input
              type="text"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#dde5e7] rounded-lg bg-[#fcfdfe] focus:outline-none focus:border-[#3a9898]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Allergies
            </label>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-2.5 text-[#8b9bae]"
              />
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#dde5e7] rounded-lg bg-[#fcfdfe] focus:outline-none focus:border-[#3a9898]"
              />
            </div>
          </div>

          {/* Vitals */}
          <div className="grid grid-cols-5 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                Body Weight
              </label>
              <input
                type="text"
                value={bodyWeight}
                onChange={(e) => setBodyWeight(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                Body Height
              </label>
              <input
                type="text"
                value={bodyHeight}
                onChange={(e) => setBodyHeight(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                Pressure
              </label>
              <input
                type="text"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                Blood Sugar
              </label>
              <input
                type="text"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                Heart Rate
              </label>
              <input
                type="text"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Follow-Up-Date
            </label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#dde5e7] rounded-lg bg-[#fcfdfe] focus:outline-none focus:border-[#3a9898]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Diagnosed By
            </label>
            <input
              type="text"
              value={diagnosedBy}
              onChange={(e) => setDiagnosedBy(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#dde5e7] rounded-lg bg-[#fcfdfe]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Patient Note
            </label>
            <textarea
              rows={3}
              value={patientNote}
              onChange={(e) => setPatientNote(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#dde5e7] rounded-lg bg-[#fcfdfe] resize-none focus:outline-none focus:border-[#3a9898]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Upload / Scan & Xray Reports
            </label>
            <div className="flex items-center gap-3">
              <label className="px-3 py-1.5 bg-[#f0f4f5] border border-[#dde5e7] text-[#1a2632] text-xs font-semibold rounded-md cursor-pointer hover:bg-[#e4ebed]">
                Choose file
                <input type="file" className="hidden" />
              </label>
              <span className="text-xs text-[#8b9bae]">No file Chosen</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#dde5e7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSaveConsultation("draft")}
                disabled={saving}
                className="px-3 py-1.5 text-[#5a6a76] hover:text-[#1a2632] text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save as Draft"}
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-[#5a6a76] hover:text-[#1a2632] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Printer size={12} /> Print Rx Preview
              </button>
            </div>
            <div className="flex gap-2">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 bg-white border border-[#dde5e7] text-[#5a6a76] rounded-lg text-xs font-bold hover:bg-[#f8fafb] cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={() => handleSaveConsultation("completed")}
                disabled={saving}
                className="px-4 py-1.5 bg-[#0b5c54] text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#084842] cursor-pointer disabled:opacity-50"
              >
                <Check size={14} /> {saving ? "Saving..." : "Save & Schedule Follow-Up"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Prescription Builder & Billing */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#dde5e7] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#eef3f5] pb-3">
              <h2 className="text-sm font-bold text-[#1a2632]">Prescription</h2>
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-3 py-1.5 bg-[#0b5c54] text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#084842]"
              >
                <Plus size={14} /> ADD Medication
              </button>
            </div>

            <div className="p-4 border border-[#dde5e7] rounded-xl bg-[#fcfdfe] space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#1a2632] mb-1">
                  Medication / Clinical Formulation Search
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-2.5 text-[#8b9bae]"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Enter medication name..."
                    value={medSearch}
                    onChange={(e) => setMedSearch(e.target.value)}
                    className="w-full pl-8 pr-16 py-2 text-xs border border-[#dde5e7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
                  />
                  <span className="absolute right-3 top-2 text-[10px] font-bold bg-[#f0f4f5] text-[#8b9bae] px-1.5 py-0.5 rounded">
                    Rx Only
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg bg-white"
                  >
                    <option>Once Daily (1x / 24h)</option>
                    <option>Twice Daily (2x / 24h)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                    Dispense Qty
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={dispenseQty}
                      onChange={(e) => setDispenseQty(e.target.value)}
                      className="w-1/2 px-1 py-1.5 text-[11px] border border-[#dde5e7] rounded-lg text-center"
                    />
                    <input
                      type="text"
                      value={dispensePack}
                      onChange={(e) => setDispensePack(e.target.value)}
                      className="w-1/2 px-1 py-1.5 text-[10px] border border-[#dde5e7] rounded-lg text-center"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                    Est. Price (\$2.50/tab)
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={`$ ${estPrice}`}
                      onChange={(e) =>
                        setEstPrice(e.target.value.replace("\$ ", ""))
                      }
                      className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center font-bold"
                    />
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1a2632] mb-1">
                  Food Relation & Administration Timing
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setFoodRelation("Before Meals (AC)")}
                    className={`py-1.5 border rounded-lg font-semibold ${
                      foodRelation === "Before Meals (AC)"
                        ? "bg-[#7bf2e2] border-[#3a9898] text-[#1a2632]"
                        : "bg-white border-[#dde5e7] text-[#8b9bae]"
                    }`}
                  >
                    Before Meals (AC)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoodRelation("After Meals (PC)")}
                    className={`py-1.5 border rounded-lg font-semibold ${
                      foodRelation === "After Meals (PC)"
                        ? "bg-[#7bf2e2] border-[#3a9898] text-[#1a2632]"
                        : "bg-white border-[#dde5e7] text-[#8b9bae]"
                    }`}
                  >
                    After Meals (PC)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoodRelation("With Food")}
                    className={`py-1.5 border rounded-lg font-semibold ${
                      foodRelation === "With Food"
                        ? "bg-[#7bf2e2] border-[#3a9898] text-[#1a2632]"
                        : "bg-white border-[#dde5e7] text-[#8b9bae]"
                    }`}
                  >
                    With Food
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1a2632] mb-1">
                  Patient Instructions / SIG Notes
                </label>
                <textarea
                  rows={2}
                  value={sigNotes}
                  onChange={(e) => setSigNotes(e.target.value)}
                  className="w-full p-2 text-xs border border-[#dde5e7] rounded-lg resize-none bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-white border border-[#dde5e7] text-[#5a6a76] rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="px-4 py-1.5 bg-[#0b5c54] text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#084842]"
                >
                  <Check size={14} /> Confirm & Add to Rx
                </button>
              </div>
            </div>

            {/* Prescribed List */}
            <div className="space-y-2">
              {prescriptions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border border-[#dde5e7] rounded-xl bg-white text-xs"
                >
                  <div>
                    <p className="font-bold text-[#1a2632]">{item.name}</p>
                    <p className="text-[10px] text-[#8b9bae]">{item.detail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#1a2632]">
                      \${item.price}
                    </span>
                    <button
                      onClick={() => handleDeleteMedication(item.id)}
                      className="text-[#8b9bae] hover:text-red-500"
                    >
                      <FileText size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-[#8b9bae] text-right font-semibold pt-1">
                Prescribed Medications Total:{" "}
                <span className="font-bold text-[#1a2632]">
                  \${totalRxPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Consultation & Treatment Fees */}
          <div className="bg-[#eaf6f5] rounded-2xl p-5 border border-[#c4e4e0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
                <span className="p-1 bg-[#0b5c54] text-white rounded">
                  <FileText size={12} />
                </span>
                Consultation & Treatment Fees
              </h3>
              <span className="px-2 py-0.5 bg-white text-[#3a9898] text-[10px] font-bold rounded">
                Billing Summary
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#5a6a76] mb-1">
                  Doctor Consultation Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-[#5a6a76]">
                    \$
                  </span>
                  <input
                    type="text"
                    value={doctorFee}
                    onChange={(e) => setDoctorFee(e.target.value)}
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-[#c4e4e0] rounded-lg font-bold bg-white"
                  />
                  <span className="absolute right-3 top-2 text-[10px] text-[#8b9bae]">
                    Dr. Sriram
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#5a6a76] mb-1">
                  Treatment / Procedure Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-[#5a6a76]">
                    \$
                  </span>
                  <input
                    type="text"
                    value={treatmentFee}
                    onChange={(e) => setTreatmentFee(e.target.value)}
                    className="w-full pl-6 pr-3 py-1.5 text-xs border border-[#c4e4e0] rounded-lg font-bold bg-white"
                  />
                  <span className="absolute right-3 top-2 text-[10px] text-[#8b9bae]">
                    Root Canal (Primary)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#c4e4e0] text-xs flex justify-between items-center">
              <span className="text-[#5a6a76]">
                Consultation: ${doctorFee} • Treatment: ${treatmentFee} •
                Prescribed Medicines: \${totalRxPrice.toFixed(2)}
              </span>
              <span className="font-bold text-[#1a2632]">
                Total Payable:{" "}
                <span className="text-sm font-black text-[#0b5c54]">
                  \${totalPayable}
                </span>
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveConsultation("completed")}
                disabled={saving}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#0b5c54] hover:bg-[#084842] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Check size={16} />
                {saving ? "Saving Consultation..." : "Complete & Finalize Consultation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
