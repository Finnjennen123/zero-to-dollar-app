"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { HiOutlineArrowRight, HiOutlineInformationCircle, HiOutlineCheckCircle } from "react-icons/hi2";
import { useToast, ToastProvider } from "../_components/Toast";

function ResetPasswordForm() {
  const router = useRouter();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setShowForm(true);
      } else if (event === "SIGNED_IN" && session) {
        // If the user is already signed in (from the link), show the form
        setShowForm(true);
      }
    });

    // Check if we already have a session (sometimes event fires before listener)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setShowForm(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const translateError = (message: string) => {
    if (message.includes("Password should be at least")) return "Your new password needs to be at least 8 characters long.";
    return message;
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      toast.show("Password updated. You're now logged in.");
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(translateError(err.message || "Failed to update password. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-[#E8735A]/30 border-t-[#E8735A] rounded-full animate-spin mb-6" />
        <h1 className="font-display text-2xl text-[#1A1A1A] mb-2">Verifying your link...</h1>
        <p className="text-[#7A7A7A] font-sans">One moment while we secure your connection.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] bg-white rounded-[40px] p-10 md:p-12 shadow-2xl shadow-[#E8735A]/5 border border-[#E8E4DF] animate-fade-up">
      <h1 className="font-display text-4xl text-[#1A1A1A] mb-3 text-center">
        Set new password
      </h1>
      <p className="text-[#4A4A4A] text-center mb-10 leading-relaxed font-sans">
        Choose a strong password for your corner of the internet.
      </p>

      <form onSubmit={handleReset} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1A1A1A] ml-1">New password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="w-full px-5 py-4 rounded-2xl border border-[#E8E4DF] focus:ring-2 focus:ring-[#E8735A] focus:border-transparent outline-none transition-all placeholder:text-[#7A7A7A]/50 font-sans"
            required
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Confirm password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="w-full px-5 py-4 rounded-2xl border border-[#E8E4DF] focus:ring-2 focus:ring-[#E8735A] focus:border-transparent outline-none transition-all placeholder:text-[#7A7A7A]/50 font-sans"
            required
            minLength={8}
          />
        </div>

        {error && (
          <div className="p-4 bg-[#D94F4F]/5 border border-[#D94F4F]/10 text-[#D94F4F] text-sm rounded-xl font-medium flex gap-3 animate-fade-up font-sans">
            <HiOutlineInformationCircle className="shrink-0 mt-0.5" size={18} />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E8735A] text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-[#E8735A]/20 hover:bg-[#E8735A]/90 hover:scale-[0.99] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 font-sans"
        >
          {loading ? "Updating..." : "Update password"}
          <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#FBF8F4] flex flex-col items-center justify-center p-6 selection:bg-[#E8735A]/20">
        <Link href="/" className="font-display text-3xl text-[#1A1A1A] tracking-tight mb-12">
          corner
        </Link>
        <ResetPasswordForm />
      </div>
    </ToastProvider>
  );
}
