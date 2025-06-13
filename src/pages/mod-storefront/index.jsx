import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import BottomTabBar from 'components/ui/BottomTabBar';
import FloatingCartIndicator from 'components/ui/FloatingCartIndicator';
import SearchOverlay from 'components/ui/SearchOverlay';
import ModCard from './components/ModCard';
import FilterChips from './components/FilterChips';
import LoadingSkeleton from './components/LoadingSkeleton';

const ModStorefront = () => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    manufacturer: 'all',
    type: 'all',
    priceRange: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for mods
  const mockMods = [
    {
      id: 1,
      name: "Turbo Beast Engine Tune",
      manufacturer: "BMW",
      type: "Engine",
      price: 24.99,
      rating: 4.8,
      reviews: 156,
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatible: ["BMW M4", "BMW M3", "BMW i8"],
      featured: true,
      discount: 20
    },
    {
      id: 2,
      name: "Carbon Fiber Body Kit",
      manufacturer: "McLaren",
      type: "Body",
      price: 89.99,
      rating: 4.9,
      reviews: 203,
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatible: ["McLaren 720S", "McLaren P1"],
      featured: true
    },
    {
      id: 3,
      name: "Neon Street Livery Pack",
      manufacturer: "Nissan",
      type: "Livery",
      price: 12.99,
      rating: 4.6,
      reviews: 89,
      image: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatible: ["Nissan GT-R", "Nissan 370Z"],
      featured: false
    },
    {
      id: 4,
      name: "Racing Wheel Set Pro",
      manufacturer: "Ferrari",
      type: "Wheels",
      price: 45.99,
      rating: 4.7,
      reviews: 124,
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatible: ["Ferrari 488", "Ferrari F40"],
      featured: false
    },
    {
      id: 5,
      name: "Nitrous Boost System",
      manufacturer: "Lamborghini",
      type: "Engine",
      price: 67.99,
      rating: 4.9,
      reviews: 178,
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatible: ["Lamborghini Huracan", "Lamborghini Aventador"],
      featured: true,
      discount: 15
    },
    {
      id: 6,
      name: "Chrome Finish Package",
      manufacturer: "Porsche",
      type: "Body",
      price: 34.99,
      rating: 4.5,
      reviews: 67,
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
      compatible: ["Porsche 911", "Porsche Cayman"],
      featured: false
    }
  ];

  const filterOptions = {
    manufacturers: ['All', 'BMW', 'McLaren', 'Nissan', 'Ferrari', 'Lamborghini', 'Porsche'],
    types: ['All', 'Engine', 'Body', 'Livery', 'Wheels'],
    priceRanges: ['All', 'Under $25', '$25-$50', '$50-$100', 'Over $100']
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Load cart from localStorage
    const savedCart = localStorage.getItem('csr2_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In a real app, this would trigger API call
    console.log('Searching for:', query);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value.toLowerCase()
    }));
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
    localStorage.setItem('csr2_cart', JSON.stringify(updatedCart));
    
    // Show toast notification
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  const handleModClick = (modId) => {
    navigate(`/mod-details?id=${modId}`);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredMods = mockMods.filter(mod => {
    const manufacturerMatch = selectedFilters.manufacturer === 'all' || 
      mod.manufacturer.toLowerCase() === selectedFilters.manufacturer;
    
    const typeMatch = selectedFilters.type === 'all' || 
      mod.type.toLowerCase() === selectedFilters.type;
    
    let priceMatch = true;
    if (selectedFilters.priceRange !== 'all') {
      switch (selectedFilters.priceRange) {
        case 'under $25':
          priceMatch = mod.price < 25;
          break;
        case '$25-$50':
          priceMatch = mod.price >= 25 && mod.price <= 50;
          break;
        case '$50-$100':
          priceMatch = mod.price > 50 && mod.price <= 100;
          break;
        case 'over $100':
          priceMatch = mod.price > 100;
          break;
      }
    }
    
    return manufacturerMatch && typeMatch && priceMatch;
  });

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary font-heading">
                CSR2 Mods Store
              </h1>
              <p className="text-sm text-text-secondary font-body">
                Premium modifications for your rides
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchVisible(true)}
                className="
                  p-3 bg-surface hover:bg-surface-hover rounded-lg
                  transition-all duration-150 ease-racing
                  focus:outline-none focus:ring-2 focus:ring-accent
                  active:scale-95
                "
              >
                <Icon name="Search" size={20} className="text-text-secondary" />
              </button>
              <button
                onClick={() => navigate('/shopping-cart')}
                className="
                  relative p-3 bg-surface hover:bg-surface-hover rounded-lg
                  transition-all duration-150 ease-racing
                  focus:outline-none focus:ring-2 focus:ring-accent
                  active:scale-95
                "
              >
                <Icon name="ShoppingCart" size={20} className="text-text-secondary" />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary font-data">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <FilterChips
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Pull to Refresh Indicator */}
      {refreshing && (
        <div className="flex items-center justify-center py-4 bg-surface">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-accent border-t-transparent mr-2"></div>
          <span className="text-sm text-text-secondary font-body">Refreshing...</span>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Featured Section */}
        {!isLoading && filteredMods.some(mod => mod.featured) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text-primary font-heading">
                Featured Mods
              </h2>
              <Icon name="Star" size={20} className="text-accent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMods
                .filter(mod => mod.featured)
                .slice(0, 3)
                .map(mod => (
                  <ModCard
                    key={mod.id}
                    mod={mod}
                    onAddToCart={handleAddToCart}
                    onClick={handleModClick}
                    featured={true}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Mods Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary font-heading">
              All Modifications
            </h2>
            <span className="text-sm text-text-secondary font-body">
              {filteredMods.length} mods found
            </span>
          </div>

          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredMods.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMods.map(mod => (
                <ModCard
                  key={mod.id}
                  mod={mod}
                  onAddToCart={handleAddToCart}
                  onClick={handleModClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-2">
                No mods found
              </h3>
              <p className="text-text-secondary font-body mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => setSelectedFilters({ manufacturer: 'all', type: 'all', priceRange: 'all' })}
                className="
                  btn-base bg-accent hover:bg-accent-hover text-primary
                  px-6 py-2 text-sm font-medium font-body
                "
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay
        isVisible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSearch={handleSearch}
        searchResults={[]}
        isLoading={false}
      />

      {/* Floating Cart Indicator */}
      <FloatingCartIndicator
        cartCount={cartCount}
        cartTotal={cartTotal}
        isVisible={cartCount > 0}
      />

      {/* Bottom Tab Bar */}
      <BottomTabBar
        cartCount={cartCount}
        orderCount={0}
      />
    </div>
  );
};

export default ModStorefront;