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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0 }}
      className="flex flex-col items-center min-w-0"
    >
      <div className="glass-card px-2 md:px-4 py-2 md:py-3 rounded-lg border-2 border-primary/30 backdrop-blur-xl">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-serif tracking-tight">
          {String(value).padStart(2, "0")}
        </div>
      </div>
      <p className="text-xs md:text-xs font-sans uppercase tracking-widest text-white/60 mt-2">
        {label}
      </p>
    </motion.div>
  );

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-6 md:gap-10"
    >
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-script text-primary mb-1">
          Counting Down to Our Big Day
        </h3>
        <p className="text-white/60 text-xs md:text-sm">
          24th February 2026
        </p>
      </div>

      <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
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
        className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
      />
    </motion.div>
  );
}
