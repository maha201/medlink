import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between bg-[#eaf6f5] rounded-r-[50px] p-12 relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10 mt-4 ml-4">
          <div className="w-8 h-8 text-[#3a9898]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="text-[#1a2632] text-2xl font-bold tracking-tight">Medlink</span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center mt-8">
          <h1 className="text-3xl font-bold text-[#3a9898] mb-4">Stay on Top of Every Detail</h1>
          <p className="text-[#5a6a76] max-w-md text-sm leading-relaxed">
            From appointments to inventory, Medlink gives you a clear view of daily hospital operations in real time.
          </p>
          
          {/* Mockup Image Placeholder */}
          <div className="mt-16 relative w-full max-w-[480px] aspect-[4/3] bg-transparent flex items-end justify-center">
             <div className="absolute w-[380px] h-[240px] bg-[#8b9bae] rounded-t-xl border-8 border-gray-700 shadow-2xl flex items-center justify-center transform -translate-x-8">
               <span className="text-white/50 text-sm">Laptop View</span>
             </div>
             <div className="absolute w-[140px] h-[280px] bg-[#a8b8c8] rounded-[24px] border-[6px] border-gray-800 shadow-xl right-10 bottom-0 flex items-center justify-center">
               <span className="text-white/50 text-xs">Mobile View</span>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between text-xs text-[#5a6a76] px-4 pb-4">
          <span>Copyright © 2025 Peterdraw</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#3a9898] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#3a9898] transition-colors">Term and conditions</a>
          </div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#d4efed] rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#d4efed] rounded-full blur-3xl opacity-50 z-0"></div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-[420px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
