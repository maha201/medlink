import { ChevronDown, Plus, CheckCircle2, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock patient records
const patientsData = [
  { id: 'PT-2035-001', name: 'Alicia Perth', gender: 'Female', age: 34, blood: 'O+', phone: '+1 234 567 890', lastVisit: '12 Feb 2035', doctor: 'Dr. Amelia Hart', status: 'Active' },
  { id: 'PT-2035-024', name: 'Bima Kurnia', gender: 'Male', age: 29, blood: 'A-', phone: '+1 234 567 891', lastVisit: '10 Mar 2035', doctor: 'Dr. Rizky Pratama', status: 'Active' },
  { id: 'PT-2035-053', name: 'Clara Wright', gender: 'Female', age: 7, blood: 'B+', phone: '+1 234 567 892', lastVisit: '14 Mar 2035', doctor: 'Dr. Sophia Liang', status: 'Active' },
  { id: 'PT-2035-078', name: 'Daniel Wong', gender: 'Male', age: 42, blood: 'AB+', phone: '+1 234 567 893', lastVisit: '01 Jan 2035', doctor: 'Dr. Daniel Obeng', status: 'Inactive' },
  { id: 'PT-2035-091', name: 'Erica Smith', gender: 'Female', age: 26, blood: 'O-', phone: '+1 234 567 894', lastVisit: '15 Mar 2035', doctor: 'Dr. Nina Alvarez', status: 'New' },
  { id: 'PT-2035-129', name: 'Francis Rowe', gender: 'Male', age: 51, blood: 'A+', phone: '+1 234 567 895', lastVisit: '08 Mar 2035', doctor: 'Dr. Amelia Hart', status: 'Active' },
  { id: 'PT-2035-141', name: 'Grace Nathanile', gender: 'Female', age: 31, blood: 'O+', phone: '+1 234 567 896', lastVisit: '22 Feb 2035', doctor: 'Dr. Rizky Pratama', status: 'Inactive' },
  { id: 'PT-2035-152', name: 'Hasan Malik', gender: 'Male', age: 47, blood: 'B-', phone: '+1 234 567 897', lastVisit: '12 Mar 2035', doctor: 'Dr. Daniel Obeng', status: 'Active' },
]

export default function PatientsPage() {
  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Page Header Actions (Optional above the card, but let's keep it clean inside the card) */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden">
        
        {/* Header & Filters */}
        <div className="p-6 border-b border-[#dde5e7] flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-[#1a2632]">Patient Directory</h2>
          
          <div className="flex gap-4">
            <div className="flex gap-2">
              {['Status', 'Gender', 'Blood Group'].map((filter) => (
                <button 
                  key={filter}
                  className="flex items-center gap-2 px-4 py-2 bg-[#f5f7f8] hover:bg-[#eaf6f5] text-[#5a6a76] hover:text-[#3a9898] text-xs font-semibold rounded-full transition-colors border border-[#dde5e7] hover:border-[#b5d9d5]"
                >
                  {filter}
                  <ChevronDown size={14} />
                </button>
              ))}
            </div>
            
            <div className="w-px h-8 bg-[#dde5e7] mx-1"></div>

            <button className="flex items-center gap-2 px-5 py-2 bg-[#3a9898] hover:bg-[#2b6e6e] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#3a9898]/20">
              <Plus size={16} strokeWidth={2.5} />
              Add New Patient
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
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Patient Name ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Gender / Age ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Blood ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Phone Number ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Last Visit ↕</th>
                <th className="py-4 px-4 text-xs font-medium text-[#8b9bae] whitespace-nowrap">Primary Doctor ↕</th>
                <th className="py-4 px-6 text-xs font-medium text-[#8b9bae] whitespace-nowrap text-center">Status ↕</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde5e7]">
              {patientsData.map((row, i) => (
                <tr key={i} className="hover:bg-[#f5f7f8] transition-colors group">
                  <td className="py-4 pl-6 pr-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#dde5e7] text-[#3a9898] focus:ring-[#3a9898] bg-[#f5f7f8] cursor-pointer" />
                  </td>
                  
                  {/* Name & ID */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#dde5e7] shrink-0 overflow-hidden">
                         {/* Mock Avatar placeholder */}
                         <div className="w-full h-full bg-gray-200"></div>
                      </div>
                      <div>
                        <Link to={`/patients/${row.id}`} className="text-sm font-bold text-[#1a2632] hover:text-[#3a9898] transition-colors">
                          {row.name}
                        </Link>
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
                  
                  {/* Blood Group */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f0f4f5] text-xs font-bold text-[#e11d48]">
                      {row.blood}
                    </span>
                  </td>
                  
                  {/* Phone */}
                  <td className="py-4 px-4 text-sm font-medium text-[#5a6a76]">
                    {row.phone}
                  </td>
                  
                  {/* Last Visit */}
                  <td className="py-4 px-4 text-sm text-[#5a6a76] whitespace-nowrap">
                    {row.lastVisit}
                  </td>
                  
                  {/* Doctor */}
                  <td className="py-4 px-4">
                    <div className="text-sm font-bold text-[#1a2632]">{row.doctor}</div>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    {row.status === 'Inactive' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f0f4f5] text-[#8b9bae] text-xs font-bold border border-[#dde5e7]">
                        <Clock size={14} strokeWidth={2.5} />
                        Inactive
                      </span>
                    )}
                    {row.status === 'New' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3a9898] text-white text-xs font-bold shadow-sm shadow-[#3a9898]/20">
                        <Plus size={14} strokeWidth={2.5} />
                        New Patient
                      </span>
                    )}
                    {row.status === 'Active' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#eaf6f5] text-[#3a9898] text-xs font-bold border border-[#c4e4e0]">
                        <CheckCircle2 size={14} strokeWidth={2.5} />
                        Active
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#dde5e7] flex items-center justify-between text-sm text-[#5a6a76]">
          <div>Showing 1 to 8 of 465 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7]">Previous</button>
            <button className="px-3 py-1 rounded bg-[#3a9898] text-white font-medium">1</button>
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors">2</button>
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors">3</button>
            <button className="px-3 py-1 rounded hover:bg-[#f0f4f5] transition-colors border border-transparent hover:border-[#dde5e7]">Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}
