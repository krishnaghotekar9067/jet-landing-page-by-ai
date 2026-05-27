import { Aircraft, Benefit, FAQItem } from './types';

export const AIRCRAFT_FLEET: Aircraft[] = [
  {
    id: 'light-jet',
    name: 'Phenom 300E',
    type: 'Very Light & Light Jets',
    passengers: 6,
    hourlyRate: 5200,
    range: '2,010 nm',
    speed: '464 ktas',
    luggage: '74 cu ft',
    description: 'The world\'s fastest and longest-ranged single-pilot jet, delivering exceptional comfort and premium regional performance.'
  },
  {
    id: 'mid-jet',
    name: 'Praetor 500',
    type: 'Midsize Cabin Jets',
    passengers: 9,
    hourlyRate: 7400,
    range: '3,340 nm',
    speed: '466 ktas',
    luggage: '150 cu ft',
    description: 'Boasting class-leading range and an advanced cabin clean air system, perfect for transcontinental flights.'
  },
  {
    id: 'super-mid-jet',
    name: 'Challenger 3500',
    type: 'Super Midsize Jets',
    passengers: 10,
    hourlyRate: 9800,
    range: '3,200 nm',
    speed: '470 ktas',
    luggage: '106 cu ft',
    description: 'Designed for a seamless blend of business productivity and absolute relaxation, featuring industry\'s first voice-controlled cabin.'
  },
  {
    id: 'heavy-jet',
    name: 'Global 7500',
    type: 'Ultra Long Range & Heavy Jets',
    passengers: 16,
    hourlyRate: 15500,
    range: '7,700 nm',
    speed: '516 ktas',
    luggage: '195 cu ft',
    description: 'The ultimate luxury flagship offering four pristine living areas, a full-size kitchen, and non-stop global travel.'
  }
];

export const CLIENT_BENEFITS: Benefit[] = [
  {
    title: 'Seamless Expedited Boarding',
    description: 'Bypass long terminal lines entirely. Arrive just 15 minutes prior to your departure and walk directly onto your chartered aircraft with VIP baggage handling.',
    icon: 'Zap'
  },
  {
    title: 'Michelin-Star Gastronomy',
    description: 'Tailored private dine-in menus curated by world-class culinary artists, customized to your exact preferences and paired with premium rare wines.',
    icon: 'Utensils'
  },
  {
    title: 'Unrivaled Global Access',
    description: 'Fly directly into smaller municipal airports closer to your ultimate destination, avoiding traffic-heavy hubs and expanding your travel convenience.',
    icon: 'MapPin'
  },
  {
    title: 'First-Class Pet Cabins',
    description: 'Your furry companions are welcomed cabin guests. They travel right next to you with custom bedding, pet catering, and zero carrier stress.',
    icon: 'Heart'
  },
  {
    title: 'Sustainable Air Travel',
    description: '100% of the emissions generated from our flight operations can be seamlessly balanced via our certified carbon offset partnerships.',
    icon: 'ShieldCheck'
  },
  {
    title: '24/7 Dedicated Concierge',
    description: 'A personal aviation coordinator manages every detail of your flight, ground transit, catering requests, and emergency itinerary updates.',
    icon: 'Sparkles'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'How quickly can a private jet charter be arranged?',
    answer: 'Thanks to our on-demand global fleet network, we can arrange flights in as little as 4 hours after final payment and charter contract execution.'
  },
  {
    question: 'What states/countries does SkyElite cover?',
    answer: 'We coordinate local, transcontinental, and intercontinental private charters worldwide, with key departures from regional municipal airports and major city hubs alike.'
  },
  {
    question: 'Are there hidden or baggage fees?',
    answer: 'No. All quotes include aircraft operations, fuel, standard handling, and crew costs. Upgrades such as custom catering or high-end ground transport are itemized explicitly in advance.'
  },
  {
    question: 'What is the policy for cancellation or weather?',
    answer: 'Charters can be rescheduled or cancelled. Weather-related cancellations or route diversions are managed proactively with backup aircraft or ground logistics arranged as safe alternatives.'
  },
  {
    question: 'How does fractional ownership differ from on-demand charters?',
    answer: 'SkyElite provides the benefits of flexible premium scheduling on an on-demand basis with absolutely zero long-term capital lockup, monthly management fees, or ownership commitments.'
  }
];
