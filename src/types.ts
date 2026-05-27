export type ModalType = 'story' | 'rates' | 'benefits' | 'faq' | 'book' | null;

export interface Aircraft {
  id: string;
  name: string;
  type: string;
  passengers: number;
  hourlyRate: number;
  range: string;
  speed: string;
  luggage: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
