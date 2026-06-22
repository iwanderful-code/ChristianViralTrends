import { useState } from "react";
import { useTrends } from "../context/TrendsContext";
import { X, Key, ShieldCheck, Eye, EyeOff, ExternalLink } from "lucide-react";

export default function SettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, geminiApiKey, setGeminiApiKey } = useTrends();
  const [apiKeyInput, setApiKeyInput] = useState<string>(geminiApiKey);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isSettingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKeyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsSettingsOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Glow border top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 to-rose-650"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsSettingsOpen(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-white/5 cursor-pointer transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Key className="w-5 h-5 text-violet-400" />
              <span>Console Settings</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Configure your developer settings and models below.
            </p>
          </div>

          {savedSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-2.5 rounded-lg text-center animate-fade-in font-semibold">
              Settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                <label>Gemini API Key</label>
                <a
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:underline flex items-center gap-1 cursor-pointer normal-case font-medium"
                >
                  Get key in AI Studio <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Paste your API key here..."
                  className="w-full bg-neutral-900 border border-white/5 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3.5 top-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-neutral-500 pt-1 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
              <span>Keys are saved locally in your browser storage and never uploaded to external servers.</span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 bg-neutral-900 hover:bg-neutral-850 text-white border border-white/5 py-2.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl text-xs font-bold uppercase shadow-lg shadow-violet-600/10 transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
