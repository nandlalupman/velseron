"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ToastContainer } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <div data-metal="gold">
      <ToastContainer />
      <section className="pt-32 pb-section bg-premium-0 min-h-screen">
        <div className="max-w-[var(--grid-max)] mx-auto px-[var(--grid-gutter)]">
          <Reveal>
            <p className="font-mono-label text-gold-500 text-[10px] mb-3">CHECKOUT</p>
            <h1
              className="font-[family-name:var(--font-display)] text-ivory mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Checkout
            </h1>
          </Reveal>

          {/* Progress steps */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-8" role="navigation" aria-label="Checkout steps">
              <StepIndicator number={1} label="Details" active={step >= 1} completed={step > 1} />
              <StepLine active={step >= 2} />
              <StepIndicator number={2} label="Shipping" active={step >= 2} completed={step > 2} />
              <StepLine active={step >= 3} />
              <StepIndicator number={3} label="Payment" active={step >= 3} completed={step > 3} />
              <StepLine active={step >= 4} />
              <StepIndicator number={4} label="Review" active={step >= 4} />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              {/* Main form */}
              <div>
                {step === 1 && <ContactDetailsForm onNext={() => setStep(2)} />}
                {step === 2 && <ShippingForm onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && <PaymentForm onNext={() => setStep(4)} onBack={() => setStep(2)} />}
                {step === 4 && <ReviewOrder onBack={() => setStep(3)} />}
              </div>

              {/* Order summary sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                <OrderSummary />
              </div>
            </div>
          </Reveal>
        </div>
      </section>    </div>
  );
}

function StepIndicator({ number, label, active, completed }: { number: number; label: string; active: boolean; completed?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`
        w-10 h-10 flex items-center justify-center rounded-full border-2 text-[11px] font-medium transition-all
        ${completed ? "bg-gold-500 border-gold-500 text-ink-0" : active ? "border-gold-500 text-gold-500" : "border-line text-ivory-mute/40"}
      `}>
        {completed ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          number
        )}
      </div>
      <span className={`font-mono-label text-[9px] ${active ? "text-ivory" : "text-ivory-mute/40"}`}>
        {label}
      </span>
    </div>
  );
}

function StepLine({ active }: { active: boolean }) {
  return (
    <div className={`w-16 h-0.5 transition-colors ${active ? "bg-gold-500" : "bg-line"}`} />
  );
}

function ContactDetailsForm({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) {
  return (
    <div className="space-y-6">
      <div className="p-6 border border-line rounded-[var(--radius-sharp)] bg-surface">
        <h2 className="font-display text-ivory mb-6" style={{ fontSize: "1.5rem" }}>Contact Details</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="font-mono-label text-ivory-mute text-[10px] block mb-2">FIRST NAME</label>
              <input id="firstName" type="text" required className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="First name" />
            </div>
            <div>
              <label htmlFor="lastName" className="font-mono-label text-ivory-mute text-[10px] block mb-2">LAST NAME</label>
              <input id="lastName" type="text" required className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="Last name" />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="font-mono-label text-ivory-mute text-[10px] block mb-2">EMAIL</label>
            <input id="email" type="email" required className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="you@email.com" />
          </div>
          
          <div>
            <label htmlFor="phone" className="font-mono-label text-ivory-mute text-[10px] block mb-2">PHONE</label>
            <input id="phone" type="tel" required className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="+91 XXXXX XXXXX" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={onNext}>Continue to shipping</Button>
      </div>
    </div>
  );
}

function ShippingForm({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="p-6 border border-line rounded-[var(--radius-sharp)] bg-surface">
        <h2 className="font-display text-ivory mb-6" style={{ fontSize: "1.5rem" }}>Shipping Address</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="address1" className="font-mono-label text-ivory-mute text-[10px] block mb-2">ADDRESS LINE 1</label>
              <input id="address1" type="text" required className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="House/Flat/Building" />
            </div>
            <div>
              <label htmlFor="address2" className="font-mono-label text-ivory-mute text-[10px] block mb-2">ADDRESS LINE 2</label>
              <input id="address2" type="text" className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="Area/Landmark (optional)" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="font-mono-label text-ivory-mute text-[10px] block mb-2">CITY</label>
              <input id="city" type="text" required className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="City" />
            </div>
            <div>
              <label htmlFor="state" className="font-mono-label text-ivory-mute text-[10px] block mb-2">STATE</label>
              <select id="state" required className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] focus:outline-none focus:border-gold-500">
                <option value="">Select state</option>
                <option value="MH">Maharashtra</option>
                <option value="DL">Delhi</option>
                <option value="KA">Karnataka</option>
                <option value="TG">Telangana</option>
                <option value="GJ">Gujarat</option>
                <option value="RJ">Rajasthan</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="WB">West Bengal</option>
              </select>
            </div>
            <div>
              <label htmlFor="pincode" className="font-mono-label text-ivory-mute text-[10px] block mb-2">PINCODE</label>
              <input id="pincode" type="text" required maxLength={6} pattern="[0-9]{6}" className="w-full px-4 py-3 bg-surface-elevated border border-line text-ivory text-sm rounded-[var(--radius-sharp)] placeholder:text-ivory-mute/40 focus:outline-none focus:border-gold-500" placeholder="110001" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="secondary" size="lg" onClick={onBack}>Back</Button>
        <Button variant="primary" size="lg" onClick={onNext}>Continue to payment</Button>
      </div>
    </div>
  );
}

function PaymentForm({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");

  return (
    <div className="space-y-6">
      <div className="p-6 border border-line rounded-[var(--radius-sharp)] bg-surface">
        <h2 className="font-display text-ivory mb-6" style={{ fontSize: "1.5rem" }}>Payment Method</h2>
        
        <div className="space-y-3 mb-6">
          {(["upi", "card", "netbanking"] as const).map((m) => (
            <label key={m} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={m}
                checked={method === m}
                onChange={() => setMethod(m)}
                className="accent-gold-500"
              />
              <span className="text-ivory capitalize">{m === "upi" ? "UPI" : m === "card" ? "Card" : "Net Banking"}</span>
            </label>
          ))}
        </div>

        <div className="p-4 border border-line rounded-[var(--radius-sharp)] bg-surface-elevated">
          <p className="font-mono-label text-ivory-mute text-[10px] mb-2">SECURE CHECKOUT</p>
          <p className="text-ivory-mute text-sm">
            You will be redirected to our secure payment partner to complete the transaction. 
            Your card details are never stored on our servers. All transactions are PCI-DSS compliant.
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="secondary" size="lg" onClick={onBack}>Back</Button>
        <Button variant="primary" size="lg" onClick={onNext}>Continue to review</Button>
      </div>
    </div>
  );
}

function ReviewOrder({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="p-6 border border-line rounded-[var(--radius-sharp)] bg-surface">
        <h2 className="font-display text-ivory mb-6" style={{ fontSize: "1.5rem" }}>Review Your Order</h2>
        
        <div className="space-y-4 text-sm">
          <div className="p-4 bg-surface-elevated border border-line rounded-[var(--radius-sharp)]">
            <p className="font-mono-label text-ivory-mute text-[10px] mb-1">CONTACT</p>
            <p className="text-ivory">Amit Sharma · amit@email.com · +91 98765 43210</p>
          </div>
          
          <div className="p-4 bg-surface-elevated border border-line rounded-[var(--radius-sharp)]">
            <p className="font-mono-label text-ivory-mute text-[10px] mb-1">SHIPPING</p>
            <p className="text-ivory">123 MG Road, Bangalore · 560001 · Karnataka</p>
          </div>
          
          <div className="p-4 bg-surface-elevated border border-line rounded-[var(--radius-sharp)]">
            <p className="font-mono-label text-ivory-mute text-[10px] mb-1">PAYMENT</p>
            <p className="text-ivory">UPI · Secure payment via Razorpay</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-2 border-gold-500/30 rounded-[var(--radius-sharp)] bg-gold-600/5">
        <p className="font-mono-label text-gold-500 text-[10px] mb-2">IMPORTANT</p>
        <p className="text-ivory-mute text-sm">
          This is a placeholder checkout. No real payment will be processed. 
          No data will be stored or transmitted. Click "Place Order" to see the confirmation mock.
        </p>
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="secondary" size="lg" onClick={onBack}>Back</Button>
        <Button variant="primary" size="lg">Place Order (Demo)</Button>
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="border border-gold-700/30 rounded-[var(--radius-sharp)] p-6 bg-premium-0">
      <h2 className="font-mono-label text-ivory mb-4 text-[10px]">ORDER SUMMARY</h2>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-ivory-mute text-sm">
          <span>Lakshmi 10g Gold Coin × 1</span>
          <span className="tabular-nums">₹84,500</span>
        </div>
        <div className="flex justify-between text-ivory-mute text-sm">
          <span>Ganesha 1oz Silver Coin × 1</span>
          <span className="tabular-nums">₹3,200</span>
        </div>
      </div>
      <div className="hairline mb-4" />
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-ivory-mute text-sm">
          <span>Subtotal</span>
          <span className="tabular-nums">₹87,700</span>
        </div>
        <div className="flex justify-between text-ivory-mute text-sm">
          <span>Shipping</span>
          <span className="text-gold-400">Free (Insured)</span>
        </div>
        <div className="flex justify-between text-ivory-mute text-sm">
          <span>Tax (Placeholder)</span>
          <span className="tabular-nums">₹0</span>
        </div>
      </div>
      <div className="hairline mb-4" />
      <div className="flex justify-between text-ivory font-medium text-lg">
        <span>Total</span>
        <span className="tabular-nums text-gold-400">₹87,700</span>
      </div>
      <p className="font-mono-label text-ivory-mute/40 text-[9px] mt-3 text-center">
        PLACEHOLDER PRICES · NOT A REAL TRANSACTION
      </p>
    </div>
  );
}
