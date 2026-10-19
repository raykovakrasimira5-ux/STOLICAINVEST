export type DealType = 'sale' | 'rent';

export const PROPERTY_TYPES = [
  '1-стаен',
  '2-стаен',
  '3-стаен',
  '4-стаен',
  'многостаен',
  'мезонет',
  'ателие',
  'офис',
  'магазин',
  'заведение',
  'склад',
  'пром. помещение',
  'етаж от къща',
  'къща',
  'вила',
  'ГАРАЖ',
  'ЗЕМЕДЕЛСКА ЗЕМЯ',
  'Бизнес имот',
] as const;

export type PropertyCategory = typeof PROPERTY_TYPES[number] | string;

export interface UserProfile {
  name: string;
  emailOrPhone: string;
  provider: 'google' | 'standard';
  avatar?: string;
  createdAt: string;
}

export interface Agent {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  agencyRole: string;
}

export interface Property {
  id: string;
  refNumber: string;
  title: string;
  dealType: DealType;
  category: PropertyCategory;
  categoryLabel: string;
  price: number;
  currency: 'EUR';
  city: string;
  neighborhood: string;
  address?: string;
  lat?: number;
  lng?: number;
  area: number; // in square meters
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  constructionType?: string;
  images: string[];
  featured?: boolean;
  isNew?: boolean;
  description: string;
  features: string[];
  agent: Agent;
  createdAt: string;
}

export interface PropertyFilterState {
  searchQuery: string;
  dealType: 'all' | DealType;
  category: string;
  city: string;
  neighborhood: string;
  minPrice: number | '';
  maxPrice: number | '';
  minArea: number | '';
  maxArea: number | '';
  rooms: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
  onlyFavorites: boolean;
}
