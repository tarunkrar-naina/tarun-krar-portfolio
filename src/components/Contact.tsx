import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "./ui/section-heading";
import { usePortfolioContent } from "./PortfolioProvider";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

// Real brand logos for footer social links
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

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 1.75h2.6v12.5H6.561L17.083 4z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.91 3.79L13.34 11.97l-1.56-2.42-5.37 1.23 1.98 6.07 5.97-3.15L12 21.86l7.73-4.84 2.24 1.32 1.93-8.06-6.05-3.18zm-9.9 8.24l3.18.93-4.78 5.52-2.19-3.26 3.79-.19-3.19-4.74 5.54 1.74z"/>
  </svg>
);

const DribbbleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.605 4.611a9.26 9.26 0 0 1 2.348 4.298c-.904.063-2.73.189-4.956.189-2.22 0-4.047-.126-4.95-.189a9.333 9.333 0 0 1 2.347-4.298c2.027.252 3.814.81 5.255 1.682 1.439-.873 3.226-1.43 5.253-1.682zm-1.145 3.934c-1.88.19-3.51.627-4.882 1.222a6.53 6.53 0 0 0-1.642 3.823c.769.26 1.54.525 2.31.787 3.455-1.263 6.213-3.502 7.52-6.426-.955.19-1.91.38-2.86.582-2.365-1.054-4.872-1.714-7.486-1.984zm-10.92 0c-2.614.27-5.12.93-7.486 1.984-.95-.202-1.905-.392-2.86-.582 1.308 2.924 4.066 5.163 7.52 6.426.769-.262 1.54-.527 2.31-.787a6.52 6.52 0 0 0-1.642-3.823c-1.37-.595-2.999-1.032-4.879-1.222zm-.054 6.647c1.97.236 3.784.722 5.14 1.376a6.4 6.4 0 0 1 1.66 3.73c-.77.272-1.54.55-2.31.828-3.516 1.226-6.237 3.337-7.48 6.094.82-.134 1.66-.282 2.52-.427 2.423 1.076 4.97 1.667 7.57 1.933.94-.27 1.86-.56 2.76-.833-2.29 1.37-4.79 2.288-7.45 2.565zm10.974 0c-2.66-.277-5.16-.1.72-7.45-2.565-.9-.27-1.82.02-2.76.833 2.6.266 5.147.857 7.57-1.933.859.145 1.699.293 2.52.427-1.244-2.757-3.965-4.868-7.48-6.094-.77-.278-1.54-.553-2.31-.828a6.38 6.38 0 0 1 1.66-3.73c1.355-.654 3.17-1.14 5.14-1.376zm-5.43-9.17c-.195-.078-.39-.15-.584-.231a9.235 9.235 0 0 1 3.342-3.194c.744.23 1.48.5 2.2.8.883-2.084 2.614-3.817 4.824-4.607a9.33 9.33 0 0 1-6.78 4.232zm11.08 1.702c-.152-.05-.303-.097-.45-.143-2.26-.676-4.87-1.15-7.87-1.413a9.25 9.25 0 0 1 3.342 3.194c.862-.39 1.73-.73 2.586-1.033 1.25-1.88 2.56-3.42 3.936-4.55zm-6.24 8.64c.584-.25 1.15-.504 1.69-.76a9.18 9.18 0 0 1-6.44-3.06c-.447.427-.87.853-1.27 1.276a8.85 8.85 0 0 0 6.02 2.544zm-.02-6.38c.192.17.38.34.56.505A8.84 8.84 0 0 0 8.155 8.4c-.448-.425-.87-.85-1.27-1.27a9.17 9.17 0 0 1 6.44 3.06z"/>
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.731 11.67c0-3.975-2.255-6.318-6.18-6.318-3.283 0-5.64 2.112-6.177 5.043H3.833V4.905H0v14.19h3.834v-5.307c.534 2.93 2.89 5.04 6.177 5.04 3.927 0 6.18-2.343 6.18-6.318zm-8.497 3.468c-1.16 0-2.036-.803-2.036-1.905 0-1.103.875-1.905 2.036-1.905 1.16 0 2.035.803 2.036 1.905 0 1.103-.876 1.905-2.036 1.905zm7.317 0c-1.16 0-2.036-.803-2.036-1.905 0-1.103.876-1.905 2.036-1.905 1.16 0 2.035.803 2.036 1.905 0 1.103-.875 1.905-2.036 1.905z"/>
  </svg>
);

const socialLinkStyles = [
  {
    key: "instagram",
    icon: InstagramIcon,
    label: "Instagram",
    color: "hover:text-pink-500",
    bg: "hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10",
    border: "hover:border-pink-400/40",
  },
  {
    key: "youtube",
    icon: YouTubeIcon,
    label: "YouTube",
    color: "hover:text-red-500",
    bg: "hover:bg-red-500/5",
    border: "hover:border-red-400/40",
  },
  {
    key: "github",
    icon: GitHubFooterIcon,
    label: "GitHub",
    color: "hover:text-foreground",
    bg: "hover:bg-foreground/5",
    border: "hover:border-foreground/30",
  },
  {
    key: "linkedin",
    icon: LinkedInFooterIcon,
    label: "LinkedIn",
    color: "hover:text-blue-600",
    bg: "hover:bg-blue-500/5",
    border: "hover:border-blue-400/40",
  },
  {
    key: "whatsapp",
    icon: WhatsAppIcon,
    label: "WhatsApp",
    color: "hover:text-green-500",
    bg: "hover:bg-green-500/5",
    border: "hover:border-green-400/40",
  },
  {
    key: "twitter",
    icon: TwitterIcon,
    label: "Twitter",
    color: "hover:text-sky-400",
    bg: "hover:bg-sky-400/5",
    border: "hover:border-sky-400/40",
  },
  {
    key: "facebook",
    icon: FacebookIcon,
    label: "Facebook",
    color: "hover:text-blue-600",
    bg: "hover:bg-blue-600/5",
    border: "hover:border-blue-600/40",
  },
  {
    key: "telegram",
    icon: TelegramIcon,
    label: "Telegram",
    color: "hover:text-blue-500",
    bg: "hover:bg-blue-500/5",
    border: "hover:border-blue-500/40",
  },
  {
    key: "dribbble",
    icon: DribbbleIcon,
    label: "Dribbble",
    color: "hover:text-pink-500",
    bg: "hover:bg-pink-500/5",
    border: "hover:border-pink-500/40",
  },
  {
    key: "behance",
    icon: BehanceIcon,
    label: "Behance",
    color: "hover:text-blue-500",
    bg: "hover:bg-blue-500/5",
    border: "hover:border-blue-500/40",
  },
];

export default function Contact() {
  const { content } = usePortfolioContent();
  const socialLinks = socialLinkStyles.map((social) => ({
    ...social,
    href: social.key === "whatsapp" ? `https://wa.me/${content.profile.whatsapp}` : content.social[social.key as keyof typeof content.social],
  }));
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
            ...(content.profile.phoneSecondary ? [{ icon: Phone, label: "Phone 2", value: `+91 ${content.profile.phoneSecondary}`, href: `tel:+91${content.profile.phoneSecondary}` }] : []),
            { icon: WhatsAppIcon, label: "WhatsApp 1", value: `+91 ${content.profile.whatsapp}`, href: `https://wa.me/${content.profile.whatsapp}` },
            ...(content.profile.whatsappSecondary ? [{ icon: WhatsAppIcon, label: "WhatsApp 2", value: `+91 ${content.profile.whatsappSecondary}`, href: `https://wa.me/${content.profile.whatsappSecondary}` }] : []),
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

      {/* Footer with real app logos */}
      <footer className="border-t border-primary/10 pt-10 text-center relative z-10">
        <p className="text-foreground/50 text-sm font-medium mb-6">Find me on</p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              title={social.label}
              className={`w-12 h-12 rounded-2xl border border-primary/15 bg-card flex items-center justify-center text-foreground/40 transition-all duration-300 shadow-sm ${social.color} ${social.bg} ${social.border}`}
            >
              <social.icon />
            </motion.a>
          ))}
        </div>

      </footer>
    </section>
  );
}
