import { useState } from "react";
import { useTrends } from "../context/TrendsContext";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function AuthInterface() {
  const { login, socialLogin, setActiveTab } = useTrends();
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  // Traditional login states (Temporary for Razorpay verification)
  const [username, setUsernameInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleTraditionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Slight artificial delay for loading state
    setTimeout(() => {
      try {
        login(username, password);
      } catch (err: any) {
        setError(err.message || "Failed to log in.");
        setSubmitting(false);
      }
    }, 800);
  };

  const handleSocialClick = (platform: string) => {
    setConnectingPlatform(platform);

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
          /* Social Auth Only View */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-extrabold text-white">
                Access Creator Console
              </h2>
              <p className="text-xs text-neutral-400">
                Sign in using your account credentials or sync via social.
              </p>
            </div>

            {/* Traditional Login Form */}
            <form onSubmit={handleTraditionalSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Username / Email</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-neutral-900 border border-white/5 rounded-xl p-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-violet-500/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-neutral-900 border border-white/5 rounded-xl p-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-violet-500/50"
                  required
                />
              </div>

              {error && (
                <div className="text-xs text-rose-500 font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-neutral-900 text-white border border-white/5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <hr className="w-full border-white/5" />
              <span className="absolute bg-neutral-950 px-3 text-[10px] text-neutral-500 uppercase tracking-widest">
                Connect via Social Sync
              </span>
            </div>

            {/* Social Logins */}
            <div className="flex flex-col space-y-3">
              {/* Google */}
              <button
                onClick={() => handleSocialClick("Google")}
                className="w-full bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 hover:border-violet-500/30 py-3 rounded-xl flex items-center justify-center text-sm font-semibold space-x-2 transition duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
              >
                <span className="font-extrabold text-red-500 text-base">G</span>
                <span>Connect via Google</span>
              </button>
              
              {/* X */}
              <button
                onClick={() => handleSocialClick("X")}
                className="w-full bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 hover:border-neutral-400/30 py-3 rounded-xl flex items-center justify-center text-sm font-semibold space-x-2 transition duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <span className="font-extrabold text-base">X</span>
                <span>Connect via X Corp</span>
              </button>
              
              {/* Facebook */}
              <button
                onClick={() => handleSocialClick("Facebook")}
                className="w-full bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 hover:border-blue-500/30 py-3 rounded-xl flex items-center justify-center text-sm font-semibold space-x-2 transition duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
              >
                <span className="font-extrabold text-blue-500 text-base">f</span>
                <span>Connect via Facebook</span>
              </button>
            </div>

            <div className="text-[10px] text-neutral-500 text-center leading-relaxed pt-2 border-t border-white/5">
              By connecting your account, you agree to secure synchronization of public metrics. We never post without permission.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
