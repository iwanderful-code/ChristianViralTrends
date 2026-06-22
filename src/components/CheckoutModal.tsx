import { useState } from "react";
import { useTrends } from "../context/TrendsContext";
import { X, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, checkoutSelectedTier, checkoutStatus, processPayment } = useTrends();
  
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  if (!isCheckoutOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!cardNumber || !expiry || !cvv || !cardName) {
      setValidationError("Please fill in all credit card parameters.");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length < 16) {
      setValidationError("Invalid card number length.");
      return;
    }

    processPayment();
  };

  const getTierPrice = () => {
    return checkoutSelectedTier === "enterprise" ? "99" : "29";
  };

  const getTierName = () => {
    return checkoutSelectedTier === "enterprise" ? "Kingdom Suite" : "Pro Minister";
  };

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
            className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-white/5 cursor-pointer"
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

              {validationError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-3.5 py-2.5 rounded-lg">
                  {validationError}
                </div>
              )}

              {/* Payment Form */}
              <form onSubmit={handlePay} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="e.g. Samuel Believer"
                    className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-neutral-600" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const formatted = val.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
                        setCardNumber(formatted);
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-neutral-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Expiration Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const formatted = val.slice(0, 4).replace(/(\d{2})(?=\d)/g, "$1/");
                        setExpiry(formatted);
                      }}
                      placeholder="MM/YY"
                      className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white text-center focus:outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">CVV Code</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      placeholder="•••"
                      className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white text-center focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-neutral-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>256-bit SSL encrypted connection. Payment is simulated.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-violet-600/20 transition duration-200 mt-2 cursor-pointer"
                >
                  Process Secure Payment
                </button>
              </form>
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
                  Connecting with Visa/Mastercard processing services. Verifying mock balances...
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
