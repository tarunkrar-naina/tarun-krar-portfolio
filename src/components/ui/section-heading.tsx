import { motion } from "framer-motion";

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        <h2 className="font-heading italic text-4xl md:text-5xl text-primary mb-3 drop-shadow-sm">
          {title}
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-accent/60"
          >
            .
          </motion.span>
        </h2>
        {/* Animated underline — slightly angled */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left center", transform: "skewX(-8deg)" }}
          className="h-[3px] bg-gradient-to-r from-primary to-accent rounded-full mt-1 mx-auto w-16"
        />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-foreground/60 text-lg max-w-2xl mx-auto font-sans mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
