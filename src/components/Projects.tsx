import { motion, AnimatePresence } from "framer-motion";
import { useState, type ElementType } from "react";
import { SectionHeading } from "./ui/section-heading";
import { usePortfolioContent } from "./PortfolioProvider";
import {
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Globe,
  Video,
  ImageIcon,
} from "lucide-react";

const schoolHero = "/assets/Screenshot_2026-07-20_141300_1784537131917.png";
const schoolStats = "/assets/Screenshot_2026-07-20_141309_1784537125597.png";
const schoolAdmission = "/assets/Screenshot_2026-07-20_141321_1784537122499.png";
const gameMenu = "/assets/Screenshot_2026-07-20_141402_1784537174355.png";
const gamePlay = "/assets/Screenshot_2026-07-20_141436_1784537172387.png";
const gameExtra = "/assets/Screenshot_2026-07-20_141351_1784537177208.png";
import type { ProjectItem } from "@/lib/portfolio-config";

const visuals: Record<string, {
  icon: ElementType;
  gradient: string;
  badge: string;
  accent: string;
  images: string[];
}> = {
  airshoot: {
    icon: Gamepad2,
    gradient: "from-green-600 to-emerald-700",
    badge: "bg-green-100 text-green-700",
    accent: "text-green-600",
    images: [gameMenu, gamePlay, gameExtra],
  },
  school: {
    icon: Globe,
    gradient: "from-teal-500 to-cyan-600",
    badge: "bg-teal-100 text-teal-700",
    accent: "text-teal-600",
    images: [schoolHero, schoolStats, schoolAdmission],
  },
  aivideos: {
    icon: Video,
    gradient: "from-purple-500 to-fuchsia-600",
    badge: "bg-purple-100 text-purple-700",
    accent: "text-purple-600",
    images: [],
  },
  posters: {
    icon: ImageIcon,
    gradient: "from-orange-500 to-pink-500",
    badge: "bg-orange-100 text-orange-700",
    accent: "text-orange-600",
    images: [],
  },
};

type DisplayProject = ProjectItem & (typeof visuals)[string];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ProjectGallery({ project }: { project: DisplayProject }) {
  const [current, setCurrent] = useState(0);
  if (!project.images.length) return null;
  return (
    <div className="relative bg-black rounded-xl overflow-hidden mb-5">
      <img
        src={project.images[current]}
        alt={`${project.title} screenshot ${current + 1}`}
        className="w-full max-h-64 object-contain"
      />
      {project.images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((value) => (value - 1 + project.images.length) % project.images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((value) => (value + 1) % project.images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all ${current === index ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                aria-label={`Screenshot ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: DisplayProject; onClose: () => void }) {
  const Icon = project.icon;
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto">
          <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{project.category}</p>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight">{project.title}</h2>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <ProjectGallery project={project} />
            {!project.images.length && (
              <div className={`h-32 rounded-xl bg-gradient-to-br ${project.gradient} flex flex-col items-center justify-center text-white/80 mb-5`}>
                <Icon className="w-9 h-9 mb-2 opacity-60" />
                <span className="text-sm">Screenshots coming soon</span>
              </div>
            )}
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{project.fullDesc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full ${project.badge}`}>{tag}</span>)}
            </div>
            <div className="flex gap-3">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${project.gradient} text-white font-semibold text-sm shadow-md hover:shadow-lg`}>
                  <ExternalLink className="w-4 h-4" /> Visit Live Site
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-sm">
                  <GitHubIcon /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function Projects() {
  const { content } = usePortfolioContent();
  const [selected, setSelected] = useState<DisplayProject | null>(null);
  const projects = content.projects.map((project) => ({ ...project, ...(visuals[project.id] ?? visuals.posters) })) as DisplayProject[];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="My Projects" subtitle="Real projects — click any card to see screenshots & details" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(project)}
              className="cursor-pointer group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`relative h-44 overflow-hidden ${project.images.length ? "bg-black" : `bg-gradient-to-br ${project.gradient}`}`}>
                {project.images.length ? (
                  <>
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white font-semibold text-sm transition-opacity">
                        Open screenshots
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-white/20 border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{project.category}</span>
                </div>
                {project.live && <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">● LIVE</span>}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1.5 leading-snug">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.shortDesc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => <span key={tag} className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${project.badge}`}>{tag}</span>)}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{project.images.length ? `${project.images.length} screenshots` : "Click to explore"}</span>
                  <span className={`text-xs font-semibold ${project.accent} flex items-center gap-1`}>Open <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}