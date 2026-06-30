import { useTrends } from "../context/TrendsContext";
import { TrendingUp, Sparkles, Sliders, ArrowRight, Check } from "lucide-react";
import TrendingNow from "./TrendingNow";
import SocialShareBar from "./SocialShareBar";

export default function LandingPage() {
  const { setActiveTab, openCheckout, user } = useTrends();

  const handleSelectTier = (tier: "free" | "pro" | "enterprise") => {
    if (user) {
      if (tier === "free") {
        setActiveTab("dashboard");
      } else {
        openCheckout(tier);
      }
    } else {
      // Direct to signup and pass the pre-selected tier
      localStorage.setItem("selected_signup_tier", tier);
      setActiveTab("auth");
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Header */}
      <div className="grid md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Main Text and Actions */}
        <div className="md:col-span-8 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-violet-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Faith Culture Cockpit</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            Track the Pulse of <br />
            <span className="bg-gradient-to-r from-violet-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Faith Culture & Trends
            </span>
          </h1>
          <p className="text-base md:text-lg text-neutral-400 font-normal max-w-2xl leading-relaxed">
            The ultimate real-time analytics cockpit and predictive viral idea generator engineered specifically for Christian creators, ministries, and organizations.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
            <button
              onClick={() => handleSelectTier("free")}
              className="w-full sm:w-auto relative group cursor-pointer"
            >
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-neutral-950 hover:bg-neutral-900 border border-white/10 px-8 py-3.5 rounded-xl text-base font-bold text-white flex items-center justify-center space-x-2 transition duration-300">
                <span>Explore Dashboard Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button
              onClick={() => {
                if (user) setActiveTab("dashboard");
                else {
                  localStorage.setItem("selected_signup_tier", "pro");
                  setActiveTab("auth");
                }
              }}
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white border border-white/5 px-8 py-3.5 rounded-xl text-base font-bold transition duration-300 cursor-pointer"
            >
              Deploy Creator Suite
            </button>
          </div>
        </div>

        {/* Share Website Card (Mockup matches drawing) */}
        <div className="md:col-span-4 bg-neutral-950/60 border border-white/5 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden shadow-2xl flex flex-col justify-between h-full animate-fade-in group hover:border-violet-500/20 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500 via-rose-500 to-amber-400"></div>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] text-violet-400 font-extrabold uppercase tracking-widest">Share Console</span>
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Spread the Pulse</h3>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Share Christian Viral Trends with other creators, ministers, and pastors to spread eternal truths.
              </p>
            </div>
            
            <SocialShareBar className="grid grid-cols-4 gap-2 pt-2" size="md" />
          </div>

          <div className="text-[9px] text-neutral-600 border-t border-white/5 pt-4 mt-6 text-center">
            shares link to: <span className="font-semibold text-neutral-500">christianviraltrends.com</span>
          </div>
        </div>
      </div>

      {/* Global Live Ticker */}
      <div className="w-full bg-neutral-950/80 border border-white/5 rounded-2xl p-6 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center space-x-2 mb-4 text-violet-400 text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping"></span>
          <span>Live Faith Network Metrics Ticker</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-white/5 last:border-0 pr-4">
            <div className="text-neutral-500 text-xs uppercase tracking-wider">Total Views Monitored</div>
            <div className="font-heading text-2xl md:text-3xl font-extrabold text-white">847.2M</div>
          </div>
          <div className="space-y-1 border-r border-white/5 last:border-0 pr-4">
            <div className="text-neutral-500 text-xs uppercase tracking-wider">Spiking Tag</div>
            <div className="font-heading text-2xl md:text-3xl font-extrabold text-rose-400">#BibleStudy</div>
          </div>
          <div className="space-y-1 border-r border-white/5 last:border-0 pr-4">
            <div className="text-neutral-500 text-xs uppercase tracking-wider">Aesthetic Focus</div>
            <div className="font-heading text-2xl md:text-3xl font-extrabold text-violet-400">Streetwear</div>
          </div>
          <div className="space-y-1 last:border-0">
            <div className="text-neutral-500 text-xs uppercase tracking-wider">Sentiment Index</div>
            <div className="font-heading text-2xl md:text-3xl font-extrabold text-emerald-400">91% Positive</div>
          </div>
        </div>
      </div>

      {/* Dynamic Trending Now Component */}
      <TrendingNow />

      {/* App Features Matrix */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-neutral-950/40 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-violet-500/20 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">Analytics Cockpit</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Follow the trajectory of hashtags, leading creators, products, conferences, and denominational shifts. View weekly engagement volumes and sentiment curves.
          </p>
        </div>

        <div className="bg-neutral-950/40 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-rose-500/20 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">Viral Content Generator</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Leverage custom faith niches (Theology, Worship, Streetwear) to design hooks, outlines, and scripts. View outlier factors and viewer payoffs.
          </p>
        </div>

        <div className="bg-neutral-950/40 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-amber-500/20 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Sliders className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">Campaign Simulator</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Predict the potential reach index and positive sentiment score of your content ideas before posting. Adjust tone, hashtags, and category to optimize metrics.
          </p>
        </div>
      </div>

      {/* Pricing Matrix */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-heading text-3xl font-bold text-white uppercase tracking-wider">Deployment Tiers</h2>
          <p className="text-neutral-400 max-w-lg mx-auto text-sm">
            Select a tier matching your calling. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="relative bg-neutral-950/40 border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:border-white/10 transition duration-300">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-neutral-300">Free Observer</h3>
                <div className="flex items-baseline">
                  <span className="font-heading text-4xl font-extrabold text-white">$0</span>
                  <span className="text-neutral-500 ml-1 text-sm">/ forever</span>
                </div>
                <p className="text-neutral-400 text-xs">Essential tracking tools for new creators.</p>
              </div>

              <hr className="border-white/5" />

              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Social Content & Creators leaderboards</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>90-second Top 10 Channels Preview</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3 daily Viral Content ideas</span>
                </li>
                <li className="flex items-center space-x-2.5 text-neutral-600 line-through">
                  <span>Full Products, Events & Issues</span>
                </li>
                <li className="flex items-center space-x-2.5 text-neutral-600 line-through">
                  <span>Campaign Prediction Simulator</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier("free")}
              className="mt-8 w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-white/5 py-2.5 rounded-xl font-bold transition duration-300 cursor-pointer"
            >
              Sign Up Free
            </button>
          </div>

          {/* Pro Tier (Glowing Accent) */}
          <div className="relative bg-neutral-950/60 border border-violet-500/40 rounded-2xl p-8 flex flex-col justify-between shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:border-violet-500/60 transition duration-300">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Most Popular
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-violet-300">Pro Minister</h3>
                <div className="flex items-baseline">
                  <span className="font-heading text-4xl font-extrabold text-white">$29</span>
                  <span className="text-neutral-500 ml-1 text-sm">/ month</span>
                </div>
                <p className="text-neutral-400 text-xs">For active ministries and professional creators.</p>
              </div>

              <hr className="border-white/5" />

              <ul className="space-y-3 text-sm text-neutral-300">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Everything in Free (Unlimited Top 10)</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Unlocks Products, Events & Issues</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>10 daily Viral Content ideas</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Access to Campaign Simulator</span>
                </li>
                <li className="flex items-center space-x-2.5 text-neutral-600 line-through">
                  <span>Churches, Pastors & Denominations</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier("pro")}
              className="mt-8 w-full bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl font-bold shadow-lg shadow-violet-600/30 transition duration-300 cursor-pointer"
            >
              Select Pro
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="relative bg-neutral-950/40 border border-white/5 rounded-2xl p-8 flex flex-col justify-between hover:border-amber-500/20 transition duration-300">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-amber-500 flex items-center space-x-1">
                  <span>Kingdom Suite</span>
                </h3>
                <div className="flex items-baseline">
                  <span className="font-heading text-4xl font-extrabold text-white">$99</span>
                  <span className="text-neutral-500 ml-1 text-sm">/ month</span>
                </div>
                <p className="text-neutral-400 text-xs">Complete analytics suite for denominational networks.</p>
              </div>

              <hr className="border-white/5" />

              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Unlocks Churches, Pastors & Denominations</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>25 daily Viral Content ideas</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>CSV exporter & Priority PDF reports</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Dedicated support line</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectTier("enterprise")}
              className="mt-8 w-full bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 py-2.5 rounded-xl font-bold hover:border-amber-500/40 transition duration-300 cursor-pointer"
            >
              Select Enterprise
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specifications Definition List (GEO-optimized) */}
      <div className="border border-white/5 bg-neutral-950/40 rounded-2xl p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-bold text-white uppercase tracking-wider">Console Specifications</h2>
          <p className="text-neutral-400 text-xs">A machine-readable specifications index for our deployment nodes.</p>
        </div>
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-neutral-400">
          <div className="border-b border-white/5 pb-2">
            <dt className="font-semibold text-white uppercase text-xs tracking-wider">Data Tiers Monitored</dt>
            <dd className="mt-1 text-xs text-neutral-400">Includes Social spikes, leading Creator metrics, viral Products, conferences, cultural Issues, and political currents.</dd>
          </div>
          <div className="border-b border-white/5 pb-2">
            <dt className="font-semibold text-white uppercase text-xs tracking-wider">AI Content Framework</dt>
            <dd className="mt-1 text-xs text-neutral-400">Powered by the Gemini 2.5 Flash model with custom vector synthesis for high-retention scripture outlines and script hooks.</dd>
          </div>
          <div className="border-b border-white/5 pb-2">
            <dt className="font-semibold text-white uppercase text-xs tracking-wider">Simulation Parameters</dt>
            <dd className="mt-1 text-xs text-neutral-400">Calculates Reach Index, optimal posting hours, and sentiment projection curves based on web-grounded LLM predictions.</dd>
          </div>
          <div className="border-b border-white/5 pb-2">
            <dt className="font-semibold text-white uppercase text-xs tracking-wider">Payment Processing</dt>
            <dd className="mt-1 text-xs text-neutral-400">Integrated securely with the PayPal Subscriptions API (vaulted, intent-subscription billing) for seamless upgrades.</dd>
          </div>
        </dl>
      </div>

      {/* Scannable FAQ Section (GEO-optimized) */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">Get answers to the most common queries about Christian Viral Trends.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neutral-950/60 border border-white/5 p-6 rounded-xl space-y-2">
            <h3 className="font-heading text-sm font-bold text-violet-400 uppercase tracking-wider">How do pastors use Christian Viral Trends?</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pastors use the platform to track spiking topics, hashtags, and shifts in faith culture, helping them craft relevant sermons and announcements that directly address their congregation's current interests.
            </p>
          </div>
          <div className="bg-neutral-950/60 border border-white/5 p-6 rounded-xl space-y-2">
            <h3 className="font-heading text-sm font-bold text-violet-400 uppercase tracking-wider">What are the data categories monitored by the console?</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The console monitors multiple faith culture streams including Social, Creators, Products, Events, Issues, Politics, Denominations, Churches, and Pastors.
            </p>
          </div>
          <div className="bg-neutral-950/60 border border-white/5 p-6 rounded-xl space-y-2">
            <h3 className="font-heading text-sm font-bold text-violet-400 uppercase tracking-wider">How does the AI Content Generator assist ministry digital teams?</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The generator creates high-retention video script hooks, sermon outlines, and outlines validated against theological frameworks in custom faith niches.
            </p>
          </div>
          <div className="bg-neutral-950/60 border border-white/5 p-6 rounded-xl space-y-2">
            <h3 className="font-heading text-sm font-bold text-violet-400 uppercase tracking-wider">Can we upgrade or downgrade our deployment node?</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Yes, you can upgrade, downgrade, or cancel your Pro Minister or Kingdom Suite subscription directly at any time through our secure PayPal billing portal.
            </p>
          </div>
        </div>
      </div>

      {/* E-E-A-T Topical Authority Section */}
      <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-500 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 font-bold shrink-0">
            CVT
          </div>
          <div className="text-left">
            <div className="font-bold text-neutral-300">Topical Authority & Authorship</div>
            <p className="text-[11px] opacity-80 mt-0.5">Insights and predictions are structured by the Christian Viral Trends Digital Evangelism Counsel, featuring research from veteran ministry practitioners.</p>
          </div>
        </div>
        <div className="text-[10px] text-neutral-600 uppercase tracking-widest text-right shrink-0">
          E-E-A-T Certified &bull; Generative Engine Optimized
        </div>
      </div>

    </div>
  );
}
