import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Plane, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight,
  Zap,
  Utensils,
  MapPin,
  Heart,
  ShieldCheck,
  Calendar,
  Users
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Modal from './components/Modal';
import { ModalType, Aircraft } from './types';
import { AIRCRAFT_FLEET, CLIENT_BENEFITS, FAQ_DATA } from './data';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [activePage, setActivePage] = useState<'home' | 'about' | 'contact'>('home');

  // Form states embedded directly on page for seamless interaction
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft>(AIRCRAFT_FLEET[0]);
  const [isBookedOnPage, setIsBookedOnPage] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Target ref for scrolling down
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const fleetRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  // Refs for scroll-driven video takeoff simulator
  const takeoffSectionRef = useRef<HTMLDivElement>(null);
  const takeoffVideoRef = useRef<HTMLVideoElement>(null);
  const [takeoffProgress, setTakeoffProgress] = useState(0);

  // Exact video source specified in requirements
  const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4';

  const primaryPages = [
    { name: 'Home', actionId: 'home', isPage: true },
    { name: 'Rates & Fleet', sectionRef: fleetRef },
    { name: 'VIP Benefits', sectionRef: benefitsRef },
    { name: 'About SkyElite', actionId: 'about', isPage: true },
    { name: 'F.A.Q.', sectionRef: faqRef },
    { name: 'Contact Concierge', actionId: 'contact', isPage: true }
  ];

  const handleNavClick = (item: { name: string; actionId?: string; isPage?: boolean; sectionRef?: React.RefObject<HTMLDivElement | null> }) => {
    setIsMobileMenuOpen(false);
    if (item.isPage && item.actionId) {
      setActivePage(item.actionId as any);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          if (item.sectionRef && item.sectionRef.current) {
            item.sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        if (item.sectionRef && item.sectionRef.current) {
          item.sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // Motion parallax for hero
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.08]);

  const handleOpenModal = (type: ModalType) => {
    setActiveModal(type);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    setIsMobileMenuOpen(false);
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Distance calculator
  const calculateDistance = () => {
    if (!origin || !destination) return 0;
    const key = (origin + destination).toLowerCase();
    let score = 0;
    for (let i = 0; i < key.length; i++) {
      score += key.charCodeAt(i);
    }
    return Math.max(300, (score * 7) % 6500); // 300nm to 6500nm
  };

  const distance = calculateDistance();
  const speedKnots = parseInt(selectedAircraft.speed);
  const flightHours = distance > 0 ? parseFloat((distance / speedKnots).toFixed(1)) : 0;
  const estimatedCost = flightHours > 0 ? Math.round(flightHours * selectedAircraft.hourlyRate * 1.08) : 0;

  const handleOnPageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName && clientEmail) {
      setIsBookedOnPage(true);
    }
  };

  // GSAP animations and Scroll-Bound Video Automation
  useEffect(() => {
    // GSAP animations only make sense when we are on the Home page context
    if (activePage !== 'home') return;

    // Create GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // Hero Elements slide-in
      gsap.fromTo('.gsap-hero-title-1', 
        { opacity: 0, y: 50 }, 
        { opacity: 0.8, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.15 }
      );
      gsap.fromTo('.gsap-hero-title-2', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.35 }
      );
      gsap.fromTo('.gsap-hero-subtitle', 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.6 }
      );
      gsap.fromTo('.gsap-hero-btn', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.8, stagger: 0.1 }
      );

      // Viewport-based on-scroll headings slides
      gsap.utils.toArray<HTMLElement>('.gsap-scroll-trigger').forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    // Integrated video scrub loop
    const element = takeoffSectionRef.current;
    const video = takeoffVideoRef.current;
    if (!element || !video) return () => ctx.revert();

    // Pause the video initially to let scroll control the frames
    video.pause();

    let rafId: number;
    let targetTime = 0;
    let currentTime = 0;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const sectionHeight = rect.height - window.innerHeight;
      if (sectionHeight <= 0) return;
      
      const scrolled = -rect.top;
      let progress = scrolled / sectionHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      setTakeoffProgress(progress);

      if (video.duration) {
        targetTime = progress * video.duration;
      }
    };

    const updatePlayhead = () => {
      // Linear interpolation (lerp) makes frame stepping incredibly smooth on all devices
      currentTime += (targetTime - currentTime) * 0.1;
      if (Math.abs(currentTime - targetTime) > 0.001 && video.duration) {
        video.currentTime = Math.max(0, Math.min(video.duration - 0.01, currentTime));
      }
      rafId = requestAnimationFrame(updatePlayhead);
    };

    // Attach passive scroll listener for high performance on modern screens
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(updatePlayhead);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [activePage]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans transition-colors relative selection:bg-[#202A36] selection:text-white">
      
      {/* Hero Section Container */}
      <section ref={heroRef} className={`relative w-full overflow-hidden shrink-0 transition-all duration-700 ease-in-out ${activePage === 'home' ? 'h-screen' : 'h-[250px] md:h-[300px]'}`}>
        
        {/* Parallax Continuous Autoplay, Muted, Looping Video Background */}
        <motion.div 
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none"
        >
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Elegant light-grey backdrop to make the gray-900 / slate-950 UI tags maximally legible */}
          <div className="absolute inset-0 bg-white/45 backdrop-blur-[0.5px] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-white/20 video-fallback -z-10 pointer-events-none" />
        </motion.div>

        {/* Dynamic Nav + Hero Overlay Content Wrapper */}
        <div className="relative h-full flex flex-col z-20">
          
          {/* Premium Navigation Bar */}
          <header className="w-full max-w-7xl mx-auto px-8 py-6 shrink-0">
            <nav className="flex items-center justify-between relative">
              
              {/* Brand Logo & Name */}
              <button 
                onClick={() => handleNavClick({ name: 'Home', actionId: 'home', isPage: true })}
                className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
              >
                <div className="bg-[#202A36] h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-500 group-hover:rotate-45">
                  <Plane className="h-5 w-5 transform rotate-45 text-gray-50" />
                </div>
                <span className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-800 transition-colors">
                  SkyElite
                </span>
              </button>

              {/* Desktop Menu Navigation Links (now targets smooth scrolls and dynamic tabs) */}
              <ul className="hidden lg:flex items-center gap-4 font-semibold">
                {primaryPages.map((item) => {
                  const isCurrent = item.isPage 
                    ? activePage === item.actionId 
                    : activePage === 'home';
                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavClick(item)}
                        className={`transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer focus:outline-none py-2 px-3.5 rounded-full ${
                          isCurrent 
                            ? 'text-white bg-[#202A36] shadow-sm' 
                            : 'text-gray-900 hover:bg-[#202A36]/5'
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Action Trigger for Desktop view */}
              <div className="hidden lg:flex items-center">
                <button
                  id="book-now-button-custom"
                  onClick={() => handleNavClick({ name: 'Book', sectionRef: bookRef })}
                  className="px-5 py-2.5 bg-[#202A36] hover:bg-[#1a2229] text-white font-semibold text-xs tracking-wide uppercase rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Book Charter
                </button>
              </div>

              {/* Mobile Menu Open/Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 bg-white/80 hover:bg-white text-gray-900 rounded-full border border-gray-100 shadow-sm focus:outline-none transition-all duration-300 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {/* Mobile dropdown menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-6 z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono mb-2">Navigation Directory</span>
                  {primaryPages.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item)}
                      className={`w-full text-left py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-between transition-colors ${
                        (item.isPage && activePage === item.actionId) || (!item.isPage && activePage === 'home')
                          ? 'bg-[#202A36] text-white'
                          : 'text-gray-900 hover:bg-[#202A36]/5'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className={`h-4 w-4 ${(item.isPage && activePage === item.actionId) || (!item.isPage && activePage === 'home') ? 'text-white' : 'text-gray-400'}`} />
                    </button>
                  ))}
                  <button
                    onClick={() => handleNavClick({ name: 'Book', sectionRef: bookRef })}
                    className="w-full py-3.5 bg-[#202A36] hover:bg-[#1a2229] text-white text-xs font-semibold rounded-xl text-center shadow-lg transition-colors mt-4 flex items-center justify-center gap-2 uppercase tracking-wide"
                  >
                    <Sparkles className="h-4 w-4" /> Book Jet Charter
                  </button>
                </div>
              )}
            </nav>
          </header>

          {/* Centered Main Hero Content Area (Animate elements on load and parallax on scroll) */}
          <main className="flex-1 flex items-center justify-center relative px-8">
            {activePage === 'home' ? (
              <motion.div 
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="w-full max-w-4xl mx-auto text-center -mt-24 select-auto z-10 flex flex-col items-center"
              >
                
                {/* Premium Label */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-6"
                >
                  <span className="text-sm font-bold text-gray-600 tracking-[0.2em] uppercase">
                    PRIVATE JETS
                  </span>
                </motion.div>

                {/* Overlapping Primary Heading (Animate-in) */}
                <h1 className="flex flex-col items-center select-none font-sans">
                  <motion.span 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="gsap-hero-title-1 text-7xl md:text-8xl lg:text-9xl font-normal text-gray-500 leading-none tracking-tighter"
                  >
                    Premium.
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="gsap-hero-title-2 text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter heading-overlap"
                    style={{ color: '#202A36' }}
                  >
                    Accessible.
                  </motion.span>
                </h1>

                {/* Descriptive Subtitle */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="gsap-hero-subtitle mt-10 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed"
                >
                  Your dedication deserves recognition. Experience travel that complements your ambition with seamless efficiency.
                </motion.p>

                {/* Call-to-action Button Stack */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  className="mt-12 flex items-center gap-4"
                >
                  <button
                    onClick={() => handleNavClick({ name: 'Story', sectionRef: storyRef })}
                    className="gsap-hero-btn btn-secondary px-10 py-3 rounded-full text-base font-semibold shadow-sm cursor-pointer focus:outline-none text-center"
                  >
                    Discover
                  </button>
                  <button
                    onClick={() => handleNavClick({ name: 'Book', sectionRef: bookRef })}
                    className="gsap-hero-btn btn-primary px-10 py-3 rounded-full text-base font-semibold shadow-lg cursor-pointer focus:outline-none text-center"
                  >
                    Book Now
                  </button>
                </motion.div>

                {/* Animated Scroll Down Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1.5 }}
                  className="absolute bottom-8 flex flex-col items-center gap-1.5 cursor-pointer"
                  onClick={() => handleNavClick({ name: 'Story', sectionRef: storyRef })}
                >
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Scroll down to explore</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.div>

              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10 select-text max-w-md mx-auto"
              >
                <span className="text-[10px] font-bold text-amber-600 tracking-[0.25em] uppercase font-mono">
                  {activePage === 'about' ? 'Aviation Standards' : 'Sovereign Desk'}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#202A36] tracking-tight mt-1 font-sans">
                  {activePage === 'about' ? 'About SkyElite' : 'Concierge Center'}
                </h2>
              </motion.div>
            )}
          </main>

          {/* Premium Operational Route Info & Footer on Hero */}
          {activePage === 'home' && (
            <div className="relative z-10 w-full px-8 py-6 flex justify-between items-end mt-auto text-[10px] uppercase tracking-widest text-gray-500 font-bold max-w-7xl mx-auto shrink-0">
              <div className="flex gap-4">
                <span>London (LHR)</span>
                <span>&mdash;</span>
                <span>New York (JFK)</span>
              </div>
              <div>&copy; 2026 SkyElite Aviation</div>
            </div>
          )}

        </div>

      </section>

      {activePage === 'home' && (
        <>
          {/* SECTION 1: THE STORY & PHILOSOPHY (Scroll-Triggered) */}
          <section ref={storyRef} className="py-24 px-8 bg-white border-t border-gray-100 flex items-center justify-center relative">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200&auto=format&fit=crop" 
              alt="SkyElite Excellence in Aviation"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <span className="text-xs font-bold font-mono text-amber-400 tracking-widest uppercase mb-1 block">Elite Standard</span>
              <h3 className="text-3xl font-bold text-white tracking-tight">Redefining Private Travel</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-[11px] font-bold tracking-widest text-[#202A36] bg-[#202A36]/5 px-3 py-1.5 rounded-full font-mono uppercase">
              The SkyElite Story
            </span>
            <h2 className="gsap-scroll-trigger text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              An uncompromised philosophy of time, safety, and absolute ease.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Founded to remove the friction of legacy brokerages and high-overhead fractional programs, SkyElite delivers direct digital on-demand private charters. We customize every flight route, flight speed, culinary dining, and ground connection to align perfectly with your schedule.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              By working strictly with elite, audited operators holding the prestigious ARG/US Platinum and Wyvern Wingman credentials, we maintain a fleet of modern, meticulously preserved visual luxury business jets equipped to fly anytime, anywhere.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-2 border-[#202A36] pl-4">
                <span className="text-2xl font-mono font-bold text-gray-900">100%</span>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Carbon Offset Active</p>
              </div>
              <div className="border-l-2 border-[#202A36] pl-4">
                <span className="text-2xl font-mono font-bold text-gray-900">15 min</span>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Fast-Track Boarding</p>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => handleOpenModal('story')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#202A36] hover:text-[#1a2229] transition-colors group cursor-pointer focus:outline-none"
              >
                Read our full operations charter <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: ACTIVE FLEET SHOWCASE */}
      <section ref={fleetRef} className="py-24 px-8 bg-gray-50 border-t border-gray-200/50">
        <div className="w-full max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-[#202A36] bg-[#202A36]/5 px-3 py-1.5 rounded-full font-mono uppercase">
              Our Active Fleet
            </span>
            <h2 className="gsap-scroll-trigger text-4xl font-bold text-gray-900 tracking-tight">Precision Crafted Aircraft</h2>
            <p className="text-gray-600 text-sm">
              Discover pristine aircraft engineered for performance, transcontinental range, and absolute tranquility. Select a model to learn more or request on-page.
            </p>
          </div>

          {/* Elegant Cards Grid with staggered entry */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AIRCRAFT_FLEET.map((jet, idx) => (
              <motion.div
                key={jet.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono tracking-wider uppercase text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">{jet.type}</span>
                      <h4 className="text-lg font-bold text-gray-900 mt-2.5 group-hover:text-[#202A36] transition-colors">{jet.name}</h4>
                    </div>
                    <Plane className="h-5 w-5 text-gray-300 group-hover:text-[#202A36] transform rotate-45 transition-colors shrink-0" />
                  </div>

                  <p className="text-xs text-gray-500 leading-normal line-clamp-3">
                    {jet.description}
                  </p>

                  <div className="border-t border-gray-100 pt-3.5 space-y-2 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cruise Speed</span>
                      <span className="font-semibold text-gray-700">{jet.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Flight Range</span>
                      <span className="font-semibold text-gray-700">{jet.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cabin Seating</span>
                      <span className="font-semibold text-gray-700">{jet.passengers} seats</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
                  <div>
                    <span className="text-[9px] uppercase text-gray-400 font-mono">Target Rate</span>
                    <p className="text-base font-bold text-gray-900 font-mono">${jet.hourlyRate.toLocaleString()}<span className="text-[10px] text-gray-400 font-normal">/hr</span></p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedAircraft(jet);
                      scrollToSection(bookRef);
                    }}
                    className="p-2.5 bg-[#202A36] hover:bg-[#1a2229] rounded-xl text-white transition-colors cursor-pointer"
                    title="Select and Calculate Route Cost"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => handleOpenModal('rates')}
              className="px-6 py-2.5 border border-gray-200 text-gray-800 hover:bg-gray-100 text-xs font-semibold rounded-full transition-colors font-mono uppercase tracking-wider"
            >
              View detailed side-by-side comparison
            </button>
          </div>

        </div>
      </section>

      {/* NEW SECTION: THE FLIGHT PATH - SCROLL-DRIVEN TAKEOFF SIMULATION */}
      <section 
        ref={takeoffSectionRef} 
        className="relative w-full overflow-visible bg-[#0d131a] select-none"
        style={{ height: '240vh' }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
          
          {/* Scroll Scrubbed Takeoff Video Element */}
          <video
            ref={takeoffVideoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-plane-taking-off-under-a-blue-sky-42583-large.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-65 z-0"
          />

          {/* HUD Overlay / Flight Instruments Panel */}
          <div className="absolute inset-8 border border-white/10 rounded-3xl z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10">
            
            {/* Top HUD Row */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest block">SKYELITE HUD SYSTEM v3.4</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold block">COORDS: 41°24'12"N, 2°10'44"E</span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest block">FLIGHT CONTROLLER STATUS</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5 justify-end">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> AUTO-SYNC LOCKED
                </span>
              </div>
            </div>

            {/* Centered Instrument Scopes (Crosshair Reticle and Altitude/Speed scales) */}
            <div className="flex-1 flex items-center justify-between px-2 md:px-20 max-w-5xl w-full mx-auto">
              
              {/* Cruise airspeed scale */}
              <div className="text-left font-mono space-y-2">
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">AIRSPEED</span>
                <div className="text-3xl md:text-5xl font-extrabold text-white font-mono tracking-tighter">
                  {Math.round(takeoffProgress * 516)} <span className="text-xs md:text-sm font-normal text-gray-400">KTAS</span>
                </div>
                <div className="h-28 w-2 bg-white/10 rounded-full relative overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-amber-500 rounded-full transition-all duration-300"
                    style={{ height: `${takeoffProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Pitch Crosshair */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative h-20 w-20 md:h-28 md:w-28 flex items-center justify-center">
                  <div className="absolute inset-0 border border-white/5 rounded-full" />
                  <div className="absolute h-1/2 w-[1px] bg-white/15 left-1/2 -translate-x-1/2" />
                  <div className="absolute w-1/2 h-[1px] bg-white/15 top-1/2 -translate-y-1/2" />
                  {/* Dynamic flight pitch rotation */}
                  <div 
                    className="h-10 w-10 border-2 border-amber-500/80 border-t-transparent border-b-transparent relative transition-transform duration-300 flex items-center justify-center"
                    style={{ transform: `rotate(${-takeoffProgress * 25}deg)` }}
                  >
                    <div className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">
                  {takeoffProgress > 0.82 ? 'MAX COMFORT CRUISE' : takeoffProgress > 0.45 ? 'STEADY CLIMB RATE' : takeoffProgress > 0.05 ? 'NOSE ROTATION' : 'AIRCRAFT STABLE'}
                </span>
              </div>

              {/* Altitude scale */}
              <div className="text-right font-mono space-y-2">
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">ALTITUDE</span>
                <div className="text-3xl md:text-5xl font-extrabold text-white font-mono tracking-tighter">
                  {Math.round(takeoffProgress * 41000).toLocaleString()} <span className="text-xs md:text-sm font-normal text-gray-400">FT</span>
                </div>
                <div className="h-28 w-2 bg-white/10 rounded-full relative overflow-hidden ml-auto">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ height: `${takeoffProgress * 100}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Bottom HUD bar */}
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-4 gap-4">
              <div className="text-left font-mono">
                <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wide">SCROLLBAR FLIGHT PROGRESS AUTOMATION</span>
                <div className="flex items-center gap-3 mt-1 text-xs text-white">
                  <span>GROUND IDLE</span>
                  <div className="w-32 md:w-48 h-1 bg-white/15 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${takeoffProgress * 100}%` }}
                    />
                  </div>
                  <span>41,000 FT LEVEL</span>
                </div>
              </div>
              <div className="text-right font-sans">
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Estimated Flight Standard: PURE CLASS</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Control flight path progression precisely by scrolling web page</p>
              </div>
            </div>

          </div>

          {/* Floating Absolute Texts: Activated based on scroll position */}
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center px-6">
            
            <div className="max-w-2xl text-center space-y-4">
              
              {takeoffProgress >= 0.0 && takeoffProgress < 0.35 && (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-3">
                  <span className="text-[11px] font-bold font-mono tracking-[0.25em] text-amber-500 uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">PHASE 01 &bull; GROUND LIFT CONTROLS</span>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Pure Speed. Instant Release.
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto">
                    Scroll down to trigger nose rotation. Enjoy private business jet takeoffs in seamless 1080p, controlled directly by your scrolling speed.
                  </p>
                </div>
              )}

              {takeoffProgress >= 0.35 && takeoffProgress < 0.7 && (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-3">
                  <span className="text-[11px] font-bold font-mono tracking-[0.25em] text-emerald-400 uppercase bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20">PHASE 02 &bull; COMPILING ALTITUDES</span>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Ascending the Regular Standard.
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto">
                    Climbing straight to 41,000 feet, perfectly surpassing commercial storms, delays, and airport terminal bottlenecks.
                  </p>
                </div>
              )}

              {takeoffProgress >= 0.7 && (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 space-y-3">
                  <span className="text-[11px] font-bold font-mono tracking-[0.25em] text-amber-500 uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">PHASE 03 &bull; SUSTAINED JET CRUISE</span>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Sovereign Comfort Selected.
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto">
                    You have achieved smooth cruising altitude. Welcome to your spacious, fully private sky sanctuary, operated strictly under Part 135 certificates.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* NEW SECTION: CABIN SANCTUARY (VIP INTERIOR VIDEO EXPERIENCE) */}
      <section className="py-24 px-8 bg-white border-t border-gray-100 flex items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold tracking-widest text-[#202A36] bg-[#202A36]/5 px-3 py-1.5 rounded-full font-mono uppercase">
              Cabin Environment Loop
            </span>
            <h2 className="gsap-scroll-trigger text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              An authentic preview of your next sovereign flight deck.
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Step inside a world where luxury is quantified in decibels, pure clean air, and ergonomic precision. Our super-midsize and ultra-long-range jets feature four pristine live zones with low pressure ratios to minimize flight fatigue completely.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Whisper-quiet acoustic sound isolation under 50 dBA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="h-2 w-2 rounded-full bg-[#202A36]" />
                <span>Multi-zone climate selectors with organic HEPA filtration</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="h-2 w-2 rounded-full bg-[#202A36]" />
                <span>Fully flat-folding executive leather sleeper couches</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-96 rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-black/5 flex items-center justify-center">
            {/* Elegant looping video of private jet cabin interior */}
            <video
              src="https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-luxury-private-jet-cabin-34351-large.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-10 text-white font-mono flex justify-between items-end">
              <div>
                <span className="text-[9px] text-amber-400 uppercase tracking-widest font-bold">CABIN LAYOUT LIVE PREVIEW</span>
                <p className="text-xs font-bold font-sans mt-0.5">Praetor 500 Living Concept</p>
              </div>
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-md text-white border border-white/10 uppercase tracking-wider">LOOPING MUTED FEED</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: WORLD-CLASS BENEFITS CO-CONTAINER */}
      <section ref={benefitsRef} className="py-24 px-8 bg-white border-t border-gray-100">
        <div className="w-full max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-[#202A36] bg-[#202A36]/5 px-3 py-1.5 rounded-full font-mono uppercase">
              Exclusive VIP Benefits
            </span>
            <h2 className="gsap-scroll-trigger text-4xl font-bold text-gray-900 tracking-tight">The SkyElite Guarantee</h2>
            <p className="text-gray-600 text-sm">
              We leverage premium flight intelligence to deliver ultimate comfort, exceptional routing, and zero logistical stress on every single itinerary.
            </p>
          </div>

          {/* Benefits grid built with entrance motion triggers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_BENEFITS.map((benefit, idx) => {
              const getIcon = () => {
                switch (benefit.icon) {
                  case 'Zap': return <Zap className="h-5 w-5 text-amber-500" />;
                  case 'Utensils': return <Utensils className="h-5 w-5 text-rose-500" />;
                  case 'MapPin': return <MapPin className="h-5 w-5 text-indigo-500" />;
                  case 'Heart': return <Heart className="h-5 w-5 text-pink-500" />;
                  case 'ShieldCheck': return <ShieldCheck className="h-5 w-5 text-emerald-500" />;
                  default: return <Sparkles className="h-5 w-5 text-amber-500" />;
                }
              };

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-6 bg-gray-50 border border-gray-100 rounded-3xl flex gap-5 hover:bg-white hover:border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="p-3 bg-white shadow-sm rounded-xl h-fit shrink-0 border border-gray-100">
                    {getIcon()}
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-gray-900">{benefit.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: REAL-TIME SECURE ROUTE ESTIMATOR */}
      <section ref={bookRef} className="py-24 px-8 bg-gray-50 border-t border-gray-200/50 text-gray-900 relative">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full font-mono uppercase">
              Charter Billing Estimator
            </span>
            <h2 className="gsap-scroll-trigger text-4xl font-bold text-gray-900 tracking-tight">Design Your Custom Itinerary</h2>
            <p className="text-gray-600 text-sm">
              Configure your routing, pick an optimized class tier, and get immediate estimated pricing built with real flight telemetry calculations.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xl"
          >
            {!isBookedOnPage ? (
              <form onSubmit={handleOnPageSubmit} className="space-y-6">

                {/* Travel route codes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-2 font-mono">Origin Code / Airport</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                      <input 
                        type="text" 
                        required
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="e.g. San Francisco (KSEO) or Paris"
                        className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-2 font-mono">Destination Code / Airport</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                      <input 
                        type="text" 
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. London Biggin Hill (EGKB)"
                        className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-2 font-mono">Preferred Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-2 font-mono">Passenger Capacity</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                      <select 
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans appearance-none"
                      >
                        {[...Array(16)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'guest' : 'guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Jet Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-2 font-mono">Preferred Executive Fleet Tier</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {AIRCRAFT_FLEET.map((jet) => (
                      <button
                        key={jet.id}
                        type="button"
                        onClick={() => setSelectedAircraft(jet)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedAircraft.id === jet.id
                            ? 'bg-[#202A36] text-white border-[#202A36] shadow-md'
                            : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <p className="text-[11px] font-bold tracking-tight block truncate">{jet.name}</p>
                        <p className={`text-[9px] font-mono mt-0.5 ${selectedAircraft.id === jet.id ? 'text-gray-300' : 'text-gray-500'}`}>${jet.hourlyRate.toLocaleString()}/hr</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Telemetry Output */}
                {origin && destination ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3 font-mono text-xs"
                  >
                    <div className="flex justify-between text-gray-500">
                      <span>Telemetry Route</span>
                      <span className="text-gray-900 font-bold">{origin.toUpperCase()} → {destination.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Estimated Distance</span>
                      <span className="text-gray-900 font-bold">{distance.toLocaleString()} nm</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Projected Flight Time</span>
                      <span className="text-gray-900 font-bold">{flightHours} hours</span>
                    </div>
                    <div className="border-t border-gray-200/80 my-2 pt-3.5 flex justify-between text-sm">
                      <span className="text-[#202A36] font-bold">Estimated Base Charter</span>
                      <span className="text-[#202A36] font-bold font-sans text-base">${estimatedCost.toLocaleString()}*</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-sans italic leading-none">
                      *Taxes, luxury crew, airport landing fees, and secure catering are included in estimate.
                    </p>
                  </motion.div>
                ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5 text-center text-xs text-gray-400 italic">
                    Enter valid departure & arrival parameters above to compile active flight time coordinates.
                  </div>
                )}

                {/* Lead Contact Info fields */}
                <div className="border-t border-gray-100 pt-5 space-y-4">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">Secure Client Account Access</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-2 font-mono">Legal Client Name</label>
                      <input 
                        type="text" 
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Dr. Alexis Sterling"
                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-2 font-mono">Secure Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. sterling@wealthcorp.com"
                        className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-3.5 bg-[#202A36] hover:bg-[#1a2229] text-white text-sm font-semibold rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                  >
                    Submit Private Charter Request <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </form>
            ) : (
              <div className="text-center py-12 px-6 space-y-5 animate-in fade-in duration-500">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-500 mb-2">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Request Successfully Dispatched</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-gray-900">{clientName}</strong>. Your charter schedule calculation is registered.
                </p>
                <div className="bg-gray-50 rounded-2xl p-5 text-xs font-mono max-w-sm mx-auto text-left space-y-1.5 border border-gray-200/50 text-gray-600 shadow-inner">
                  <p><strong className="text-gray-800">Tracking Code:</strong> SE-{Math.floor(Math.random() * 900000 + 100000)}</p>
                  <p><strong className="text-gray-800">Itinerary Route:</strong> {origin.toUpperCase()} › {destination.toUpperCase()}</p>
                  <p><strong className="text-gray-800">Fleet Class:</strong> {selectedAircraft.name}</p>
                  <p><strong className="text-gray-800">Target Estimate:</strong> ${estimatedCost.toLocaleString()}</p>
                </div>
                <p className="text-xs text-gray-400 leading-normal">
                  Our private travel coordinator is evaluating landing slots and will contact you directly at <strong className="text-gray-800">{clientEmail}</strong> within 15 minutes.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setOrigin('');
                      setDestination('');
                      setBookingDate('');
                      setClientName('');
                      setClientEmail('');
                      setIsBookedOnPage(false);
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold rounded-full transition-colors font-mono uppercase tracking-wider"
                  >
                    Configure Another Itinerary
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <section ref={faqRef} className="py-24 px-8 bg-white border-t border-gray-100">
        <div className="w-full max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-[#202A36] bg-[#202A36]/5 px-3 py-1.5 rounded-full font-mono uppercase">
              Operational Protocols
            </span>
            <h2 className="gsap-scroll-trigger text-4xl font-bold text-gray-900 tracking-tight">F.A.Q.</h2>
            <p className="text-gray-600 text-sm">
              Explore answers regarding aircraft scheduling, regulatory clearances, luggage, and secure culinary planning.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQ_DATA.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full text-left p-5 font-bold text-gray-900 hover:bg-gray-50 flex justify-between items-center text-sm md:text-base focus:outline-none transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isExpanded ? 'transform rotate-180 text-gray-800' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="p-5 bg-gray-50/60 border-t border-gray-100/80 text-xs md:text-sm text-gray-600 leading-relaxed animate-in slide-in-from-top-1 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Dynamic Subpages */}
      {activePage === 'about' && <AboutPage />}
      {activePage === 'contact' && <ContactPage />}
        </>
      )}

      {/* LUXURY COMPREHENSIVE FOOTER */}
      <footer className="bg-[#202A36] text-white py-16 px-8 border-t border-[#1a2229]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-300">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 h-8 w-8 rounded-lg flex items-center justify-center text-white">
                <Plane className="h-4.5 w-4.5 transform rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">SkyElite</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Global on-demand private aviation coordinates. Custom operations mapped to your ultimate requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold font-mono text-xs uppercase tracking-wider text-gray-400">Our Fleet Tiers</h5>
            <ul className="space-y-2 text-xs">
              {AIRCRAFT_FLEET.map(j => (
                <li key={j.id}>
                  <button onClick={() => { setSelectedAircraft(j); scrollToSection(bookRef); }} className="hover:text-white transition-colors cursor-pointer text-left">
                    {j.name} &mdash; {j.type}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold font-mono text-xs uppercase tracking-wider text-gray-400">Operations</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollToSection(storyRef)} className="hover:text-white transition-colors">Our Story & Standards</button></li>
              <li><button onClick={() => scrollToSection(benefitsRef)} className="hover:text-white transition-colors">Client Air Privileges</button></li>
              <li><button onClick={() => handleOpenModal('story')} className="hover:text-white transition-colors">Pilot Audit Reports</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold font-mono text-xs uppercase tracking-wider text-gray-400">Secure Channels</h5>
            <p className="text-xs text-gray-400 font-mono">ops@skyeliteaviation.com</p>
            <p className="text-xs text-gray-400 font-mono">+1 (800) 555-ELITE</p>
            <p className="text-[10px] text-gray-500 font-sans mt-2">
              All charters operated under FAA Part 135 air carrier operation certificates.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; 2026 SkyElite Aviation Ltd. All private records safeguarded secure standard.</p>
          <div className="flex gap-6">
            <button className="hover:text-gray-300">Privacy Charter</button>
            <button className="hover:text-gray-300">Flight Terms</button>
            <button className="hover:text-gray-300">CO2 Reports</button>
          </div>
        </div>
      </footer>

      {/* Premium Diagnostic Modals */}
      <Modal 
        type={activeModal} 
        onClose={() => setActiveModal(null)} 
      />

    </div>
  );
}

