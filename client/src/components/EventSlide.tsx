import { motion } from "framer-motion";

interface EventSlideProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

export function EventSlide({ title, description, image, delay = 0 }: EventSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className="flex-shrink-0 w-96 h-72 md:w-[500px] md:h-96 relative group rounded-2xl overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">
          {title}
        </h3>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
