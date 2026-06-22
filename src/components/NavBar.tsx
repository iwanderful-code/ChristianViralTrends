import { useTrends } from "../context/TrendsContext";
import { LogOut, Bell, Flame, Shield, Settings } from "lucide-react";

export default function NavBar() {
  const { activeTab, setActiveTab, user, logout, setIsSettingsOpen } = useTrends();

  return (
    <nav className="sticky top-0 z-40 bg-[#050505]/75 backdrop-blur-md border-b border-white/5 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab("landing")}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-violet-600/40 blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-black rounded-full p-2 border border-violet-500/30">
              <Bell className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <span className="font-heading text-lg md:text-xl font-bold tracking-wider bg-gradient-to-r from-white via-neutral-200 to-violet-400 bg-clip-text text-transparent uppercase">
            Christian Viral Trends
          </span>
        </div>

        {/* User Navigation Widget */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              {activeTab === "landing" && (
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className="bg-violet-600 hover:bg-violet-500 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Go to Console
                </button>
              )}

              <button
                onClick={() => setIsSettingsOpen(true)}
                title="API Key Settings"
                className="bg-neutral-900 border border-white/5 hover:border-violet-500/25 text-neutral-400 hover:text-white p-2 rounded-xl transition cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 bg-neutral-900/60 border border-white/5 rounded-full pl-3 pr-2 py-1">
                {/* Badge Icon */}
                {user.isAdmin ? (
                  <div className="flex items-center space-x-1.5 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
                    <Shield className="w-3 h-3 fill-amber-400/20" />
                    <span>Kingdom Admin</span>
                  </div>
                ) : user.tier === "enterprise" ? (
                  <div className="flex items-center space-x-1.5 text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-violet-500/20">
                    <Flame className="w-3 h-3 fill-violet-400/20" />
                    <span>Kingdom Suite</span>
                  </div>
                ) : user.tier === "pro" ? (
                  <div className="flex items-center space-x-1.5 text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-rose-500/20">
                    <span>Pro Minister</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5 text-neutral-400 bg-neutral-500/10 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-neutral-500/10">
                    <span>Free Observer</span>
                  </div>
                )}

                {/* Username */}
                <span className="hidden sm:inline text-sm font-medium text-neutral-300">
                  {user.username}
                </span>

                {/* Logout Button */}
                <button 
                  onClick={logout}
                  title="Log Out"
                  className="bg-neutral-800 hover:bg-rose-950/40 hover:border-rose-900/30 text-neutral-400 hover:text-rose-400 border border-white/5 p-1.5 rounded-full transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              {activeTab === "landing" && (
                <button
                  onClick={() => setActiveTab("auth")}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-violet-600 to-rose-600 blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-neutral-950 hover:bg-neutral-900 text-white border border-white/10 px-4 py-1.5 rounded-lg text-sm font-semibold transition duration-300">
                    Log In / Sign Up
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
