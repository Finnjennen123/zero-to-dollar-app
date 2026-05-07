import React from 'react';
import Link from 'next/link';
import { GUIDE_CONTENT } from '../../_lib/guideData';

export function GuideTab() {
  return (
    <div className="w-full max-w-3xl animate-fade-in pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {GUIDE_CONTENT.headline}
        </h2>
        <p className="text-text-secondary">
          {GUIDE_CONTENT.subtitle}
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-border-base rounded-[24px] p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-coral/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <span className="text-[10px] font-bold text-primary-coral uppercase tracking-widest mb-8 block">
            {GUIDE_CONTENT.eyebrow}
          </span>

          <div className="space-y-12 mb-12">
            {GUIDE_CONTENT.steps.map((step, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="font-display text-4xl text-primary-coral/20 shrink-0 select-none">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border-base/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="font-medium text-text-primary text-center sm:text-left">
              {GUIDE_CONTENT.footerLine}
            </p>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-text-primary text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-text-primary/10 hover:bg-text-secondary transition-all text-center"
            >
              Keep building
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
