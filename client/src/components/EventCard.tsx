import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  delay?: number;
}

export function EventCard({ title, date, time, location, description, delay = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-2">{title}</h3>
        <p className="text-white/80 mb-6 font-sans leading-relaxed text-sm md:text-base">{description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center text-white/90">
            <Calendar className="w-5 h-5 text-primary mr-3" />
            <span className="font-medium tracking-wide">{date}</span>
          </div>
          <div className="flex items-center text-white/90">
            <Clock className="w-5 h-5 text-primary mr-3" />
            <span className="font-medium tracking-wide">{time}</span>
          </div>
          <div className="flex items-start text-white/90">
            <MapPin className="w-5 h-5 text-primary mr-3 mt-1 shrink-0" />
            <span className="font-medium tracking-wide">{location}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Border */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 p-4 opacity-10 pointer-events-none">
        <img 
          src="https://pixabay.com/get/g250c5dedb8366d6c6521247d5c435722e94f00b45d9ea2ad376645ce7e5ba7530108bb735dfcca6d4fc8f2f0437bc0a0b28c04162cb992f64f69ca8b0bb6a018_1280.jpg" 
          alt="Mandala Pattern" 
          className="w-32 h-32 object-contain grayscale invert"
        />
      </div>
    </motion.div>
  );
}
