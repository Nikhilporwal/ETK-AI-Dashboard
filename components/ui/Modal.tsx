"use client";
import { useGlobalContext } from "@/context/JobContext";
import { X } from "lucide-react";
import { useEffect } from "react";

export function GlobalModal() {
  const { modalConfig, closeModal } = useGlobalContext();

  // ESC key se close karne ke liye
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  if (!modalConfig.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={closeModal}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full overflow-hidden rounded-[24px] border-2 border-[#A5B4FC]/30 bg-white shadow-2xl animate-in zoom-in-95 duration-200 ${modalConfig.noPadding ? "max-w-3xl" : "max-w-lg"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-xl font-bold text-[#203E93]">
            {modalConfig.title || "Information"}
          </h3>
          <button
            onClick={closeModal}
            className="rounded-full p-1 hover:bg-slate-100 transition-colors text-slate-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Dynamic Content */}
        <div
          className={`${modalConfig.noPadding ? "" : "p-6"} overflow-y-auto`}
          style={{ maxHeight: "calc(85vh - 70px)" }} // Adjusting for header
        >
          {modalConfig.content}
        </div>
      </div>
    </div>
  );
}
