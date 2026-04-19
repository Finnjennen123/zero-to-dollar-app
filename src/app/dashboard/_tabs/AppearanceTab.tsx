"use client";

import React, { useRef } from "react";
import { usePage } from "../../_state/PageContext";
import { BACKGROUND_PRESETS } from "../../_lib/backgrounds";
import { THEMES } from "../../_lib/themes";
import { HiOutlinePlus, HiOutlinePhoto } from "react-icons/hi2";

export function AppearanceTab() {
  const { data, setAppearance } = usePage();
  const bgUploadRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAppearance({ 
        backgroundId: "custom-image", 
        customBg: reader.result as string 
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-[640px] px-2 py-4 pb-32">
      <div className="mb-8">
        <h1 className="font-display text-3xl mb-2 text-text-primary tracking-tight">Appearance</h1>
        <p className="text-text-muted text-sm leading-relaxed">
          Customize the look and feel of your page.
        </p>
      </div>

      <div className="space-y-12">
        {/* Background Section */}
        <section>
          <h3 className="text-sm font-bold text-text-primary px-1 mb-6">Choose Background</h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
            {BACKGROUND_PRESETS.map((bg) => {
              const isSelected = data.appearance.backgroundId === bg.id;
              return (
                <button
                  key={bg.id}
                  onClick={() => setAppearance({ backgroundId: bg.id })}
                  className="group relative flex flex-col items-center gap-2"
                >
                  <div 
                    style={{ background: bg.value }}
                    className={`w-full aspect-square rounded-2xl shadow-sm transition-all group-hover:scale-105 ${
                      isSelected ? "ring-2 ring-primary-coral ring-offset-2" : "border border-border-base"
                    }`}
                  />
                  <span className={`text-[10px] font-bold uppercase tracking-wider text-center ${
                    isSelected ? "text-primary-coral" : "text-text-muted"
                  }`}>
                    {bg.name}
                  </span>
                </button>
              );
            })}

            {/* Upload Custom */}
            <button
              onClick={() => bgUploadRef.current?.click()}
              className="group relative flex flex-col items-center gap-2"
            >
              <div 
                className={`w-full aspect-square rounded-2xl bg-dashboard-bg border border-dashed border-border-base flex flex-col items-center justify-center transition-all group-hover:scale-105 group-hover:bg-white group-hover:border-primary-coral/30 ${
                  data.appearance.backgroundId === "custom-image" ? "ring-2 ring-primary-coral ring-offset-2" : ""
                }`}
              >
                {data.appearance.backgroundId === "custom-image" && data.appearance.customBg && !data.appearance.customBg.startsWith('#') ? (
                  <img src={data.appearance.customBg} className="w-full h-full object-cover rounded-2xl" alt="Custom" />
                ) : (
                  <HiOutlinePhoto size={24} className="text-text-muted opacity-40" />
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted text-center leading-tight">
                Upload Own
              </span>
              <input 
                type="file" 
                ref={bgUploadRef} 
                onChange={handleBgUpload}
                accept="image/*"
                className="hidden" 
              />
            </button>

            {/* Solid Color */}
            <div className="group relative flex flex-col items-center gap-2">
              <div 
                className={`w-full aspect-square rounded-2xl bg-white border border-border-base flex items-center justify-center overflow-hidden transition-all group-hover:scale-105 ${
                  data.appearance.backgroundId === "solid" ? "ring-2 ring-primary-coral ring-offset-2" : ""
                }`}
              >
                <input 
                  type="color" 
                  value={data.appearance.backgroundId === "solid" ? data.appearance.customBg || "#FFFFFF" : "#FFFFFF"}
                  onChange={(e) => setAppearance({ backgroundId: "solid", customBg: e.target.value })}
                  className="w-[150%] h-[150%] cursor-pointer border-none p-0 bg-transparent"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted text-center leading-tight">
                Solid Color
              </span>
            </div>
          </div>
        </section>

        {/* Color Theme Section */}
        <section>
          <h3 className="text-sm font-bold text-text-primary px-1 mb-6">Color Theme</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {THEMES.map((theme) => {
              const isSelected = data.appearance.themeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setAppearance({ themeId: theme.id })}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                    isSelected 
                      ? "bg-primary-coral border-primary-coral text-white shadow-lg shadow-primary-coral/20" 
                      : "bg-white border-border-base text-text-primary hover:bg-dashboard-bg"
                  }`}
                  style={isSelected ? { backgroundColor: theme.accent, borderColor: theme.accent } : {}}
                >
                  <div 
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span className="text-sm font-bold truncate">{theme.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
