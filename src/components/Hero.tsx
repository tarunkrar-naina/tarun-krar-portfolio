import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePortfolioContent } from "./PortfolioProvider";

const avatarImg = "/assets/NCPB3197_1783581580727.PNG";

// Rotating titles — all 10 professional skills
const titles = [
  "Web Developer",
  "Web Designer",
  "AI Specialist",
  "Video Editor",
  "Graphic Designer",
  "Automation Expert",
  "Digital Marketer",
  "Poster Designer",
  "Social Media Manager",
  "Content Creator",
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px]"
    />
    <motion.div
      animate={{ scale: [1, 1.5, 1], x: [0, -40, 0], y: [0, 60, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/60 blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-secondary/40 blur-[80px]"
    />
  </div>
);

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const { content } = usePortfolioContent();
  const githubLink = content.social.find(s => s.platform === "github")?.url || "https://github.com";
  const linkedinLink = content.social.find(s => s.platform === "linkedin")?.url || "https://linkedin.com";

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex(prev => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden bg-background">
      <AnimatedBackground />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M40 0v40M0 40h40\' stroke=\'%230d9488\' stroke-width=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text */}
        <div className="flex flex-col justify-center">
          {/* Name — NOT italic, bold, large */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-heading text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 drop-shadow-sm"
          >
            <span className="block">TARUN</span>
            <span className="block">KRAR</span>
          </motion.h1>

          {/* Rotating subtitle — bold */}
          <div className="h-14 overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -32, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="block text-2xl md:text-3xl font-display font-bold text-foreground tracking-wide"
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg text-foreground/60 mb-10 max-w-md font-sans leading-relaxed"
          >
            A creative mind blending Video Editing, Graphic Design, and Technology into seamless digital experiences.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-medium hover:scale-105 transition-transform duration-300 glow-teal-sm bg-white/50 backdrop-blur-sm"
            >
              <GitHubIcon /> GitHub
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform duration-300 glow-teal shadow-lg"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </motion.div>
        </div>

        {/* RIGHT: Photo */}
        <div className="flex justify-center items-center mt-12 md:mt-0">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
            style={{ filter: 'drop-shadow(0 20px 60px rgba(23,154,138,0.35))' }}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-xl transform scale-110"></div>
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-[2rem] overflow-hidden ring-4 ring-primary/30 relative z-10 bg-white cursor-pointer"
              onClick={() => window.open(avatarImg, '_blank')}
            >
              <img src={avatarImg} alt="Tarun Krar" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
