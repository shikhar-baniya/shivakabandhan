import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { Countdown } from "@/components/Countdown";
import { EventSlide } from "@/components/EventSlide";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Music, Phone, Mail, Globe, MessageCircle, Menu, X } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [selectedRsvpOption, setSelectedRsvpOption] = useState("attending");

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
    return `https://wa.me/919876543210?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen w-full relative">
      <NavBar />
      <FloatingMenu />
      
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

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center pb-32">
          <motion.div 
            style={{ y: y2, opacity }}
            className="mb-6 font-script text-3xl md:text-5xl text-primary/80"
          >
            Om Namah Shivaya
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="glass-panel p-8 md:p-12 rounded-full aspect-square md:aspect-auto md:rounded-3xl border-2 border-primary/20 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.2)]"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 tracking-tighter">
              Shikha <span className="text-primary text-4xl md:text-6xl align-middle mx-2">&</span> Varun
            </h1>
            <div className="h-px w-32 bg-primary/60 my-6" />
            <p className="text-xl md:text-2xl font-sans tracking-widest text-white/90 uppercase">
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
          <motion.div
            initial={{ rotate: 0 }}
            whileInView={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 w-96 h-96 opacity-10 pointer-events-none"
          >
            {/* Mandala SVG placeholder */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-primary">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="currentColor" />
            </svg>
          </motion.div>
          
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
                src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&q=80&w=800" 
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
              title="Mehendi & Sangeet"
              date="December 11th, 2025"
              time="4:00 PM onwards"
              location="The Oberoi Udaivilas, Garden Lawns"
              description="An evening of henna, folk songs, and choreographed dances. Colorful attire recommended!"
              delay={0}
            />
            <EventCard 
              title="Haldi Ceremony"
              date="December 12th, 2025"
              time="10:00 AM"
              location="Poolside Pavilion"
              description="A playful morning smearing turmeric paste to bless the couple. Dress in shades of yellow."
              delay={0.2}
            />
            <EventCard 
              title="The Wedding (Pheras)"
              date="December 12th, 2025"
              time="7:00 PM (Baraat at 6:00 PM)"
              location="Zenana Mahal Courtyard"
              description="The sacred union performed under the moonlight. Traditional Indian attire."
              delay={0.4}
            />
            <EventCard 
              title="Grand Reception"
              date="December 13th, 2025"
              time="7:30 PM onwards"
              location="Manek Chowk"
              description="A formal evening of dinner and toasts to celebrate the newlyweds. Formal or Black Tie."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW */}
      <section id="gallery" className="py-20 px-4">
        <SectionHeading title="Captured Moments" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-[200px]">
          {[
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
            "https://images.unsplash.com/photo-1623868516896-1200f8983792?w=500&q=80",
            "https://images.unsplash.com/photo-1595521914995-1e479c38c82a?w=500&q=80",
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80"
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`rounded-xl overflow-hidden shadow-lg cursor-pointer relative group ${i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-300 z-10" />
              <img src={src} alt="Gallery" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ATTIRE THEME */}
      <section id="theme" className="py-20 px-4 relative overflow-hidden bg-black/40">
        <div className="max-w-full mx-auto relative z-10 mb-12">
          <SectionHeading title="Dress Code Theme" subtitle="Be part of our coordinated celebration with these beautiful color themes" />
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {/* Mehandi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>
              <h3 className="text-2xl font-serif text-white">Mehandi</h3>
            </div>
            <div className="space-y-2">
              <p className="text-white/80"><span className="text-primary">💃 Others:</span> Shades of green</p>
              <p className="text-xs text-white/50 mt-4 italic">Celebrate with lush green hues!</p>
            </div>
          </motion.div>

          {/* Haldi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center">
                <span className="text-xl">🌼</span>
              </div>
              <h3 className="text-2xl font-serif text-white">Haldi</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-white/80"><span className="text-primary">💐 Bridesmaids:</span> Pastel peach-pink</p>
                <p className="text-white/80"><span className="text-primary">👨‍👩‍👧‍👦 Family:</span> Pastel peach-pink & yellow combo</p>
                <p className="text-white/80"><span className="text-primary">🌞 Others:</span> Shades of sunshine yellow</p>
              </div>
            </div>
          </motion.div>

          {/* Sangeet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-400 flex items-center justify-center">
                <span className="text-xl">💫</span>
              </div>
              <h3 className="text-2xl font-serif text-white">Sangeet</h3>
            </div>
            <div className="space-y-2">
              <p className="text-white/80"><span className="text-primary">✨ Others:</span> Shimmery / glittery Indo-western outfits</p>
              <p className="text-xs text-white/50 mt-4 italic">Let your outfit sparkle!</p>
            </div>
          </motion.div>

          {/* Reception / Jaimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                <span className="text-xl">❤️</span>
              </div>
              <h3 className="text-2xl font-serif text-white">Reception / Jaimal</h3>
            </div>
            <div className="space-y-2">
              <p className="text-white/80"><span className="text-primary">💃 Bridesmaids & Family:</span> Beige-offwhite mix</p>
              <p className="text-white/80"><span className="text-primary">🌸 Others:</span> Ethnic wear in pastel shades</p>
            </div>
          </motion.div>

          {/* Fere (Wedding Ceremony) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel p-6 rounded-2xl lg:col-span-2 md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center">
                <span className="text-xl">🪔</span>
              </div>
              <h3 className="text-2xl font-serif text-white">Fere (Wedding Ceremony)</h3>
            </div>
            <div className="space-y-2">
              <p className="text-white/80"><span className="text-primary">👗 Everyone:</span> Pure traditional attire</p>
              <p className="text-white/80"><span className="text-primary">💫 Add-ons:</span> Maharashtrian Nath for ladies</p>
            </div>
          </motion.div>
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
              Or call us at <span className="text-primary font-semibold">+91 98765 43210</span>
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* 6. Footer */}
      <footer className="bg-black/80 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-script text-primary mb-2">Sada Suhagan Raho</h2>
            <p className="text-white/60 text-sm">May you always remain happily married</p>
          </motion.div>
          
          <div className="flex justify-center gap-8 mb-8">
            <SocialIcon icon={<Phone size={20} />} href="tel:+1234567890" />
            <SocialIcon icon={<Mail size={20} />} href="mailto:wedding@aaravdiya.com" />
            <SocialIcon icon={<Globe size={20} />} href="#" />
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

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-300"
    >
      {icon}
    </a>
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

