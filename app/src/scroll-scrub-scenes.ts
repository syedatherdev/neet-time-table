/** One continuous study-desk camera move, with the exact encoded first-frame posters. */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#D66B68",
  background: "#173D35",
  ink: "#F4F2E9",
  muted: "#D4DED3",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    body: "A clear daily rhythm for four subjects, every chapter, and the December finish line.",
    clip: "/assets/world/scene-01.mp4",
    id: "study-expedition",
    kicker: "YOUR STUDY EXPEDITION / 19 NOV TO 27 DEC",
    label: "The plan",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    poster: "/assets/world/scene-01-poster.png",
    tags: ["PHYSICS", "CHEMISTRY", "ZOOLOGY", "BOTANY"],
    title: "Make every study hour count.",
    scroll: 1.35,
  },
];
