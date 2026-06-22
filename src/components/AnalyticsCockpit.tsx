import { useState, useEffect } from "react";
import { useTrends } from "../context/TrendsContext";
import { MOCK_PLATFORM_TOP10 } from "../utils/mockData";
import { TrendCategory, TrendItem, PlatformType } from "../types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Lock, Bookmark, Clock, RefreshCw, X, Sparkles, Smile, Frown } from "lucide-react";

export default function AnalyticsCockpit() {
  const { 
    user, 
    watchlist, 
    toggleWatchlist, 
    openCheckout, 
    remainingPreviewTime, 
    startPreviewTimer, 
    pausePreviewTimer,
    liveTrends
  } = useTrends();

  const [activeCategory, setActiveCategory] = useState<TrendCategory | "top10">("social");
  const [selectedTrend, setSelectedTrend] = useState<TrendItem | null>(null);
  const [activePlatform, setActivePlatform] = useState<PlatformType>("tiktok");

  // Activate timer if viewing Top 10 Channels and tier is free
  useEffect(() => {
    if (activeCategory === "top10") {
      startPreviewTimer();
    } else {
      pausePreviewTimer();
    }
    return () => pausePreviewTimer();
  }, [activeCategory]);

  // Pricing permissions gating checks
  const isCategoryLocked = (category: TrendCategory) => {
    if (!user) return ["politics", "denominations", "churches", "pastors", "products", "events", "issues"].includes(category);
    if (user.isAdmin) return false;
    
    if (user.tier === "free") {
      return ["products", "events", "issues", "politics", "denominations", "churches", "pastors"].includes(category);
    }
    if (user.tier === "pro") {
      return ["politics", "denominations", "churches", "pastors"].includes(category);
    }
    return false; // enterprise is fully unlocked
  };

  const getRequiredTier = (category: TrendCategory): "pro" | "enterprise" => {
    if (["products", "events", "issues"].includes(category)) return "pro";
    return "enterprise";
  };

  const handleLockedClick = (category: TrendCategory) => {
    const required = getRequiredTier(category);
    openCheckout(required);
  };

  // Timer parsing helper
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isTimerExpired = remainingPreviewTime <= 0 && (user?.tier === "free" || !user);

  // Filter trends based on category
  const filteredTrends = liveTrends.filter(t => t.category === activeCategory);

  // Recharts formatters
  const chartData = filteredTrends.map((trend) => ({
    name: trend.title,
    volume: parseFloat(trend.volume.replace(/[^\d.]/g, "")) * (trend.volume.includes("M") ? 1000 : 1),
    sentiment: trend.sentiment
  }));

  const getTrendDataForChart = (trend: TrendItem) => {
    return trend.history.map((val, idx) => ({
      day: `Day ${idx + 1}`,
      volume: val
    }));
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs list */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {(["social", "creators", "products", "events", "issues", "politics", "denominations", "churches", "pastors"] as TrendCategory[]).map((cat) => {
          const locked = isCategoryLocked(cat);
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer border ${
                activeCategory === cat
                  ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/20"
                  : "bg-neutral-900 border-transparent text-neutral-400 hover:text-white"
              }`}
            >
              <span>{cat}</span>
              {locked && <Lock className="w-3 h-3 text-amber-500 shrink-0 ml-1" />}
            </button>
          );
        })}

        <button
          onClick={() => setActiveCategory("top10")}
          className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer border ${
            activeCategory === "top10"
              ? "bg-gradient-to-r from-violet-600 to-rose-600 border-transparent text-white shadow-lg"
              : "bg-neutral-900 border-transparent text-amber-400 hover:text-amber-300"
          }`}
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>Top 10 Channels</span>
          {activeCategory !== "top10" && (user?.tier === "free" || !user) && (
            <Clock className="w-3 h-3 text-amber-500 ml-1" />
          )}
        </button>
      </div>

      {/* Main Viewport Content */}
      {activeCategory === "top10" ? (
        /* TOP 10 LEADERBOARD VIEW */
        <div className="space-y-6">
          {/* Free preview timer banner */}
          {(user?.tier === "free" || !user) && (
            <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
              isTimerExpired 
                ? "bg-rose-950/20 border-rose-900/30 text-rose-300" 
                : "bg-amber-950/20 border-amber-900/30 text-amber-300 animate-pulse"
            }`}>
              <div className="flex items-center space-x-3 text-center md:text-left">
                <Clock className="w-5 h-5 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">Free Platform Preview Interval</div>
                  <div className="text-[11px] opacity-80">
                    {isTimerExpired 
                      ? "Your 90-second observer trial has run out. Upgrade to unlock unrestricted platform tables."
                      : "You are currently utilizing your daily preview credits. Table blurs soon!"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-heading text-lg font-black tracking-widest bg-black/60 px-3 py-1 rounded border border-white/5">
                  {formatTime(remainingPreviewTime)}
                </span>
                {isTimerExpired && (
                  <button
                    onClick={() => openCheckout("pro")}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition uppercase tracking-wider cursor-pointer shadow-lg shadow-rose-600/20"
                  >
                    Upgrade for Unlimited
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Sub Platform Tabs */}
          <div className="flex space-x-2 border-b border-white/5 pb-2">
            {(["tiktok", "instagram", "youtube", "facebook", "x"] as PlatformType[]).map((platform) => (
              <button
                key={platform}
                onClick={() => !isTimerExpired && setActivePlatform(platform)}
                disabled={isTimerExpired}
                className={`px-3 py-1 text-xs font-bold rounded-lg uppercase transition cursor-pointer ${
                  activePlatform === platform && !isTimerExpired
                    ? "bg-neutral-800 text-white border border-white/10"
                    : "text-neutral-500 hover:text-neutral-300"
                } disabled:cursor-not-allowed`}
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Leaderboard Table */}
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-neutral-950/60">
            <div className={`overflow-x-auto ${isTimerExpired ? "blur-md select-none pointer-events-none" : ""}`}>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-neutral-900/40 text-neutral-500 uppercase tracking-widest text-[10px]">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Handle</th>
                    <th className="py-3 px-4">Platform Name</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4 text-right">Weekly Growth</th>
                    <th className="py-3 px-4">Preview content</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_PLATFORM_TOP10
                    .filter((item) => item.platform === activePlatform)
                    .map((item) => (
                      <tr key={`${item.platform}_${item.rank}`} className="hover:bg-white/2 cursor-default transition">
                        <td className="py-3 px-4 font-heading font-black">
                          {item.rank === 1 ? (
                            <span className="text-amber-500 flex items-center space-x-1">
                              <span>#1</span>
                            </span>
                          ) : (
                            <span className="text-neutral-400">#{item.rank}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-violet-400">{item.handle}</td>
                        <td className="py-3 px-4 font-semibold text-white">{item.name}</td>
                        <td className="py-3 px-4 font-mono font-bold text-neutral-300">{item.score}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">{item.growth}</td>
                        <td className="py-3 px-4 text-neutral-400 italic font-sans max-w-xs truncate">{item.contentPreview}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Lock Cover for expired Timer */}
            {isTimerExpired && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-sm z-10">
                <Lock className="w-10 h-10 text-amber-500 mb-3 animate-pulse" />
                <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider">Observer Preview Expired</h4>
                <p className="text-xs text-neutral-400 max-w-xs mt-1 mb-4">
                  Deploy a Pro Minister node to secure continuous access to all channels leaderboards.
                </p>
                <button
                  onClick={() => openCheckout("pro")}
                  className="bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-500 hover:to-rose-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition uppercase tracking-wider cursor-pointer shadow-lg"
                >
                  Unlock Platform Charts
                </button>
              </div>
            )}
          </div>
        </div>
      ) : isCategoryLocked(activeCategory as TrendCategory) ? (
        /* GATED PLAN VIEW SCREEN */
        <div className="border border-white/5 bg-neutral-950/80 rounded-2xl p-8 py-16 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500"></div>
          
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full p-4 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          
          <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">Premium Analytics Locked</h3>
          <p className="text-sm text-neutral-400 max-w-md mt-2 mb-6 leading-relaxed">
            The category <span className="text-violet-400 font-bold uppercase">{activeCategory}</span> is currently restricted. Upgrade your credentials node.
          </p>
          
          <button
            onClick={() => handleLockedClick(activeCategory as TrendCategory)}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-600/10"
          >
            Deploy {getRequiredTier(activeCategory as TrendCategory) === "enterprise" ? "Kingdom Suite" : "Pro Minister"} Node
          </button>
        </div>
      ) : (
        /* UNLOCKED TRENDS AND CHARTS VIEW */
        <div className="space-y-6">
          {/* Main Chart Panel */}
          <div className="bg-neutral-950/60 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Historical Volume Index</h3>
                <p className="text-[11px] text-neutral-500">7-day aggregate volume trends for active segment.</p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-neutral-400">
                <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
                <span>Simulated Realtime Sync</span>
              </div>
            </div>
            
            <div className="h-60 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" />
                  <YAxis stroke="rgba(255,255,255,0.2)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0c0c14", borderColor: "rgba(255,255,255,0.08)", borderRadius: "8px" }}
                    labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#8b5cf6" 
                    strokeWidth={2.5} 
                    dot={{ fill: "#8b5cf6", strokeWidth: 1 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke="#ff3366" 
                    strokeWidth={1.5} 
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTrends.map((trend) => {
              const isPinned = watchlist.some(w => w.trendId === trend.id);
              return (
                <div 
                  key={trend.id}
                  onClick={() => setSelectedTrend(trend)}
                  className="bg-neutral-950/60 border border-white/5 rounded-2xl p-6 space-y-4 hover:border-violet-500/30 transition-all duration-300 cursor-pointer relative group"
                >
                  {/* Pin button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(trend);
                    }}
                    className={`absolute top-4 right-4 p-1.5 rounded-lg border bg-neutral-900/60 hover:bg-neutral-850 transition cursor-pointer ${
                      isPinned 
                        ? "text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]" 
                        : "text-neutral-500 border-white/5 hover:text-white"
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isPinned ? "fill-amber-500" : ""}`} />
                  </button>

                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">{trend.category}</div>
                    <h4 className="font-heading text-base font-bold text-white group-hover:text-violet-400 transition pr-6">
                      {trend.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="text-neutral-500 uppercase text-[9px]">Momentum</div>
                      <div className="text-rose-500 font-extrabold text-sm">{trend.momentum}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500 uppercase text-[9px]">Volume</div>
                      <div className="text-white font-bold">{trend.volume}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500 uppercase text-[9px]">Sentiment</div>
                      <div className="text-emerald-400 font-bold">{trend.sentiment}% +</div>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">
                    {trend.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TREND DETAIL OVERLAY MODAL */}
      {selectedTrend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-neutral-950 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedTrend(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-1.5 pr-6">
              <span className="text-[10px] text-neutral-500 uppercase font-semibold tracking-widest">{selectedTrend.category} Analysis</span>
              <h3 className="font-heading text-xl md:text-2xl font-extrabold text-white">{selectedTrend.title}</h3>
            </div>

            {/* Detail Stats Grid */}
            <div className="grid grid-cols-3 gap-4 bg-neutral-900/40 border border-white/5 p-4 rounded-xl text-center">
              <div>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest">Growth rate</span>
                <span className="block text-rose-500 font-heading font-extrabold text-base">{selectedTrend.momentum}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest">Active Reach</span>
                <span className="block text-white font-mono font-bold text-base">{selectedTrend.volume}</span>
              </div>
              <div>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">Positive Sentiment</span>
                <span className="block text-emerald-400 font-mono font-bold text-base">{selectedTrend.sentiment}%</span>
              </div>
            </div>

            {/* Weekly Sparkline Chart */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Individual Weekly Vector</h4>
              <div className="h-32 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getTrendDataForChart(selectedTrend)}>
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.15)" />
                    <Tooltip contentStyle={{ backgroundColor: "#0c0c14", borderColor: "rgba(255,255,255,0.05)" }} />
                    <Line type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Analyst Commentary */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Analyst Commentary</h4>
              <div className="bg-neutral-900/60 border border-white/5 p-4 rounded-xl space-y-3">
                <p className="text-neutral-400 text-xs leading-relaxed italic">
                  "{selectedTrend.description}"
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-neutral-500">Source: Kingdom Analytics Bureau</span>
                  <div className="flex items-center space-x-3 text-neutral-400">
                    <span className="flex items-center space-x-1">
                      <Smile className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedTrend.sentiment}%</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Frown className="w-3.5 h-3.5 text-rose-500" />
                      <span>{100 - selectedTrend.sentiment}%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => {
                  toggleWatchlist(selectedTrend);
                }}
                className={`flex-1 border py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer ${
                  watchlist.some(w => w.trendId === selectedTrend.id)
                    ? "bg-amber-600/10 border-amber-500/30 text-amber-500 hover:bg-transparent"
                    : "bg-neutral-900 border-white/5 text-white hover:bg-neutral-850"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{watchlist.some(w => w.trendId === selectedTrend.id) ? "Unpin Watchlist" : "Pin to Watchlist"}</span>
              </button>
              
              <button
                onClick={() => setSelectedTrend(null)}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Close Metrics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
