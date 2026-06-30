import { useState } from "react";
import { useTrends } from "../context/TrendsContext";
import { BarChart3, PenTool, TrendingUp, Menu, X, Pin, PinOff, Heart, Shield, Flame, Gem } from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const { dashboardView, setDashboardView, watchlist, toggleWatchlist, user, openCheckout } = useTrends();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Helper to resolve trend item mock lookups for watchlist
  const handleRemoveWatchItem = (e: React.MouseEvent, trendId: string) => {
    e.stopPropagation();
    // Simulate a TrendItem structure for removal
    toggleWatchlist({ id: trendId } as any);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] gap-6">
      {/* Sidebar - Collapsible drawer */}
      <div 
        className={`${
          sidebarOpen ? "translate-x-0 w-full lg:w-64" : "-translate-x-full w-0 lg:w-16 overflow-hidden"
        } transition-all duration-300 bg-neutral-950/40 border border-white/5 rounded-2xl flex flex-col p-6 space-y-6 shrink-0 relative lg:translate-x-0`}
      >
        {/* Collapse Button for desktop */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 bg-neutral-900 border border-white/10 hover:border-violet-500/40 p-1 rounded-full text-neutral-400 hover:text-white hidden lg:flex cursor-pointer shadow-md"
        >
          {sidebarOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        </button>

        {/* Navigation Sidebar Controls */}
        <div className="space-y-2">
          <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider mb-2">Console Controls</div>
          <button
            onClick={() => setDashboardView("cockpit")}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
              dashboardView === "cockpit" 
                ? "bg-violet-600/10 border border-violet-500/20 text-violet-400" 
                : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <BarChart3 className="w-4.5 h-4.5" />
            {sidebarOpen && <span>Analytics Cockpit</span>}
          </button>

          <button
            onClick={() => setDashboardView("generator")}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
              dashboardView === "generator" 
                ? "bg-rose-600/10 border border-rose-500/20 text-rose-400" 
                : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <PenTool className="w-4.5 h-4.5" />
            {sidebarOpen && <span>Viral Idea Gen</span>}
          </button>

          <button
            onClick={() => setDashboardView("simulator")}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
              dashboardView === "simulator" 
                ? "bg-amber-600/10 border border-amber-500/20 text-amber-400" 
                : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <TrendingUp className="w-4.5 h-4.5" />
            {sidebarOpen && <span>Campaign Simulator</span>}
          </button>
        </div>

        {/* Pinned Trends Watchlist */}
        {sidebarOpen && (
          <div className="flex-1 flex flex-col min-h-[220px]">
            <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider mb-3 flex items-center space-x-1">
              <Pin className="w-3 h-3 text-violet-400" />
              <span>Pinned Watchlist</span>
            </div>
            
            <div className="flex-1 overflow-y-auto max-h-[300px] border border-white/5 rounded-xl p-3 bg-neutral-950/70 space-y-2 select-none custom-scrollbar">
              {watchlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-8 text-center text-xs text-neutral-600">
                  <Heart className="w-8 h-8 stroke-1 text-neutral-700 mb-2" />
                  <span>No trends pinned. Click bookmark on trend cards to pin.</span>
                </div>
              ) : (
                watchlist.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between bg-neutral-900/60 hover:bg-neutral-850 border border-white/5 p-2 rounded-lg text-xs group"
                  >
                    <div className="overflow-hidden pr-2">
                      <div className="font-semibold text-white truncate">{item.title}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.category}</div>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className="text-[10px] font-bold text-rose-400">{item.momentum}</span>
                      <button
                        onClick={(e) => handleRemoveWatchItem(e, item.trendId)}
                        title="Unpin"
                        className="text-neutral-500 hover:text-rose-400 p-0.5 rounded cursor-pointer"
                      >
                        <PinOff className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Profile Card */}
        {sidebarOpen && user && (
          <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-4 flex items-center space-x-3">
            <div className="relative">
              {user.isAdmin ? (
                <div 
                  onClick={() => openCheckout("enterprise")}
                  className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)] cursor-pointer hover:bg-amber-500/20 transition-all"
                  title="Open Secure Checkout"
                >
                  <Shield className="w-5 h-5 fill-amber-400/20" />
                </div>
              ) : user.tier === "enterprise" ? (
                <div className="bg-violet-500/10 border border-violet-500/30 p-2.5 rounded-xl text-violet-400">
                  <Gem className="w-5 h-5 fill-violet-400/20" />
                </div>
              ) : (
                <div className="bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-xl text-rose-400">
                  <Flame className="w-5 h-5 fill-rose-400/20" />
                </div>
              )}
            </div>
            
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white truncate">{user.username}</div>
              <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider truncate">
                {user.isAdmin ? "Kingdom Admin" : `${user.tier} Node`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Viewport */}
      <div className="flex-1 bg-neutral-950/40 border border-white/5 rounded-2xl p-6 lg:p-8 backdrop-blur-sm relative overflow-hidden min-h-[500px]">
        {children}
      </div>
    </div>
  );
}
