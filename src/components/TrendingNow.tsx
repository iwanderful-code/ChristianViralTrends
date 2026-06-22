import { useState, useEffect } from "react";
import { TrendingUp, RefreshCw, AlertCircle, ArrowUpRight } from "lucide-react";
import { useTrends } from "../context/TrendsContext";

export default function TrendingNow() {
  const { liveTrends, syncLiveTrends } = useTrends();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      await syncLiveTrends();
    } catch (err: any) {
      console.error("Error syncing live trends:", err);
      setError(err.message || "Failed to load live trends.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If the live trends have not been updated or customized (still initial MOCK_TRENDS),
    // we can trigger an initial sync if a key is available, or just leave it.
  }, []);

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-violet-400" />
          <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
            Trending Now <span className="text-[10px] text-neutral-500 font-sans normal-case ml-2">(Refreshes Hourly)</span>
          </h2>
        </div>
        <button
          onClick={fetchTrends}
          disabled={loading}
          className="flex items-center space-x-1.5 text-xs text-neutral-400 hover:text-white transition disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-violet-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Feed</span>
        </button>
      </div>

      {loading ? (
        <div className="py-8 flex flex-col items-center justify-center space-y-2">
          <RefreshCw className="w-8 h-8 text-violet-500 animate-spin" />
          <span className="text-xs text-neutral-500 font-mono">Aggregating live faith indicators...</span>
        </div>
      ) : error ? (
        <div className="py-8 border border-red-500/20 bg-red-500/5 rounded-xl p-4 flex items-center space-x-3 text-red-400 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div className="flex-1">
            <p className="font-bold">Sync Alert</p>
            <p className="opacity-80">{error}</p>
          </div>
          <button 
            onClick={fetchTrends}
            className="underline font-bold hover:text-white uppercase cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : liveTrends.length === 0 ? (
        <div className="py-8 text-center text-xs text-neutral-500 italic">
          No active spikes recorded.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveTrends.slice(0, 6).map((trend, idx) => {
            const velocity = trend.growthRate === "spiking" ? "High" : trend.growthRate === "steady" ? "Medium" : "Low";
            return (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-violet-500/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                    <span className="text-violet-400">{trend.category}</span>
                    <span className={`px-2 py-0.5 rounded ${
                      velocity === "High"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        : velocity === "Medium"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {velocity} Velocity
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-sm font-bold text-white group-hover:text-violet-300 transition flex items-start justify-between">
                    <span>{trend.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-neutral-500 group-hover:text-violet-400 shrink-0 ml-1" />
                  </h3>
                  
                  <p className="text-neutral-400 text-xs line-clamp-3 leading-relaxed">
                    {trend.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span>Vol: {trend.volume}</span>
                  <span className="text-violet-500/60 font-bold">#{(idx + 1).toString().padStart(2, '0')}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
