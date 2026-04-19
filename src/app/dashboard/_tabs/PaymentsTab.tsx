"use client";

import React from "react";
import { usePage } from "../../_state/PageContext";
import { THEMES } from "../../_lib/themes";
import { Toggle } from "../../_components/Toggle";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

export function PaymentsTab() {
  const { data, setPayments } = usePage();
  const selectedTheme = THEMES.find(t => t.id === data.appearance.themeId) || THEMES[0];

  return (
    <div className="w-full max-w-[640px] px-2 py-4 pb-32">
      <div className="mb-8">
        <h1 className="font-display text-3xl mb-2 text-text-primary tracking-tight">Accept payments</h1>
        <p className="text-text-muted text-sm leading-relaxed">
          Add a Stripe payment link and your visitors will see a prominent button on your page.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-text-primary">Stripe Payment Link URL</label>
              <a 
                href="https://stripe.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-wider text-primary-coral flex items-center gap-1 hover:underline"
              >
                Go to Stripe <HiArrowTopRightOnSquare />
              </a>
            </div>
            <input 
              type="text" 
              placeholder="https://buy.stripe.com/..."
              value={data.payments.stripeUrl}
              onChange={(e) => setPayments({ stripeUrl: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all font-medium"
            />
            <p className="text-[11px] text-text-muted ml-1">
              Create a payment link in your Stripe dashboard, then paste the URL here.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-primary px-1">Button Label</label>
            <input 
              type="text" 
              maxLength={40}
              placeholder="e.g. Buy me a coffee, Support my work"
              value={data.payments.buttonLabel}
              onChange={(e) => setPayments({ buttonLabel: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all font-medium"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-dashboard-bg rounded-2xl border border-border-base">
            <div>
              <p className="text-sm font-bold text-text-primary">Show payment button on my page</p>
              <p className="text-xs text-text-muted">The button will only appear if a valid URL is provided.</p>
            </div>
            <Toggle 
              enabled={data.payments.showButton} 
              onChange={(val) => setPayments({ showButton: val })} 
            />
          </div>
        </section>

        {/* Mini Preview */}
        <section className="pt-8 border-t border-border-base">
          <h3 className="text-sm font-bold text-text-primary px-1 mb-6 uppercase tracking-wider opacity-60">Mini Preview</h3>
          <div className="p-12 bg-white rounded-3xl border border-border-base flex items-center justify-center shadow-inner">
            <div 
              className="w-full py-4 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all max-w-[320px]"
              style={{ 
                backgroundColor: selectedTheme.accent,
                color: 'white',
                boxShadow: `0 8px 32px ${selectedTheme.accentSoft}`
              }}
            >
              <FaHeart className="text-yellow-300 transform scale-110" />
              <span>{data.payments.buttonLabel || "Support my work"}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
