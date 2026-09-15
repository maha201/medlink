import { LogOut, X } from "lucide-react";

export default function SignOutModal({ isopen: isOpen, onClose, onConfirm }: { isopen: boolean; onClose: () => void; onConfirm: () => void | Promise<void> }) {
  if (!isOpen) return null;

  return (
    /* BACKDROP OVERLAY */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
      {/* DIALOG BOX CONTAINER */}
      <div
        className="bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-xl p-6 relative overflow-hidden transition-all transform scale-100"
        role="dialog"
        aria-modal="true"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* ICON BADGE WITH TEAL ACCENT */}
          <div className="w-14 h-14 rounded-2xl bg-[#EAF6F5] flex items-center justify-center text-[#2C8C89] mb-4 shadow-sm border border-[#2C8C89]/10">
            <LogOut size={26} className="ml-0.5" />
          </div>

          {/* TEXT CONTENT */}
          <h3 className="text-lg font-bold text-slate-900">Sign Out</h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-[240px]">
            Are you sure you want to log out of your dashboard session?
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 w-full mt-6">
            {/* CANCEL BUTTON */}
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>

            {/* CONFIRM LOGOUT BUTTON */}
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 px-4 bg-[#0F393B] hover:bg-[#0a2729] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
