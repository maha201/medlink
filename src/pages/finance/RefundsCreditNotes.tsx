import React from "react";
import { RotateCcw, Plus } from "lucide-react";

export default function RefundsCreditNotes() {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-[#1a2632] flex items-center gap-1.5">
          <RotateCcw size={16} className="text-[#3a9898]" /> Approved Refunds &
          Credit Notes
        </h3>
        <button className="px-3.5 py-1.5 bg-[#3a9898] text-white text-xs font-bold rounded-full">
          + Issue Credit Note
        </button>
      </div>
      <div className="p-8 text-center bg-[#f5f7f8] rounded-2xl border border-[#dde5e7] text-xs text-[#8b9bae]">
        No active refund claims or credit notes recorded for the selected
        billing cycle.
      </div>
    </div>
  );
}
