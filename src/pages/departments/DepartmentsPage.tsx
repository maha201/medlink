import { UserCircle, HeartPulse, Brain, Baby, Activity } from 'lucide-react'

const depts = [
  { name: 'Cardiology', icon: HeartPulse, head: 'Dr. Amelia Hart', doctors: 12, patients: 1380 },
  { name: 'Neurology', icon: Brain, head: 'Dr. Victor Rossi', doctors: 8, patients: 1090 },
  { name: 'Pediatrics', icon: Baby, head: 'Dr. Sophia Liang', doctors: 15, patients: 1620 },
  { name: 'General Medicine', icon: Activity, head: 'Dr. Rizky Pratama', doctors: 24, patients: 2140 },
]

export default function DepartmentsPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#1a2632]">Departments</h2>
        <button className="px-5 py-2.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-sm font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20">
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {depts.map((dept, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] hover:border-[#b5d9d5] transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#eaf6f5] text-[#3a9898] flex items-center justify-center">
                <dept.icon size={24} />
              </div>
              <button className="text-[#3a9898] text-xs font-bold hover:underline">View Details</button>
            </div>
            
            <h3 className="font-bold text-[#1a2632] text-xl mb-1">{dept.name}</h3>
            <p className="text-sm text-[#8b9bae] flex items-center gap-1.5 mb-6">
              <UserCircle size={14} /> Head: <span className="font-medium text-[#5a6a76]">{dept.head}</span>
            </p>

            <div className="flex gap-4 pt-4 border-t border-[#dde5e7]">
              <div className="flex-1">
                <p className="text-xs text-[#8b9bae] mb-1">Total Doctors</p>
                <p className="text-lg font-bold text-[#1a2632]">{dept.doctors}</p>
              </div>
              <div className="w-px bg-[#dde5e7]"></div>
              <div className="flex-1">
                <p className="text-xs text-[#8b9bae] mb-1">Total Patients</p>
                <p className="text-lg font-bold text-[#1a2632]">{dept.patients.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
