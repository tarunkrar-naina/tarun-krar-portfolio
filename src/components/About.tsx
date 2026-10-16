import { motion } from "framer-motion";
import { SectionHeading } from "./ui/section-heading";

const avatarImg = "/assets/NCPB3197_1783581580727.PNG";

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
            <img src={avatarImg} alt="Tarun Krar" className="w-full h-full object-cover" />
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