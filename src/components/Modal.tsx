import React, { useState } from 'react';
import { 
  X, 
  Plane, 
  Zap, 
  Utensils, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Users, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';
import { ModalType, Aircraft } from '../types';
import { AIRCRAFT_FLEET, CLIENT_BENEFITS, FAQ_DATA } from '../data';

interface ModalProps {
  type: ModalType;
  onClose: () => void;
}

export default function Modal({ type, onClose }: ModalProps) {
  if (!type) return null;

  // Book Charter States
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft>(AIRCRAFT_FLEET[0]);
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [bookingStep, setBookingStep] = useState(1); // 1 = Estimator, 2 = Inquiry, 3 = Success

  // Rates States
  const [focusedAircraft, setFocusedAircraft] = useState<Aircraft>(AIRCRAFT_FLEET[0]);

  // FAQ states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Estimator Calculations
  const calculateDistance = () => {
    // Semi-random deterministic distance for demonstration based on names of cities
    if (!origin || !destination) return 0;
    const key = (origin + destination).toLowerCase();
    let score = 0;
    for (let i = 0; i < key.length; i++) {
      score += key.charCodeAt(i);
    }
    return Math.max(300, (score * 7) % 6500); // Between 300nm and 6500nm
  };

  const distance = calculateDistance();
  const speedKnots = parseInt(focusedAircraft?.speed || '450');
  const flightHours = distance > 0 ? parseFloat((distance / speedKnots).toFixed(1)) : 0;
  const estimatedCost = flightHours > 0 ? Math.round(flightHours * selectedAircraft.hourlyRate * 1.08) : 0; // plus airport taxes/fees

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !emailAddress) return;
    setBookingStep(3); // Success Screen
  };

  const renderModalContent = () => {
    switch (type) {
      case 'story':
        return (
          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200&auto=format&fit=crop" 
                alt="SkyElite Aviation Excellence" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-xs font-semibold tracking-wider text-gray-300 uppercase mb-1">Our Heritage</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">The SkyElite Philosophy</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-600 leading-relaxed">
              <div className="md:col-span-3 space-y-4">
                <p className="text-base text-gray-900 font-medium leading-normal">
                  Founded with a singular ambitious mission: to bring absolute accessibility and digital transparency to premium private aviation. 
                </p>
                <p>
                  At SkyElite, we believe your time is the ultimate luxury. We stripped away the legacy broker models, hidden fractional ownership overheads, and complicated long-term commitments to introduce a direct, high-fidelity booking platform that adapts effortlessly to your lifestyle.
                </p>
                <p>
                  With certified elite pilots, premium corporate flight operators, and a hand-selected modern active fleet — ranging from light business jets to intercontinental heavy-cabin widebodies — SkyElite guarantees an uncompromised level of safety, customized culinary dining, and 24-hour absolute discretion.
                </p>
              </div>

              <div className="md:col-span-2 space-y-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Our Standards</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-900 shrink-0" />
                      <p className="text-xs"><strong className="text-gray-900">ARG/US Platinum</strong> safety certification across all charter operators.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-900 shrink-0" />
                      <p className="text-xs"><strong className="text-gray-900">Customized Catering</strong> designed to your individual requirements.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-900 shrink-0" />
                      <p className="text-xs"><strong className="text-gray-900">Instant Booking</strong> coordinates multi-city journeys seamlessly.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Inquiries</h4>
                  <p className="text-[11px] font-mono">ops@skyeliteaviation.com</p>
                  <p className="text-[11px] font-mono">+1 (800) 555-ELITE</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rates':
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 mb-4">
              Explore our current fleet of hand-selected luxurious modern charter aircraft. Select a model to preview specifications and typical rates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Aircraft List Left */}
              <div className="md:col-span-5 space-y-3">
                {AIRCRAFT_FLEET.map((jet) => (
                  <button
                    key={jet.id}
                    onClick={() => setFocusedAircraft(jet)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex justify-between items-center ${
                      focusedAircraft.id === jet.id
                        ? 'bg-gradient-to-r from-gray-50 to-white border-[#202A36] shadow-sm font-medium'
                        : 'bg-white hover:bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div>
                      <h4 className="text-gray-900 font-semibold">{jet.name}</h4>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{jet.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#202A36] font-mono font-medium">${jet.hourlyRate.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400 font-mono">/ hour</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Specs Panel Right */}
              <div className="md:col-span-7 bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-start border-b border-gray-200/60 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded">Active Fleet Status</span>
                    <h3 className="text-xl font-bold text-[#202A36] mt-1">{focusedAircraft.name}</h3>
                  </div>
                  <Plane className="h-5 w-5 text-gray-400 transform rotate-45 shrink-0" />
                </div>

                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{focusedAircraft.description}"
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white border border-gray-100 rounded-xl">
                    <span className="text-gray-400 uppercase font-mono tracking-tight text-[10px]">Maximum Range</span>
                    <p className="text-gray-900 font-bold mt-1">{focusedAircraft.range}</p>
                  </div>
                  <div className="p-3 bg-white border border-gray-100 rounded-xl">
                    <span className="text-gray-400 uppercase font-mono tracking-tight text-[10px]">Cruise Speed</span>
                    <p className="text-gray-900 font-bold mt-1">{focusedAircraft.speed}</p>
                  </div>
                  <div className="p-3 bg-white border border-gray-100 rounded-xl">
                    <span className="text-gray-400 uppercase font-mono tracking-tight text-[10px]">Passenger Seats</span>
                    <p className="text-gray-900 font-bold mt-1">Up to {focusedAircraft.passengers} guests</p>
                  </div>
                  <div className="p-3 bg-white border border-gray-100 rounded-xl">
                    <span className="text-gray-400 uppercase font-mono tracking-tight text-[10px]">Baggage Volume</span>
                    <p className="text-gray-900 font-bold mt-1">{focusedAircraft.luggage}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="bg-[#202A36] rounded-xl p-4 text-white flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-300 font-mono">Estimated Base Fare</span>
                      <p className="text-lg font-mono font-semibold">${focusedAircraft.hourlyRate.toLocaleString()} <span className="text-xs text-gray-300">/ hr</span></p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAircraft(focusedAircraft);
                        setBookingStep(1);
                        onClose();
                        // Trigger opening of "book" modal in next loop or manually passed down
                        const bookingBtn = document.getElementById('book-now-button-custom');
                        if (bookingBtn) {
                          setTimeout(() => bookingBtn.click(), 50);
                        }
                      }}
                      className="bg-white text-gray-900 hover:bg-gray-100 text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      Book Fleet <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div className="space-y-6">
            <p className="text-sm text-gray-600 mb-4">
              SkyElite premium operations deliver ultimate luxury, priority routes, and zero logistical stress, giving you the focus to move at the speed of thought.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex gap-4 hover:border-gray-200 transition-colors">
                    <div className="p-2.5 bg-white shadow-sm rounded-xl h-fit shrink-0">
                      {getIcon()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-xs text-gray-600 leading-normal">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-2">
              Have questions regarding flight operations, booking procedures, or custom arrangements? Explore our answers.
            </p>

            <div className="space-y-2">
              {FAQ_DATA.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="w-full text-left p-4 font-medium text-gray-900 hover:bg-gray-50 flex justify-between items-center text-sm"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
                    </button>
                    {isExpanded && (
                      <div className="p-4 bg-gray-50/60 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'book':
        return (
          <div className="space-y-4">
            {bookingStep === 1 && (
              <div className="space-y-5">
                <div className="bg-amber-50 border border-amber-200/60 text-amber-900/90 text-xs px-4 py-3 rounded-xl flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    Configure origin and destination. Let our algorithmic system calculate target flight hours and pricing estimates in real time.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-1.5 font-mono">Origin Airport Code / City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="e.g. Teterboro, NJ (KTEB)"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-1.5 font-mono">Destination Code / City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Opa-Locka, Miami (KOPF)"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-1.5 font-mono">Preferred Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-1.5 font-mono">Passengers</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select 
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-sans appearance-none"
                      >
                        {[...Array(16)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'guest' : 'guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-1.5 font-mono">Preferred Aircraft Tier</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {AIRCRAFT_FLEET.map((jet) => (
                      <button
                        key={jet.id}
                        onClick={() => setSelectedAircraft(jet)}
                        type="button"
                        className={`p-3 rounded-xl border text-left transition-all ${
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

                {/* Live Estimator Breakdown */}
                {origin && destination ? (
                  <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-5 space-y-3 font-mono text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Flight Route</span>
                      <span className="text-gray-900 font-semibold">{origin.toUpperCase()} → {destination.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Approximate Distance</span>
                      <span className="text-gray-900 font-semibold">{distance.toLocaleString()} nm</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Estimated Duration ({selectedAircraft.name})</span>
                      <span className="text-gray-900 font-semibold">~{flightHours} hrs</span>
                    </div>
                    <div className="border-t border-gray-200/60 my-2 pt-2 flex justify-between text-sm">
                      <span className="text-[#202A36] font-bold">Estimated Base Charter</span>
                      <span className="text-[#202A36] font-bold font-sans text-base">${estimatedCost.toLocaleString()}*</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-sans italic leading-none">
                      *Price includes estimated fuel surcharge, crew provisioning, landing fees, and luxury handling.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-5 text-center text-xs text-gray-400 italic">
                    Enter Origin & Destination above to generate route distance and hourly billing calculation.
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    disabled={!origin || !destination || !date}
                    onClick={() => setBookingStep(2)}
                    className="w-full md:w-auto bg-[#202A36] hover:bg-[#1a2229] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    Proceed to Request Charter <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">Flight Request Summary</h4>
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">{origin.toUpperCase()}</strong> to <strong className="text-gray-900">{destination.toUpperCase()}</strong>
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    Date: {date} | Aircraft: {selectedAircraft.name} | Cabin Cap: {selectedAircraft.passengers} pax
                  </p>
                  <p className="text-xs text-gray-800 font-semibold font-mono">
                    Estimated Cost: ${estimatedCost.toLocaleString()} Base
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-1 font-mono">Full Legal Name</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ambassador Marcus Vance"
                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-tight mb-1 font-mono">Private / Secure Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="e.g. marcus.vance@executive.com"
                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="w-1/2 py-3 border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 transition-all font-medium text-center"
                  >
                    Adjust Flight Details
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 bg-[#202A36] hover:bg-[#1a2229] rounded-full text-xs text-white transition-all font-medium text-center flex items-center justify-center gap-1.5"
                  >
                    Submit Private Charter Request <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}

            {bookingStep === 3 && (
              <div className="text-center py-12 px-6 space-y-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-500 mb-2">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Charter Request Registered</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-gray-900">{fullName}</strong>. Your charter itinerary evaluation has been synchronized with SkyElite flight operations.
                </p>
                <div className="bg-gray-50 rounded-2xl p-4 text-xs font-mono max-w-sm mx-auto text-left space-y-1.5 border border-gray-100 text-gray-600">
                  <p><strong className="text-gray-800">Tracking Reference:</strong> SE-{Math.floor(Math.random() * 900000 + 100000)}</p>
                  <p><strong className="text-gray-800">Itinerary Code:</strong> {origin.toUpperCase()} › {destination.toUpperCase()}</p>
                  <p><strong className="text-gray-800">Aircraft Assigned:</strong> {selectedAircraft.name}</p>
                  <p><strong className="text-gray-800">Estimated Cost:</strong> ${estimatedCost.toLocaleString()}</p>
                </div>
                <p className="text-xs text-gray-400">
                  A personal flight coordinator will contact you at <strong>{emailAddress}</strong> within the next 15 minutes to coordinate custom catering, scheduling, and payment.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setOrigin('');
                      setDestination('');
                      setDate('');
                      setFullName('');
                      setEmailAddress('');
                      setBookingStep(1);
                      onClose();
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold rounded-full transition-colors"
                  >
                    Return to Page
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'story': return 'The SkyElite Story';
      case 'rates': return 'Fleet Details & Hourly Rates';
      case 'benefits': return 'On-Demand Member Benefits';
      case 'faq': return 'Frequently Answered Questions';
      case 'book': return 'Private Jet Charter Estimator';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#202A36]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/25 flex flex-col relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-[#202A36] h-8 w-8 rounded-lg flex items-center justify-center text-white shrink-0">
              <Plane className="h-4.5 w-4.5 transform rotate-45" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#202A36]">{getModalTitle()}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
}
