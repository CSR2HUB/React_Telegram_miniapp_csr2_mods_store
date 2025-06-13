import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';

import BottomTabBar from 'components/ui/BottomTabBar';
import FloatingCartIndicator from 'components/ui/FloatingCartIndicator';
import SearchOverlay from 'components/ui/SearchOverlay';
import ModCard from './components/ModCard';
import FilterPanel from './components/FilterPanel';
import SearchSuggestions from './components/SearchSuggestions';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    carBrand: 'all'
  });

  // Mock mod data
  const mockMods = [
    {
      id: 1,
      name: "Turbo Beast Engine Tune",
      category: "Engine Tunes",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.8,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      carBrand: "BMW",
      compatibleCars: ["BMW M4", "BMW M3", "BMW M5"],
      isNew: true,
      discount: 29,
      tags: ["turbo", "performance", "engine"]
    },
    {
      id: 2,
      name: "Carbon Fiber Body Kit",
      category: "Body Kits",
      price: 129.99,
      rating: 4.9,
      reviewCount: 156,
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?w=400&h=300&fit=crop",
      carBrand: "Lamborghini",
      compatibleCars: ["Lamborghini Huracan", "Lamborghini Aventador"],
      isNew: false,
      tags: ["carbon", "body", "aerodynamics"]
    },
    {
      id: 3,
      name: "Neon Street Livery Pack",
      category: "Liveries",
      price: 19.99,
      rating: 4.6,
      reviewCount: 89,
      image: "https://images.pixabay.com/photo/2016/11/29/13/14/automotive-1869997_1280.jpg?w=400&h=300&fit=crop",
      carBrand: "Nissan",
      compatibleCars: ["Nissan GT-R", "Nissan 370Z"],
      isNew: true,
      tags: ["neon", "street", "livery", "glow"]
    },
    {
      id: 4,
      name: "Racing Wheel Set Pro",
      category: "Wheels",
      price: 79.99,
      rating: 4.7,
      reviewCount: 312,
      image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop",
      carBrand: "Ferrari",
      compatibleCars: ["Ferrari 488", "Ferrari F8"],
      isNew: false,
      tags: ["wheels", "racing", "performance"]
    },
    {
      id: 5,
      name: "Drift King Suspension",
      category: "Suspension",
      price: 89.99,
      rating: 4.5,
      reviewCount: 178,
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?w=400&h=300&fit=crop",
      carBrand: "Toyota",
      compatibleCars: ["Toyota Supra", "Toyota AE86"],
      isNew: false,
      tags: ["drift", "suspension", "handling"]
    },
    {
      id: 6,
      name: "Exhaust Thunder System",
      category: "Exhaust",
      price: 159.99,
      rating: 4.9,
      reviewCount: 267,
      image: "https://images.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg?w=400&h=300&fit=crop",
      carBrand: "Porsche",
      compatibleCars: ["Porsche 911", "Porsche Cayman"],
      isNew: true,
      tags: ["exhaust", "sound", "performance"]
    }
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = (query) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockMods.filter(mod => {
        const matchesQuery = query === '' || 
          mod.name.toLowerCase().includes(query.toLowerCase()) ||
          mod.category.toLowerCase().includes(query.toLowerCase()) ||
          mod.carBrand.toLowerCase().includes(query.toLowerCase()) ||
          mod.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
        const matchesCategory = filters.category === 'all' || mod.category === filters.category;
        const matchesPrice = mod.price >= filters.priceRange[0] && mod.price <= filters.priceRange[1];
        const matchesRating = mod.rating >= filters.rating;
        const matchesBrand = filters.carBrand === 'all' || mod.carBrand === filters.carBrand;
        
        return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesBrand;
      });
      
      setFilteredResults(results);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [filters]);

  const handleBackPress = () => {
    navigate('/mod-storefront');
  };

  const handleSearchPress = () => {
    setShowSearchOverlay(true);
  };

  const handleAddToCart = (mod) => {
    const existingItem = cartItems.find(item => item.id === mod.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === mod.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...mod, quantity: 1 }];
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Show toast notification
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }
  };

  const handleModPress = (mod) => {
    navigate(`/mod-details?id=${mod.id}`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 1000],
      rating: 0,
      carBrand: 'all'
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const hasActiveFilters = () => {
    return filters.category !== 'all' || 
           filters.priceRange[0] !== 0 || 
           filters.priceRange[1] !== 1000 ||
           filters.rating !== 0 ||
           filters.carBrand !== 'all';
  };

  const renderSearchHeader = () => (
    <div className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center gap-3 p-4">
        <button
          onClick={handleBackPress}
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        
        <button
          onClick={handleSearchPress}
          className="flex-1 flex items-center gap-3 px-4 py-3 bg-surface rounded-lg text-left"
        >
          <Icon name="Search" size={20} className="text-text-secondary" />
          <span className="text-text-primary font-body">
            {searchQuery || "Search mods..."}
          </span>
        </button>
        
        <button
          onClick={() => setShowFilters(true)}
          className={`
            p-3 rounded-lg transition-all duration-150 ease-racing
            focus:outline-none focus:ring-2 focus:ring-accent
            ${hasActiveFilters() 
              ? 'bg-accent text-primary' :'bg-surface text-text-secondary hover:text-text-primary'
            }
          `}
        >
          <Icon name="Filter" size={20} />
        </button>
      </div>
      
      {searchQuery && (
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary font-body">
              {isLoading ? 'Searching...' : `${filteredResults.length} results for "${searchQuery}"`}
            </p>
            {hasActiveFilters() && (
              <button
                onClick={clearFilters}
                className="text-sm text-accent hover:text-accent-hover transition-colors duration-150 font-body"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderRecentSearches = () => {
    if (recentSearches.length === 0) return null;
    
    return (
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm font-medium text-text-secondary font-caption">Recent</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentSearches.slice(0, 5).map((search, index) => (
            <button
              key={index}
              onClick={() => navigate(`/search-results?q=${encodeURIComponent(search)}`)}
              className="
                px-3 py-1.5 bg-surface hover:bg-surface-hover text-text-primary
                rounded-full text-sm font-body transition-all duration-150 ease-racing
                focus:outline-none focus:ring-2 focus:ring-accent
              "
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-surface rounded-lg p-3 animate-pulse">
          <div className="aspect-square bg-secondary rounded-lg mb-3"></div>
          <div className="h-4 bg-secondary rounded mb-2"></div>
          <div className="h-3 bg-secondary rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-secondary rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  const renderNoResults = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <Icon name="Search" size={64} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-primary font-heading mb-2">
          No results found
        </h3>
        <p className="text-text-secondary font-body mb-6">
          We couldn't find any mods matching "{searchQuery}". Try different keywords or check out our suggestions below.
        </p>
        <SearchSuggestions onSuggestionClick={(suggestion) => {
          navigate(`/search-results?q=${encodeURIComponent(suggestion)}`);
        }} />
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pb-24">
      {filteredResults.map((mod) => (
        <ModCard
          key={mod.id}
          mod={mod}
          onPress={() => handleModPress(mod)}
          onAddToCart={() => handleAddToCart(mod)}
          isInCart={cartItems.some(item => item.id === mod.id)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderSearchHeader()}
      
      {!searchQuery && renderRecentSearches()}
      
      <div className="flex-1">
        {isLoading ? (
          renderLoadingSkeleton()
        ) : filteredResults.length === 0 && searchQuery ? (
          renderNoResults()
        ) : (
          renderResults()
        )}
      </div>

      <SearchOverlay
        isVisible={showSearchOverlay}
        onClose={() => setShowSearchOverlay(false)}
        onSearch={(query) => {
          navigate(`/search-results?q=${encodeURIComponent(query)}`);
          setShowSearchOverlay(false);
        }}
      />

      <FilterPanel
        isVisible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={handleFilterChange}
      />

      <FloatingCartIndicator
        cartCount={getCartCount()}
        cartTotal={getCartTotal()}
        isVisible={getCartCount() > 0}
      />

      <BottomTabBar
        cartCount={getCartCount()}
        orderCount={0}
      />
    </div>
  );
};

export default SearchResults;