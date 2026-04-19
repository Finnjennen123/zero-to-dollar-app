"use client";

import React from "react";
import { 
  HiOutlineLink, 
  HiOutlineUser, 
  HiOutlineSwatch, 
  HiOutlineCreditCard, 
  HiOutlineCog6Tooth 
} from "react-icons/hi2";

export type TabId = "links" | "profile" | "appearance" | "payments" | "account";

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: "links", label: "Links", icon: HiOutlineLink },
  { id: "profile", label: "Profile", icon: HiOutlineUser },
  { id: "appearance", label: "Appearance", icon: HiOutlineSwatch },
  { id: "payments", label: "Payments", icon: HiOutlineCreditCard },
  { id: "account", label: "Account", icon: HiOutlineCog6Tooth },
];

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] bg-white border-r border-border-base min-h-[calc(100vh-73px)] py-8 sticky top-[73px]">
        <nav className="flex flex-col gap-1 px-3">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${
                  isActive 
                    ? "bg-primary-coral/10 text-primary-coral border-l-4 border-primary-coral rounded-l-none" 
                    : "text-text-secondary hover:bg-dashboard-bg hover:text-text-primary"
                }`}
              >
                <Icon size={20} className={isActive ? "text-primary-coral" : "text-text-muted group-hover:text-text-primary"} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border-base flex items-center justify-around px-2 py-3">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1.5 px-3 py-1 transition-colors ${
                isActive ? "text-primary-coral" : "text-text-muted"
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
