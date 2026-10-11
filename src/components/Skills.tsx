import { motion } from "framer-motion";
import { SectionHeading } from "./ui/section-heading";
import {
  Bot,
  Code2,
  Layers,
  Film,
  Palette,
  Zap,
  TrendingUp,
  ImageIcon,
  Share2,
  Video,
} from "lucide-react";

const allSkills = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    subtitle: "AI Tools & Automation",
    icon: Bot,
    bg: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
    light: "bg-violet-50",
    tag: "bg-violet-100 text-violet-700",
    details: "ChatGPT, Midjourney & AI-powered workflows to build smarter, faster solutions.",
  },
  {
    id: "webdev",
    name: "Web Development",
    subtitle: "Full-Stack & Frontend",
    icon: Code2,
    bg: "from-teal-500 to-cyan-600",
    glow: "rgba(20,184,166,0.35)",
    light: "bg-teal-50",
    tag: "bg-teal-100 text-teal-700",
    details: "Modern, responsive websites using HTML, CSS, JS & React. Clean code & great UX.",
  },
  {
    id: "webdesign",
    name: "Web Design",
    subtitle: "UI/UX & Visual Design",
    icon: Layers,
    bg: "from-sky-500 to-blue-600",
    glow: "rgba(14,165,233,0.35)",
    light: "bg-sky-50",
    tag: "bg-sky-100 text-sky-700",
    details: "Beautiful, intuitive interfaces with strong typography, color theory & UX sense.",
  },
  {
    id: "video",
    name: "Video Editing",
    subtitle: "Reels, YouTube & Short-form",
    icon: Film,
    bg: "from-red-500 to-orange-500",
    glow: "rgba(239,68,68,0.35)",
    light: "bg-red-50",
    tag: "bg-red-100 text-red-700",
    details: "High-impact reels & YouTube edits with transitions, color grading & motion graphics.",
  },
  {
    id: "graphic",
    name: "Graphic Designing",
    subtitle: "Logos, Banners & Creatives",
    icon: Palette,
    bg: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.35)",
    light: "bg-pink-50",
    tag: "bg-pink-100 text-pink-700",
    details: "Striking logos, brand visuals & social media graphics with lasting impression.",
  },
  {
    id: "automation",
    name: "Automation",
    subtitle: "Workflow & Process",
    icon: Zap,
    bg: "from-yellow-500 to-amber-500",
    glow: "rgba(234,179,8,0.35)",
    light: "bg-yellow-50",
    tag: "bg-yellow-100 text-yellow-700",
    details: "Zapier, Make & AI scripts to eliminate repetitive tasks and boost productivity.",
  },
  {
    id: "digital",
    name: "Digital Marketing",
    subtitle: "SEO, Ads & Campaigns",
    icon: TrendingUp,
    bg: "from-emerald-500 to-green-600",
    glow: "rgba(16,185,129,0.35)",
    light: "bg-emerald-50",
    tag: "bg-emerald-100 text-emerald-700",
    details: "SEO, paid ads & AI-powered content strategies to grow online presence.",
  },
  {
    id: "poster",
    name: "Poster Making",
    subtitle: "Event & Promotional",
    icon: ImageIcon,
    bg: "from-orange-500 to-amber-600",
    glow: "rgba(249,115,22,0.35)",
    light: "bg-orange-50",
    tag: "bg-orange-100 text-orange-700",
    details: "Eye-catching event posters & campaign visuals that grab attention instantly.",
  },
  {
    id: "socialmedia",
    name: "Social Media Mgmt",
    subtitle: "Strategy, Growth & Engagement",
    icon: Share2,
    bg: "from-blue-500 to-indigo-600",
    glow: "rgba(59,130,246,0.35)",
    light: "bg-blue-50",
    tag: "bg-blue-100 text-blue-700",
    details: "Content calendars, analytics & growth strategies across Instagram & YouTube.",
  },
  {
    id: "content",
    name: "Content Creator",
    subtitle: "Self-driven & Original",
    icon: Video,
    bg: "from-fuchsia-500 to-purple-600",
    glow: "rgba(217,70,239,0.35)",
    light: "bg-fuchsia-50",
    tag: "bg-fuchsia-100 text-fuchsia-700",
    details: "Original video, graphic & written content — from concept to publishing.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeading
        title="What I Do"
        subtitle="10 professional skills — technical, creative & strategic"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {allSkills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{ "--glow": skill.glow } as React.CSSProperties}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_12px_40px_var(--glow)] transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Top gradient strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${skill.bg}`} />

              <div className="p-4 pb-5">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.bg} flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Name */}
                <h4 className="text-sm font-bold text-gray-800 leading-snug mb-1">{skill.name}</h4>

                {/* Subtitle tag */}
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${skill.tag} mb-3`}>
                  {skill.subtitle}
                </span>

                {/* Description - shown on hover */}
                <p className="text-[11px] text-gray-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {skill.details}
                </p>
              </div>

              {/* Hover glow overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.bg} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none rounded-2xl`} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
