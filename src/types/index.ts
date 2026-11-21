export interface Puppy {
  id: string;
  name: string;
  slug: string;
  breed: string;
  gender: "Boy" | "Girl" | "Boy & Girl";
  age: string;
  origin: "In Dubai" | "Imported for you";
  status: "available" | "gone-home";
  images: string[];
  video?: string;
  description?: string;
  healthChecked: boolean;
  vaccinated: boolean;
  microchipped: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FamilyStory {
  id: string;
  familyName: string;
  puppyName: string;
  breed: string;
  image: string;
  quote?: string;
  location?: string;
}
