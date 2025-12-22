import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-02-24").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <motion.div
        key={value}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-card px-4 md:px-6 py-3 md:py-4 rounded-xl border-2 border-primary/30 backdrop-blur-xl"
      >
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-serif tracking-tight">
          {String(value).padStart(2, "0")}
        </div>
      </motion.div>
      <p className="text-xs md:text-sm font-sans uppercase tracking-widest text-white/60 mt-3">
        {label}
      </p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-8 md:gap-12"
    >
      <div>
        <h3 className="text-2xl md:text-3xl font-script text-primary mb-2">
          Counting Down to Our Big Day
        </h3>
        <p className="text-white/60 text-sm md:text-base">
          24th February 2026
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(212, 175, 55, 0.3)",
            "0 0 40px rgba(212, 175, 55, 0.6)",
            "0 0 20px rgba(212, 175, 55, 0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
      />
    </motion.div>
  );
}
