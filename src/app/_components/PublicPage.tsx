"use client";

import React from "react";
import { ProfileData, LinkItem, AppearanceData, PaymentsData } from "../_state/PageContext";
import { THEMES } from "../_lib/themes";
import { BACKGROUND_PRESETS, isDarkBackground } from "../_lib/backgrounds";
import { detectPlatform } from "../_lib/platforms";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

interface PublicPageProps {
  profile: ProfileData;
  links: LinkItem[];
  appearance: AppearanceData;
  payments: PaymentsData;
  animate?: boolean;
  interactive?: boolean;
}

export function PublicPage({
  profile,
  links,
  appearance,
  payments,
  animate = true,
  interactive = true,
}: PublicPageProps) {
  const selectedTheme = THEMES.find((t) => t.id === appearance.themeId) || THEMES[0];
  const isDark = isDarkBackground(appearance.backgroundId);
  const background = appearance.backgroundId === "custom-image" 
    ? `url(${appearance.customBg}) center/cover no-repeat` 
    : appearance.backgroundId === "solid" 
      ? appearance.customBg 
      : BACKGROUND_PRESETS.find(b => b.id === appearance.backgroundId)?.value || BACKGROUND_PRESETS[0].value;

  const activeLinks = links.filter((l) => l.visible);

  const containerStyle = {
    background: background.includes("url") ? background : background,
    minHeight: "100%",
  };

  const textPrimary = isDark ? "text-[#FAFAFA]" : "text-[#1A1A1A]";
  const textSecondary = isDark ? "text-[#CCCCCC]" : "text-[#4A4A4A]";
  const cardBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.85)";
  const cardBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.5)";

  return (
    <div style={containerStyle} className="w-full h-full min-h-screen pt-12 pb-20 px-5 flex flex-col items-center">
      <div className="max-w-[480px] w-full flex flex-col items-center">
        {/* Avatar */}
        <div 
          className={`w-[88px] h-[88px] rounded-full border-[3px] border-white shadow-lg overflow-hidden mb-6 ${animate ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '0ms' }}
        >
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.displayName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
               Avatar
            </div>
          )}
        </div>

        {/* Name */}
        <h1 
          className={`font-display text-2xl md:text-3xl lg:text-4xl text-center leading-tight tracking-tight mb-3 ${textPrimary} ${animate ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '100ms' }}
        >
          {profile.displayName}
        </h1>

        {/* Bio */}
        <p 
          className={`text-base text-center leading-relaxed max-w-[380px] mb-6 ${textSecondary} ${animate ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '200ms' }}
        >
          {profile.bio}
        </p>

        {/* Social Icons */}
        <div 
          className={`flex flex-wrap justify-center gap-4 mb-8 ${animate ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '300ms' }}
        >
          {Object.entries(profile.social).map(([key, value]) => {
            if (!value) return null;
            const platform = detectPlatform(value);
            const Icon = platform.icon;
            const href = key === 'email' ? `mailto:${value}` : value;
            
            return (
              <a
                key={key}
                href={interactive ? href : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-transform hover:scale-110 ${textPrimary}`}
                style={{ pointerEvents: interactive ? 'auto' : 'none' }}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {/* Links */}
        <div className="w-full flex flex-col gap-3 mb-10">
          {activeLinks.map((link, index) => {
            const platform = detectPlatform(link.url);
            const Icon = platform.icon;
            
            return (
              <a
                key={link.id}
                href={interactive ? link.url : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-card group relative flex items-center w-full p-4 rounded-2xl border backdrop-blur-md shadow-sm overflow-hidden ${animate ? 'animate-fade-up' : ''}`}
                style={{ 
                  animationDelay: `${400 + (index * 80)}ms`,
                  backgroundColor: cardBg,
                  borderColor: cardBorder,
                  pointerEvents: interactive ? 'auto' : 'none'
                }}
              >
                <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${textSecondary}`}>
                  {link.emoji ? (
                    <span className="text-xl leading-none">{link.emoji}</span>
                  ) : (
                    <Icon size={20} />
                  )}
                </div>
                <div className="flex-1 text-center font-medium pr-10">
                  <span className={textPrimary}>{link.title}</span>
                </div>
                <div className={`absolute right-5 opacity-40 transition-opacity group-hover:opacity-100 ${textSecondary}`}>
                  <HiArrowUpRight size={14} />
                </div>
              </a>
            );
          })}
        </div>

        {/* Extra Text */}
        {profile.extraText && (
          <p className={`text-sm text-center leading-relaxed mb-8 max-w-[380px] ${textSecondary}`}>
            {profile.extraText}
          </p>
        )}

        {/* Extra Photo */}
        {profile.extraPhoto && (
          <div className="w-full rounded-2xl overflow-hidden mb-12 shadow-sm">
            <img src={profile.extraPhoto} alt="Extra" className="w-full object-cover" />
          </div>
        )}

        {/* Publications */}
        {profile.publications.length > 0 && (
          <div className="w-full flex flex-col items-center mb-12">
            <h2 className={`text-[10px] uppercase tracking-[0.1em] opacity-60 mb-4 font-semibold ${textPrimary}`}>
              Featured in
            </h2>
            <div className="flex flex-col items-center gap-3">
              {profile.publications.map((pub) => (
                <a
                  key={pub.id}
                  href={interactive ? pub.url : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm border-b border-current pb-0.5 opacity-80 hover:opacity-100 transition-opacity ${textPrimary}`}
                  style={{ pointerEvents: interactive ? 'auto' : 'none' }}
                >
                  {pub.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Payment Button */}
        {payments.stripeUrl && payments.showButton && (
          <a
            href={interactive ? payments.stripeUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] mt-4"
            style={{ 
              backgroundColor: selectedTheme.accent,
              color: 'white',
              boxShadow: `0 8px 24px ${selectedTheme.accentSoft}`,
              pointerEvents: interactive ? 'auto' : 'none'
            }}
          >
            <FaHeart className="text-yellow-300" />
            <span>{payments.buttonLabel || "Support my work"}</span>
          </a>
        )}

        {/* Footer Brand */}
        <div className="mt-16 mb-8 text-center opacity-40">
          <span className={`font-display text-xl ${textPrimary}`}>corner</span>
        </div>
      </div>
    </div>
  );
}
