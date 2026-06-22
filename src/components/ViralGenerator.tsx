import { useState } from "react";
import { useTrends } from "../context/TrendsContext";
import { FAITH_NICHES } from "../utils/mockData";
import { ViralIdea } from "../types";
import { Sparkles, Loader2, Copy, Bookmark, BookmarkCheck, Heart, Trash2, Check } from "lucide-react";

export default function ViralGenerator() {
  const { 
    user, 
    dailyLimitRemaining, 
    dailyLimitTotal, 
    incrementGenerationCount, 
    saveIdea, 
    savedIdeas, 
    removeSavedIdea,
    openCheckout,
    generateViralIdeas
  } = useTrends();

  const [selectedNiche, setSelectedNiche] = useState<string>(FAITH_NICHES[0]);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [activeSubTab, setActiveSubTab] = useState<"generate" | "saved">("generate");
  
  // Loading generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStatusText, setGenerationStatusText] = useState<string>("");
  const [generatedIdeas, setGeneratedIdeas] = useState<ViralIdea[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    // Check quota
    if (dailyLimitRemaining <= 0) {
      // Trigger paywall redirect
      openCheckout(user?.tier === "free" ? "pro" : "enterprise");
      return;
    }

    // Process limit deduction
    const allowed = incrementGenerationCount();
    if (!allowed) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStatusText("Analyzing competitor feeds...");
    setGeneratedIdeas([]);

    // Simulate progress ticks
    const statuses = [
      { prg: 20, text: "Scanning viral faith hashtags..." },
      { prg: 45, text: "Formatting high-retention hook parameters..." },
      { prg: 70, text: "Validating theological frameworks..." },
      { prg: 90, text: "Structuring viewer payoff cards..." },
      { prg: 100, text: "Completing vector synthesis..." }
    ];

    let currentStep = 0;
    const progressInterval = setInterval(() => {
      if (currentStep < statuses.length) {
        const step = statuses[currentStep];
        setGenerationProgress(step.prg);
        setGenerationStatusText(step.text);
        currentStep++;
      }
    }, 450);

    try {
      const ideas = await generateViralIdeas(selectedNiche, customPrompt);
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGenerationStatusText("Completing vector synthesis...");
      await new Promise(resolve => setTimeout(resolve, 300));
      setGeneratedIdeas(ideas);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  const handleCopyClipboard = (idea: ViralIdea) => {
    const textToCopy = `
PLATFORM: ${idea.platform}
NICHE: ${idea.niche}
TITLE: ${idea.title}
HOOK: ${idea.hook}
PROBABILITY: ${idea.probability}% Viral Chance
OUTLIER FACTOR: ${idea.outlierFactor}
VIEWER PAYOFF: ${idea.viewerPayoff}
OUTLINE:
${idea.scriptOutline.map((step, idx) => `${idx + 1}. ${step}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(idea.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const isLimitReached = dailyLimitRemaining <= 0;

  return (
    <div className="space-y-6">
      {/* Sub tabs switching */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSubTab("generate")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
              activeSubTab === "generate"
                ? "bg-neutral-800 text-white border border-white/10"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            Generate Ideas
          </button>
          
          <button
            onClick={() => setActiveSubTab("saved")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === "saved"
                ? "bg-neutral-800 text-white border border-white/10"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            <span>Saved Library</span>
            <span className="bg-neutral-900 px-1.5 py-0.5 rounded text-[10px] border border-white/5 text-rose-400">
              {savedIdeas.length}
            </span>
          </button>
        </div>

        {/* Limit indicators */}
        <div className="text-right">
          <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Generations Available</div>
          <div className="text-xs font-bold text-white">
            {user?.isAdmin ? (
              <span className="text-amber-500 font-extrabold">Unlimited Admin</span>
            ) : (
              <span>
                <span className={isLimitReached ? "text-rose-500 font-extrabold" : "text-violet-400 font-extrabold"}>
                  {dailyLimitRemaining}
                </span>{" "}
                / {dailyLimitTotal} Remaining Today
              </span>
            )}
          </div>
        </div>
      </div>

      {activeSubTab === "generate" ? (
        /* IDEAS GENERATOR VIEW */
        <div className="space-y-8">
          {isLimitReached && (
            <div className="p-4 bg-rose-950/20 border border-rose-900/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">Daily Quota Exhausted</h4>
                <p className="text-[11px] text-neutral-400 max-w-sm">
                  You have generated all allowed ideas for your subscription level. Upgrade to release broader daily limits.
                </p>
              </div>
              <button
                onClick={() => openCheckout(user?.tier === "free" ? "pro" : "enterprise")}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition cursor-pointer shadow-lg shadow-rose-600/10"
              >
                Expand Limits
              </button>
            </div>
          )}

          {/* Configuration Form */}
          <div className="bg-neutral-950/60 border border-white/5 p-6 rounded-2xl space-y-6">
            {/* Niche Tag Selection Chips */}
            <div className="space-y-2">
              <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Target Faith Niche</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                {FAITH_NICHES.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => !isGenerating && setSelectedNiche(niche)}
                    disabled={isGenerating || isLimitReached}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition cursor-pointer disabled:cursor-not-allowed ${
                      selectedNiche === niche
                        ? "bg-violet-600/15 border-violet-500/30 text-violet-300"
                        : "bg-neutral-900 border-white/2 text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt Text Area */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                <label>Script Focus / Prompt Guidelines (Optional)</label>
                <span>{customPrompt.length}/200</span>
              </div>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value.slice(0, 200))}
                disabled={isGenerating || isLimitReached}
                placeholder="e.g. focused on Hebrew translations, rucking habits, or scripture note hacks..."
                rows={2}
                className="w-full bg-neutral-900 border border-white/5 rounded-xl p-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-violet-500/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Action Trigger */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || isLimitReached}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-neutral-900 text-white border border-white/5 disabled:border-white/2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-600"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                  <span>Synthesizing vector ideas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>Synthesize Viral Ideas (-1 Limit)</span>
                </>
              )}
            </button>
          </div>

          {/* Loading Progress Bar */}
          {isGenerating && (
            <div className="space-y-2 animate-fade-in bg-neutral-950/40 border border-white/5 p-6 rounded-2xl">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-violet-400 flex items-center space-x-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{generationStatusText}</span>
                </span>
                <span className="text-neutral-500">{generationProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <div 
                  style={{ width: `${generationProgress}%` }}
                  className="h-full bg-gradient-to-r from-violet-600 to-rose-600 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Suggestions Grid */}
          {generatedIdeas.length > 0 && !isGenerating && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {generatedIdeas.map((idea) => {
                const alreadySaved = savedIdeas.some((s) => s.idea.id === idea.id);
                return (
                  <div 
                    key={idea.id}
                    className="bg-neutral-950/60 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-violet-500/20 transition-all duration-300 relative group"
                  >
                    {/* Header bar */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">{idea.platform} Form</div>
                        
                        {/* Gauge Percentage circle */}
                        <div className="relative w-10 h-10 flex items-center justify-center shrink-0" title="Viral Probability Index">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.03)" strokeWidth="3" fill="transparent" />
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="16" 
                              stroke="#8b5cf6" 
                              strokeWidth="3" 
                              fill="transparent" 
                              strokeDasharray={`${2 * Math.PI * 16}`}
                              strokeDashoffset={`${2 * Math.PI * 16 * (1 - idea.probability / 100)}`}
                              className="transition-all duration-500"
                            />
                          </svg>
                          <span className="absolute text-[9px] font-mono font-black text-violet-400">{idea.probability}%</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-heading text-sm font-bold text-white group-hover:text-violet-400 transition leading-snug">
                          {idea.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 italic">
                          "{idea.hook}"
                        </p>
                      </div>
                    </div>

                    {/* ViroScope details */}
                    <div className="space-y-3 border-t border-white/5 pt-3">
                      <div className="bg-neutral-900/60 border border-white/2 p-3 rounded-lg text-[10px] space-y-2 leading-relaxed">
                        <div>
                          <span className="text-rose-400 font-bold uppercase">Outlier Factor:</span>
                          <p className="text-neutral-400 mt-0.5">{idea.outlierFactor}</p>
                        </div>
                        <div>
                          <span className="text-violet-400 font-bold uppercase">Viewer Payoff:</span>
                          <p className="text-neutral-400 mt-0.5">{idea.viewerPayoff}</p>
                        </div>
                      </div>

                      {/* Outline beats */}
                      <div className="space-y-1.5 text-[10px]">
                        <span className="text-neutral-500 font-semibold uppercase tracking-wider">Script Beats</span>
                        <ul className="space-y-1 text-neutral-400 list-decimal pl-3.5">
                          {idea.scriptOutline.map((beat, bidx) => (
                            <li key={bidx}>{beat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-2 pt-2 border-t border-white/5 mt-auto">
                      <button
                        onClick={() => handleCopyClipboard(idea)}
                        className="flex-1 bg-neutral-900 border border-white/5 hover:border-violet-500/20 text-white py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1 hover:bg-neutral-850 cursor-pointer"
                      >
                        {copiedId === idea.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-neutral-500" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => saveIdea(idea)}
                        disabled={alreadySaved}
                        className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-bold flex items-center justify-center transition cursor-pointer ${
                          alreadySaved 
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400 cursor-not-allowed" 
                            : "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-850"
                        }`}
                      >
                        {alreadySaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* SAVED LIBRARY VIEW */
        <div className="space-y-6">
          {savedIdeas.length === 0 ? (
            <div className="border border-white/5 bg-neutral-950/40 rounded-2xl p-8 py-16 flex flex-col items-center justify-center text-center">
              <Heart className="w-12 h-12 stroke-1 text-neutral-700 mb-3" />
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">No Saved Ideas</h4>
              <p className="text-xs text-neutral-500 max-w-xs mt-1">
                Your bookmarks are currently blank. Browse and generate ideas, then click bookmark to save.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedIdeas.map((saved) => (
                <div 
                  key={saved.id}
                  className="bg-neutral-950/60 border border-white/5 rounded-2xl p-5 space-y-4 flex flex-col justify-between relative"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[9px] text-neutral-500">
                      <span>Saved {saved.savedAt}</span>
                      <span className="uppercase font-semibold tracking-wider text-violet-400">{saved.idea.niche}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-heading text-sm font-bold text-white">{saved.idea.title}</h4>
                      <p className="text-[10px] text-neutral-400 italic">"{saved.idea.hook}"</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => handleCopyClipboard(saved.idea)}
                      className="flex-1 bg-neutral-900 border border-white/5 hover:border-violet-500/20 text-white py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1 hover:bg-neutral-850 cursor-pointer"
                    >
                      {copiedId === saved.idea.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Copy details</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => removeSavedIdea(saved.id)}
                      title="Remove Bookmark"
                      className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-neutral-900 hover:bg-rose-950/40 hover:border-rose-900/30 text-neutral-500 hover:text-rose-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
