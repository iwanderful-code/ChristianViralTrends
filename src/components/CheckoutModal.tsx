import { useState, useEffect, useRef } from "react";
import { useTrends } from "../context/TrendsContext";
import { X, CreditCard, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    checkoutSelectedTier, 
    checkoutStatus, 
    processPayment,
    completePaypalPayment,
    completeRazorpayPayment
  } = useTrends();
  
  const [sdkReady, setSdkReady] = useState<boolean>(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "razorpay">("paypal");
  const [razorpayReady, setRazorpayReady] = useState<boolean>(false);
  
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const razorpayContainerRef = useRef<HTMLDivElement>(null);

  const getTierPrice = () => {
    return checkoutSelectedTier === "enterprise" ? "99.00" : "29.00";
  };

  const getTierName = () => {
    return checkoutSelectedTier === "enterprise" ? "Kingdom Suite" : "Pro Minister";
  };

  // PayPal SDK Loader Effect
  useEffect(() => {
    if (!isCheckoutOpen || paymentMethod !== "paypal") return;
    
    setSdkReady(false);
    setPaypalError(null);
    
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "BAAEEHI1XbuD23YS7U4jMI8twK6ImLgmXEUixOsnZdBeJ8YgnDzrB-8lVz2n8Zmb8gTJ2is4I686Z8GaJk";
    const scriptId = "paypal-sdk-script";
    const scriptSrc = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
    
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (script && script.src !== scriptSrc) {
      script.remove();
      if (window.paypal) {
        delete window.paypal;
      }
      script = null;
    }
    
    const renderPaypalButtons = () => {
      if (!window.paypal || !paypalContainerRef.current) return;
      paypalContainerRef.current.innerHTML = "";
      
      window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "subscribe"
        },
        createSubscription: (_data: any, actions: any) => {
          const planId = checkoutSelectedTier === "enterprise"
            ? (import.meta.env.VITE_PAYPAL_ENTERPRISE_PLAN_ID || "P-95R13263FL1048301NI4UZSQ")
            : (import.meta.env.VITE_PAYPAL_PRO_PLAN_ID || "P-0R172655R1958001TNI4UU7Y");
          return actions.subscription.create({
            plan_id: planId
          });
        },
        onApprove: async (data: any, _actions: any) => {
          setPaypalError(null);
          try {
            await completePaypalPayment(data);
          } catch (err: any) {
            setPaypalError(err.message || "Failed to finalize subscription.");
          }
        },
        onError: (err: any) => {
          console.error("PayPal SDK error:", err);
          setPaypalError("An error occurred with PayPal subscription. Please try again.");
        }
      }).render(paypalContainerRef.current).catch((err: any) => {
        console.error("PayPal render error:", err);
      });
      
      setSdkReady(true);
    };

    if (script) {
      if (window.paypal) {
        const timer = setTimeout(renderPaypalButtons, 100);
        return () => clearTimeout(timer);
      } else {
        script.addEventListener("load", renderPaypalButtons);
      }
    } else {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true;
      script.addEventListener("load", renderPaypalButtons);
      document.body.appendChild(script);
    }
    
    return () => {
      if (script) {
        script.removeEventListener("load", renderPaypalButtons);
      }
    };
  }, [isCheckoutOpen, checkoutSelectedTier, paymentMethod]);

  // Razorpay SDK Button Loader Effect
  useEffect(() => {
    if (!isCheckoutOpen || paymentMethod !== "razorpay") return;

    setRazorpayReady(false);
    
    const scriptSrc = "https://cdn.razorpay.com/static/widget/subscription-button.js";
    const scriptId = "razorpay-sdk-script";
    
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    const initializeRazorpayButton = () => {
      if (!razorpayContainerRef.current) return;
      razorpayContainerRef.current.innerHTML = "";
      
      const form = document.createElement("form");
      form.id = "razorpay-form";
      
      const btnScript = document.createElement("script");
      btnScript.src = scriptSrc;
      
      const buttonId = checkoutSelectedTier === "enterprise"
        ? (import.meta.env.VITE_RAZORPAY_ENTERPRISE_BUTTON_ID || "pl_T6cF9Fsuzjdiea")
        : (import.meta.env.VITE_RAZORPAY_PRO_BUTTON_ID || "pl_T6cI7Vz6ZWCHTo");
        
      btnScript.setAttribute("data-subscription_button_id", buttonId);
      btnScript.setAttribute("data-button_theme", "brand-color");
      btnScript.async = true;
      
      btnScript.addEventListener("load", () => {
        setRazorpayReady(true);
      });
      
      form.appendChild(btnScript);
      razorpayContainerRef.current.appendChild(form);
      
      // Intercept Razorpay's programmatic form submission to handle SPA upgrade
      form.submit = () => {
        const paymentId = (form.querySelector('input[name="razorpay_payment_id"]') as HTMLInputElement)?.value || "rzp_test_mocked_id";
        console.log("Razorpay subscription form submitted. Payment ID:", paymentId);
        completeRazorpayPayment({ razorpay_payment_id: paymentId });
      };
    };

    // If script is already in the document, we can initialize straight away
    // Wait a tiny tick to ensure ref is mounted
    if (script) {
      const timer = setTimeout(initializeRazorpayButton, 100);
      return () => clearTimeout(timer);
    } else {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true;
      script.addEventListener("load", initializeRazorpayButton);
      document.body.appendChild(script);
    }
    
    return () => {
      if (script) {
        script.removeEventListener("load", initializeRazorpayButton);
      }
    };
  }, [isCheckoutOpen, paymentMethod, checkoutSelectedTier]);

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className={`relative w-full max-w-md bg-neutral-950 border rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
          checkoutStatus === "authorizing" 
            ? "border-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.25)] animate-pulse" 
            : "border-white/10"
        }`}
      >
        {/* Close Button */}
        {checkoutStatus === "idle" && (
          <button
            onClick={closeCheckout}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-white/5 cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>
        )}
 
        {/* Content Views */}
        <div className="p-8">
          {checkoutStatus === "idle" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <h2 className="font-heading text-xl font-bold text-white uppercase tracking-wider">Secure Checkout</h2>
                <p className="text-xs text-neutral-400">Upgrade to unlock advanced faith culture analytics.</p>
              </div>
 
              {/* Order summary */}
              <div className="bg-neutral-900/60 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-500 uppercase font-semibold">Selected Tier</div>
                  <div className="text-sm font-bold text-white">{getTierName()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-500 uppercase font-semibold">Total Due</div>
                  <div className="text-base font-extrabold text-violet-400">${getTierPrice()}/mo</div>
                </div>
              </div>
 
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    paymentMethod === "paypal"
                      ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-md shadow-amber-500/5"
                      : "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>PayPal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    paymentMethod === "razorpay"
                      ? "bg-violet-600/10 border-violet-500 text-violet-400 shadow-md shadow-violet-500/5"
                      : "bg-neutral-900 border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>Razorpay</span>
                </button>
              </div>

              {/* Gateway Containers */}
              <div className="space-y-4">
                {paymentMethod === "paypal" ? (
                  <>
                    <div className={`relative min-h-[150px] z-10 ${sdkReady ? "" : "hidden"}`}>
                      <div ref={paypalContainerRef} className="w-full"></div>
                    </div>
                    
                    {!sdkReady && (
                      <div className="py-12 flex flex-col items-center justify-center space-y-3">
                        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                        <p className="text-neutral-400 text-xs">Initializing secure PayPal gateway...</p>
                      </div>
                    )}
                    
                    {paypalError && (
                      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-3.5 py-2.5 rounded-lg text-center">
                        {paypalError}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 text-[10px] text-neutral-500 pt-2 border-t border-white/5">
                      <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>256-bit SSL encrypted connection. Powered by PayPal.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`relative min-h-[100px] z-10 flex justify-center items-center ${razorpayReady ? "" : "hidden"}`}>
                      <div ref={razorpayContainerRef} className="w-full flex justify-center razorpay-btn-wrapper"></div>
                    </div>
                    
                    {!razorpayReady && (
                      <div className="py-12 flex flex-col items-center justify-center space-y-3">
                        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                        <p className="text-neutral-400 text-xs">Initializing secure Razorpay gateway...</p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 text-[10px] text-neutral-500 pt-2 border-t border-white/5">
                      <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>256-bit SSL encrypted connection. Powered by Razorpay.</span>
                    </div>
                  </>
                )}
              </div>

              {/* Demo Quick Checkout Bypass */}
              <div className="pt-4 border-t border-white/5 text-center">
                <button
                  onClick={() => {
                    setPaypalError(null);
                    processPayment();
                  }}
                  className="text-neutral-600 hover:text-neutral-400 text-[10px] uppercase font-bold tracking-wider transition cursor-pointer"
                >
                  Simulate Quick Checkout (Demo Bypass)
                </button>
              </div>
            </div>
          )}
 
          {checkoutStatus === "authorizing" && (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full border-2 border-violet-500/10 border-t-violet-500 animate-spin"></div>
                <div className="bg-neutral-900 rounded-full p-4 border border-violet-500/20">
                  <CreditCard className="w-8 h-8 text-violet-400" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">Authorizing Transaction</h3>
                <p className="text-neutral-400 text-xs max-w-xs mx-auto leading-relaxed">
                  Connecting with processing services. Capturing payment details...
                </p>
              </div>
            </div>
          )}
 
          {checkoutStatus === "success" && (
            <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center animate-fade-in">
              <div className="bg-emerald-500/10 rounded-full p-4 border border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">Payment Approved</h3>
                <p className="text-neutral-400 text-xs max-w-xs mx-auto leading-relaxed">
                  Your node subscription has been updated. Unlocking the trends cockpit dashboard...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
