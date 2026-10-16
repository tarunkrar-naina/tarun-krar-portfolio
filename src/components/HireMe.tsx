import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Send, Briefcase, User, Mail, MessageSquare, ChevronDown } from "lucide-react";
import { usePortfolioContent } from "./PortfolioProvider";

const serviceOptions = [
  "Web Development",
  "Web Design",
  "AI Integration",
  "Video Editing",
  "Graphic Designing",
  "Poster Making",
  "Digital Marketing",
  "Social Media Management",
  "Automation",
  "Content Creation",
  "Other",
];

interface FormData {
  name: string;
  contact: string;
  service: string;
  message: string;
}

export default function HireMe() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { content } = usePortfolioContent();
  const [form, setForm] = useState<FormData>({
    name: "",
    contact: "",
    service: "",
    message: "",
  });
  const [customService, setCustomService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.service || (form.service === "Other" && !customService.trim())) return;
    const requestedService = form.service === "Other" ? customService.trim() : form.service;

     // Build one message and open it for both WhatsApp numbers.
    const text = encodeURIComponent(
      `Hi Tarun Krar! 👋 I'd like to hire you.\n\n` +
      `*Name:* ${form.name}\n` +
      `*Contact:* ${form.contact}\n` +
       `*Service Needed:* ${requestedService}\n` +
      (form.message ? `*Details:* ${form.message}\n` : "") +
      `\nLooking forward to working with you!`
    );

     setSubmitted(true);
     const whatsappNumber = content.profile.whatsapp;
     if (whatsappNumber) window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
     const subject = encodeURIComponent(`New portfolio enquiry from ${form.name}`);
     const body = encodeURIComponent(
       `Name: ${form.name}\nContact: ${form.contact}\nService Needed: ${requestedService}\n${form.message ? `Project Details: ${form.message}` : ""}`,
     );
     window.location.href = `mailto:${content.profile.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setForm({ name: "", contact: "", service: "", message: "" });
       setCustomService("");
    }, 2200);
  };

  return (
    <>
      {/* Floating "Hire Me" button */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08, boxShadow: "0 0 28px rgba(23,154,138,0.55)" }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-7 right-7 z-50 flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-white font-bold text-sm shadow-[0_4px_20px_rgba(23,154,138,0.45)] glow-teal select-none"
      >
        <motion.span
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <Briefcase className="w-4 h-4" />
        </motion.span>
        Hire Me
      </motion.button>

      {/* Modal overlay + form */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitted && setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 60, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.93 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="fixed inset-0 z-[61] flex items-end sm:items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-card rounded-3xl shadow-2xl border border-primary/20 w-full max-w-md pointer-events-auto overflow-hidden">

                {/* Header */}
                <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 px-7 pt-7 pb-5 border-b border-primary/10">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-md">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-heading text-foreground">Let's Work Together</h2>
                       <p className="text-sm text-foreground/50">Fill the form — WhatsApp opens and an email draft is created</p>
                    </div>
                  </div>
                </div>

                {/* Success state */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-7 py-12 flex flex-col items-center gap-3 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 260, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-2"
                      >
                        🚀
                      </motion.div>
                      <h3 className="text-xl font-heading text-foreground">Opening WhatsApp…</h3>
                      <p className="text-sm text-foreground/55">Your message is ready to send to Tarun Krar!</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                {!submitted && (
                  <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                        Phone / Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                        <input
                          type="text"
                          required
                          placeholder="Your phone or email"
                          value={form.contact}
                          onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                        Service Needed *
                      </label>
                      <div className="relative">
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 pointer-events-none" />
                        <select
                          required
                          value={form.service}
                           onChange={e => {
                             setForm(f => ({ ...f, service: e.target.value }));
                             if (e.target.value !== "Other") setCustomService("");
                           }}
                          className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl border border-primary/20 bg-white/60 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                        >
                          <option value="" disabled>Select a service…</option>
                          {serviceOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      {form.service === "Other" && (
                        <input
                          type="text"
                          required
                          placeholder="Type the service you need"
                          value={customService}
                          onChange={e => setCustomService(e.target.value)}
                          className="w-full mt-2 px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                        />
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                        Project Details <span className="text-foreground/30 normal-case font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-primary/50" />
                        <textarea
                          rows={3}
                          placeholder="Briefly describe what you need…"
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:shadow-[0_0_20px_rgba(23,154,138,0.4)] transition-shadow mt-2"
                    >
                      <Send className="w-4 h-4" />
                       Send on WhatsApp + Email
                    </motion.button>

                    <p className="text-center text-xs text-foreground/35 pb-1">
                       Your details will open in WhatsApp and email
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
