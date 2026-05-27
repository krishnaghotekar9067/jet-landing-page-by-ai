import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Building, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  UtensilsCrossed, 
  Car, 
  Dog, 
  Clock,
  Send,
  Calendar
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
  });

  // Unique luxury customizations
  const [gourmetSelected, setGourmetSelected] = useState('Standard Executive Cuisine');
  const [limoSelected, setLimoSelected] = useState(false);
  const [petSelected, setPetSelected] = useState(false);
  const [securitySelected, setSecuritySelected] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const officeLocations = [
    {
      city: "Teterboro Luxury FBO",
      code: "KTEB",
      address: "233 Industrial Ave, Jet Hangar 12, Teterboro, NJ 07608",
      phone: "+1 (800) 555-ELITE ext. 101",
      email: "ny.ops@skyeliteaviation.com"
    },
    {
      city: "London Biggin Hill",
      code: "EGKB",
      address: "VIP Signature Terminal, Main Hangar Rd, Bromley, West London",
      phone: "+44 20 7946 0192",
      email: "lon.ops@skyeliteaviation.com"
    },
    {
      city: "Paris Le Bourget VIP",
      code: "LFPB",
      address: "VIP Executive Access Suite, Avenue de l'Europe, Paris",
      phone: "+33 1 40 12 34 56",
      email: "par.ops@skyeliteaviation.com"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setTicketId(`SE-CON-${Math.floor(Math.random() * 89999 + 10000)}`);
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full bg-white text-gray-900 select-text">
      
      {/* Intro Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-600 font-mono uppercase">CONCIERGE PORTAL</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#202A36] tracking-tight mt-2 font-sans">
              Connect With Flight Ops
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mt-3 font-sans">
              Access the SkyElite 24/7 client workstation. Register custom cabin prerequisites, route modifications, or arrange instant premium ground transfers.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
              Ops Desk Active (Average wait: &lt;15 mins)
            </span>
          </div>
        </div>
      </section>

      {/* Primary Grid Layout */}
      <section className="py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
        
        {/* Contact Form Section */}
        <div className="lg:col-span-7">
          {!submitted ? (
            <div className="space-y-8 bg-gray-50/65 rounded-3xl border border-gray-100 p-6 md:p-8">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-[#202A36]">Submit Sovereign Concierge Memo</h3>
                <p className="text-xs text-gray-500">Provide your travel guidelines. We handle all international flight approvals, catering, and terminal reservations.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-705 uppercase tracking-tight mb-2 font-mono">Lead Passenger Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Dr. Alexis Sterling"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-705 uppercase tracking-tight mb-2 font-mono">Verified Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="sterling@wealthcorp.com"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-705 uppercase tracking-tight mb-2 font-mono">Mobile / Satellite Phone</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 732-9011"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-705 uppercase tracking-tight mb-2 font-mono">Target Travel Date (Optional)</label>
                    <div className="relative">
                      <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="date" 
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* ADVANCED REQUISITES GRID (Luxury Options) */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-widest font-mono">Premium Cabin Pre-selections</h4>
                  
                  {/* Gourmet Dining Selections */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-gray-500 font-mono flex items-center gap-1.5">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-[#202A36]" /> Michelin Gastronomy Selection:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {['Standard Executive Platter', 'Premium Caviar & Seafood', 'Organic Plant-Based Vegan'].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setGourmetSelected(item)}
                          className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                            gourmetSelected === item 
                              ? 'bg-[#202A36] text-white border-[#202A36]' 
                              : 'bg-white text-gray-705 border-gray-200/80 hover:bg-gray-100'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    {/* VIP Limo */}
                    <button
                      type="button"
                      onClick={() => setLimoSelected(!limoSelected)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        limoSelected 
                          ? 'bg-[#202A36]/5 border-[#202A36] text-[#202A36]' 
                          : 'bg-white border-gray-200/80 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <span className="text-xs font-bold font-mono">Ground Limo</span>
                      </div>
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${limoSelected ? 'bg-[#202A36] text-white border-none' : 'border-gray-300'}`}>
                        {limoSelected && <Check className="h-2.5 w-2.5" />}
                      </div>
                    </button>

                    {/* Pet Access */}
                    <button
                      type="button"
                      onClick={() => setPetSelected(!petSelected)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        petSelected 
                          ? 'bg-[#202A36]/5 border-[#202A36] text-[#202A36]' 
                          : 'bg-white border-gray-200/80 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Dog className="h-4 w-4" />
                        <span className="text-xs font-bold font-mono">Pet Companion</span>
                      </div>
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${petSelected ? 'bg-[#202A36] text-white border-none' : 'border-gray-300'}`}>
                        {petSelected && <Check className="h-2.5 w-2.5" />}
                      </div>
                    </button>

                    {/* Elite Security */}
                    <button
                      type="button"
                      onClick={() => setSecuritySelected(!securitySelected)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        securitySelected 
                          ? 'bg-[#202A36]/5 border-[#202A36] text-[#202A36]' 
                          : 'bg-white border-gray-200/80 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-xs font-bold font-mono">Tarmac Security</span>
                      </div>
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${securitySelected ? 'bg-[#202A36] text-white border-none' : 'border-gray-300'}`}>
                        {securitySelected && <Check className="h-2.5 w-2.5" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Message detail */}
                <div>
                  <label className="block text-xs font-semibold text-gray-705 uppercase tracking-tight mb-2 font-mono">Special Airport Coordination or Flight Route requirements</label>
                  <textarea 
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide dynamic requests (e.g. multi-leg itineraries, extreme oversized luggage, executive security spacing, custom wine allocations...)"
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-250/60 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all text-xs"
                  />
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#202A36] hover:bg-[#1a2229] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                >
                  <Send className="h-4 w-4" /> Dispatch Secure Concierge Request
                </button>

              </form>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 text-center space-y-6"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#202A36] tracking-tight">Concierge Ticket Generated</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Greetings, <strong className="text-gray-900">{formData.name}</strong>. Your custom requirements has been registered under client files.
                </p>
              </div>

              {/* Receipt Widget */}
              <div className="max-w-sm mx-auto bg-white rounded-2xl border border-gray-150/60 p-5 text-left text-xs font-mono space-y-2 pb-4 shadow-sm">
                <p className="flex justify-between border-b pb-2"><strong className="text-gray-800">CONCIERGE TICKET:</strong> <span className="text-[#202A36] font-bold">{ticketId}</span></p>
                <p className="flex justify-between"><strong className="text-gray-500">Registered Email:</strong> <span>{formData.email}</span></p>
                <p className="flex justify-between"><strong className="text-gray-500">Departure Prep Date:</strong> <span>{formData.preferredDate || 'Flexible Schedule'}</span></p>
                <p className="flex justify-between"><strong className="text-gray-500">Gourmet Catering:</strong> <span className="text-gray-900 font-semibold">{gourmetSelected}</span></p>
                <p className="flex justify-between"><strong className="text-gray-500">Ground Pick-Up:</strong> <span className="text-gray-900 font-semibold">{limoSelected ? 'Confirmed' : 'None'}</span></p>
                <p className="flex justify-between"><strong className="text-gray-500">Cabin Pet Companion:</strong> <span className="text-gray-900 font-semibold">{petSelected ? 'Confirmed' : 'None'}</span></p>
                <p className="flex justify-between"><strong className="text-gray-500">Executive Security:</strong> <span className="text-gray-900 font-semibold">{securitySelected ? 'Confirmed' : 'None'}</span></p>
              </div>

              <div className="space-y-3 max-w-sm mx-auto">
                <div className="flex items-center gap-2 justify-center text-xs text-[#202A36] font-semibold bg-white border border-gray-100 rounded-full py-2 px-4 shadow-sm w-fit mx-auto">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Call status: Scheduled in &lt;15 minutes</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Our private aviation desk is matching operating schedules and will contact you directly.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: '', email: '', phone: '', preferredDate: '', message: '' });
                    setLimoSelected(false);
                    setPetSelected(false);
                    setSecuritySelected(false);
                    setSubmitted(false);
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold rounded-full transition-colors font-mono uppercase tracking-wider cursor-pointer"
                >
                  Create New Concierge Request
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Corporate Office base section */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-[#202A36] flex items-center gap-2">
              <Building className="h-5 w-5 text-[#202A36]" /> Principal Operations Bases
            </h3>
            <p className="text-xs text-gray-500">Contact our private flight dispatch centers in regional terminals across London, New York and Paris.</p>
          </div>

          <div className="space-y-4">
            {officeLocations.map((office, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all space-y-3 shadow-inner"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-gray-900">{office.city}</h4>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">{office.code}</span>
                </div>
                <p className="text-xs text-gray-500 leading-normal">{office.address}</p>
                
                <div className="border-t border-gray-50 pt-3 space-y-1 text-xs font-mono">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" /> {office.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" /> {office.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secure channels warning */}
          <div className="bg-[#202A36] text-white rounded-2xl p-6 space-y-3">
            <h4 className="text-sm font-bold font-mono text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldCheck className="h-4.5 w-4.5 text-amber-400" /> Executive Safety Clearances
            </h4>
            <p className="text-[11px] text-gray-300 leading-normal">
              SkyElite strictly encrypts all passenger logs under high confidentiality guidelines. No flight coordinates, pilot certificates, or ground limousine transits are shared out-of-operations.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
