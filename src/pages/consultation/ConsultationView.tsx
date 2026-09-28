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
  DollarSign,
  Trash2,
} from "lucide-react";
import { apiFetch, API_ENDPOINTS } from "@/lib/api/api";

interface PatientConsultationViewProps {
  patientId?: string;
  appointmentId?: string;
  onClose?: () => void;
}

export default function PatientConsultationView({
  patientId = "PT-2035-078",
  appointmentId,
  onClose,
}: PatientConsultationViewProps) {
  const [, setLoading] = useState(false);
  const [, setActiveTab] = useState("9/8/2026");

  // Clinical Record States
  const [chiefComplaint, setChiefComplaint] = useState(
    "Azithromycin 250mg Film-Coated Tablet",
  );
  const [diagnosis, setDiagnosis] = useState("Rootcanal");
  const [conditions, setConditions] = useState("dangerous");
  const [bodyWeight, setBodyWeight] = useState("80 KG");
  const [bodyHeight, setBodyHeight] = useState("172 CM");
  const [pressure, setPressure] = useState("140");
  const [bloodSugar, setBloodSugar] = useState("120");
  const [heartRate, setHeartRate] = useState("76");
  const [followUpDate, setFollowUpDate] = useState("DEC-02-2026");
  const [diagnosedBy, setDiagnosedBy] = useState("DR. Sriram");
  const [patientNote, setPatientNote] = useState(
    "Daniel is stable post-op with well-controlled pain, and early mobilization is planned. Continue regular blood pressure monitoring and adjust medication if pain or hypertension worsens.",
  );

  // Prescription Form States
  const [medSearch, setMedSearch] = useState(
    "Azithromycin 250mg Film-Coated Tablet",
  );
  const [frequency, setFrequency] = useState("Once Daily (1x / 24h)");
  const [duration, setDuration] = useState("5 Days");
  const [dispenseQty, setDispenseQty] = useState("5 Tablets");
  const [dispensePack, setDispensePack] = useState("1 Blister Pack");
  const [estPrice, setEstPrice] = useState("15.00");
  const [, setInstructions] = useState(
    "Take 2 Tablets on Day 1 as a single initial dose, followed by 1 tablet once daily on Days 2 through 5. Administer after meals with a full glass of water.",
  );

  // Fee Details States
  const [doctorFee, setDoctorFee] = useState("50.20");
  const [treatmentFee, setTreatmentFee] = useState("150.00");

  // Prescribed Medication List State
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "1",
      name: "Cetirizine Hydrochloride 10mg",
      detail: "Qty: 5 Tablets · $1.00 / tab",
      price: "5.00",
    },
    {
      id: "2",
      name: "Salbutamol 100mcg Inhaler",
      detail: "Qty: 1 Canister (200 doses) · $10.50 / unit",
      price: "10.50",
    },
    {
      id: "3",
      name: "Clarithromycin 500mg",
      detail: "Qty: 10 Tablets · $2.20 / tab",
      price: "22.01",
    },
  ]);

  // --------------------------------------------------------------------------
  // ADD NEW MEDICATION FUNCTION (Working Logic)
  // --------------------------------------------------------------------------
  const handleAddMedication = () => {
    if (!medSearch.trim()) {
      alert("Please enter medication name!");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: medSearch,
      detail: `Qty: ${dispenseQty} (${dispensePack}) · ${frequency} · ${duration}`,
      price: estPrice || "0.00",
    };

    // Update Prescriptions List
    setPrescriptions((prev) => [newItem, ...prev]);

    // Reset Form Fields after adding
    setMedSearch("");
    setDispenseQty("");
    setDispensePack("");
    setEstPrice("");
    setInstructions("");
  };

  // DELETE MEDICATION ITEM
  const handleDeleteMedication = (id: string) => {
    setPrescriptions((prev) => prev.filter((item) => item.id !== id));
  };

  // CALCULATE TOTAL Rx AMOUNT DYNAMICALLY
  const totalRxPrice = prescriptions.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0,
  );

  const totalPayable = (
    (parseFloat(doctorFee) || 0) +
    (parseFloat(treatmentFee) || 0) +
    totalRxPrice
  ).toFixed(2);

  // Fetch Patient Data on Mount
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
        if (data.weight) setBodyWeight(data.weight);
        if (data.height) setBodyHeight(data.height);
        if (data.bp) setPressure(data.bp);
        if (data.sugar) setBloodSugar(data.sugar);
        if (data.pulse) setHeartRate(data.pulse);
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
    <div className="bg-[#f4f7f6] min-h-screen p-4 md:p-6 text-[#1a2632] font-sans">
      {/* ── TOP PATIENT BANNER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Patient Profile Card */}
        <div className="lg:col-span-9 bg-white rounded-2xl p-5 border border-[#dde5e7] shadow-sm flex flex-col justify-between">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#eef3f5] pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#c8d8dc] flex items-center justify-center text-white text-xl font-bold">
                DW
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-[#1a2632]">
                    Daniel Wong
                  </h1>
                  <span className="px-2.5 py-0.5 bg-[#eaf6f5] text-[#3a9898] font-bold text-xs rounded-md">
                    #{patientId}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6e8294] mt-1">
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> +62 812-9913-4477
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> daniel.wong@hospital.com
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> Jl. Kaliurang No. 56, Yogyakarta,
                    Indonesia
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} /> +62 812-9908-4411 (Michelle Wong/Spouse)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-4 text-xs">
            <div>
              <p className="text-[#8b9bae] font-medium">Age & Gender</p>
              <p className="font-bold text-[#1a2632] mt-0.5">42/Male</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-medium">DOB</p>
              <p className="font-bold text-[#1a2632] mt-0.5">23 July 1993</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-medium">Blood Type</p>
              <p className="font-bold text-[#1a2632] mt-0.5">O+</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-medium">Occupation</p>
              <p className="font-bold text-[#1a2632] mt-0.5">Project Manager</p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-medium">Status</p>
              <p className="font-bold text-[#1a2632] mt-0.5">
                Post-Op (Inpatient)
              </p>
            </div>
            <div>
              <p className="text-[#8b9bae] font-medium">Insurance</p>
              <p className="font-bold text-[#1a2632] mt-0.5">BPJS - Class 1</p>
            </div>
          </div>
        </div>

        {/* Top Right Allergies Badge Widget */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#dde5e7] shadow-sm flex flex-col justify-between">
          <h2 className="text-xs font-bold text-[#8b9bae] uppercase tracking-wider mb-2">
            Allergies
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#1a2632]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3a9898]"></span>{" "}
              Penicillin
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3a9898]"></span>{" "}
              Aspirin
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3a9898]"></span>{" "}
              Shellfish
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3a9898]"></span> Dust
              Mites
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3a9898]"></span>{" "}
              Peanuts
            </div>
          </div>
        </div>
      </div>

      {/* ── DATE NAVIGATION TABS ── */}
      <div className="flex items-center gap-2 mb-4 border-b border-[#dde5e7] pb-2">
        {["9/8/2026", "9/8/2026", "9/8/2026"].map((date, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(date)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              idx === 0
                ? "bg-[#0b5c54] text-white"
                : "bg-white text-[#3a9898] border border-[#dde5e7] hover:bg-[#eaf6f5]"
            }`}
          >
            {date}
          </button>
        ))}
      </div>

      {/* ── MAIN SPLIT FORM LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Patient Clinical Record */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#dde5e7] shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-[#1a2632]">
                Patient Clinical Record & Prescription
              </h2>
              <p className="text-[11px] text-[#8b9bae]">
                Reference Number: 974 • Electronic Medical Record Entry
              </p>
            </div>
            <span className="px-2.5 py-1 bg-[#eaf6f5] text-[#3a9898] border border-[#c4e4e0] text-[11px] font-bold rounded-full flex items-center gap-1">
              + Active Encounter
            </span>
          </div>

          {/* Chief Complaint */}
          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Chief Complaint / Symptoms
            </label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#dde5e7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
            />
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Diagnosis
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#dde5e7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
            />
          </div>

          {/* Conditions */}
          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Conditions
            </label>
            <input
              type="text"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#dde5e7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
            />
          </div>

          {/* Vitals Grid */}
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

          {/* Follow-Up Date & Diagnosed By */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1a2632] mb-1">
                Follow-Up-Date
              </label>
              <input
                type="text"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#dde5e7] rounded-lg"
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
                className="w-full px-3 py-2 text-xs border border-[#dde5e7] rounded-lg"
              />
            </div>
          </div>

          {/* Patient Note */}
          <div>
            <label className="block text-xs font-bold text-[#1a2632] mb-1">
              Patient Note
            </label>
            <textarea
              rows={3}
              value={patientNote}
              onChange={(e) => setPatientNote(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#dde5e7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3a9898]"
            />
          </div>

          {/* Left Column Action Buttons */}
          <div className="pt-4 border-t border-[#dde5e7] flex items-center justify-between">
            <button className="px-3 py-1.5 bg-[#f0f4f5] text-[#5a6a76] rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#e4ebed]">
              <Printer size={12} /> Print Rx Preview
            </button>
            <div className="flex gap-2">
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-[#dde5e7] text-[#5a6a76] rounded-lg text-xs font-bold hover:bg-[#f8fafb]"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleAddMedication}
                className="px-4 py-1.5 bg-[#0b5c54] text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#084842]"
              >
                <Check size={14} /> Confirm & Save Record
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Prescription Builder & Billing */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-[#dde5e7] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#eef3f5] pb-3">
              <h2 className="text-sm font-bold text-[#1a2632]">Prescription</h2>
              <button
                type="button"
                onClick={handleAddMedication} // ADD MEDICATION TRIGGER
                className="px-3 py-1.5 bg-[#0b5c54] text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#084842]"
              >
                <Plus size={14} /> ADD Medication
              </button>
            </div>

            {/* Medication Search Input */}
            <div>
              <label className="block text-[11px] font-bold text-[#8b9bae] mb-1">
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
              </div>
            </div>

            {/* Frequency, Duration, Dispense, Price */}
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
                  <option>Thrice Daily (3x / 24h)</option>
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
                <input
                  type="text"
                  value={dispenseQty}
                  onChange={(e) => setDispenseQty(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#1a2632] mb-1">
                  Est. Price ($)
                </label>
                <input
                  type="text"
                  value={estPrice}
                  onChange={(e) => setEstPrice(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs border border-[#dde5e7] rounded-lg text-center font-bold"
                />
              </div>
            </div>

            {/* Confirm & Add Button */}
            <div className="flex justify-end gap-2 pt-2 border-t border-[#eef3f5]">
              <button
                type="button"
                onClick={handleAddMedication} // ADD MEDICATION TRIGGER
                className="px-4 py-1.5 bg-[#0b5c54] text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#084842]"
              >
                <Check size={14} /> Confirm & Add to Rx
              </button>
            </div>

            {/* DYNAMICALLY ADDED MEDICATIONS LIST */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-[#1a2632]">
                Prescribed Items ({prescriptions.length})
              </h3>
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
                      ${item.price}
                    </span>
                    <button
                      onClick={() => handleDeleteMedication(item.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-[#8b9bae] text-right font-semibold pt-1">
                Prescribed Total:{" "}
                <span className="font-bold text-[#1a2632]">
                  ${totalRxPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* ── CONSULTATION & TREATMENT FEES CARD ── */}
          <div className="bg-white rounded-2xl p-5 border border-[#dde5e7] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
                <DollarSign size={14} className="text-[#0b5c54]" /> Consultation
                & Treatment Fees
              </h3>
              <span className="px-2 py-0.5 bg-[#eaf6f5] text-[#3a9898] text-[10px] font-bold rounded">
                Billing Summary
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#8b9bae] mb-1">
                  Doctor Fee
                </label>
                <input
                  type="text"
                  value={doctorFee}
                  onChange={(e) => setDoctorFee(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-[#dde5e7] rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#8b9bae] mb-1">
                  Treatment Fee
                </label>
                <input
                  type="text"
                  value={treatmentFee}
                  onChange={(e) => setTreatmentFee(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-[#dde5e7] rounded-lg font-bold"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#eef3f5] text-[11px] flex justify-between items-center font-bold">
              <span className="text-[#5a6a76]">Total Payable Amount:</span>
              <span className="text-sm text-[#0b5c54]">${totalPayable}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
