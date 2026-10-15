import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { SectionHeading } from "./ui/section-heading";
import { usePortfolioContent } from "./PortfolioProvider";

// Real brand logos for known platforms
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-4.902 0-8.865-3.987-8.865-8.893 0-4.905 3.96-8.888 8.865-8.888 2.363 0 4.514.886 6.146 2.355 1.663 1.498 2.682 3.671 2.887 5.951.054.622.037 1.263-.07 1.854-.127.686-.42 1.322-.876 1.817a35.508 35.508 0 0 1-5.873 2.817c-1.047.218-2.108.283-3.17.186a32.584 32.584 0 0 1-2.138-.555c-.64-.19-1.238-.42-1.767-.7-.78-.393-1.44-.897-1.958-1.51-.518-.613-.89-1.338-1.114-2.036-.25-.776-.385-1.55-.324-2.333.047-.588.352-1.17.844-1.638.38-.356.87-.605 1.437-.75.622-.16 1.313-.114 1.945.104.634.218 1.176.567 1.61.988.458.447.78.974.957 1.57.076.261.056.46-.086.694-.158.255-.38.448-.78.568-.39.12-.81.12-1.213-.028-.33-.125-.74-.386-1.075-.744-.688-.727-1.17-1.746-1.366-2.726-.083-.41-.025-.813.135-1.208.145-.35.39-.71.694-1.054.273-.31.56-.593.845-.85.294-.264.527-.44.78-.553.17-.075.31-.118.42-.154.123-.039.307-.18.39-.344.092-.164.062-.35-.025-.52-.086-.17-.22-.34-.4-.506-.194-.174-.373-.34-.57-.507-.183-.154-.358-.28-.52-.425-.173-.149-.488-.33-.748-.57-.588-.548-.855-.848-1.034-1.197-.21-.4-.257-.784-.118-1.164.173-.474.487-.94.828-1.298.372-.387.765-.74 1.255-1.038.378-.228.79-.397 1.23-.567.49-.188 1.002-.31 1.533-.372.504-.06 1.037-.013 1.594.154.555.166 1.07.467 1.532.905.48.456.834 1.047 1.04 1.724.188.609.14 1.245-.028 1.858-.119.418-.3.84-.565 1.24-.247.36-.545.702-.862 1.047-.622.688-1.42 1.593-1.42 2.704 0 1.186.797 2.224 1.798 3.104.99.87 2.18 1.59 3.582 2.13 2.262.87 4.747 1.13 7.006.654 2.277-.48 4.482-1.485 6.25-2.888 1.864-1.482 3.374-3.36 4.352-5.605.955-2.18 1.405-4.503 1.405-6.995 0-2.386-.937-4.617-2.452-6.324-1.524-1.717-3.474-3.044-5.796-3.724-2.374-.698-4.89-.788-7.524-.474l-.004-.003zm0 0"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

const GitHubFooterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInFooterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Get icon component based on platform
const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram": return InstagramIcon;
    case "youtube": return YouTubeIcon;
    case "github": return GitHubFooterIcon;
    case "linkedin": return LinkedInFooterIcon;
    default: return () => <Globe className="w-5 h-5" />;
  }
};

// Get styles based on platform
const getPlatformStyles = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return { color: "hover:text-pink-500", bg: "hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10", border: "hover:border-pink-400/40" };
    case "youtube":
      return { color: "hover:text-red-500", bg: "hover:bg-red-500/5", border: "hover:border-red-400/40" };
    case "github":
      return { color: "hover:text-foreground", bg: "hover:bg-foreground/5", border: "hover:border-foreground/30" };
    case "linkedin":
      return { color: "hover:text-blue-600", bg: "hover:bg-blue-500/5", border: "hover:border-blue-400/40" };
    default:
      return { color: "hover:text-teal-500", bg: "hover:bg-teal-500/5", border: "hover:border-teal-400/40" };
  }
};

export default function Contact() {
  const { content } = usePortfolioContent();
  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden mt-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/60 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Let's Connect" subtitle="Ready to bring your ideas to life? I'm currently available for entry-level roles and creative collaborations." />

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Mail, label: "Email", value: content.profile.email, href: `mailto:${content.profile.email}` },
            { icon: Phone, label: "Phone 1", value: `+91 ${content.profile.phonePrimary}`, href: `tel:+91${content.profile.phonePrimary}` },
            { icon: WhatsAppIcon, label: "WhatsApp", value: `+91 ${content.profile.whatsapp}`, href: `https://wa.me/91${content.profile.whatsapp}` },
            ...(content.profile.phoneSecondary ? [{ icon: Phone, label: "Phone 2", value: `+91 ${content.profile.phoneSecondary}`, href: `tel:+91${content.profile.phoneSecondary}` }] : []),
            { icon: MapPin, label: "Location", value: content.profile.location, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.profile.location)}` },
          ].map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(23,154,138,0.4)", boxShadow: "0 0 20px rgba(23,154,138,0.15)" }}
              className="bg-card border border-primary/10 rounded-2xl p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/80 flex items-center justify-center text-primary mb-2 border border-primary/20">
                <contact.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1 font-semibold">{contact.label}</p>
                <p className="text-base font-medium text-foreground">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer with dynamic social links */}
      <footer className="border-t border-primary/10 pt-10 text-center relative z-10">
        <p className="text-foreground/50 text-sm font-medium mb-6">Find me on</p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {content.social.map((social, index) => {
            const IconComponent = getPlatformIcon(social.platform);
            const styles = getPlatformStyles(social.platform);
            return (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
                className={`w-12 h-12 rounded-2xl border border-primary/15 bg-card flex items-center justify-center text-foreground/40 transition-all duration-300 shadow-sm ${styles.color} ${styles.bg} ${styles.border}`}
              >
                <IconComponent />
              </motion.a>
            );
          })}
        </div>

      </footer>
    </section>
  );
}