import { 
  Users, UserPlus, Calendar as CalendarIcon, 
  TrendingUp, MoreHorizontal, Info 
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Tooltip
} from 'recharts'

// Mock Data
const ageData = [
  { name: 'Mon', children: 25, teens: 45, adults: 10 },
  { name: 'Tue', children: 30, teens: 40, adults: 25 },
  { name: 'Wed', children: 35, teens: 50, adults: 40 },
  { name: 'Thu', children: 45, teens: 35, adults: 30 },
  { name: 'Fri', children: 50, teens: 45, adults: 20 },
  { name: 'Sat', children: 40, teens: 30, adults: 15 },
  { name: 'Sun', children: 30, teens: 40, adults: 25 },
]

const deptData = [
  { name: 'General Medicine', value: 2140, color: '#1f4e4e' },
  { name: 'Pediatrics', value: 1620, color: '#3a9898' },
  { name: 'Cardiology', value: 1380, color: '#d4efed' },
  { name: 'Orthopedics', value: 1050, color: '#a8b8c8' },
  { name: 'Dermatology', value: 1060, color: '#dde5e7' },
  { name: 'Neurology', value: 1090, color: '#f0f4f5' },
]

const revenueData = [
  { name: 'Jan', income: 1000, expense: 500 },
  { name: 'Feb', income: 1200, expense: 600 },
  { name: 'Mar', income: 1100, expense: 700 },
  { name: 'Apr', income: 1500, expense: 800 },
  { name: 'May', income: 1300, expense: 900 },
  { name: 'Jun', income: 1620, expense: 872 },
  { name: 'Jul', income: 1400, expense: 700 },
  { name: 'Aug', income: 1700, expense: 900 },
  { name: 'Sep', income: 1800, expense: 1000 },
  { name: 'Oct', income: 1600, expense: 900 },
  { name: 'Nov', income: 1900, expense: 1100 },
  { name: 'Dec', income: 2000, expense: 1200 },
]

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in fade-in duration-500">
      
      {/* ── LEFT COLUMN (Main Metrics & Charts) ── */}
      <div className="xl:col-span-8 flex flex-col gap-6">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visitors */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7]">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#8b9bae] text-sm font-medium">Overall Visitors</span>
              <div className="w-10 h-10 rounded-xl bg-[#1f4e4e] flex items-center justify-center text-white">
                <Users size={20} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-[#1a2632] mb-4">24,580</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
                <TrendingUp size={14} />
              </div>
              <span className="text-[#3a9898] font-medium">+12% vs. yesterday</span>
            </div>
          </div>

          {/* Patients */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7]">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#8b9bae] text-sm font-medium">Total Patients</span>
              <div className="w-10 h-10 rounded-xl bg-[#1f4e4e] flex items-center justify-center text-white">
                <UserPlus size={20} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-[#1a2632] mb-4">8,340</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
                <TrendingUp size={14} />
              </div>
              <span className="text-[#3a9898] font-medium">+1.5% vs. last week</span>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7]">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#8b9bae] text-sm font-medium">Appointments</span>
              <div className="w-10 h-10 rounded-xl bg-[#1f4e4e] flex items-center justify-center text-white">
                <CalendarIcon size={20} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-[#1a2632] mb-4">1,275</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898]">
                <TrendingUp size={14} />
              </div>
              <span className="text-[#3a9898] font-medium">+8% vs. yesterday</span>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
          {/* Patient by Age Stages */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-[#1a2632]">Patient by Age Stages</h3>
                <div className="text-3xl font-bold text-[#3a9898] mt-2">465 <span className="text-sm font-normal text-[#8b9bae]">Total Patients</span></div>
              </div>
              <select className="bg-[#f5f7f8] border-none text-sm font-medium text-[#5a6a76] rounded-lg px-4 py-2 outline-none">
                <option>This Week</option>
              </select>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dde5e7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8b9bae', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#8b9bae', fontSize: 12}} dx={-10} />
                  <Tooltip cursor={{fill: '#f5f7f8'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="children" fill="#eaf6f5" radius={[4,4,0,0]} barSize={12} />
                  <Bar dataKey="teens" fill="#3a9898" radius={[4,4,0,0]} barSize={12} />
                  <Bar dataKey="adults" fill="#1f4e4e" radius={[4,4,0,0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patient by Departments */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-[#1a2632]">Patient by Departments</h3>
              <button className="text-[#8b9bae]"><MoreHorizontal size={20}/></button>
            </div>
            <div className="relative h-[180px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deptData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                    {deptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <div className="text-xs text-[#8b9bae]">All Patients</div>
                <div className="text-xl font-bold text-[#1a2632]">8,340</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-4">
              {deptData.slice(0,6).map((dept) => (
                <div key={dept.name} className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-sm mt-1 shrink-0" style={{ backgroundColor: dept.color }}></div>
                  <div>
                    <div className="text-xs font-semibold text-[#1a2632] leading-tight">{dept.name}</div>
                    <div className="text-[10px] text-[#8b9bae] mt-0.5">{dept.value} Patients</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
          {/* Revenue */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#1a2632]">Revenue</h3>
              <select className="bg-[#f5f7f8] border-none text-sm font-medium text-[#5a6a76] rounded-lg px-4 py-2 outline-none">
                <option>Last Year</option>
              </select>
            </div>
            <div className="flex gap-6 mb-4">
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3a9898]"></div><span className="text-sm font-medium text-[#5a6a76]">Income</span></div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1f4e4e]"></div><span className="text-sm font-medium text-[#5a6a76]">Expense</span></div>
            </div>
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{top:10, right:0, left:-20, bottom:0}}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3a9898" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3a9898" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1f4e4e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1f4e4e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dde5e7" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8b9bae', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#8b9bae', fontSize: 12}} tickFormatter={(v)=>`${v/1000}K`} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="expense" stroke="#1f4e4e" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                  <Area type="monotone" dataKey="income" stroke="#3a9898" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#1a2632]">Reports</h3>
              <button className="text-[#8b9bae]"><MoreHorizontal size={20}/></button>
            </div>
            <div className="flex flex-col gap-5 overflow-y-auto pr-2">
              {[
                { title: 'Medication stock running low in Pharmacy', id: 'PT-2035-112', time: '5m ago' },
                { title: 'System lag on Outpatient Registration', id: 'Elliana Marks (Front Desk)', time: '18m ago' },
                { title: 'Air conditioning error in ICU ward', id: 'Eduardo Huarez (Maintenance)', time: 'Yesterday' },
                { title: 'Broken wheelchair near Emergency entrance', id: 'Andrew Feign (Hospital Staff)', time: 'Yesterday' },
              ].map((report, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#eaf6f5] flex items-center justify-center text-[#3a9898] shrink-0 mt-0.5">
                    <Info size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a2632] leading-snug">{report.title}</h4>
                    <p className="text-xs text-[#8b9bae] mt-1">{report.id}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-[#8b9bae]">{report.time}</span>
                      <button className="text-[10px] font-semibold text-[#3a9898]">Details &gt;</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── RIGHT COLUMN (Calendar & Schedule) ── */}
      <div className="xl:col-span-4 flex flex-col gap-6">
        
        {/* Calendar Widget */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1a2632] text-lg">March 2035</h3>
            <div className="flex gap-2">
              <button className="w-6 h-6 flex items-center justify-center text-[#8b9bae] hover:bg-[#f5f7f8] rounded">&lt;</button>
              <button className="w-6 h-6 flex items-center justify-center text-[#8b9bae] hover:bg-[#f5f7f8] rounded">&gt;</button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-xs font-medium text-[#8b9bae] mb-4">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 text-center text-sm gap-y-4">
            {/* Mock calendar days */}
            {[27, 28, 29, 1, 2, 3, 4, 5, 6, 7, '8-active', 9, 10, 11, 12, 13, 14, 15, 16, '17-light', 18, 19, '20-light', 21, 22, 23, 24, 25, 26, 27, '28-light', 1, 2, 3, 4].map((day, i) => {
              if (typeof day === 'string' && day.includes('active')) {
                return <div key={i} className="flex justify-center"><div className="w-7 h-7 flex items-center justify-center bg-[#3a9898] text-white rounded-full font-bold">{day.split('-')[0]}</div></div>
              }
              if (typeof day === 'string' && day.includes('light')) {
                return <div key={i} className="flex justify-center"><div className="w-7 h-7 flex items-center justify-center bg-[#eaf6f5] text-[#3a9898] rounded-full font-bold">{day.split('-')[0]}</div></div>
              }
              const isMuted = i < 3 || i > 30
              return <div key={i} className={`flex justify-center items-center h-7 ${isMuted ? 'text-[#c8d4dc]' : 'text-[#1a2632]'}`}>{day}</div>
            })}
          </div>
        </div>

        {/* Agenda */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-bold text-[#1a2632]">Agenda</h3>
            <button className="text-[#8b9bae]"><MoreHorizontal size={20}/></button>
          </div>
          <div className="space-y-3">
            {[
              { date: '17', day: 'Fri', tag: 'Meeting', title: 'Monthly Staff Meeting & Hospital Upd...', time: '09:00 - 10:30' },
              { date: '20', day: 'Mon', tag: 'Training', title: 'Industry Networking Night', time: '14:00 - 16:00' },
              { date: '28', day: 'Tue', tag: 'Review', title: 'Policy Review & Compliance Docume...', time: '10:00 - 11:30' },
            ].map((item, i) => (
              <div key={i} className="bg-[#eaf6f5] rounded-2xl p-4 flex gap-4">
                <div className="bg-white rounded-xl w-14 h-14 flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <span className="text-xl font-bold text-[#1a2632] leading-none">{item.date}</span>
                  <span className="text-[10px] font-medium text-[#8b9bae]">{item.day}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-white bg-[#3a9898] px-2 py-0.5 rounded self-start mb-1.5 uppercase">{item.tag}</span>
                  <h4 className="text-sm font-bold text-[#1a2632] truncate max-w-[200px]">{item.title}</h4>
                  <p className="text-xs text-[#5a6a76] mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctors' Schedule */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#dde5e7] flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1a2632]">Doctors' Schedule</h3>
            <button className="text-[#8b9bae]"><MoreHorizontal size={20}/></button>
          </div>
          
          <div className="flex justify-between mb-6 pb-6 border-b border-[#dde5e7]">
            <div className="text-center"><div className="text-2xl font-bold text-[#1a2632]">35</div><div className="text-xs text-[#8b9bae]">All Doctor</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-[#1a2632]">24</div><div className="text-xs text-[#8b9bae]">Available</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-[#1a2632]">11</div><div className="text-xs text-[#8b9bae]">Unavailable</div></div>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Dr. Amelia Hart', dept: 'Cardiology', status: 'Available', time: '08:00 - 12:00' },
              { name: 'Dr. Rizky Pratama', dept: 'General Medicine', status: 'Unavailable', time: '-' },
              { name: 'Dr. Sophia Liang', dept: 'Pediatrics', status: 'Available', time: '13:00 - 17:00' },
              { name: 'Dr. Daniel Obeng', dept: 'Orthopedics', status: 'Unavailable', time: '-' },
            ].map((doc, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c8d4dc]"></div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1a2632]">{doc.name}</h4>
                    <p className="text-xs text-[#8b9bae]">{doc.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  {doc.status === 'Available' ? (
                    <span className="inline-block px-2 py-1 bg-[#3a9898] text-white text-[10px] font-bold rounded">Available</span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-[#fee2e2] text-[#ef4444] text-[10px] font-bold rounded">Unavailable</span>
                  )}
                  <p className="text-[10px] text-[#8b9bae] mt-1">{doc.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
