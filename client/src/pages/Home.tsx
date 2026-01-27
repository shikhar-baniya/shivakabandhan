import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { Countdown } from "@/components/Countdown";
import { EventSlide } from "@/components/EventSlide";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Menu, X, Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [selectedRsvpOption, setSelectedRsvpOption] = useState("attending");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Add user interaction listener for immediate audio start
  useEffect(() => {
    if (!audio || userInteracted) return;

    const handleUserInteraction = (e: Event) => {
      // Don't trigger if clicking on the music button itself
      const target = e.target as HTMLElement;
      if (target instanceof HTMLElement && target.closest('[data-music-button]')) {
        return;
      }

      setUserInteracted(true);
      if (!isPlaying) {
        // Start playing audio immediately on first user interaction
        audio.play().then(() => {
          console.log('Audio started after user interaction');
        }).catch(console.error);
      }
    };

    // Listen for any user interaction to start audio (except music button)
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [audio, isPlaying, userInteracted]);

  useEffect(() => {
    // Set volume when audio is available
    if (audio) {
      audio.volume = 0.2;
      
      // Try to play immediately
      const tryPlay = async () => {
        try {
          await audio.play();
          console.log('Audio started successfully');
        } catch (error) {
          console.log('Autoplay blocked:', error);
        }
      };
      
      // Multiple attempts to start audio
      tryPlay();
      setTimeout(tryPlay, 1000);
      setTimeout(tryPlay, 2000);
    }
  }, [audio]);

  const toggleMusic = async () => {
    if (!audio) return;
    
    try {
      if (isPlaying) {
        // Pause the audio
        audio.pause();
        console.log('Audio paused');
      } else {
        // Play the audio
        await audio.play();
        console.log('Audio playing');
      }
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  const rsvpOptions = [
    { id: "attending", text: "I'll definitely be celebrating with you!" },
    { id: "booking", text: "Already booking my travel!" },
    { id: "wishes", text: "Can't make it, but sending all my love and blessings!" }
  ];

  const getRsvpMessage = () => {
    const option = rsvpOptions.find(opt => opt.id === selectedRsvpOption);
    return option ? option.text : rsvpOptions[0].text;
  };

  const getWhatsAppLink = () => {
    const message = `Hello Shikha and Varun! ${getRsvpMessage()}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/919673903968?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Hidden autoplay audio element */}
      <audio
        ref={(el) => {
          if (el && !audio) {
            setAudio(el);
          }
        }}
        src="/music.mp3"
        loop
        autoPlay
        playsInline
        muted={false}
        style={{ display: 'none' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <NavBar />
      <FloatingMenu />
      <FloatingMusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
      
      {/* 1. HERO SECTION */}
      <section id="home" className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* Background - Himalaya/Mountain feel with proper parallax */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <motion.div 
            style={{ y: useTransform(scrollY, [0, 800], [0, 400]) }} 
            className="w-full h-[120%]"
          >
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2500" 
              alt="Majestic Mountains" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1d3d]/50 to-[#1a1d3d] z-10" />
        </div>

        {/* Floating Particles/Stars */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center pb-32 pt-20 md:pt-0">
          <motion.div 
            style={{ y: y2, opacity }}
            className="mb-8 font-script text-3xl md:text-5xl text-primary/80"
          >
            Om Namah Shivaya
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="glass-panel p-6 md:p-12 rounded-2xl md:rounded-3xl border-2 border-primary/20 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.2)]"
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 tracking-tighter">
              Shikha <span className="text-primary text-3xl md:text-6xl align-middle mx-2">&</span> Varun
            </h1>
            <div className="h-px w-32 bg-primary/60 my-4 md:my-6" />
            <p className="text-lg md:text-2xl font-sans tracking-widest text-white/90 uppercase">
              24th February, 2026
            </p>
            <p className="mt-2 text-white/60 font-serif italic">Prime Park, Amravati</p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 md:mt-16 relative z-20"
          >
            <Countdown />
          </motion.div>

          <motion.div 
            style={{ y: y1, opacity }} 
            className="absolute bottom-10 left-0 right-0 mx-auto"
          >
            <p className="text-white/50 text-sm tracking-widest uppercase mb-2">Scroll to Celebrate</p>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. DIVINE INTRODUCTION */}
      <section id="story" className="py-20 md:py-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Large background mandala - slow rotation */}
          <motion.div
            initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
            whileInView={{ rotate: 360, scale: 1, opacity: 0.12 }}
            transition={{ 
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, ease: "easeOut" },
              opacity: { duration: 2, ease: "easeOut" }
            }}
            className="absolute -top-20 -left-20 w-[500px] h-[500px] pointer-events-none"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full text-primary drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <defs>
                <radialGradient id="mandalaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              {/* Outermost decorative ring */}
              <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
              <circle cx="200" cy="200" r="165" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
              
              {/* Outer lotus petals - 16 petals */}
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={`lotus-outer-${i}`} transform={`rotate(${i * 22.5} 200 200)`}>
                  <path d="M200 30 Q220 80 200 130 Q180 80 200 30" fill="currentColor" opacity="0.25" />
                  <path d="M200 35 Q215 80 200 125 Q185 80 200 35" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" />
                </g>
              ))}
              
              {/* Middle decorative ring */}
              <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="200" cy="200" r="125" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="4 4" />
              
              {/* Middle lotus petals - 12 petals */}
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={`lotus-mid-${i}`} transform={`rotate(${i * 30} 200 200)`}>
                  <path d="M200 80 Q215 120 200 160 Q185 120 200 80" fill="currentColor" opacity="0.35" />
                  <path d="M200 85 Q212 120 200 155 Q188 120 200 85" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
                </g>
              ))}
              
              {/* Inner decorative ring */}
              <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* Inner lotus petals - 8 petals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={`lotus-inner-${i}`} transform={`rotate(${i * 45} 200 200)`}>
                  <path d="M200 120 Q210 150 200 180 Q190 150 200 120" fill="currentColor" opacity="0.45" />
                </g>
              ))}
              
              {/* Center Om symbol area */}
              <circle cx="200" cy="200" r="55" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
              <circle cx="200" cy="200" r="40" fill="url(#mandalaGlow)" opacity="0.5" />
              <circle cx="200" cy="200" r="25" fill="currentColor" opacity="0.6" />
              <circle cx="200" cy="200" r="12" fill="currentColor" opacity="0.8" />
              
              {/* Decorative dots around center */}
              {Array.from({ length: 8 }).map((_, i) => (
                <circle key={`dot-${i}`} cx={200 + 48 * Math.cos(i * Math.PI / 4)} cy={200 + 48 * Math.sin(i * Math.PI / 4)} r="3" fill="currentColor" opacity="0.7" />
              ))}
            </svg>
          </motion.div>
          
          {/* Second mandala - opposite side, counter-rotation */}
          <motion.div
            initial={{ rotate: 360, scale: 0.5, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 0.08 }}
            transition={{ 
              rotate: { duration: 80, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, ease: "easeOut" },
              opacity: { duration: 2, ease: "easeOut" }
            }}
            className="absolute -bottom-32 -right-32 w-[400px] h-[400px] pointer-events-none"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full text-primary/70 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={`petal-${i}`} transform={`rotate(${i * 30} 200 200)`}>
                  <path d="M200 40 Q225 100 200 160 Q175 100 200 40" fill="currentColor" opacity="0.3" />
                </g>
              ))}
              <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
              {Array.from({ length: 6 }).map((_, i) => (
                <g key={`inner-${i}`} transform={`rotate(${i * 60} 200 200)`}>
                  <path d="M200 110 Q210 140 200 170 Q190 140 200 110" fill="currentColor" opacity="0.4" />
                </g>
              ))}
              <circle cx="200" cy="200" r="35" fill="currentColor" opacity="0.5" />
            </svg>
          </motion.div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-primary/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          <SectionHeading 
            title="A Divine Union" 
            subtitle="Like Shiva and Parvati, two souls destined to meet across time and space."
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-t-full overflow-hidden border-4 border-primary/20 shadow-2xl"
            >
              <img 
                src="/img/main.JPG" 
                alt="Couple Moment" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left space-y-6"
            >
              <p className="text-lg text-white/80 leading-relaxed font-serif">
                <span className="text-4xl text-primary float-left mr-2 font-script">W</span>
                ith the blessings of our parents and the grace of the Almighty, we invite you to be part of our new beginning. 
                Our journey started as friends and blossomed into a love that feels both ancient and new.
              </p>
              <p className="text-lg text-white/80 leading-relaxed font-serif">
                Just as the Ganges flows eternally, may our love flow through the journey of life. 
                Your presence would mean the world to us as we take our sacred vows under the stars.
              </p>
              <div className="pt-6">
                <p className="font-script text-3xl text-primary">With Love,</p>
                <p className="font-serif text-xl text-white mt-2">Shikha & Varun</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. WEDDING EVENTS */}
      <section id="events" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="The Celebrations" 
            subtitle="Join us for days filled with music, dance, and tradition." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-10 max-w-6xl mx-auto">
            <EventCard 
              title="Mehendi Night"
              date="February 22nd, 2026"
              time="4:00 PM onwards"
              location="Our Home"
              description="An auspicious evening of sacred henna and heartfelt blessings, marking the joyful beginning of the wedding celebrations."
              delay={0}
            />
            <EventCard 
              title="Haldi Ceremony"
              date="February 23rd, 2026"
              time="10:00 AM"
              location="Our Home"
              description="A playful morning smearing turmeric paste to bless the couple. Dress in shades of yellow."
              delay={0.2}
            />
            <EventCard 
              title="The Sangeet Night"
              date="February 23rd, 2026"
              time="6.30 PM"
              location="The Prime Park, Amravati"
              description="A joyous evening of song and rhythm, uniting two families in celebration of love and togetherness."
              delay={0.4}
            />
            <EventCard 
              title="The Wedding (Varmala)"
              date="February 24th, 2026"
              time="8.00 AM onwards"
              location="The Prime Park, Amravati"
              description="A formal morning of dinner and toasts to celebrate the newlyweds. Traditional Attire"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW - Stacked Photo Cards */}
      <section id="gallery" className="py-24 px-4 relative overflow-hidden">
        <SectionHeading title="Captured Moments" subtitle="Swipe through our cherished memories" />
        <StackedPhotoGallery />
      </section>

      {/* 5. ATTIRE THEME - Elegant Design */}
      <section id="theme" className="py-24 px-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-primary/40" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading title="Dress Code" subtitle="Dress to match the celebration's colors" />
          
          <div className="mt-16 space-y-6">
            {[
              {
                event: "Mehandi",
                colors: ["#22c55e", "#4ade80", "#86efac"],
                description: "Shades of Green",
                tagline: "Celebrate with lush green hues"
              },
              {
                event: "Haldi",
                colors: ["#eab308", "#facc15", "#fde047"],
                description: "Sunshine Yellow",
                details: ["Bridesmaids: Pastel peach-pink", "Family: Peach-pink & yellow combo"],
                tagline: "Bright as the morning sun"
              },
              {
                event: "Sangeet",
                colors: ["#a855f7", "#d946ef", "#f0abfc"],
                description: "Shimmery Indo-Western",
                tagline: "Let your outfit sparkle"
              },
              {
                event: "Wedding (Varmala)",
                colors: ["#fcd9b6", "#fed7aa", "#fef3c7"],
                description: "Beige & Pastels",
                details: ["Bridesmaids & Family: Beige-offwhite mix", "Others: Ethnic pastels"],
                tagline: "Elegant and refined"
              },
              {
                event: "Phere",
                colors: ["#dc2626", "#ef4444", "#f87171"],
                description: "Pure Traditional",
                details: ["Ladies: Maharashtrian Nath recommended"],
                tagline: "Honor the sacred ceremony"
              }
            ].map((item, index) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500">
                  {/* Color palette circles */}
                  <div className="flex items-center gap-2 md:w-32 shrink-0">
                    {item.colors.map((color, i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 md:w-8 md:h-8 rounded-full shadow-lg ring-2 ring-white/20"
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.2, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-serif text-white mb-1 group-hover:text-primary transition-colors">
                      {item.event}
                    </h3>
                    <p className="text-primary/90 font-medium text-lg">{item.description}</p>
                    {item.details && (
                      <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                        {item.details.map((detail, i) => (
                          <span key={i} className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full">
                            {detail}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Tagline */}
                  <p className="text-sm text-white/40 italic font-serif md:w-40 text-center md:text-right shrink-0">
                    {item.tagline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom decorative element */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <Heart size={16} className="text-primary/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP RSVP */}
      <section id="rsvp" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-primary/5 clip-path-slant z-0" />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <SectionHeading title="RSVP" subtitle="Kindly respond by January 15th, 2026" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-10 md:p-16 rounded-2xl flex flex-col items-center gap-8"
          >
            <p className="text-lg text-white/80 max-w-md">
              We'd love to hear from you! Select your response and share your joy with us on WhatsApp.
            </p>
            
            <div className="w-full space-y-4">
              {rsvpOptions.map((option) => (
                <motion.label
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary/20 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name="rsvp"
                    value={option.id}
                    checked={selectedRsvpOption === option.id}
                    onChange={(e) => setSelectedRsvpOption(e.target.value)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className="text-white/80 text-sm md:text-base">{option.text}</span>
                </motion.label>
              ))}
            </div>
            
            <motion.a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 md:px-12 py-4 bg-gradient-to-r from-primary to-[#f4a460] hover:brightness-110 text-black font-bold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              <MessageCircle size={24} />
              <span className="text-lg">Send WhatsApp Message</span>
            </motion.a>

            <p className="text-sm text-white/50 mt-4">
              Or call us at <span className="text-primary font-semibold">+91 9673903968</span>
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* 6. Footer */}
      <footer className="bg-black/80 text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="mb-6"
          >
            <h2 className="text-4xl font-script text-primary mb-3">Sada Suhagan Raho</h2>
            <p className="text-white/60 text-sm font-serif italic">May you always remain happily married</p>
          </motion.div>
          
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <Heart size={14} className="text-primary/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>
          
          <p className="text-xs text-white/30 uppercase tracking-widest">
            © 2026 Shikha & Varun Wedding. With Love.
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-lg border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className={`font-serif font-bold text-lg md:text-xl tracking-widest ${scrolled ? 'text-primary' : 'text-white'}`}>
          #SHIVAkaBandhan
        </div>
        <div className="hidden md:flex space-x-8">
          {["Home", "Story", "Events", "Journey", "RSVP"].map((item) => (
            <button 
              key={item}
              onClick={() => {
                if (item === "Journey") {
                  document.getElementById("gallery-scroll")?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-sm uppercase tracking-widest hover:text-primary transition-colors text-white/90"
            >
              {item}
            </button>
          ))}
        </div>
        <Button 
          onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full px-6"
        >
          RSVP
        </Button>
      </div>
    </motion.nav>
  );
}

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Story", id: "story" },
    { label: "Events", id: "events" },
    { label: "Dress Code", id: "theme" },
    { label: "RSVP", id: "rsvp" }
  ];

  const handleNavigation = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 left-8 z-40"
    >
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 flex flex-col gap-2"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavigation(item.id)}
                className="px-4 py-2 rounded-full glass-panel text-sm font-serif text-white/90 hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full glass-panel flex items-center justify-center backdrop-blur-lg border-2 border-primary/40 hover:border-primary/80 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
      >
        {isOpen ? (
          <X size={24} className="text-primary" />
        ) : (
          <Menu size={24} className="text-primary" />
        )}
      </motion.button>
    </motion.div>
  );
}

function FloatingMusicPlayer({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 right-8 z-40"
      data-music-button
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          onToggle();
        }}
        data-music-button
        className={`w-14 h-14 rounded-full glass-panel flex items-center justify-center backdrop-blur-lg border-2 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] ${
          isPlaying 
            ? 'border-primary/80 bg-primary/10' 
            : 'border-primary/40 hover:border-primary/80'
        }`}
      >
        {isPlaying ? (
          <Volume2 size={24} className="text-primary" />
        ) : (
          <VolumeX size={24} className="text-primary/70" />
        )}
      </motion.button>
    </motion.div>
  );
}

function StackedPhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const photos = [
    {
      src: "/img/slider/095A1665.JPG",
      caption: "Where it all began"
    },
    {
      src: "/img/slider/095A1668.JPG",
      caption: "Our first dance"
    },
    {
      src: "/img/slider/095A1676.JPG",
      caption: "Golden moments"
    },
    {
      src: "/img/slider/095A1683.JPG",
      caption: "Joyful laughter"
    },
    {
      src: "/img/slider/095A1684.JPG",
      caption: "Together forever"
    },
    {
      src: "/img/slider/095A1688.JPG",
      caption: "Forever yours"
    },
    {
      src: "/img/slider/095A1689.JPG",
      caption: "Love in bloom"
    },
    {
      src: "/img/slider/095A1707.JPG",
      caption: "Sacred moments"
    },
    {
      src: "/img/slider/095A1759.JPG",
      caption: "Divine celebration"
    },
    {
      src: "/img/slider/095A1784.JPG",
      caption: "Blessed union"
    },
    {
      src: "/img/slider/095A1789.JPG",
      caption: "Eternal bond"
    },
    {
      src: "/img/slider/095A1902.JPG",
      caption: "Hearts entwined"
    },
    {
      src: "/img/slider/095A1917.JPG",
      caption: "Perfect harmony"
    },
    {
      src: "/img/slider/095A1948.JPG",
      caption: "Moments of joy"
    },
    {
      src: "/img/slider/095A1974.JPG",
      caption: "Radiant beauty"
    },
    {
      src: "/img/slider/095A1991.JPG",
      caption: "Sweet embrace"
    },
    {
      src: "/img/slider/095A2011.JPG",
      caption: "Divine love"
    },
    {
      src: "/img/slider/095A2029.JPG",
      caption: "Cherished memories"
    },
    {
      src: "/img/slider/095A2036.JPG",
      caption: "Joyful celebration"
    },
    {
      src: "/img/slider/095A2133.JPG",
      caption: "Unforgettable moments"
    },
    {
      src: "/img/slider/095A2137.JPG",
      caption: "Timeless love"
    },
    {
      src: "/img/slider/095A2146.JPG",
      caption: "Our love story"
    }
  ];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + photos.length) % photos.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div className="max-w-lg mx-auto mt-12">
      {/* Main card stack */}
      <div className="relative h-[450px] md:h-[500px] perspective-1000">
        {/* Background stacked cards effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[85%] h-[90%] bg-white/5 rounded-2xl transform rotate-[-6deg] translate-y-2 border border-white/10" />
          <div className="absolute w-[90%] h-[93%] bg-white/5 rounded-2xl transform rotate-[-3deg] translate-y-1 border border-white/10" />
        </div>
        
        {/* Main swipeable card */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotateY: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-black/20">
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].caption}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-center"
              >
                <p className="text-2xl font-script text-primary mb-2">{photos[currentIndex].caption}</p>
                <p className="text-white/50 text-sm">{currentIndex + 1} / {photos.length}</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-6' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="text-center text-white/40 text-sm mt-4 font-serif">
        Swipe or tap dots to navigate
      </p>
    </div>
  );
}