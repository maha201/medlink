export default function AppointmentCalendarPage() {
  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-xl font-bold text-[#1a2632]">Calendar Schedule</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-[#dde5e7] rounded-lg text-sm font-medium hover:bg-[#f5f7f8]">Day</button>
          <button className="px-4 py-2 bg-white border border-[#dde5e7] rounded-lg text-sm font-medium hover:bg-[#f5f7f8]">Week</button>
          <button className="px-4 py-2 bg-[#3a9898] text-white rounded-lg text-sm font-bold shadow-sm shadow-[#3a9898]/20">Month</button>
        </div>
      </div>
      
      {/* Mock Full Calendar */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#dde5e7] overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-[#dde5e7] bg-[#f5f7f8]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-3 text-center text-xs font-bold text-[#5a6a76] uppercase tracking-wider border-r border-[#dde5e7] last:border-0">{day}</div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="border-r border-b border-[#dde5e7] p-2 hover:bg-[#f5f7f8] transition-colors relative min-h-[100px]">
              <span className={`text-sm font-medium ${i < 3 || i > 33 ? 'text-[#c8d4dc]' : 'text-[#1a2632]'}`}>{((i + 27) % 31) + 1}</span>
              {i === 12 && (
                <div className="mt-2 text-[10px] bg-[#eaf6f5] text-[#3a9898] font-bold p-1.5 rounded border border-[#c4e4e0] truncate">
                  09:00 - Checkup (Alicia)
                </div>
              )}
              {i === 15 && (
                <div className="mt-2 text-[10px] bg-[#fee2e2] text-[#ef4444] font-bold p-1.5 rounded border border-[#fecaca] truncate">
                  14:00 - Surgery (Dr. Hart)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
