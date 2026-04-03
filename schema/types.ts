// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeEquipment {
  id: string;
  body: { value: string; summary?: string };
  equipmentCategory: string;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  title: string;
}

export interface NodeEvent {
  id: string;
  body: { value: string; summary?: string };
  eventDate: { time: string };
  image: { url: string; alt: string; width: number; height: number };
  location: string;
  path: string;
  title: string;
}

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  featuresItems: any[];
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  title: string;
}

export interface ParagraphFeatureItem {
  id: string;
  description: { value: string };
  icon: string;
  title: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}

export interface NodeWorkshop {
  id: string;
  body: { value: string; summary?: string };
  duration: string;
  image: { url: string; alt: string; width: number; height: number };
  maxParticipants: number;
  path: string;
  price: string;
  skillLevel: string;
  title: string;
}
