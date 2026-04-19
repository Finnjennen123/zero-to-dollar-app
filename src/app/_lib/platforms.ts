import {
  FaInstagram, FaTiktok, FaYoutube, FaFacebook, FaLinkedin, FaSpotify,
  FaSnapchatGhost, FaPinterest, FaTwitch, FaGithub, FaSoundcloud,
  FaDiscord, FaTelegram, FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiOnlyfans, SiApplemusic, SiThreads, SiSubstack } from "react-icons/si";
import { HiOutlineEnvelope, HiOutlineLink } from "react-icons/hi2";
import { IconType } from "react-icons";

export interface Platform {
  key: string;
  name: string;
  icon: IconType;
  color: string;
  match: (url: string) => boolean;
}

export const PLATFORMS: Platform[] = [
  {
    key: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    color: "#E4405F",
    match: (url) => url.toLowerCase().includes("instagram.com"),
  },
  {
    key: "tiktok",
    name: "TikTok",
    icon: FaTiktok,
    color: "#000000",
    match: (url) => url.toLowerCase().includes("tiktok.com"),
  },
  {
    key: "youtube",
    name: "YouTube",
    icon: FaYoutube,
    color: "#FF0000",
    match: (url) => url.toLowerCase().includes("youtube.com") || url.toLowerCase().includes("youtu.be"),
  },
  {
    key: "twitter",
    name: "X / Twitter",
    icon: FaXTwitter,
    color: "#000000",
    match: (url) => url.toLowerCase().includes("twitter.com") || url.toLowerCase().includes("x.com"),
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: FaFacebook,
    color: "#1877F2",
    match: (url) => url.toLowerCase().includes("facebook.com") || url.toLowerCase().includes("fb.com"),
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "#0077B5",
    match: (url) => url.toLowerCase().includes("linkedin.com"),
  },
  {
    key: "spotify",
    name: "Spotify",
    icon: FaSpotify,
    color: "#1DB954",
    match: (url) => url.toLowerCase().includes("spotify.com"),
  },
  {
    key: "onlyfans",
    name: "OnlyFans",
    icon: SiOnlyfans,
    color: "#00AFF0",
    match: (url) => url.toLowerCase().includes("onlyfans.com"),
  },
  {
    key: "snapchat",
    name: "Snapchat",
    icon: FaSnapchatGhost,
    color: "#FFFC00",
    match: (url) => url.toLowerCase().includes("snapchat.com"),
  },
  {
    key: "pinterest",
    name: "Pinterest",
    icon: FaPinterest,
    color: "#BD081C",
    match: (url) => url.toLowerCase().includes("pinterest.com"),
  },
  {
    key: "twitch",
    name: "Twitch",
    icon: FaTwitch,
    color: "#9146FF",
    match: (url) => url.toLowerCase().includes("twitch.tv"),
  },
  {
    key: "github",
    name: "GitHub",
    icon: FaGithub,
    color: "#181717",
    match: (url) => url.toLowerCase().includes("github.com"),
  },
  {
    key: "applemusic",
    name: "Apple Music",
    icon: SiApplemusic,
    color: "#FA243C",
    match: (url) => url.toLowerCase().includes("music.apple.com"),
  },
  {
    key: "soundcloud",
    name: "SoundCloud",
    icon: FaSoundcloud,
    color: "#FF3300",
    match: (url) => url.toLowerCase().includes("soundcloud.com"),
  },
  {
    key: "discord",
    name: "Discord",
    icon: FaDiscord,
    color: "#5865F2",
    match: (url) => url.toLowerCase().includes("discord.com") || url.toLowerCase().includes("discord.gg"),
  },
  {
    key: "telegram",
    name: "Telegram",
    icon: FaTelegram,
    color: "#26A5E4",
    match: (url) => url.toLowerCase().includes("telegram.org") || url.toLowerCase().includes("t.me"),
  },
  {
    key: "whatsapp",
    name: "WhatsApp",
    icon: FaWhatsapp,
    color: "#25D366",
    match: (url) => url.toLowerCase().includes("whatsapp.com") || url.toLowerCase().includes("wa.me"),
  },
  {
    key: "threads",
    name: "Threads",
    icon: SiThreads,
    color: "#000000",
    match: (url) => url.toLowerCase().includes("threads.net"),
  },
  {
    key: "substack",
    name: "Substack",
    icon: SiSubstack,
    color: "#FF6719",
    match: (url) => url.toLowerCase().includes("substack.com"),
  },
  {
    key: "email",
    name: "Email",
    icon: HiOutlineEnvelope,
    color: "#7A7A7A",
    match: (url) => url.toLowerCase().startsWith("mailto:") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url),
  },
  {
    key: "website",
    name: "Website",
    icon: HiOutlineLink,
    color: "#7A7A7A",
    match: () => true, // Fallback
  },
];

export function detectPlatform(url: string): Platform {
  if (!url) return PLATFORMS.find(p => p.key === "website")!;
  return PLATFORMS.find((p) => p.match(url)) || PLATFORMS.find(p => p.key === "website")!;
}
