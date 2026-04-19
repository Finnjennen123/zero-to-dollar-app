import { PageData } from "../_state/PageContext";

export const EXAMPLES: PageData[] = [
  {
    profile: {
      displayName: "Maya",
      bio: "Brooklyn-based florist & event designer. Creating magic with blooms.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      username: "maya",
      social: {
        instagram: "https://instagram.com/maya_blooms",
        tiktok: "https://tiktok.com/@maya_blooms",
        youtube: "",
        twitter: "https://twitter.com/maya_blooms",
        facebook: "",
        onlyfans: "",
        linkedin: "",
        spotify: "",
        website: "https://mayablooms.com",
      },
      extraText: "For event inquiries, please email me directly.",
      extraPhoto: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&fit=crop",
      publications: [
        { id: "1", title: "Vogue Living", url: "#" },
        { id: "2", title: "Architectural Digest", url: "#" },
      ],
    },
    links: [
      { id: "1", title: "Summer Workshop Series", url: "#", emoji: "🌸", visible: true },
      { id: "2", title: "Waitlist for 2025 Weddings", url: "#", visible: true },
      { id: "3", title: "Shop Dried Bouquets", url: "#", visible: true },
    ],
    appearance: {
      backgroundId: "warm-sunrise",
      customBg: "",
      themeId: "warm-coral",
    },
    payments: {
      stripeUrl: "https://buy.stripe.com/test_maya",
      buttonLabel: "Book a 1:1 consultation",
      showButton: true,
    },
    isPublished: true,
  },
  {
    profile: {
      displayName: "Alex Rivers",
      bio: "Ambient music producer & sound bath practitioner.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      username: "arivers",
      social: {
        instagram: "https://instagram.com/arivers",
        tiktok: "",
        youtube: "https://youtube.com/arivers",
        twitter: "",
        facebook: "",
        onlyfans: "",
        linkedin: "",
        spotify: "https://spotify.com/artist/arivers",
        website: "",
      },
      extraText: "Listen to my latest album 'Echoes of Calm' on Spotify.",
      extraPhoto: "",
      publications: [
        { id: "1", title: "Pitchfork", url: "#" },
        { id: "2", title: "Rolling Stone", url: "#" },
      ],
    },
    links: [
      { id: "1", title: "New Album: Echoes of Calm", url: "#", emoji: "🎧", visible: true },
      { id: "2", title: "Live Tour Dates", url: "#", visible: true },
      { id: "3", title: "Meditation Pack", url: "#", visible: true },
    ],
    appearance: {
      backgroundId: "charcoal-dark",
      customBg: "",
      themeId: "midnight-dark",
    },
    payments: {
      stripeUrl: "https://buy.stripe.com/test_arivers",
      buttonLabel: "Support my music",
      showButton: true,
    },
    isPublished: true,
  },
  {
    profile: {
      displayName: "Sienna Wood",
      bio: "Illustrator & hand-lettering artist. I draw things for brands.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      username: "sienna",
      social: {
        instagram: "https://instagram.com/sienna_draws",
        tiktok: "https://tiktok.com/@sienna_draws",
        youtube: "",
        twitter: "https://twitter.com/sienna_draws",
        facebook: "",
        onlyfans: "",
        linkedin: "https://linkedin.com/in/sienna",
        spotify: "",
        website: "",
      },
      extraText: "Commission me for your next project.",
      extraPhoto: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&fit=crop",
      publications: [
        { id: "1", title: "It's Nice That", url: "#" },
      ],
    },
    links: [
      { id: "1", title: "View my Portfolio", url: "#", emoji: "🎨", visible: true },
      { id: "2", title: "Shop Prints", url: "#", visible: true },
      { id: "3", title: "Skillshare Class", url: "#", visible: true },
    ],
    appearance: {
      backgroundId: "soft-sage",
      customBg: "",
      themeId: "forest-green",
    },
    payments: {
      stripeUrl: "https://buy.stripe.com/test_sienna",
      buttonLabel: "Book mural project",
      showButton: true,
    },
    isPublished: true,
  },
];
