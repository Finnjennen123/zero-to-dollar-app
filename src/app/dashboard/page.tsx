"use client";

import React, { useState } from "react";
import { ToastProvider } from "../_components/Toast";
import { DashboardHeader } from "./_components/DashboardHeader";
import { Sidebar, TabId } from "./_components/Sidebar";
import { PreviewPanel } from "./_components/PreviewPanel";
import { FullScreenPreview } from "./_components/FullScreenPreview";

// Tabs
import { LinksTab } from "./_tabs/LinksTab";
import { ProfileTab } from "./_tabs/ProfileTab";
import { AppearanceTab } from "./_tabs/AppearanceTab";
import { PaymentsTab } from "./_tabs/PaymentsTab";
import { AccountTab } from "./_tabs/AccountTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("links");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "links": return <LinksTab />;
      case "profile": return <ProfileTab />;
      case "appearance": return <AppearanceTab />;
      case "payments": return <PaymentsTab />;
      case "account": return <AccountTab />;
      default: return <LinksTab />;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <DashboardHeader onPreviewClick={() => setIsPreviewOpen(true)} />
        
        <div className="flex-1 flex flex-col md:flex-row">
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          <main className="flex-1 flex flex-col items-center bg-dashboard-bg/30">
            <div className="w-full h-full flex flex-col items-center px-4 md:px-8 py-8 md:py-12">
              {renderTab()}
            </div>
          </main>

          <PreviewPanel />
        </div>

        <FullScreenPreview 
          isOpen={isPreviewOpen} 
          onClose={() => setIsPreviewOpen(false)} 
        />
      </div>
    </ToastProvider>
  );
}
