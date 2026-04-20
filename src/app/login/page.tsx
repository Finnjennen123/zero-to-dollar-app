"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { HiOutlineArrowRight, HiOutlineInformationCircle } from "react-icons/hi2";
import { usePage } from "../_state/PageContext";
import { getURL } from "../_lib/urls";

export default function LoginPage() {
  const router = useRouter();
  const { setFullData } = usePage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const translateError = (message: string) => {
    if (message.includes("Invalid login credentials") || message.includes("Invalid credentials")) {
      return "Wrong email or password. Please try again.";
    }
    if (message.includes("Email not confirmed")) {
      return "Please confirm your email address before logging in.";
    }
    return message;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Restore pending work if it exists
        const pendingWork = sessionStorage.getItem("pending_work");
        if (pendingWork) {
          const { data: workData, action } = JSON.parse(pendingWork);
          
          if (action === "publish") {
            workData.isPublished = true;
          }

          setFullData(workData);
          sessionStorage.removeItem("pending_work");
        }
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(translateError(err.message || "Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getURL()}/reset-password`,
      });

      if (resetError) throw resetError;
      setResetSent(true);
    } catch (err: any) {
      setError(translateError(err.message || "We couldn't send the reset link. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-[#FBF8F4] flex flex-col items-center justify-center p-6 selection:bg-[#E8735A]/20">
        <Link href="/" className="font-display text-3xl text-[#1A1A1A] tracking-tight mb-12">
          corner
        </Link>

        <div className="w-full max-w-[440px] bg-white rounded-[40px] p-10 md:p-12 shadow-2xl shadow-[#E8735A]/5 border border-[#E8E4DF] animate-fade-up">
          <h1 className="font-display text-4xl text-[#1A1A1A] mb-3 text-center">
            Reset password
          </h1>
          <p className="text-[#4A4A4A] text-center mb-10 leading-relaxed font-sans">
            {resetSent 
              ? "We've sent a special link to your email to help you get back into your account." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>

          {!resetSent ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Email address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-5 py-4 rounded-2xl border border-[#E8E4DF] focus:ring-2 focus:ring-[#E8735A] focus:border-transparent outline-none transition-all placeholder:text-[#7A7A7A]/50 font-sans"
                  required
                />
              </div>

              {error && (
                <div className="p-4 bg-[#D94F4F]/5 border border-[#D94F4F]/10 text-[#D94F4F] text-sm rounded-xl font-medium flex gap-3 font-sans">
                  <HiOutlineInformationCircle className="shrink-0 mt-0.5" size={18} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E8735A] text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-[#E8735A]/20 hover:bg-[#E8735A]/90 hover:scale-[0.99] active:scale-[0.97] transition-all disabled:opacity-50 font-sans"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>

              <button 
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="w-full text-sm font-bold text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors font-sans"
              >
                Back to log in
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-[#5BA85B]/5 border border-[#5BA85B]/10 text-[#5BA85B] text-sm rounded-xl font-medium text-center font-sans">
                Check your email for the reset link!
              </div>
              <button 
                type="button"
                onClick={() => { setIsForgotPassword(false); setResetSent(false); }}
                className="w-full bg-[#1A1A1A] text-white py-5 rounded-[24px] font-bold text-lg hover:opacity-90 transition-all font-sans"
              >
                Return to log in
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F4] flex flex-col items-center justify-center p-6 selection:bg-[#E8735A]/20">
      <Link href="/" className="font-display text-3xl text-[#1A1A1A] tracking-tight mb-12">
        corner
      </Link>

      <div className="w-full max-w-[440px] bg-white rounded-[40px] p-10 md:p-12 shadow-2xl shadow-[#E8735A]/5 border border-[#E8E4DF] animate-fade-up">
        <h1 className="font-display text-4xl text-[#1A1A1A] mb-3 text-center">
          Welcome back
        </h1>
        <p className="text-[#4A4A4A] text-center mb-10 leading-relaxed font-sans">
          Log in to your account and continue building your corner of the internet.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maya@example.com"
              className="w-full px-5 py-4 rounded-2xl border border-[#E8E4DF] focus:ring-2 focus:ring-[#E8735A] focus:border-transparent outline-none transition-all placeholder:text-[#7A7A7A]/50 font-sans"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-[#1A1A1A]">Password</label>
              <button 
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-xs font-bold text-[#E8735A] hover:underline font-sans"
              >
                Forgot password?
              </button>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-5 py-4 rounded-2xl border border-[#E8E4DF] focus:ring-2 focus:ring-[#E8735A] focus:border-transparent outline-none transition-all placeholder:text-[#7A7A7A]/50 font-sans"
              required
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
            className="w-full bg-[#E8735A] text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-[#E8735A]/20 hover:bg-[#E8735A]/90 hover:scale-[0.99] active:scale-[0.97] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 font-sans"
          >
            {loading ? "Logging in..." : "Log in"}
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm font-medium text-[#7A7A7A] font-sans">
            New here?{" "}
            <Link href="/signup" className="text-[#E8735A] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
