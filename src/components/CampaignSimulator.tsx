import { useState } from "react";
import { useTrends } from "../context/TrendsContext";
import { FAITH_NICHES } from "../utils/mockData";
import { CampaignInput, CampaignPrediction } from "../types";
import { Lock, Loader2, Play, Sliders } from "lucide-react";

export const TONE_OPTIONS = [
  "Inspirational/Uplifting",
  "Explainer/Educational",
  "Spoken Word/Dramatic",
  "Humorous/Lighthearted",
  "Direct/Confrontational"
];

export default function CampaignSimulator() {
  const { user, runCampaignSimulation, openCheckout } = useTrends();
  
  const [selectedNiche, setSelectedNiche] = useState<string>(FAITH_NICHES[0]);
  const [audience, setAudience] = useState<string>("Gen-Z Seekers");
  const [tone, setTone] = useState<string>(TONE_OPTIONS[0]);
  const [hashtag, setHashtag] = useState<string>("#FaithWalk");
  
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [results, setResults] = useState<CampaignPrediction | null>(null);

  // Check if locked
  const isLocked = !user || user.tier === "free";

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setIsSimulating(true);
    setResults(null);

    const input: CampaignInput = {
      niche: selectedNiche,
      audience,
      tone,
      hashtag,
      category: "social"
    };

    try {
      const pred = await runCampaignSimulation(input);
      setResults(pred);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="relative min-h-[450px]">
      {/* Locked Overlay for Free Tier */}
      {isLocked && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-black/70 backdrop-blur-md rounded-2xl">
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full p-4 mb-4">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">Predictive Simulator Locked</h3>
          <p className="text-xs text-neutral-400 max-w-sm mt-1 mb-6 leading-relaxed">
            The Campaign Simulator utilizes advanced demographic projection models to forecast reach. Deploy a Pro Minister node to activate.
          </p>
          <button
            onClick={() => openCheckout("pro")}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition uppercase tracking-wider cursor-pointer shadow-lg"
          >
            Unlock Simulator Console
          </button>
        </div>
      )}

      {/* Main Simulator Viewport */}
      <div className={`space-y-8 ${isLocked ? "blur-sm pointer-events-none select-none" : ""}`}>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <Sliders className="w-4 h-4 text-violet-400" />
            <span>Campaign Vector Simulator</span>
          </h3>
          <p className="text-[11px] text-neutral-500">Test and simulate video metadata curves prior to actual deployment.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Controls Input Form */}
          <form onSubmit={handleSimulate} className="md:col-span-2 bg-neutral-950/60 border border-white/5 p-6 rounded-2xl space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Faith Niche Focus</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                disabled={isSimulating}
                className="w-full bg-neutral-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50 cursor-pointer"
              >
                {FAITH_NICHES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Target Demographics</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                disabled={isSimulating}
                placeholder="e.g. Gen-Z Seekers, Young Parents"
                className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Creative Tone Blueprint</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                disabled={isSimulating}
                className="w-full bg-neutral-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50 cursor-pointer"
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Metadata Hashtags</label>
              <input
                type="text"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                disabled={isSimulating}
                placeholder="e.g. #worship #apologetics"
                className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={isSimulating}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-neutral-900 text-white border border-white/5 disabled:border-white/2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer disabled:text-neutral-600 disabled:cursor-not-allowed"
            >
              {isSimulating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                  <span>Computing Vector...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white shrink-0" />
                  <span>Run Prediction Model</span>
                </>
              )}
            </button>
          </form>

          {/* Results Output Screen */}
          <div className="md:col-span-3 bg-neutral-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-center min-h-[300px]">
            {isSimulating ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Predictive Modeling in Progress</h4>
                  <p className="text-[10px] text-neutral-500 max-w-xs mx-auto">
                    Scanning historical engagement curves and keyword index weightings...
                  </p>
                </div>
              </div>
            ) : results ? (
              <div className="space-y-6 animate-fade-in">
                {/* Result Dials */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Reach index dial */}
                  <div className="bg-neutral-900/40 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="32" 
                          stroke="#8b5cf6" 
                          strokeWidth="4" 
                          fill="transparent" 
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - results.reachIndex / 100)}`}
                        />
                      </svg>
                      <span className="absolute text-sm font-mono font-black text-violet-400">{results.reachIndex}</span>
                    </div>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold mt-2">Reach Index</span>
                  </div>

                  {/* Viral Probability dial */}
                  <div className="bg-neutral-900/40 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="32" 
                          stroke="#ff3366" 
                          strokeWidth="4" 
                          fill="transparent" 
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - results.viralProbability / 100)}`}
                        />
                      </svg>
                      <span className="absolute text-sm font-mono font-black text-rose-400">{results.viralProbability}%</span>
                    </div>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold mt-2">Viral Probability</span>
                  </div>
                </div>

                {/* Info blocks */}
                <div className="bg-neutral-900/60 border border-white/5 p-4 rounded-xl space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-neutral-500 uppercase text-[9px] tracking-wider">Optimal posting hour:</span>
                    <span className="text-white font-mono font-bold">{results.optimalPostingTime}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-neutral-500 uppercase text-[9px] tracking-wider">Sentiment Index:</span>
                    <span className="text-emerald-400 font-mono font-bold">~ {results.sentimentForecast}% Positive</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-neutral-500 uppercase text-[9px] tracking-wider block font-semibold">Tactical adjustments</span>
                    <ul className="space-y-1 list-disc pl-4 text-neutral-400 text-[10px] leading-relaxed">
                      {results.suggestions.map((s, sidx) => (
                        <li key={sidx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-neutral-600">
                <span>Configure metadata parameters and trigger simulator.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
