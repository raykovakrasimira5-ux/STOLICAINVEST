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
  'Парцел',
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
  id: string; // EstateID: stable synchronization key
  estateId?: string; // Original EstateID
  refNumber: string; // EstateRefCode
  title: string;
  dealType: DealType;
  category: PropertyCategory;
  categoryLabel: string;
  price: number;
  currency: 'EUR';
  originalPrice?: number;
  originalCurrency?: 'EUR' | 'BGN';
  oldPrice?: number;
  status?: 1 | 2 | 3; // 1 = active, 2 = offered/reserved, 3 = sold
  statusLabel?: string; // 'Активна' | 'Резервиран' | 'Продаден'
  city: string;
  neighborhood: string;
  address?: string;
  lat?: number;
  lng?: number;
  area: number; // in square meters
  builtArea?: number;
  landArea?: number;
  openedArea?: number;
  rooms?: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  constructionType?: string;
  position?: string;
  newBuildId?: string;
  heatings?: string[];
  heatingText?: string;
  statute?: string;
  kint?: number;
  height?: number;
  minPlanting?: number;
  completeLevel?: string;
  stage?: string;
  images: string[];
  featured?: boolean; // Top tag
  exclusive?: boolean; // Exclusive tag
  noCommission?: boolean; // Nocommission tag
  isNew?: boolean;
  youtubeLink?: string;
  description: string;
  features: string[];
  agent: Agent;
  createdAt: string;
  updatedAt?: string;
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
