"use client";

import React, { useRef } from "react";
import { usePage } from "../../_state/PageContext";
import { 
  HiOutlineUser, 
  HiOutlineTrash, 
  HiOutlinePlus,
  HiOutlinePhoto
} from "react-icons/hi2";
import { PLATFORMS } from "../../_lib/platforms";

export function ProfileTab() {
  const { data, setProfile, setSocial, addPublication, updatePublication, deletePublication } = usePage();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const extraPhotoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "extraPhoto") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setProfile({ [type]: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const socialPlatforms = PLATFORMS.filter(p => p.key !== 'website' && p.key !== 'email');

  return (
    <div className="w-full max-w-[640px] px-2 py-4 pb-32">
      <div className="mb-8">
        <h1 className="font-display text-3xl mb-2 text-text-primary tracking-tight">Your profile</h1>
        <p className="text-text-muted text-sm leading-relaxed">
          Tell the world about yourself and where to find you.
        </p>
      </div>

      <div className="space-y-10">
        {/* Avatar Section */}
        <section className="flex flex-col items-center">
          <div 
            onClick={() => avatarInputRef.current?.click()}
            className="w-24 h-24 rounded-full bg-dashboard-bg border-4 border-white shadow-md overflow-hidden cursor-pointer group relative"
          >
            {data.profile.avatar ? (
              <img src={data.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted bg-dashboard-bg group-hover:bg-border-base transition-colors">
                <HiOutlineUser size={32} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <HiOutlinePhoto size={24} className="text-white" />
            </div>
          </div>
          <input 
            type="file" 
            ref={avatarInputRef} 
            onChange={(e) => handleImageUpload(e, 'avatar')}
            accept="image/*"
            className="hidden" 
          />
          <p className="mt-3 text-xs font-medium text-text-muted">Square images look best.</p>
        </section>

        {/* Basic Info */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-text-primary">Display Name</label>
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                {data.profile.displayName.length}/40
              </span>
            </div>
            <input 
              type="text" 
              maxLength={40}
              value={data.profile.displayName}
              onChange={(e) => setProfile({ displayName: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all font-medium"
              placeholder="e.g. Maya Bloom"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-text-primary">Bio</label>
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                {data.profile.bio.length}/200
              </span>
            </div>
            <textarea 
              rows={3}
              maxLength={200}
              value={data.profile.bio}
              onChange={(e) => setProfile({ bio: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all font-medium resize-none"
              placeholder="Tell us a bit about what you do..."
            />
          </div>
        </section>

        {/* Social Profiles */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-text-primary px-1">Social Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.key} className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                    <Icon size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder={`${platform.name} URL`}
                    value={(data.profile.social as any)[platform.key] || ""}
                    onChange={(e) => setSocial({ [platform.key]: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all text-sm font-medium"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Extra Info */}
        <section className="space-y-6 pt-4 border-t border-border-base">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-text-primary">Extra Text Section (Optional)</label>
              <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                {data.profile.extraText.length}/500
              </span>
            </div>
            <p className="text-xs text-text-muted px-1 mb-2">This appears below your links.</p>
            <textarea 
              rows={4}
              maxLength={500}
              value={data.profile.extraText}
              onChange={(e) => setProfile({ extraText: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all font-medium resize-none"
              placeholder="Any additional messages or info..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text-primary px-1">Extra Photo (Optional)</label>
            <div 
              onClick={() => extraPhotoInputRef.current?.click()}
              className="w-full h-48 rounded-2xl bg-dashboard-bg border-2 border-dashed border-border-base flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-primary-coral/30 transition-all overflow-hidden"
            >
              {data.profile.extraPhoto ? (
                <img src={data.profile.extraPhoto} alt="Extra" className="w-full h-full object-cover" />
              ) : (
                <>
                  <HiOutlinePhoto size={32} className="text-text-muted mb-2 opacity-40" />
                  <p className="text-xs font-bold text-text-muted">Upload a featured image</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              ref={extraPhotoInputRef} 
              onChange={(e) => handleImageUpload(e, 'extraPhoto')}
              accept="image/*"
              className="hidden" 
            />
          </div>
        </section>

        {/* Publications */}
        <section className="space-y-6 pt-4 border-t border-border-base">
          <div className="px-1 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Publications / Press</h3>
              <p className="text-xs text-text-muted">Highlight where you&apos;ve been featured.</p>
            </div>
            <button
              onClick={() => addPublication({ title: "", url: "" })}
              disabled={data.profile.publications.length >= 10}
              className="text-primary-coral p-2 hover:bg-primary-coral/10 rounded-full transition-colors disabled:opacity-30"
            >
              <HiOutlinePlus size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="space-y-3">
            {data.profile.publications.map((pub) => (
              <div key={pub.id} className="flex gap-3 items-start animate-fade-up">
                <div className="flex-1 space-y-2">
                  <input 
                    type="text" 
                    placeholder="Publication Title"
                    value={pub.title}
                    onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all text-sm font-medium"
                  />
                  <input 
                    type="text" 
                    placeholder="Article URL"
                    value={pub.url}
                    onChange={(e) => updatePublication(pub.id, { url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border-base focus:ring-2 focus:ring-primary-coral focus:border-transparent outline-none transition-all text-sm font-medium"
                  />
                </div>
                <button
                  onClick={() => deletePublication(pub.id)}
                  className="p-2.5 text-text-muted hover:text-error transition-colors mt-2"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
