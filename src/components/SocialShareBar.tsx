import { useState, useEffect } from "react";
import { Link, Check } from "lucide-react";

interface SocialShareBarProps {
  className?: string;
  size?: "sm" | "md";
}

export default function SocialShareBar({ className = "", size = "md" }: SocialShareBarProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => setCopiedText(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [copiedText]);

  const shareUrl = "https://christianviraltrends.com/";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Track the pulse of Christian faith culture and trends in real-time!")}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent("Track the pulse of Christian faith culture and trends in real-time! " + shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Track the pulse of Christian faith culture and trends in real-time!")}`,
  };

  const handleClipboardCopy = (platform: "instagram" | "discord" | "youtube" | "link") => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      if (platform === "instagram") {
        setCopiedText("Link copied! Share it in your Instagram Bio or Stories.");
      } else if (platform === "discord") {
        setCopiedText("Link copied! Send it in your Discord server.");
      } else if (platform === "youtube") {
        setCopiedText("Link copied! Share it on your YouTube channel.");
      } else {
        setCopiedText("Link copied to clipboard!");
      }
    }).catch(() => {
      setCopiedText("Failed to copy link.");
    });
  };

  const btnSizeClass = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className={`relative ${className}`}>
      {/* Toast Notification popup */}
      {copiedText && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-violet-500/30 text-violet-300 text-[10px] font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap animate-fade-in flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
          <span>{copiedText}</span>
        </div>
      )}

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-blue-500/40 text-neutral-400 hover:text-blue-500 transition duration-200 cursor-pointer hover:scale-105 shadow-inner hover:shadow-[0_0_10px_rgba(59,130,246,0.15)]`}
      >
        <svg className={iconSizeClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      </a>

      {/* X (formerly Twitter) */}
      <a
        href={shareLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-white/20 text-neutral-400 hover:text-white transition duration-200 cursor-pointer hover:scale-105 shadow-inner`}
      >
        <svg className={iconSizeClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      {/* Instagram (Copy Link Action) */}
      <button
        onClick={() => handleClipboardCopy("instagram")}
        title="Copy Link for Instagram"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-pink-500/40 text-neutral-400 hover:text-pink-500 transition duration-200 cursor-pointer hover:scale-105 shadow-inner hover:shadow-[0_0_10px_rgba(236,72,153,0.15)]`}
      >
        <svg className={iconSizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </button>

      {/* Discord (Copy Link Action) */}
      <button
        onClick={() => handleClipboardCopy("discord")}
        title="Copy Link for Discord"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-indigo-500/40 text-neutral-400 hover:text-indigo-400 transition duration-200 cursor-pointer hover:scale-105 shadow-inner hover:shadow-[0_0_10px_rgba(99,102,241,0.15)]`}
      >
        <svg className={iconSizeClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
        </svg>
      </button>

      {/* YouTube (Copy Link Action) */}
      <button
        onClick={() => handleClipboardCopy("youtube")}
        title="Copy Link for YouTube"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-red-600/40 text-neutral-400 hover:text-red-500 transition duration-200 cursor-pointer hover:scale-105 shadow-inner hover:shadow-[0_0_10px_rgba(239,68,68,0.15)]`}
      >
        <svg className={iconSizeClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </button>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-emerald-500/40 text-neutral-400 hover:text-emerald-400 transition duration-200 cursor-pointer hover:scale-105 shadow-inner hover:shadow-[0_0_10px_rgba(16,185,129,0.15)]`}
      >
        <svg className={iconSizeClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.167 1.454 4.887 1.455 5.293 0 9.593-4.298 9.596-9.592.002-2.563-1.002-4.97-2.827-6.796-1.825-1.826-4.257-2.83-6.822-2.831-5.296 0-9.6 4.3-9.603 9.6-.001 1.848.494 3.498 1.442 4.973L2.247 21.8l4.4-1.155zM16.89 13.91c-.266-.134-1.583-.78-1.827-.867-.245-.088-.423-.134-.6.134-.176.267-.689.867-.845 1.046-.156.178-.312.2-.578.067-.266-.134-1.127-.416-2.146-1.326-.792-.708-1.328-1.582-1.484-1.848-.156-.266-.016-.41.117-.542.12-.12.266-.31.4-.467.133-.156.177-.267.266-.445.088-.178.044-.334-.022-.467-.066-.133-.6-1.446-.823-1.98-.217-.52-.437-.45-.6-.458-.156-.008-.334-.008-.512-.008s-.467.067-.712.334c-.244.267-.933.912-.933 2.223s.955 2.58 1.088 2.757c.133.178 1.88 2.87 4.554 4.025.637.275 1.134.44 1.522.563.64.203 1.22.175 1.68.107.513-.077 1.583-.647 1.805-1.27.222-.624.222-1.158.156-1.27-.067-.111-.244-.2-.511-.334z"/>
        </svg>
      </a>

      {/* Telegram */}
      <a
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Telegram"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-sky-500/40 text-neutral-400 hover:text-sky-400 transition duration-200 cursor-pointer hover:scale-105 shadow-inner hover:shadow-[0_0_10px_rgba(56,189,248,0.15)]`}
      >
        <svg className={iconSizeClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
        </svg>
      </a>

      {/* Copy Link Only */}
      <button
        onClick={() => handleClipboardCopy("link")}
        title="Copy Site Link"
        className={`${btnSizeClass} flex items-center justify-center rounded-lg bg-neutral-950 border border-white/5 hover:border-violet-500/40 text-neutral-400 hover:text-violet-400 transition duration-200 cursor-pointer hover:scale-105 shadow-inner hover:shadow-[0_0_10px_rgba(139,92,246,0.15)]`}
      >
        <Link className={iconSizeClass} />
      </button>
    </div>
  );
}
