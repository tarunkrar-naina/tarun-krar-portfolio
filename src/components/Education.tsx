import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./ui/section-heading";
import { usePortfolioContent } from "./PortfolioProvider";
import {
  GraduationCap,
  Award,
  Building2,
  CheckCircle2,
  BookOpen,
  School,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { CertificationItem, EducationItem } from "@/lib/portfolio-config";

const certificatePages: Record<number, string> = {
  1: "/assets/certificates/page-01.png",
  2: "/assets/certificates/page-02.png",
  3: "/assets/certificates/page-03.png",
  4: "/assets/certificates/page-04.png",
  5: "/assets/certificates/page-05.png",
  6: "/assets/certificates/page-06.png",
  7: "/assets/certificates/page-07.png",
  8: "/assets/certificates/page-08.png",
  9: "/assets/certificates/page-09.png",
  10: "/assets/certificates/page-10.png",
  11: "/assets/certificates/page-11.png",
  12: "/assets/certificates/page-12.png",
  13: "/assets/certificates/page-13.png",
  14: "/assets/certificates/page-14.png",
};

const educationStyles: Record<string, {
  icon: typeof GraduationCap;
  gradient: string;
  badge: string;
  glow: string;
}> = {
  bca: {
    icon: GraduationCap,
    gradient: "from-teal-500 to-cyan-500",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    glow: "shadow-teal-200",
  },
  "12th": {
    icon: School,
    gradient: "from-violet-500 to-purple-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    glow: "shadow-violet-200",
  },
  "10th": {
    icon: BookOpen,
    gradient: "from-orange-500 to-amber-500",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    glow: "shadow-orange-200",
  },
};

const certificationStyles: Record<string, {
  gradient: string;
  badge: string;
}> = {
  robotics: {
    gradient: "from-teal-500 to-cyan-500",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
  },
  olevel: {
    gradient: "from-blue-500 to-indigo-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  other: {
    gradient: "from-emerald-500 to-green-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

function DocumentButton({ onClick, label = "View document" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:border-primary hover:text-primary text-xs font-semibold transition-colors"
    >
      <FileText className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function CertificateViewer({
  certificate,
  onClose,
}: {
  certificate: CertificationItem;
  onClose: () => void;
}) {
  const availablePages = certificate.documentPages
    .map((page) => certificatePages[page])
    .filter(Boolean);
  const [current, setCurrent] = useState(0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="fixed inset-0 z-[71] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative pointer-events-auto bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-100">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Certificate document</p>
              <h3 className="font-bold text-gray-800">{certificate.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative bg-gray-100 flex items-center justify-center min-h-[55vh] max-h-[72vh] p-3">
            {availablePages.length > 0 ? (
              <img
                src={availablePages[current]}
                alt={`${certificate.title} document ${current + 1}`}
                className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            ) : (
              <p className="text-gray-500 text-sm">Document preview unavailable.</p>
            )}
            {availablePages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent((value) => (value - 1 + availablePages.length) % availablePages.length)}
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center"
                  aria-label="Previous certificate page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrent((value) => (value + 1) % availablePages.length)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center"
                  aria-label="Next certificate page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {availablePages.length > 0 && (
            <div className="flex items-center justify-center gap-2 px-5 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Page {current + 1} of {availablePages.length}</span>
              <div className="flex gap-1.5 ml-2">
                {availablePages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-1.5 rounded-full transition-all ${index === current ? "w-6 bg-primary" : "w-1.5 bg-gray-300"}`}
                    aria-label={`Open certificate page ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default function Education() {
  const { content } = usePortfolioContent();
  const [selectedCertificate, setSelectedCertificate] = useState<CertificationItem | null>(null);

  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="Education & Certifications" subtitle="Academic background and professional certificates" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Education</h3>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-violet-300 to-orange-300 rounded-full" />
            <div className="space-y-6">
              {content.education.map((edu: EducationItem, index) => {
                const style = educationStyles[edu.id] ?? educationStyles.bca;
                const Icon = style.icon;
                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="relative pl-16"
                  >
                    <div className={`absolute left-0 top-4 w-10 h-10 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg ${style.glow}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${style.badge}`}>{edu.year}</span>
                          <span className="text-xs text-gray-400 font-medium">{edu.status}</span>
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-gray-800 leading-snug mb-2">{edu.degree}</h4>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-700">{edu.institute}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        {edu.location}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Certifications</h3>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-blue-300 to-emerald-300 rounded-full" />
            <div className="space-y-6">
              {content.certifications.map((cert: CertificationItem, index) => {
                const style = certificationStyles[cert.id] ?? certificationStyles.other;
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="relative pl-16"
                  >
                    <div className={`absolute left-0 top-4 w-10 h-10 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${style.badge}`}>{cert.grade}</span>
                        <DocumentButton onClick={() => setSelectedCertificate(cert)} label="View certificate" />
                      </div>
                      <h4 className="text-base font-bold text-gray-800 leading-snug mb-2">{cert.title}</h4>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="font-medium text-gray-700">{cert.institute}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        {cert.location}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{cert.details}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <CertificateViewer certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}