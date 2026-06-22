import React, { useState } from "react";
import { useTrends } from "../context/TrendsContext";
import { ArrowLeft, Mail, Lock, Loader2, Sparkles } from "lucide-react";

export default function AuthInterface() {
  const { login, signUp, socialLogin, setActiveTab } = useTrends();
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const selectedTier = (localStorage.getItem("selected_signup_tier") || "free") as "free" | "pro" | "enterprise";
  
  // Social login connecting animation state
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      if (email.trim().toLowerCase() === "iwanderful@gmail.com") {
        // Special admin access!
        login(email, password);
        return;
      }

      if (isSignUp) {
        const directDashboard = signUp(email, email, password, selectedTier);
        if (directDashboard) {
          localStorage.removeItem("selected_signup_tier");
        }
      } else {
        login(email, password);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const handleSocialClick = (platform: string) => {
    setConnectingPlatform(platform);
    setError("");

    // Simulate connection delay
    setTimeout(() => {
      socialLogin(platform);
      setConnectingPlatform(null);
    }, 1800);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-6">
      <div className="bg-neutral-950/60 border border-white/5 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
        {/* Glow border element */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-rose-600 to-amber-500"></div>

        {/* Back Button */}
        <button
          onClick={() => {
            localStorage.removeItem("selected_signup_tier");
            setActiveTab("landing");
          }}
          className="flex items-center space-x-1 text-xs text-neutral-500 hover:text-white transition duration-200 mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing</span>
        </button>

        {connectingPlatform ? (
          /* Connecting Loading Screen */
          <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-violet-600/20 blur animate-pulse"></div>
              <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-white">Connecting Platform</h3>
              <p className="text-neutral-400 text-sm">
                Authorizing credentials with <span className="text-violet-400 font-semibold">{connectingPlatform}</span> secure gateway...
              </p>
            </div>
          </div>
        ) : (
          /* Normal Auth Forms */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-extrabold text-white">
                {isSignUp ? "Deploy Creator Node" : "Welcome Back"}
              </h2>
              <p className="text-xs text-neutral-400">
                {isSignUp 
                  ? "Access the digital cockpit for faith metrics." 
                  : "Sync your dashboards and watchlist bookmarks."}
              </p>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-4 py-2.5 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400 font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. believer@faith.net"
                    className="w-full bg-neutral-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 transition duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-600" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500/50 transition duration-200"
                  />
                </div>
              </div>

              {email.trim().toLowerCase() === "iwanderful@gmail.com" && (
                <div className="flex items-center space-x-2 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl text-xs">
                  <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>Admin Bypass detected! Bypass payment forms and activate Kingdom Suite instantly.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-violet-600/20 transition duration-200 mt-2 cursor-pointer"
              >
                {isSignUp ? "Create Secure Account" : "Access Console"}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <hr className="w-full border-white/5" />
              <span className="absolute bg-neutral-950 px-3 text-[10px] text-neutral-600 uppercase tracking-widest">
                Or Sync Social Media
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <button
                onClick={() => handleSocialClick("Google")}
                className="bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 hover:border-violet-500/30 p-2.5 rounded-xl flex items-center justify-center text-xs font-semibold space-x-1.5 transition duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
              >
                <span className="font-bold text-red-500">G</span>
                <span className="hidden sm:inline">Google</span>
              </button>
              
              {/* X */}
              <button
                onClick={() => handleSocialClick("X")}
                className="bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 hover:border-neutral-400/30 p-2.5 rounded-xl flex items-center justify-center text-xs font-semibold space-x-1.5 transition duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <span className="font-bold">X</span>
                <span className="hidden sm:inline">X Corp</span>
              </button>
              
              {/* Facebook */}
              <button
                onClick={() => handleSocialClick("Facebook")}
                className="bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 hover:border-blue-500/30 p-2.5 rounded-xl flex items-center justify-center text-xs font-semibold space-x-1.5 transition duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
              >
                <span className="font-bold text-blue-500">f</span>
                <span className="hidden sm:inline">Facebook</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setError("");
                  setIsSignUp(!isSignUp);
                }}
                className="text-xs text-neutral-500 hover:text-violet-400 transition cursor-pointer"
              >
                {isSignUp 
                  ? "Already have a node? Switch to Log In" 
                  : "Need an account? Switch to Sign Up"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
