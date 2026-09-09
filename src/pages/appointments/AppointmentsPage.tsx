import { ChevronDown, Info, CheckCircle2, Plus } from 'lucide-react'
import { useState } from 'react'
import BookAppointmentModal from './BookAppointmentModal'

// Mock data based on the provided screenshot
const appointmentsData = [
  { id: 'PT-2035-001', name: 'Alicia Perth', gender: 'Female', age: 34, condition: 'Hypertension', doctor: 'Dr. Amelia Hart', dept: 'Cardiology', type: 'Outpatient', date: '—', location: '—', status: 'Discharged' },
  { id: 'PT-2035-024', name: 'Bima Kurnia', gender: 'Male', age: 29, condition: 'Gastritis', doctor: 'Dr. Rizky Pratama', dept: 'General Medicine', type: 'Outpatient', date: '—', location: '—', status: 'Discharged' },
  { id: 'PT-2035-053', name: 'Clara Wright', gender: 'Female', age: 7, condition: 'Dengue Fever', doctor: 'Dr. Sophia Liang', dept: 'Pediatrics', type: 'Outpatient', date: '—', location: '—', status: 'In Treatment' },
  { id: 'PT-2035-078', name: 'Daniel Wong', gender: 'Male', age: 42, condition: 'Bone Fracture', doctor: 'Dr. Daniel Obeng', dept: 'Orthopedics', type: 'Inpatient', date: '11 March 2035', location: 'Room 402B - 4th Floor', status: 'Admitted' },
  { id: 'PT-2035-091', name: 'Erica Smith', gender: 'Female', age: 26, condition: 'Acne', doctor: 'Dr. Nina Alvarez', dept: 'Dermatology', type: 'Outpatient', date: '—', location: '—', status: 'In Treatment' },
  { id: 'PT-2035-129', name: 'Francis Rowe', gender: 'Male', age: 51, condition: 'Arrhythmia', doctor: 'Dr. Amelia Hart', dept: 'Cardiology', type: 'Inpatient', date: '10 March 2035', location: 'Room 305A - 3rd Floor', status: 'Admitted' },
  { id: 'PT-2035-141', name: 'Grace Nathanile', gender: 'Female', age: 31, condition: 'Migraine', doctor: 'Dr. Rizky Pratama', dept: 'General Medicine', type: 'Outpatient', date: '—', location: '—', status: 'Discharged' },
  { id: 'PT-2035-152', name: 'Hasan Malik', gender: 'Male', age: 47, condition: 'Sciatica', doctor: 'Dr. Daniel Obeng', dept: 'Orthopedics', type: 'Inpatient', date: '12 March 2035', location: 'Room 210C - 2nd Floor', status: 'Admitted' },
  { id: 'PT-2035-163', name: 'Indah Lestari', gender: 'Female', age: 9, condition: 'Viral Infection', doctor: 'Dr. Sophia Liang', dept: 'Pediatrics', type: 'Outpatient', date: '—', location: '—', status: 'Discharged' },
]

export default function AppointmentsPage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="animate-in fade-in duration-500">
      {showModal && <BookAppointmentModal onClose={() => setShowModal(false)} />}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-[#1a2632]">Appointments</h2>
          
          <div className="flex gap-3">
            {['Gender', 'Age', 'Patient Type', 'Condition'].map((filter) => (
              <button 
                key={filter}
                className="flex items-center gap-2 px-4 py-2 bg-[#eaf6f5] hover:bg-[#d4efed] text-[#3a9898] text-xs font-semibold rounded-full transition-colors"
              >
                {filter}
                <ChevronDown size={14} />
              </button>
            ))}
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20">
              <Plus size={14} strokeWidth={2.5} /> Book Appointment
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#dde5e7]">
                <th className="py-4 pl-6 pr-4 w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8]" />
                </th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Name ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Gender / Age ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Condition ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Doctor ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Patient Type ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Admission Date ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Location ↕</th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">Status ↕</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde5e7]">
              {appointmentsData.map((row, i) => (
                <tr key={i} className="hover:bg-[#f5f7f8] transition-colors group">
                  <td className="py-4 pl-6 pr-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer" />
                  </td>
                  
                  {/* Name & ID */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#dde5e7] shrink-0"></div>
                      <div>
                        <div className="text-sm font-bold text-[#1a2632] group-hover:text-[#3a9898] transition-colors cursor-pointer">{row.name}</div>
                        <div className="text-xs text-[#8b9bae]">#{row.id}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Gender / Age */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76]">
                    <span className="inline-flex items-center gap-1.5">
                      {row.gender === 'Female' ? <span className="text-[#3a9898] font-bold">♀</span> : <span className="text-[#8b9bae] font-bold">♂</span>}
                      / {row.age}
                    </span>
                  </td>
                  
                  {/* Condition */}
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-[#3a9898]">{row.condition}</span>
                  </td>
                  
                  {/* Doctor */}
                  <td className="py-4 px-4">
                    <div className="text-sm font-bold text-[#1a2632]">{row.doctor}</div>
                    <div className="text-xs text-[#8b9bae]">{row.dept}</div>
                  </td>
                  
                  {/* Patient Type */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76]">
                    {row.type}
                  </td>
                  
                  {/* Date */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                    {row.date}
                  </td>
                  
                  {/* Location */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                    {row.location}
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    {row.status === 'Discharged' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#8b9bae] text-xs font-bold border border-[#dde5e7]">
                        <Info size={14} strokeWidth={2.5} />
                        Discharged
                      </span>
                    )}
                    {row.status === 'In Treatment' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3a9898] text-white text-xs font-bold shadow-sm shadow-[#3a9898]/20">
                        <Info size={14} strokeWidth={2.5} />
                        In Treatment
                      </span>
                    )}
                    {row.status === 'Admitted' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0]">
                        <CheckCircle2 size={14} strokeWidth={2.5} />
                        Admitted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
