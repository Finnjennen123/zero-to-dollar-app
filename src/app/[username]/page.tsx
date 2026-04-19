"use client";

import React, { use } from "react";
import { usePage } from "../_state/PageContext";
import { EXAMPLES } from "../_lib/examples";
import { PublicPage } from "../_components/PublicPage";
import Link from "next/link";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function UserPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { data } = usePage();
  const username = resolvedParams.username.toLowerCase();

  // 1. Check if the current dashboard state matches the username
  // 2. Otherwise check if it matches one of our examples
  // 3. Fallback to a "Not Found" or the dashboard data for demo purposes

  let pageData = data;
  
  if (data.profile.username.toLowerCase() !== username) {
    const example = EXAMPLES.find(e => e.profile.username.toLowerCase() === username);
    if (example) {
      pageData = example;
    }
  }

  // If even then it doesn't match and it's not a known username, 
  // we could show a 404, but for this demo build let's just show the pageData
  // so the link always "works".

  return (
    <div className="min-h-screen">
      <PublicPage 
        profile={pageData.profile}
        links={pageData.links}
        appearance={pageData.appearance}
        payments={pageData.payments}
        animate={true}
        interactive={true}
      />
      
      {/* Small floating "Create your own" label for demo */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <Link 
          href="/"
          className="bg-white/80 backdrop-blur-md border border-border-base px-4 py-2 rounded-full text-xs font-bold text-text-primary shadow-lg hover:bg-white transition-all flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-primary-coral animate-pulse" />
          Create your own corner
        </Link>
      </div>
    </div>
  );
}
