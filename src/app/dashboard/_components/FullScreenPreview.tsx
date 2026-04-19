"use client";

import React, { useState, useEffect } from "react";
import { usePage } from "../../_state/PageContext";
import { PhoneFrame } from "../../_components/PhoneFrame";
import { PublicPage } from "../../_components/PublicPage";
import { HiOutlineXMark, HiOutlineDevicePhoneMobile, HiOutlineGlobeAlt } from "react-icons/hi2";

interface FullScreenPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenPreview({ isOpen, onClose }: FullScreenPreviewProps) {
  const { data } = usePage();
  const [viewMode, setViewMode] = useState<"phone" | "desktop">("phone");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/60 backdrop-blur-xl animate-fade-up">
      {/* Top Bar */}
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex-1" />
        
        <div className="flex bg-white/10 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setViewMode("phone")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              viewMode === "phone" ? "bg-white text-text-primary shadow-sm" : "text-white opacity-60 hover:opacity-100"
            }`}
          >
            <HiOutlineDevicePhoneMobile size={18} />
            Phone
          </button>
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              viewMode === "desktop" ? "bg-white text-text-primary shadow-sm" : "text-white opacity-60 hover:opacity-100"
            }`}
          >
            <HiOutlineGlobeAlt size={18} />
            Desktop
          </button>
        </div>

        <div className="flex-1 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-text-primary font-semibold text-sm hover:bg-dashboard-bg transition-colors"
          >
            <HiOutlineXMark size={20} />
            Close
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-20 flex flex-col items-center">
        {viewMode === "phone" ? (
          <div className="my-auto py-8">
            <PhoneFrame innerWidth={390} innerHeight={780} scale={0.8}>
              <PublicPage 
                profile={data.profile}
                links={data.links}
                appearance={data.appearance}
                payments={data.payments}
                animate={false}
                interactive={false}
              />
            </PhoneFrame>
          </div>
        ) : (
          <div className="w-full max-w-[480px] my-auto py-8 bg-white/5 rounded-[40px] overflow-hidden shadow-2xl">
            <div className="h-[800px] overflow-y-auto hide-scrollbar">
              <PublicPage 
                profile={data.profile}
                links={data.links}
                appearance={data.appearance}
                payments={data.payments}
                animate={false}
                interactive={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
