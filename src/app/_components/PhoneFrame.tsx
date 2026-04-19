"use client";

import React, { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  innerWidth?: number;
  innerHeight?: number;
  scale?: number;
}

export function PhoneFrame({
  children,
  innerWidth = 390,
  innerHeight = 780,
  scale = 1,
}: PhoneFrameProps) {
  return (
    <div
      style={{
        width: (innerWidth + 24) * scale,
        height: (innerHeight + 24) * scale,
      }}
      className="relative flex items-center justify-center transition-all duration-300"
    >
      <div
        style={{
          width: innerWidth + 24,
          height: innerHeight + 24,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="absolute bg-[#1A1A1A] rounded-[48px] p-3 shadow-2xl overflow-hidden pointer-events-none"
      >
        {/* Dynamic Island */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-between px-4">
          <div className="w-1.5 h-1.5 bg-[#1F1F1F] rounded-full" />
          <div className="w-1 h-1 bg-[#0A0A0A] rounded-full" />
        </div>

        {/* Inner Screen */}
        <div className="w-full h-full bg-white rounded-[36px] overflow-hidden flex flex-col pointer-events-auto">
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
