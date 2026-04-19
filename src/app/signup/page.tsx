"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowRight } from "react-icons/hi2";
import { usePage } from "../_state/PageContext";

export default function SignupPage() {
  const router = useRouter();
  const { setFullData } = usePage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Username validation: lowercase, numbers, hyphens, underscores (1-50 chars)
  const usernameRegex = /^[a-z0-9_-]{1,50}$/;

  useEffect(() => {
    const checkUsername = async () => {
      if (!username) {
        setIsUsernameAvailable(null);
        return;
      }

      if (!usernameRegex.test(username)) {
        setIsUsernameAvailable(false);
        return;
      }

      setIsCheckingUsername(true);
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("username", username)
          .single();

        if (error && (error.code === "PGRST116" || error.message.includes("profiles' in the schema cache"))) {
          // PGRST116 means no rows found, so username is available
          // If table doesn't exist, we'll hit Step 5 later, but let's assume available
          setIsUsernameAvailable(true);
        } else if (data) {
          setIsUsernameAvailable(false);
        } else {
          setIsUsernameAvailable(true); 
        }
      } catch (err) {
        setIsUsernameAvailable(true);
      } finally {
        setIsCheckingUsername(false);
      }
    };

    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [username]);

  const translateError = (message: string) => {
    if (message.includes("User already registered")) return "An account with this email already exists.";
    if (message.includes("Password should be at least")) return "Your password needs to be at least 8 characters long.";
    if (message.includes("Invalid email")) return "Please enter a valid email address.";
    return message;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUsernameAvailable) return;

    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile record
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          username: username,
          display_name: username,
          is_published: false,
        });

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // We don't throw here because the user is technically signed up
        }

        // Restore pending work if it exists
        const pendingWork = sessionStorage.getItem("pending_work");
        if (pendingWork) {
          const { data: workData, action } = JSON.parse(pendingWork);
          
          // Update the username in the restored data to match their chosen one
          const updatedData = {
            ...workData,
            profile: { ...workData.profile, username: username }
          };

          if (action === "publish") {
            updatedData.isPublished = true;
          }

          setFullData(updatedData);
          sessionStorage.removeItem("pending_work");
        }
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(translateError(err.message || "Something went wrong during sign up. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F4] flex flex-col items-center justify-center p-6 selection:bg-[#E8735A]/20">
      <Link href="/" className="font-display text-3xl text-[#1A1A1A] tracking-tight mb-12">
        corner
      </Link>

      <div className="w-full max-w-[440px] bg-white rounded-[40px] p-10 md:p-12 shadow-2xl shadow-[#E8735A]/5 border border-[#E8E4DF] animate-fade-up">
        <h1 className="font-display text-4xl text-[#1A1A1A] mb-3 text-center">
          Create your account
        </h1>
        <p className="text-[#4A4A4A] text-center mb-10 leading-relaxed">
          Join thousands of creators and claim your unique corner of the internet.
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
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
            <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Create a password</label>
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

          <div className="space-y-2 pb-2">
            <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Choose your username</label>
            <div className="relative font-sans">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7A7A7A] font-medium">corner.link/</span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="username"
                className="w-full pl-[110px] pr-12 py-4 rounded-2xl border border-[#E8E4DF] focus:ring-2 focus:ring-[#E8735A] focus:border-transparent outline-none transition-all placeholder:text-[#7A7A7A]/50 font-medium"
                required
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                {isCheckingUsername ? (
                  <div className="w-5 h-5 border-2 border-[#E8735A]/30 border-t-[#E8735A] rounded-full animate-spin" />
                ) : username && (
                  isUsernameAvailable ? (
                    <HiOutlineCheckCircle className="text-[#5BA85B]" size={24} />
                  ) : (
                    <HiOutlineXCircle className="text-[#D94F4F]" size={24} />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2 ml-1">
              <p className="text-xs text-[#7A7A7A] font-sans">
                Your page will be at: <span className="text-[#1A1A1A] font-semibold">corner.link/{username || '[username]'}</span>
              </p>
              {username && isUsernameAvailable === false && !isCheckingUsername && (
                <p className="text-xs text-[#D94F4F] font-medium font-sans">This username is taken or contains invalid characters.</p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-[#D94F4F]/5 border border-[#D94F4F]/10 text-[#D94F4F] text-sm rounded-xl font-medium animate-fade-up font-sans">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isUsernameAvailable === false}
            className="w-full bg-[#E8735A] text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-[#E8735A]/20 hover:bg-[#E8735A]/90 hover:scale-[0.99] active:scale-[0.97] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:scale-100 disabled:pointer-events-none font-sans"
          >
            {loading ? "Creating account..." : "Get Started"}
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm font-medium text-[#7A7A7A] font-sans">
            Already have an account?{" "}
            <Link href="/login" className="text-[#E8735A] font-bold hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
