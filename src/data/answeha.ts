// ─────────────────────────────────────────────────────────────
// 📌 CENTRAL CONFIG — All editable content lives here.
//    Change text, add photos, swap music — all from this file.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Anwesha",
  birthday: "13 • 09",
  birthdayFull: "13 • 09 • 2025",
  yearMet: 2017,
  siteTitle: "13:09 — A Little World for Anwesha",
  siteDescription:
    "A birthday gift for someone who holds a very special place.",

  /** Path to ambient music file in /public. Set to null to disable. */
  musicPath: "/audio/ambient.mp3" as string | null,
} as const;

// ─── PALETTE ───────────────────────────────────────────────
export const palette = {
  midnight: "#101018",
  cream: "#F7F1E8",
  blush: "#E8C7C8",
  rose: "#B78387",
  gold: "#C9A96E",
  darkSurface: "#18181F",
  softWhite: "#FAF7F2",
} as const;

// ─── COUNTING MILESTONES (replaces timeline) ───────────────
export interface TimelineEntry {
  year: number;
  title: string;
  description: string;
}

export const timelineEntries: TimelineEntry[] = [
  {
    year: 2017,
    title: "First Met",
    description: "The year our paths crossed.",
  },
  {
    year: 2025,
    title: "Present",
    description: "Celebrating you and all the memories made along the way.",
  },
];

export interface MilestoneEntry {
  number: string;
  label: string;
  detail: string;
}

export const milestones: MilestoneEntry[] = [
  {
    number: "8",
    label: "years of knowing you",
    detail: "Since 2017. Through seasons, silences, and everything in between.",
  },
  {
    number: "∞",
    label: "conversations that mattered",
    detail: "Some short, some long, all real.",
  },
  {
    number: "1",
    label: "person who changed things",
    detail: "You walked into my world and it hasn't been the same since.",
  },
  {
    number: "365",
    label: "more days to celebrate you",
    detail: "Starting today. Happy Birthday, Anwesha.",
  },
];

// ─── PHOTO GALLERY ─────────────────────────────────────────
export interface PhotoEntry {
  /** Path relative to /public */
  src: string;
  title: string;
  caption: string;
  tag: string;
  number: string;
  aspect?: "tall" | "square" | "wide";
}

export const photoEntries: PhotoEntry[] = [
  {
    src: "/images/anwesha/photo-07.jpg",
    title: "Radiant Grace",
    caption: "The kind of smile that effortlessly lights up any room she walks into.",
    tag: "Celebration",
    number: "01",
    aspect: "tall",
  },
  {
    src: "/images/anwesha/photo-06.jpg",
    title: "Poised & Proud",
    caption: "Dressed in elegance and tradition. Calm, confident, and stunning.",
    tag: "Tradition",
    number: "02",
    aspect: "tall",
  },
  {
    src: "/images/anwesha/photo-05.jpg",
    title: "Beneath the Vines",
    caption: "Lost in a quiet daydream under the purple blossoms. Complete peace.",
    tag: "Serenity",
    number: "03",
    aspect: "tall",
  },
  {
    src: "/images/anwesha/photo-08.jpg",
    title: "Spontaneous Joy",
    caption: "Unfiltered optimism and warmth — always lifting everyone's spirits.",
    tag: "Candid",
    number: "04",
    aspect: "square",
  },
  {
    src: "/images/anwesha/photo-04.jpg",
    title: "Quiet Afternoon",
    caption: "Cozy moments, wrapped in warmth, taking in the world at her own pace.",
    tag: "Warmth",
    number: "05",
    aspect: "square",
  },
  {
    src: "/images/anwesha/photo-02.jpg",
    title: "Unbothered & Beautiful",
    caption: "Comfortable in her own space, gentle yet so distinctly memorable.",
    tag: "Gentle",
    number: "06",
    aspect: "tall",
  },
  {
    src: "/images/anwesha/photo-03.jpg",
    title: "Soft Horizons",
    caption: "Some people don't need spotlight; their quiet presence is enough.",
    tag: "Atmosphere",
    number: "07",
    aspect: "tall",
  },
  {
    src: "/images/anwesha/photo-01.jpg",
    title: "Midnight Silhouette",
    caption: "Those thoughtful eyes that notice everything words leave unsaid.",
    tag: "Portraits",
    number: "08",
    aspect: "square",
  },
];

// ─── APPRECIATION CARDS ────────────────────────────────────
export interface AppreciationCard {
  title: string;
  note: string;
  emoji: string;
}

export const appreciationCards: AppreciationCard[] = [
  {
    title: "Your smile",
    note: "It's the kind that makes a room feel warmer. I hope you never lose it.",
    emoji: "✦",
  },
  {
    title: "Your kindness",
    note: "You're gentle with people, even when they don't deserve it. That takes real strength.",
    emoji: "♡",
  },
  {
    title: "Your honesty",
    note: "You said what you felt, even when it was hard. I respect that more than you know.",
    emoji: "◇",
  },
  {
    title: "Your stubbornness",
    note: "Yes, even that. It means you stand by what you believe in.",
    emoji: "⚡",
  },
  {
    title: "Your laugh",
    note: "There's a lightness to it that's contagious. The world needs more of it.",
    emoji: "✧",
  },
  {
    title: "Your presence",
    note: "You don't try to fill silence. You just make it comfortable.",
    emoji: "☾",
  },
  {
    title: "Your strength",
    note: "You handle hard things with quiet grace. That's rare.",
    emoji: "❋",
  },
  {
    title: "Your eyes",
    note: "They say things your words sometimes don't. And I notice.",
    emoji: "✺",
  },
];

// ─── ENVELOPE LETTER ───────────────────────────────────────
export const envelopeLetter = `Anwesha,

Happy Birthday. 🌷

We've known each other since 2017, and somehow, through all these years, you've become someone who holds a very special place in my heart.

I know you already know how I feel, and I know the answer you gave me — I respect it. I don't want this website to change that, or put any pressure on you.

I simply wanted to give you something that says: I'm genuinely glad you came into my life.

Here's to another year of you.

Happy Birthday, Anwesha. ❤️

— Ankit`;

// ─── STAR WISHES ───────────────────────────────────────────
export const starWishes: string[] = [
  "I hope you laugh a little more this year.",
  "I hope you find a moment of peace every single day.",
  "I hope someone reminds you how wonderful you are — when you forget.",
  "I hope you chase something that excites you.",
  "I hope the people around you match your energy.",
  "I hope you let yourself rest without guilt.",
  "I hope this year surprises you in the best way.",
  "I hope you know that you matter — deeply, quietly, endlessly.",
  "I hope you find beauty in unexpected places.",
  "I hope you never stop being unapologetically you.",
  "I hope your heart stays soft even when the world is loud.",
  "I hope you dance to your favourite song at least once a week.",
];

// ─── BIRTHDAY MOMENT ───────────────────────────────────────
export const birthdayClosing =
  "May this year be as beautiful as the person you are.";

// ─── FINAL MESSAGE ─────────────────────────────────────────
export const finalMessage = {
  lines: [
    "Some people become chapters.",
    "Some become memories.",
    "And some simply become a beautiful part of your story.",
    "",
    "I'm glad you're part of mine.",
    "",
    "Happy Birthday, Anwesha. 🌷",
  ],
  signature: "— Ankit",
  footer: "2017 → ∞",
};
