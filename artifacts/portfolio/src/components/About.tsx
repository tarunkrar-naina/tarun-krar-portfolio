import { motion } from "framer-motion";
import { SectionHeading } from "./ui/section-heading";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import avatarImg from "@assets/NCPB3197_1783581580727.PNG";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-primary" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeading title="About Me" subtitle="Professional Web Developer & Creative — building digital experiences across design, tech, and content." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-md w-full"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(23,154,138,0.2)] bg-card">
            <img src={avatarImg} alt="Tarun" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full -z-10 blur-2xl"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full -z-10 blur-2xl"></div>
        </motion.div>

        {/* RIGHT: Details */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/10 rounded-3xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-heading text-foreground mb-4">Career Objective</h3>
            <p className="text-muted-foreground leading-relaxed text-lg font-sans">
              Motivated and quick-learning IT professional with a strong foundation in computer applications, robotics, digital marketing, video editing, graphic designing, and poster making.
              <br /><br />
              Seeking an entry-level opportunity to apply technical and creative skills, contribute effectively to a team, and grow within a dynamic organization.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}