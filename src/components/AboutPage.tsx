import { motion } from 'motion/react';
import { ShieldCheck, Award, Users, Hourglass, ArrowUpRight, CheckCircle, Navigation, Landmark } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: "Bespoke Flight Coordinates", value: "15,400+" },
    { label: "Incident-Free Safety Record", value: "0.0%" },
    { label: "Wyvern & ARG/US Audited Operators", value: "100%" },
    { label: "Global Municipal Airport Access", value: "5,500+" }
  ];

  const milestones = [
    {
      year: "2018",
      title: "The Inception",
      description: "Established SkyElite with three private aviation experts to bypass the systemic friction and high-overhead commitments of fractional ownership platforms."
    },
    {
      year: "2020",
      title: "Real-Time Direct Access Engine",
      description: "Launched our bespoke telemetry booking software to calculate direct fuel, cruise speed, and flight path details transparently."
    },
    {
      year: "2023",
      title: "100% Sustainable Action Standard",
      description: "Integrated carbon-offset credits into every single flight calculation, making voluntary climate alignment seamless for lead passengers."
    },
    {
      year: "2026",
      title: "Next-Gen Fleet Integration",
      description: "Fully modernized our audited operator list to offer ultra-long-range models like the Global 7500 with voice-controlled VIP living cabins."
    }
  ];

  const corePillars = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
      title: "Meticulous Safe Audits",
      desc: "Every operating crew and jet is pre-cleared against actual Wyvern Wingman guidelines. No exceptions."
    },
    {
      icon: <Users className="h-6 w-6 text-[#202A36]" />,
      title: "Bespoke Crew Pairing",
      desc: "Our captains average 8,500 flight hours, with extensive Type Ratings in specific heavy-class private corporate aviation."
    },
    {
      icon: <Landmark className="h-6 w-6 text-amber-500" />,
      title: "Sovereign Discretion",
      desc: "Client identity, flight routes, and ground connections are handled on fully secure networks, safeguarding your commercial confidentiality."
    }
  ];

  return (
    <div className="w-full bg-white text-gray-900 select-text">
      
      {/* Mini Breadcrumb Title Block (Theme Match) */}
      <section className="bg-gray-50 border-b border-gray-100 py-16 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-600 font-mono uppercase">ABOUT SKYELITE</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#202A36] tracking-tight mt-2 font-sans">
              Our Aviation Charter
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mt-3 font-sans">
              The ultimate synthesis of engineering accuracy, safety, and modern private executive comfort.
            </p>
          </div>
          <div className="flex gap-3 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
            <span>Corporate Info</span>
            <span>&bull;</span>
            <span>Est. 2018</span>
            <span>&bull;</span>
            <span className="text-[#202A36]">Arg/Us Platinum Operator Network</span>
          </div>
        </div>
      </section>

      {/* CORE STATS BOARD (Aesthetic Numbers Grid) */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-gray-50 border border-gray-100 p-8 rounded-3xl"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#202A36] font-mono tracking-tight">{stat.value}</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-2.5 font-sans leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PILLARS & CORE STANDARDS (Bento / Grid Feel) */}
      <section className="py-16 px-8 bg-gray-50 border-t border-b border-gray-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-5">
            <span className="text-[10px] font-bold tracking-widest text-[#202A36] bg-[#202A36]/5 px-3 py-1.5 rounded-full font-mono uppercase">
              The Protocol
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              Safety is never left to intuition.
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We operate exclusively with air carriers registered under FAA Part 135 certificates. Our operator vetting process ensures that every luxury cockpit is helmed by highly certified professionals.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#202A36]">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" /> Zero VFR flights &bull; Strict IFR Routing
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="p-3 bg-gray-50 rounded-xl w-fit">
                  {pillar.icon}
                </div>
                <h4 className="text-sm font-bold text-[#202A36] font-mono uppercase tracking-tight">{pillar.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* IMMERSIVE IMAGE GRID (with referrerPolicy="no-referrer") */}
      <section className="py-24 px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-bold tracking-widest text-amber-600 font-mono uppercase">LUXURY CO-SPACE</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Elegance From Tarmac to Cabin</h2>
          <p className="text-sm text-gray-600">
            A visual overview of the premium environments waiting to host your executive travels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-80 rounded-3xl overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600" 
              alt="First class jet interior"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 z-20 text-white">
              <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase">Phenom Cabin</span>
              <p className="text-sm font-bold mt-1">Ergonomic Leather Lounges</p>
            </div>
          </div>

          <div className="relative h-80 rounded-3xl overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600" 
              alt="VIP Airport Suite Lounge"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 z-20 text-white">
              <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase">Premium Terminals</span>
              <p className="text-sm font-bold mt-1">Sovereign FBO Member Access</p>
            </div>
          </div>

          <div className="relative h-80 rounded-3xl overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600" 
              alt="SkyElite Carrier Jets"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 z-20 text-white">
              <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase">High Performance</span>
              <p className="text-sm font-bold mt-1">Super-Midsize Heavy Transports</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHRONOLOGICAL TIMELINE PATHWAY */}
      <section className="py-24 px-8 bg-gray-50 border-t border-gray-200/50">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-bold tracking-widest text-[#202A36] bg-[#202A36]/5 px-3 py-1.5 rounded-full font-mono uppercase">
              The Lifeline
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Milestones</h2>
            <p className="text-sm text-gray-500">
              Tracing our path from a simplified booking philosophy to a global executive air standard.
            </p>
          </div>

          <div className="relative border-l border-gray-200 pl-6 md:pl-8 space-y-12 ml-2 md:ml-4">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="absolute -left-10 md:-left-12 top-1 bg-white border-2 border-[#202A36] h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-[#202A36] shadow-sm">
                  {idx + 1}
                </div>
                
                <div className="space-y-1">
                  <span className="text-base font-bold text-amber-600 font-mono">{milestone.year}</span>
                  <h4 className="text-lg font-bold text-[#202A36]">{milestone.title}</h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
