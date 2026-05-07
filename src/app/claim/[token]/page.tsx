"use client";

import React, { use, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { PageData } from "../../_state/PageContext";
import { PublicPage } from "../../_components/PublicPage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiSparkles } from "react-icons/hi2";

interface ClaimPageProps {
  params: Promise<{ token: string }>;
}

export default function ClaimPage({ params }: ClaimPageProps) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProspectPage = async () => {
      try {
        const { data, error } = await supabase
          .from("prospect_pages")
          .select("*")
          .eq("claim_token", token)
          .single();

        if (error || !data) {
          setError("This link is invalid or has already been claimed.");
          return;
        }

        if (data.is_claimed) {
          setError("This page has already been claimed.");
          return;
        }

        setPageData(data.full_data as PageData);
      } catch (err) {
        console.error("Error fetching prospect page:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProspectPage();
  }, [token]);

  const handleClaim = () => {
    if (!pageData) return;

    // 1. Save data to localStorage so dashboard can pick it up
    localStorage.setItem("claimed_draft", JSON.stringify(pageData));
    localStorage.setItem("claiming_token", token);

    // 2. Redirect to dashboard
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-coral/20 border-t-primary-coral rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl text-text-primary mb-4">
          Oops!
        </h1>
        <p className="text-text-secondary mb-8 max-w-md">
          {error}
        </p>
        <Link href="/" className="bg-primary-coral text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary-coral/20 transition-transform hover:scale-105">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pb-32">
      <PublicPage 
        profile={pageData.profile}
        links={pageData.links}
        appearance={pageData.appearance}
        payments={pageData.payments}
        animate={true}
        interactive={true}
      />
      
      {/* Sticky Claim CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-[100] flex justify-center pointer-events-none">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-primary-coral/20 rounded-3xl p-6 shadow-2xl shadow-primary-coral/10 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-coral/10 flex items-center justify-center text-primary-coral">
              <HiSparkles size={24} />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">I built this for you!</h3>
              <p className="text-sm text-text-secondary">Claim this page to start editing it.</p>
            </div>
          </div>
          
          <button 
            onClick={handleClaim}
            className="w-full md:w-auto bg-primary-coral text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary-coral/20 transition-all hover:scale-[1.02] hover:bg-primary-coral-hover active:scale-[0.98]"
          >
            Edit this page
          </button>
        </div>
      </div>
    </div>
  );
}
