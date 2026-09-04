import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react'

export default function MessagesPage() {
  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-2xl shadow-sm border border-[#dde5e7] h-full flex overflow-hidden">
        
        {/* Left Sidebar - Contacts */}
        <div className="w-[320px] border-r border-[#dde5e7] flex flex-col bg-white">
          <div className="p-4 border-b border-[#dde5e7]">
            <h2 className="text-lg font-bold text-[#1a2632] mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b9bae]" size={14} />
              <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 bg-[#f5f7f8] border border-[#dde5e7] rounded-full text-xs outline-none focus:border-[#3a9898]" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {['Dr. Amelia Hart', 'Dr. Rizky Pratama', 'Reception Desk', 'Pharmacy Team'].map((name, i) => (
              <div key={i} className={`p-4 flex gap-3 cursor-pointer border-b border-[#f0f4f5] transition-colors ${i===0 ? 'bg-[#eaf6f5]' : 'hover:bg-[#f5f7f8]'}`}>
                <div className="w-10 h-10 rounded-full bg-[#c8d4dc] shrink-0 relative">
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-sm font-bold text-[#1a2632] truncate">{name}</h4>
                    <span className="text-[10px] text-[#8b9bae]">10:42 AM</span>
                  </div>
                  <p className="text-xs text-[#5a6a76] truncate">Sure, I will review the patient's file...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - Chat Window */}
        <div className="flex-1 flex flex-col bg-[#f5f7f8]">
          {/* Chat Header */}
          <div className="h-[72px] bg-white border-b border-[#dde5e7] flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c8d4dc]"></div>
              <div>
                <h3 className="font-bold text-[#1a2632]">Dr. Amelia Hart</h3>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#8b9bae]">
              <button className="hover:text-[#3a9898]"><Phone size={18}/></button>
              <button className="hover:text-[#3a9898]"><Video size={18}/></button>
              <button className="hover:text-[#1a2632]"><MoreVertical size={18}/></button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            <div className="self-center text-xs text-[#8b9bae] font-medium bg-[#eaf6f5] px-3 py-1 rounded-full">Today</div>
            
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-[#c8d4dc] shrink-0"></div>
              <div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-[#dde5e7] text-sm text-[#1a2632] shadow-sm">
                  Hello James! Could you send me the latest lab results for Alicia Perth?
                </div>
                <div className="text-[10px] text-[#8b9bae] mt-1 ml-1">10:30 AM</div>
              </div>
            </div>

            <div className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
              <div className="bg-[#3a9898] p-3 rounded-2xl rounded-tr-sm text-sm text-white shadow-sm">
                Hi Dr. Hart, absolutely. I'll forward them to your dashboard right away.
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-[#dde5e7] shrink-0">
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-[#f5f7f8] border border-[#dde5e7] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3a9898]" />
              <button className="w-12 h-12 rounded-xl bg-[#3a9898] hover:bg-[#2b6e6e] text-white flex items-center justify-center transition-colors shadow-sm shadow-[#3a9898]/20 shrink-0">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
