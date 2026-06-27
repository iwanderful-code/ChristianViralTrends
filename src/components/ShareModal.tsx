import { useState, useRef, useEffect } from "react";
import { useTrends } from "../context/TrendsContext";
import { X, Copy, Check, Download, Share2 } from "lucide-react";

export default function ShareModal() {
  const {
    isShareOpen,
    shareType,
    shareIdeaData,
    shareCampaignData,
    closeShare
  } = useTrends();

  const [copied, setCopied] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-reset copied state
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!isShareOpen) return null;

  // Pre-formatted text content
  const getShareTextAndUrl = () => {
    const url = "https://christianviraltrends.com";
    if (shareType === "idea" && shareIdeaData) {
      const text = `🔥 Synthesized a Viral Faith Trend Beat on Christian Viral Trends!\n\n🎯 Title: "${shareIdeaData.title}"\n💡 Hook: "${shareIdeaData.hook}"\n📈 Viral Probability: ${shareIdeaData.probability}%\n⚡ Outlier Factor: ${shareIdeaData.outlierFactor}\n\nTrack the pulse of faith culture at:`;
      return { text, url };
    } else if (shareType === "campaign" && shareCampaignData) {
      const { prediction, input } = shareCampaignData;
      const text = `📊 Simulating new faith outreach metrics on Christian Viral Trends!\n\n🎯 Target: ${input.audience} (${input.niche})\n⚡ Reach Index: ${prediction.reachIndex}/100\n🔥 Viral Probability: ${prediction.viralProbability}%\n💬 Sentiment Index: ~${prediction.sentimentForecast}% Positive\n\nRun your demographic forecasts at:`;
      return { text, url };
    }
    return { text: "", url };
  };

  const { text: shareText, url: shareUrl } = getShareTextAndUrl();

  const handleCopyText = () => {
    const fullText = `${shareText} ${shareUrl}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
    });
  };

  // Social Share Intent Handlers
  const handleShareX = () => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(xUrl, "_blank", "width=600,height=400");
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  };

  // Canvas Card Generation
  const handleDownloadCard = () => {
    setDownloading(true);
    // Give browser a frame to show loading indicator
    setTimeout(() => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set dimensions for high-res 9:16 portrait story
        canvas.width = 1080;
        canvas.height = 1920;

        // 1. Draw Background Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
        bgGrad.addColorStop(0, "#0c0915"); // Deep purple hue
        bgGrad.addColorStop(0.5, "#06040a");
        bgGrad.addColorStop(1, "#030205"); // Near black
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1080, 1920);

        // 2. Draw Subtle Background Neon Ring glows
        ctx.fillStyle = "rgba(139, 92, 246, 0.05)";
        ctx.beginPath();
        ctx.arc(200, 400, 300, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(244, 63, 94, 0.04)";
        ctx.beginPath();
        ctx.arc(880, 1500, 350, 0, Math.PI * 2);
        ctx.fill();

        // 3. Draw Outer Neon Border
        const borderGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
        borderGrad.addColorStop(0, "#8b5cf6"); // Violet
        borderGrad.addColorStop(0.5, "#ec4899"); // Pink
        borderGrad.addColorStop(1, "#f43f5e"); // Rose
        ctx.strokeStyle = borderGrad;
        ctx.lineWidth = 16;
        ctx.strokeRect(30, 30, 1020, 1860);

        // 4. Header Branding
        ctx.textAlign = "center";
        
        // Sparkle Star Icon
        ctx.fillStyle = "#a78bfa";
        ctx.beginPath();
        ctx.moveTo(540, 120);
        ctx.quadraticCurveTo(540, 145, 565, 145);
        ctx.quadraticCurveTo(540, 145, 540, 170);
        ctx.quadraticCurveTo(540, 145, 515, 145);
        ctx.quadraticCurveTo(540, 145, 540, 120);
        ctx.fill();

        // Main Title
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 44px system-ui, -apple-system, sans-serif";
        ctx.fillText("CHRISTIAN VIRAL TRENDS", 540, 240);

        // Subtitle
        ctx.fillStyle = "#a3a3a3";
        ctx.font = "600 20px system-ui, -apple-system, sans-serif";
        ctx.fillText("THE DATA-DRIVEN DIGITAL MINISTERIAL CONSOLE", 540, 290);

        // Header Divider
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(150, 340);
        ctx.lineTo(930, 340);
        ctx.stroke();

        // Helper word wrap function
        const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number, color = "#ffffff", font = "36px system-ui, -apple-system, sans-serif") => {
          ctx.fillStyle = color;
          ctx.font = font;
          const words = text.split(" ");
          let line = "";
          let currentY = y;

          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              ctx.fillText(line, x, currentY);
              line = words[n] + " ";
              currentY += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, x, currentY);
          return currentY;
        };

        if (shareType === "idea" && shareIdeaData) {
          // --- IDEA CARD LAYOUT ---
          
          // Niche Tag
          ctx.textAlign = "left";
          ctx.fillStyle = "#8b5cf6";
          ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
          ctx.fillText(`FAITH NICHE: ${shareIdeaData.niche.toUpperCase()}`, 150, 430);

          // Platform type
          ctx.fillStyle = "#a3a3a3";
          ctx.font = "600 22px system-ui, -apple-system, sans-serif";
          ctx.fillText(`${shareIdeaData.platform.toUpperCase()} OUTLINE BLUEPRINT`, 150, 470);

          // Title
          ctx.fillStyle = "#ffffff";
          const titleY = wrapText(shareIdeaData.title, 150, 560, 780, 65, "#ffffff", "bold 52px system-ui, -apple-system, sans-serif");

          // Hook
          ctx.fillStyle = "#f43f5e";
          ctx.font = "italic 36px system-ui, -apple-system, sans-serif";
          const hookY = wrapText(`"${shareIdeaData.hook}"`, 150, titleY + 95, 780, 50, "#f43f5e", "italic 34px system-ui, -apple-system, sans-serif");

          // Metrics Box
          const boxY = hookY + 80;
          
          // Card Box background
          ctx.fillStyle = "rgba(139, 92, 246, 0.05)";
          ctx.beginPath();
          ctx.roundRect(140, boxY, 800, 240, 20);
          ctx.fill();
          ctx.strokeStyle = "rgba(139, 92, 246, 0.2)";
          ctx.lineWidth = 3;
          ctx.stroke();

          // Chance Dial Text
          ctx.textAlign = "center";
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
          ctx.fillText("VIRAL INDEX", 320, boxY + 70);
          
          ctx.fillStyle = "#8b5cf6";
          ctx.font = "bold 82px system-ui, -apple-system, sans-serif";
          ctx.fillText(`${shareIdeaData.probability}%`, 320, boxY + 165);

          // Outlier & Payoff details inside metrics box
          ctx.textAlign = "left";
          wrapText(`OUTLIER FACTOR:`, 500, boxY + 60, 400, 35, "#f43f5e", "bold 20px system-ui, -apple-system, sans-serif");
          const outlierTextY = wrapText(shareIdeaData.outlierFactor, 500, boxY + 95, 400, 32, "#d4d4d4", "22px system-ui, -apple-system, sans-serif");

          wrapText(`VIEWER PAYOFF:`, 500, outlierTextY + 50, 400, 35, "#8b5cf6", "bold 20px system-ui, -apple-system, sans-serif");
          wrapText(shareIdeaData.viewerPayoff, 500, outlierTextY + 85, 400, 32, "#d4d4d4", "22px system-ui, -apple-system, sans-serif");

          // Script outline section
          ctx.textAlign = "left";
          const listY = boxY + 310;
          ctx.fillStyle = "#eab308";
          ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
          ctx.fillText("SUGGESTED SCRIPT BEATS", 150, listY);

          // Render beats
          let nextBeatY = listY + 50;
          shareIdeaData.scriptOutline.forEach((beat, index) => {
            ctx.fillStyle = "#eab308";
            ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
            ctx.fillText(`${index + 1}.`, 150, nextBeatY);
            
            const beatTextY = wrapText(beat, 190, nextBeatY, 740, 42, "#e5e5e5", "26px system-ui, -apple-system, sans-serif");
            nextBeatY = beatTextY + 60;
          });

        } else if (shareType === "campaign" && shareCampaignData) {
          // --- CAMPAIGN CARD LAYOUT ---
          const { prediction, input } = shareCampaignData;

          // Demographic Tag
          ctx.textAlign = "left";
          ctx.fillStyle = "#ec4899";
          ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
          ctx.fillText(`TARGET AUDIENCE: ${input.audience.toUpperCase()}`, 150, 430);

          // Focus parameters
          ctx.fillStyle = "#a3a3a3";
          ctx.font = "600 22px system-ui, -apple-system, sans-serif";
          ctx.fillText(`NICHE: ${input.niche.toUpperCase()} | TONE: ${input.tone.toUpperCase()}`, 150, 470);

          // Title
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 52px system-ui, -apple-system, sans-serif";
          ctx.fillText("CAMPAIGN METRICS FORECAST", 150, 560);
          
          // Hashtags
          ctx.fillStyle = "#8b5cf6";
          ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
          ctx.fillText(input.hashtag || "#FaithOutreach", 150, 620);

          // Render 2x2 Grid of Dial Metrics
          const gridY = 690;
          
          // Helper box renderer
          const drawMetricBox = (bx: number, by: number, title: string, value: string, sub: string, accentColor: string) => {
            ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
            ctx.beginPath();
            ctx.roundRect(bx, by, 375, 220, 16);
            ctx.fill();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.textAlign = "center";
            ctx.fillStyle = "#a3a3a3";
            ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
            ctx.fillText(title.toUpperCase(), bx + 187, by + 45);

            ctx.fillStyle = accentColor;
            ctx.font = "bold 64px system-ui, -apple-system, sans-serif";
            ctx.fillText(value, bx + 187, by + 125);

            ctx.fillStyle = "#737373";
            ctx.font = "500 16px system-ui, -apple-system, sans-serif";
            ctx.fillText(sub.toUpperCase(), bx + 187, by + 175);
          };

          // Draw grid elements
          drawMetricBox(150, gridY, "Reach Index", `${prediction.reachIndex}/100`, "projected visibility", "#8b5cf6");
          drawMetricBox(550, gridY, "Viral Chance", `${prediction.viralProbability}%`, "retention probability", "#f43f5e");
          drawMetricBox(150, gridY + 260, "Sentiment Forecast", `~${prediction.sentimentForecast}%`, "positive feedback", "#10b981");
          drawMetricBox(550, gridY + 260, "Optimal Window", prediction.optimalPostingTime, "highest traffic rate", "#eab308");

          // Tactical adjustments section
          ctx.textAlign = "left";
          const listY = gridY + 560;
          ctx.fillStyle = "#8b5cf6";
          ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
          ctx.fillText("METRIC ADJUSTMENT BLUEPRINT", 150, listY);

          let nextAdjY = listY + 55;
          prediction.suggestions.forEach((item) => {
            ctx.fillStyle = "#8b5cf6";
            ctx.font = "bold 26px system-ui, -apple-system, sans-serif";
            ctx.fillText("•", 150, nextAdjY);
            
            const adjTextY = wrapText(item, 180, nextAdjY, 750, 42, "#e5e5e5", "25px system-ui, -apple-system, sans-serif");
            nextAdjY = adjTextY + 55;
          });
        }

        // 6. Watermark Footer (Always aligned at bottom center)
        ctx.textAlign = "center";
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(150, 1720);
        ctx.lineTo(930, 1720);
        ctx.stroke();

        ctx.fillStyle = "#8b5cf6";
        ctx.font = "bold 32px system-ui, -apple-system, sans-serif";
        ctx.fillText("CREATED ON CHRISTIANVIRALTRENDS.COM", 540, 1785);

        ctx.fillStyle = "#525252";
        ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
        ctx.fillText("THE PULSE OF CHRISTIAN DIGITAL CULTURE", 540, 1825);

        // 7. Trigger download
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = shareType === "idea" 
          ? `cvt_trend_beat_${shareIdeaData?.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.png`
          : `cvt_campaign_forecast_${Date.now()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (err) {
        console.error("Canvas image export failed:", err);
        alert("Failed to export card image. You can take a screenshot of the preview card directly!");
      } finally {
        setDownloading(false);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Hidden Canvas used for high-res PNG export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={closeShare}
          className="absolute top-4 right-4 z-10 bg-neutral-900 hover:bg-neutral-850 border border-white/5 p-2 rounded-full text-neutral-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT PANEL: Portrait-Mode Summary Card Preview */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 bg-neutral-900/20">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mb-4">Portrait Summary Card Preview</span>
          
          {/* Card Outer Border Container */}
          <div className="w-full max-w-[340px] p-[2px] rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-rose-500 shadow-2xl">
            {/* Card Inner Panel */}
            <div className="bg-[#08060e] rounded-[14px] p-5 aspect-[9/16] flex flex-col justify-between select-none relative overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-violet-600/10 blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full bg-rose-600/10 blur-xl pointer-events-none" />

              {/* Branding Header */}
              <div className="text-center space-y-1.5 border-b border-white/5 pb-3">
                <div className="inline-block bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full text-[8px] font-semibold text-violet-300">
                  CHRISTIAN VIRAL TRENDS
                </div>
                <div className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">
                  THE DIGITAL EVANGELISM CONSOLE
                </div>
              </div>

              {/* Card Dynamic Content */}
              {shareType === "idea" && shareIdeaData && (
                <div className="flex-1 py-4 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] text-violet-400 font-bold uppercase tracking-wide">
                        {shareIdeaData.niche}
                      </span>
                      <span className="text-[8px] text-neutral-500 uppercase font-mono">
                        {shareIdeaData.platform}
                      </span>
                    </div>
                    <h3 className="font-heading text-sm font-extrabold text-white leading-snug">
                      {shareIdeaData.title}
                    </h3>
                    <p className="text-[9.5px] text-rose-400 italic">
                      "{shareIdeaData.hook}"
                    </p>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="bg-neutral-950/60 border border-white/5 rounded-xl p-3 flex items-center justify-between gap-3">
                    <div className="text-center shrink-0">
                      <div className="text-[7px] text-neutral-500 uppercase font-semibold">Viral Index</div>
                      <div className="text-base font-extrabold font-mono text-violet-400">{shareIdeaData.probability}%</div>
                    </div>
                    <div className="border-l border-white/5 h-8 shrink-0" />
                    <div className="text-left leading-tight">
                      <div className="text-[7px] text-rose-400 font-bold uppercase">Outlier Factor</div>
                      <div className="text-[8.5px] text-neutral-400 font-medium truncate w-[160px]" title={shareIdeaData.outlierFactor}>
                        {shareIdeaData.outlierFactor}
                      </div>
                    </div>
                  </div>

                  {/* Script Beats list preview */}
                  <div className="space-y-1.5">
                    <div className="text-[8px] text-neutral-500 font-bold uppercase tracking-wide">Script Beats Outline</div>
                    <ul className="space-y-1 text-[8.5px] text-neutral-300 list-decimal pl-3.5">
                      {shareIdeaData.scriptOutline.slice(0, 3).map((beat, bidx) => (
                        <li key={bidx} className="leading-snug truncate pr-2">{beat}</li>
                      ))}
                      {shareIdeaData.scriptOutline.length > 3 && (
                        <li className="list-none text-neutral-500 italic text-[7.5px] pl-0 mt-0.5">
                          + {shareIdeaData.scriptOutline.length - 3} more outlined beats...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {shareType === "campaign" && shareCampaignData && (
                <div className="flex-1 py-4 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1">
                    <div className="text-[8px] text-rose-400 font-bold uppercase tracking-wide">
                      Target: {shareCampaignData.input.audience}
                    </div>
                    <h3 className="font-heading text-xs font-extrabold text-white uppercase tracking-wider">
                      Campaign Metric Projections
                    </h3>
                    <div className="text-[8px] text-violet-400 font-semibold font-mono">
                      {shareCampaignData.input.hashtag || "#FaithReach"} | {shareCampaignData.input.tone}
                    </div>
                  </div>

                  {/* Projections Grid */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-neutral-950/60 border border-white/5 p-2 rounded-lg space-y-0.5">
                      <div className="text-[6.5px] text-neutral-500 uppercase font-semibold">Reach Index</div>
                      <div className="text-xs font-bold text-violet-400 font-mono">{shareCampaignData.prediction.reachIndex}/100</div>
                    </div>
                    <div className="bg-neutral-950/60 border border-white/5 p-2 rounded-lg space-y-0.5">
                      <div className="text-[6.5px] text-neutral-500 uppercase font-semibold">Viral Chance</div>
                      <div className="text-xs font-bold text-rose-400 font-mono">{shareCampaignData.prediction.viralProbability}%</div>
                    </div>
                    <div className="bg-neutral-950/60 border border-white/5 p-2 rounded-lg space-y-0.5">
                      <div className="text-[6.5px] text-neutral-500 uppercase font-semibold">Sentiment</div>
                      <div className="text-xs font-bold text-emerald-400 font-mono">~{shareCampaignData.prediction.sentimentForecast}%</div>
                    </div>
                    <div className="bg-neutral-950/60 border border-white/5 p-2 rounded-lg space-y-0.5">
                      <div className="text-[6.5px] text-neutral-500 uppercase font-semibold">Optimal Window</div>
                      <div className="text-[9.5px] font-bold text-amber-500 font-mono leading-none pt-0.5">{shareCampaignData.prediction.optimalPostingTime}</div>
                    </div>
                  </div>

                  {/* Recommendation Preview */}
                  <div className="space-y-1">
                    <div className="text-[8px] text-neutral-500 font-bold uppercase tracking-wide">Key Suggestions</div>
                    <ul className="space-y-0.5 text-[8.5px] text-neutral-300 pl-2 list-disc leading-tight">
                      {shareCampaignData.prediction.suggestions.slice(0, 2).map((item, sidx) => (
                        <li key={sidx} className="truncate">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Card Footer Watermark */}
              <div className="border-t border-white/5 pt-2 mt-auto text-center space-y-0.5">
                <div className="text-[8px] font-extrabold text-violet-400">
                  christianviraltrends.com
                </div>
                <div className="text-[6.5px] text-neutral-600 uppercase font-bold tracking-wider">
                  Created on Christian Viral Trends
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Sharing Actions & Referrals */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-violet-400" />
                <span>Trigger Referral Loop</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Share this asset to X, Instagram, or Facebook. Embed your referral watermark to build your subscriber loop.
              </p>
            </div>

            {/* Platform Quick Shares */}
            <div className="space-y-2 pt-2">
              <button 
                onClick={handleShareX}
                className="w-full bg-neutral-900 hover:bg-neutral-850 border border-white/5 hover:border-violet-500/20 text-white rounded-xl py-3 px-4 text-xs font-bold transition flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  {/* Clean SVG X logo */}
                  <svg className="w-4 h-4 fill-white group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Share to X (Twitter)</span>
                </div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono group-hover:text-violet-400 transition">Intent</span>
              </button>

              <button 
                onClick={handleShareFacebook}
                className="w-full bg-neutral-900 hover:bg-neutral-850 border border-white/5 hover:border-violet-500/20 text-white rounded-xl py-3 px-4 text-xs font-bold transition flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  {/* Clean SVG FB logo */}
                  <svg className="w-4 h-4 fill-[#1877F2] group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Share to Facebook</span>
                </div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono group-hover:text-violet-400 transition">Intent</span>
              </button>

              <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <svg className="w-4 h-4 fill-rose-500" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                  <span>Post to Instagram Stories / Reels</span>
                </div>
                <p className="text-[10px] text-neutral-500 leading-normal">
                  Download the high-contrast story card below and post to your Stories. Tag <span className="text-rose-400 font-semibold">@ChristianViralTrends</span> to join our creator network!
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="space-y-3 border-t border-white/5 pt-4">
            {/* Copy Text Button */}
            <button
              onClick={handleCopyText}
              className="w-full bg-neutral-900 hover:bg-neutral-850 border border-white/5 hover:border-violet-500/20 text-white rounded-xl py-3 px-4 text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Referral Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-400" />
                  <span>Copy Share Text & Link</span>
                </>
              )}
            </button>

            {/* High-Res PNG Downloader */}
            <button
              onClick={handleDownloadCard}
              disabled={downloading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-neutral-900 border border-white/5 disabled:border-white/2 text-white rounded-xl py-3.5 px-4 text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-500"
            >
              {downloading ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-violet-400" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating Branded Asset...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Portrait Story Card (PNG)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
