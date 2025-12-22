import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12 relative z-10 px-4", className)}>
      {/* Decorative Bindi / Ornament */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-3 h-3 rounded-full bg-primary mx-auto mb-4 shadow-[0_0_15px_rgba(212,175,55,0.6)]"
      />
      
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3 tracking-wider",
          light ? "text-white" : "gold-gradient-text"
        )}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={cn(
            "text-lg md:text-xl font-sans italic max-w-2xl mx-auto",
            light ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"
      />
    </div>
  );
}
