import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  Search,
  RotateCcw,
  Sparkles,
  PhoneCall,
  Phone,
  Layers,
  Heart,
  Mail,
} from 'lucide-react';
import { Property, PropertyFilterState, UserProfile } from './types';
import { INITIAL_PROPERTIES } from './data/properties';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AuthModal } from './components/AuthModal';
import { LogoCustomizerModal } from './components/LogoCustomizerModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { OfficesSection } from './components/OfficesSection';
import { ContactSection } from './components/ContactSection';
import { SellPropertyModal } from './components/SellPropertyModal';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_PROPERTIES_KEY = 'stolicainvest_properties_v7';
const LOCAL_STORAGE_FAVORITES_KEY = 'stolicainvest_favorites_v7';
const LOCAL_STORAGE_USER_KEY = 'stolicainvest_user_v7';
const LOCAL_STORAGE_LOGO_KEY = 'stolicainvest_logo_v7';

const INITIAL_FILTERS: PropertyFilterState = {
  searchQuery: '',
  dealType: 'all',
  category: 'all',
  city: 'all',
  neighborhood: 'all',
  minPrice: '',
  maxPrice: '',
  minArea: '',
  maxArea: '',
  rooms: 'all',
  sortBy: 'featured',
  onlyFavorites: false,
};

export default function App() {
  // Properties state initialized with localStorage fallback to INITIAL_PROPERTIES
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse error
    }
    return INITIAL_PROPERTIES;
  });

  // User Authentication state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return null;
  });

  // Favorites state
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return ['prop-caro-1'];
  });

  // Custom Logo URL state
  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_LOGO_KEY) || '';
    } catch {
      return '';
    }
  });

  // Filters state
  const [filters, setFilters] = useState<PropertyFilterState>(INITIAL_FILTERS);

  // Modals & UI states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<'favorite' | 'general' | 'profile'>('general');
  const [pendingFavoriteId, setPendingFavoriteId] = useState<string | null>(null);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(properties));
    } catch {
      // Ignore
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Ignore
    }
  }, [favoriteIds]);

  const handleSaveLogo = (url: string) => {
    setCustomLogoUrl(url);
    try {
      localStorage.setItem(LOCAL_STORAGE_LOGO_KEY, url);
    } catch {
      // Ignore
    }
  };

  // Favorite handler: Requires registration/login if user is not authenticated!
  const handleToggleFavorite = (id: string) => {
    if (!user) {
      setPendingFavoriteId(id);
      setAuthModalReason('favorite');
      setIsAuthModalOpen(true);
      return;
    }

    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore
    }

    // If user attempted to favorite a property prior to login, complete that action
    if (pendingFavoriteId) {
      setFavoriteIds((prev) =>
        prev.includes(pendingFavoriteId) ? prev : [...prev, pendingFavoriteId]
      );
      setPendingFavoriteId(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    } catch {
      // Ignore
    }
  };

  const handleClearFavorites = () => {
    setFavoriteIds([]);
  };

  const handleUpdateFilters = (partial: Partial<PropertyFilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Counts for ПРОДАЖБИ and НАЕМИ
  const salePropertiesCount = useMemo(() => {
    return properties.filter((p) => p.dealType === 'sale').length;
  }, [properties]);

  const rentPropertiesCount = useMemo(() => {
    return properties.filter((p) => p.dealType === 'rent').length;
  }, [properties]);

  // Filter and sort listings
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Deal type
      if (filters.dealType !== 'all' && prop.dealType !== filters.dealType) {
        return false;
      }

      // Category / Property type
      if (filters.category !== 'all' && prop.category !== filters.category) {
        return false;
      }

      // City
      if (filters.city !== 'all' && prop.city !== filters.city) {
        return false;
      }

      // Neighborhood
      if (
        filters.neighborhood &&
        filters.neighborhood !== 'all' &&
        prop.neighborhood !== filters.neighborhood
      ) {
        return false;
      }

      // Min Price
      if (filters.minPrice !== '' && prop.price < Number(filters.minPrice)) {
        return false;
      }

      // Max Price
      if (filters.maxPrice !== '' && prop.price > Number(filters.maxPrice)) {
        return false;
      }

      // Only favorites
      if (filters.onlyFavorites && !favoriteIds.includes(prop.id)) {
        return false;
      }

      // Search query (keyword, title, neighborhood, address, refNumber)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesNeighborhood = prop.neighborhood.toLowerCase().includes(q);
        const matchesCity = prop.city.toLowerCase().includes(q);
        const matchesRef = prop.refNumber.toLowerCase().includes(q);
        const matchesAddress = prop.address?.toLowerCase().includes(q);
        const matchesFeatures = prop.features.some((f) => f.toLowerCase().includes(q));

        if (
          !matchesTitle &&
          !matchesNeighborhood &&
          !matchesCity &&
          !matchesRef &&
          !matchesAddress &&
          !matchesFeatures
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'area-desc') {
        return b.area - a.area;
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters, favoriteIds]);

  // Favorite properties objects
  const favoriteProperties = useMemo(() => {
    return properties.filter((p) => favoriteIds.includes(p.id));
  }, [properties, favoriteIds]);

  // Unique neighborhoods sorted strictly alphabetically (А-Я)
  const availableNeighborhoods = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.neighborhood) set.add(p.neighborhood);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'bg'));
  }, [properties]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-blue-100 selection:text-[#2F54A3]">
      {/* Top Navigation */}
      <Navbar
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenAuthModal={() => {
          setAuthModalReason('profile');
          setIsAuthModalOpen(true);
        }}
        onOpenLogoSettings={() => setIsLogoModalOpen(true)}
        customLogoUrl={customLogoUrl}
        onResetFilters={handleResetFilters}
        user={user}
        saleCount={salePropertiesCount}
        rentCount={rentPropertiesCount}
        activeDealType={filters.dealType}
        onSelectDealType={(dealType) => {
          handleUpdateFilters({ dealType });
          document.getElementById('search-box')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSellModal={() => setIsSellModalOpen(true)}
      />

      {/* Hero with Dynamic Modern Design, Real Estate Photo Background, Top Listings Carousel & Filters */}
      <HeroSearch
        filters={filters}
        onFilterChange={handleUpdateFilters}
        onResetFilters={handleResetFilters}
        totalResults={filteredProperties.length}
        availableNeighborhoods={availableNeighborhoods}
        topProperties={properties.slice(0, 5)}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />

      {/* Main Content Area */}
      <main id="properties-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Toolbar: Results Count, Sort, Grid/List view toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-800">
              Показване на <span className="text-[#2F54A3] font-black">{filteredProperties.length}</span> оферти в гр. Русе
            </span>
            {filters.dealType !== 'all' && (
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                filters.dealType === 'sale' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-[#2F54A3] border border-blue-200'
              }`}>
                {filters.dealType === 'sale' ? 'Продажби' : 'Под наем'}
              </span>
            )}
            {filters.neighborhood !== 'all' && (
              <span className="text-xs bg-blue-50 text-[#2F54A3] font-semibold px-2 py-0.5 rounded-md border border-blue-200">
                кв. {filters.neighborhood}
              </span>
            )}
            {filters.onlyFavorites && (
              <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-md">
                Само любими
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-select" className="hidden sm:inline font-medium">Сортиране:</label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  handleUpdateFilters({
                    sortBy: e.target.value as PropertyFilterState['sortBy'],
                  })
                }
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2F54A3] cursor-pointer"
              >
                <option value="featured">Препоръчани първо</option>
                <option value="newest">Най-нови оферти</option>
                <option value="price-asc">Цена: Ниска към Висока</option>
                <option value="price-desc">Цена: Висока към Ниска</option>
                <option value="area-desc">Площ: Най-големи първо</option>
              </select>
            </div>

            {/* Layout switch buttons (Grid / List) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#2F54A3] shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Мрежа (карти)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-[#2F54A3] shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Списък"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4 text-[#2F54A3]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Няма намерени обяви по тези критерии
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-5 leading-relaxed">
              Опитайте да изберете друг квартал или да разширите ценовия диапазон.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2F54A3] hover:bg-[#25468B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Покажи всички оферти в Русе
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favoriteIds.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
                layout={viewMode}
              />
            ))}
          </div>
        )}

        {/* Side-by-Side Offices Section: Офис в Русе & Офис в София */}
        <OfficesSection />

        {/* Bottom Contact Section: "Свържете се с нас веднага" */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        customLogoUrl={customLogoUrl}
        onOpenAuthModal={() => {
          setAuthModalReason('profile');
          setIsAuthModalOpen(true);
        }}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
      />

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favoriteIds.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Sell / Rent Property Modal */}
      <SellPropertyModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />

      {/* Authentication / Profile Modal (Replaces "Добави обява") */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        reason={authModalReason}
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
      />

      {/* Logo Customizer Modal */}
      {isLogoModalOpen && (
        <LogoCustomizerModal
          isOpen={isLogoModalOpen}
          onClose={() => setIsLogoModalOpen(false)}
          customLogoUrl={customLogoUrl}
          onSaveLogo={handleSaveLogo}
        />
      )}

      {/* Favorites Drawer */}
      {isFavoritesDrawerOpen && (
        <FavoritesDrawer
          isOpen={isFavoritesDrawerOpen}
          onClose={() => setIsFavoritesDrawerOpen(false)}
          favoriteProperties={favoriteProperties}
          onRemoveFavorite={handleToggleFavorite}
          onClearFavorites={handleClearFavorites}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
        />
      )}
    </div>
  );
}
