export interface ProfileContent {
  email: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsapp: string;
  whatsappSecondary: string;
  location: string;
}

export interface SocialItem {
  id: string;
  platform: string;     // e.g., "github", "linkedin", "instagram", "youtube", "twitter", "custom"
  label: string;        // Display name: "GitHub", "LinkedIn", "Instagram", "My Blog", etc.
  url: string;          // The actual link
  icon?: string;        // Optional: custom icon name for known platforms
}

export interface EducationItem {
  id: string;
  degree: string;
  short: string;
  status: string;
  year: string;
  institute: string;
  location: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  grade: string;
  institute: string;
  location: string;
  details: string;
  documentPages: number[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  live: string;
  github: string;
}

export interface PortfolioContent {
  profile: ProfileContent;
  social: SocialItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
}

export const defaultPortfolioContent: PortfolioContent = {
  profile: {
    email: "nainatarun41@gmail.com",
    phonePrimary: "9991585681",
    phoneSecondary: "",
    whatsapp: "9991585681",
    whatsappSecondary: "",
    location: "Kaithal, Haryana",
  },
  social: [
    { id: "social-github", platform: "github", label: "GitHub", url: "https://github.com/tarunkrar-naina" },
    { id: "social-linkedin", platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/tarun-krar-595ba1422" },
    { id: "social-instagram", platform: "instagram", label: "Instagram", url: "https://www.instagram.com/trun.lifts?igsi=Y3o1bzdjN21hdWZz&utm_source=qr" },
    { id: "social-youtube", platform: "youtube", label: "YouTube", url: "https://youtube.com/@tarunlifts-g1f?si=7Ta3VRDPxHeI2BRZ" },
  ],
  education: [
    {
      id: "bca",
      degree: "Bachelor of Computer Applications",
      short: "BCA",
      status: "Currently Pursuing",
      year: "2025 - 2028",
      institute: "Kurukshetra University",
      location: "Kurukshetra, Haryana",
    },
    {
      id: "12th",
      degree: "12th Standard (Senior Secondary)",
      short: "12th",
      status: "Completed",
      year: "2024",
      institute: "Govt. School Naina Dhos Kaitha",
      location: "HBSE Board",
    },
    {
      id: "10th",
      degree: "10th Standard (Secondary)",
      short: "10th",
      status: "Completed",
      year: "2022",
      institute: "Govt. School Naina Dhos Kaitha",
      location: "HBSE Board",
    },
  ],
  certifications: [
    {
      id: "robotics",
      title: "Robotics",
      grade: "Grade A+",
      institute: "Robotics Wizards",
      location: "Kaithal, Haryana",
      details: "Certificate of achievement for learning robotics activity and completing hands-on robotics training.",
      documentPages: [3, 12],
    },
    {
      id: "olevel",
      title: "Computer Concept Course + O Level Certification",
      grade: "Computer Applications",
      institute: "NIELIT — Govt. of India",
      location: "National Level",
      details: "Computer Concept Course certificate and O Level certificate covering computer applications and job-role qualification, awarded by NIELIT.",
      documentPages: [1, 2],
    },
    {
      id: "other",
      title: "Other Certifications",
      grade: "10 certificates",
      institute: "NIELIT, NSS, Govt. of Haryana & other institutions",
      location: "Multiple certificates",
      details: "Includes NIELIT skill competency, AI workshop participation, athletics, NSS merit and camp certificates, cyber security excellence, and other achievements.",
      documentPages: [4, 5, 6, 7, 8, 9, 10, 11, 13, 14],
    },
  ],
  projects: [
    {
      id: "airshoot",
      title: "Air Shoot Game",
      category: "Game Development",
      shortDesc: "AI-powered shooting game with gesture controls, 200 levels, weapons & lucky spin wheel.",
      fullDesc: "Air Shoot is a fully playable browser game built with AI assistance. Features include 200 levels, multiple weapons, a lucky spin wheel, gesture-based controls using webcam, SFX & music toggle — all in one polished game experience.",
      tags: ["Game Dev", "AI", "JavaScript", "Gesture Control"],
      live: "https://air-shoot.ai.studio",
      github: "",
    },
    {
      id: "school",
      title: "School Website",
      category: "Web Development",
      shortDesc: "Full school website for Love Public Sr. Sec. School with admissions, gallery & contact.",
      fullDesc: "A complete, professional school website built for Love Public Sr. Sec. School, Dhons, Kaithal (Haryana). Includes hero section, stats, academics info, admission enquiry form with Google Maps, gallery, and contact page.",
      tags: ["React", "Web Dev", "School", "Vercel"],
      live: "https://love-school-school-website-two.vercel.app",
      github: "",
    },
    {
      id: "aivideos",
      title: "AI Videos",
      category: "Video Editing + AI",
      shortDesc: "Short-form AI-generated & edited videos for social media — reels, YouTube & promotional content.",
      fullDesc: "A collection of AI-assisted video projects including AI-generated visuals, voice-overs, and automated editing workflows. Created for social media platforms like Instagram Reels and YouTube Shorts.",
      tags: ["AI Tools", "Video Editing", "Reels", "YouTube"],
      live: "",
      github: "",
    },
    {
      id: "posters",
      title: "Poster Making",
      category: "Graphic Design",
      shortDesc: "Event posters, social media creatives & promotional banners with strong visual impact.",
      fullDesc: "A portfolio of poster and graphic design work including event flyers, festival creatives, promotional banners, and social media posts. Designed with a focus on bold typography and vibrant colors.",
      tags: ["Graphic Design", "Canva", "Posters", "Creatives"],
      live: "",
      github: "",
    },
  ],
};
