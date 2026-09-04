import { MoreHorizontal, Phone, Mail } from 'lucide-react'

const doctorsData = [
  { name: 'Dr. Amelia Hart', spec: 'Cardiology', days: 'Monday - Friday (08:00 - 14:00)', available: true },
  { name: 'Dr. Rizky Pratama', spec: 'General Medicine', days: 'Tuesday - Saturday (10:00 - 16:00)', available: false },
  { name: 'Dr. Sophia Liang', spec: 'Pediatrics', days: 'Monday - Friday (09:00 - 15:00)', available: true },
  { name: 'Dr. Daniel Obeng', spec: 'Orthopedics', days: 'Wednesday - Sunday (08:00 - 14:00)', available: false },
  { name: 'Dr. Nina Alvarez', spec: 'Dermatology', days: 'Tuesday - Saturday (12:00 - 20:00)', available: true },
  { name: 'Dr. Arjun Mehta', spec: 'Pulmonology', days: 'Monday - Friday (08:00 - 14:00)', available: false },
  { name: 'Dr. Victor Rossi', spec: 'Neurology', days: 'Monday - Thursday (10:00 - 18:00)', available: false },
  { name: 'Dr. Elena Morales', spec: 'Endocrinology', days: 'Tuesday - Friday (09:00 - 17:00)', available: true },
]

export default function DoctorsPage() {
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1a2632]">Doctors Directory</h2>
          <p className="text-[#8b9bae] text-sm mt-1">Manage and assign patients to medical staff</p>
        </div>
        <button className="px-5 py-2.5 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-sm font-bold rounded-xl transition-all shadow-sm shadow-[#3a9898]/20">
          Add New Doctor
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {doctorsData.map((doc, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col group hover:border-[#b5d9d5] transition-colors">
            
            {/* Top row: Status & Options */}
            <div className="flex justify-between items-start mb-4">
              {doc.available ? (
                <span className="px-2.5 py-1 bg-[#3a9898] text-white text-[10px] font-bold rounded">Available</span>
              ) : (
                <span className="px-2.5 py-1 bg-[#fee2e2] text-[#ef4444] text-[10px] font-bold rounded">Unavailable</span>
              )}
              <button className="text-[#8b9bae] hover:text-[#1a2632]"><MoreHorizontal size={18}/></button>
            </div>

            {/* Profile info */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#eaf6f5] mb-3 overflow-hidden border-2 border-[#dde5e7]">
                <div className="w-full h-full bg-gray-200"></div>
              </div>
              <h3 className="font-bold text-[#1a2632] text-lg">{doc.name}</h3>
              <p className="text-[#5a6a76] text-sm font-medium">{doc.spec}</p>
            </div>

            {/* Schedule */}
            <div className="bg-[#f5f7f8] rounded-xl p-3 text-center mb-6">
              <p className="text-xs text-[#5a6a76] font-medium leading-relaxed">{doc.days}</p>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-2">
              <button className="w-10 h-10 rounded-xl border border-[#dde5e7] flex items-center justify-center text-[#5a6a76] hover:bg-[#f5f7f8] hover:text-[#3a9898] transition-colors shrink-0">
                <Phone size={16} />
              </button>
              <button className="w-10 h-10 rounded-xl border border-[#dde5e7] flex items-center justify-center text-[#5a6a76] hover:bg-[#f5f7f8] hover:text-[#3a9898] transition-colors shrink-0">
                <Mail size={16} />
              </button>
              <button className="flex-1 bg-[#eaf6f5] hover:bg-[#d4efed] text-[#3a9898] font-bold text-xs rounded-xl transition-colors">
                Assign Patient
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
