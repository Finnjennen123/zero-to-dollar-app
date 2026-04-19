"use client";

import React from "react";
import { usePage } from "../../_state/PageContext";
import { PhoneFrame } from "../../_components/PhoneFrame";
import { PublicPage } from "../../_components/PublicPage";

export function PreviewPanel() {
  const { data } = usePage();

  return (
    <aside className="hidden lg:flex flex-col items-center justify-center flex-1 min-h-[calc(100vh-73px)] sticky top-[73px] bg-dashboard-bg/50 px-8">
      <div className="relative w-full flex items-center justify-center">
        <PhoneFrame innerWidth={320} innerHeight={640} scale={0.85}>
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
      
      <p className="mt-8 text-xs font-medium text-text-muted uppercase tracking-widest opacity-60">
        Live Preview
      </p>
    </aside>
  );
}
