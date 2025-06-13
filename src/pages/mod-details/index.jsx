import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import BottomTabBar from 'components/ui/BottomTabBar';
import FloatingCartIndicator from 'components/ui/FloatingCartIndicator';
import ImageGallery from './components/ImageGallery';
import ModInfo from './components/ModInfo';
import ModDescription from './components/ModDescription';
import RelatedMods from './components/RelatedMods';
import ReviewsSection from './components/ReviewsSection';

const ModDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modId = searchParams.get('id');
  
  const [mod, setMod] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mock mod data
  const mockMods = [
    {
      id: '1',
      name: 'Hellcat Supercharger Kit',
      category: 'Engine Tune',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviewCount: 342,
      compatibleCars: ['Dodge Challenger SRT Hellcat', 'Dodge Charger SRT Hellcat'],
      images: [
        'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: `Transform your Hellcat into an absolute beast with this professional-grade supercharger enhancement kit. This modification pushes your engine to its absolute limits while maintaining reliability and drivability.

The kit includes advanced ECU tuning parameters that optimize air-fuel ratios, ignition timing, and boost pressure for maximum performance gains. You'll experience significantly improved throttle response, increased horsepower output, and enhanced torque delivery across the entire RPM range.

Installation is straightforward with our detailed step-by-step guide, and the modification is fully reversible if needed. All tuning parameters have been extensively tested on dynamometers and real-world conditions to ensure optimal performance and engine longevity.`,
      features: [
        '+150 HP increase over stock','Enhanced supercharger efficiency','Optimized ECU mapping','Improved throttle response','Professional dyno-tested','Reversible installation'
      ],
      requirements: [
        'CSR2 Version 4.0 or higher','Dodge Hellcat (any variant)','Stage 3+ upgrades recommended','Minimum 50MB storage space'
      ],
      installationSteps: [
        'Backup your current game save','Download the mod file to your device','Extract files to CSR2 mods directory','Launch game and apply modification','Restart game to activate changes'
      ],
      tags: ['Performance', 'Engine', 'Supercharger', 'Hellcat'],
      downloadSize: '45.2 MB',lastUpdated: '2024-01-15',creator: 'TuneWorks Pro',
      downloads: 15420
    },
    {
      id: '2',name: 'Neon Underglow Kit',category: 'Visual Mod',
      price: 12.99,
      rating: 4.6,
      reviewCount: 189,
      compatibleCars: ['All Vehicles'],
      images: [
        'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: `Add stunning neon underglow effects to any vehicle in your garage with this comprehensive lighting modification pack.`,
      features: [
        'RGB color customization','Multiple lighting patterns','Sync with music (optional)','Low battery impact'
      ],
      requirements: [
        'CSR2 Version 3.5 or higher','Any vehicle','Minimum 25MB storage space'
      ],
      tags: ['Visual', 'Lighting', 'Customization'],
      downloadSize: '28.7 MB',creator: 'NeonFX Studios'
    }
  ];

  const relatedMods = [
    {
      id: '3',
      name: 'Carbon Fiber Body Kit',
      price: 18.99,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Body Kit'
    },
    {
      id: '4',
      name: 'Racing Stripes Pack',
      price: 8.99,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Livery'
    },
    {
      id: '5',
      name: 'Turbo Whistle Sound',
      price: 6.99,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Audio'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const foundMod = mockMods.find(m => m.id === modId) || mockMods[0];
      setMod(foundMod);
      setIsLoading(false);
    }, 800);

    // Load cart from localStorage
    const savedCart = localStorage.getItem('csr2_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Setup Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(() => navigate(-1));
      
      return () => {
        window.Telegram.WebApp.BackButton.hide();
      };
    }
  }, [modId, navigate]);

  const handleAddToCart = () => {
    if (!mod) return;

    const existingItem = cartItems.find(item => item.id === mod.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === mod.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setToastMessage('Quantity updated in cart');
    } else {
      updatedCart = [...cartItems, { ...mod, quantity: 1 }];
      setToastMessage('Added to cart successfully');
    }

    setCartItems(updatedCart);
    localStorage.setItem('csr2_cart', JSON.stringify(updatedCart));
    
    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Haptic feedback
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (!mod) return;

    let updatedCart;
    if (newQuantity === 0) {
      updatedCart = cartItems.filter(item => item.id !== mod.id);
      setToastMessage('Removed from cart');
    } else {
      updatedCart = cartItems.map(item =>
        item.id === mod.id
          ? { ...item, quantity: newQuantity }
          : item
      );
      setToastMessage('Quantity updated');
    }

    setCartItems(updatedCart);
    localStorage.setItem('csr2_cart', JSON.stringify(updatedCart));
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getCartItemQuantity = () => {
    const item = cartItems.find(item => item.id === mod?.id);
    return item ? item.quantity : 0;
  };

  const getTotalCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Loading Skeleton */}
        <div className="animate-pulse">
          <div className="h-80 bg-surface"></div>
          <div className="p-4 space-y-4">
            <div className="h-8 bg-surface rounded w-3/4"></div>
            <div className="h-4 bg-surface rounded w-1/2"></div>
            <div className="h-20 bg-surface rounded"></div>
            <div className="h-12 bg-surface rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary font-heading mb-2">
            Mod Not Found
          </h2>
          <p className="text-text-secondary font-body mb-6">
            The requested modification could not be found.
          </p>
          <button
            onClick={() => navigate('/mod-storefront')}
            className="btn-base bg-accent hover:bg-accent-hover text-primary px-6 py-3 font-semibold"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const currentQuantity = getCartItemQuantity();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Image Gallery */}
      <ImageGallery images={mod.images} modName={mod.name} />

      {/* Mod Information */}
      <ModInfo 
        mod={mod}
        onAddToCart={handleAddToCart}
        onQuantityChange={handleQuantityChange}
        currentQuantity={currentQuantity}
      />

      {/* Description & Details */}
      <ModDescription mod={mod} />

      {/* Reviews Section */}
      <ReviewsSection 
        rating={mod.rating}
        reviewCount={mod.reviewCount}
        modId={mod.id}
      />

      {/* Related Mods */}
      <RelatedMods mods={relatedMods} />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-4 right-4 z-200 animate-slide-down">
          <div className="bg-success text-primary px-4 py-3 rounded-lg shadow-neon flex items-center gap-3 mx-auto max-w-sm">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium font-body">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Floating Cart Indicator */}
      <FloatingCartIndicator
        cartCount={getTotalCartCount()}
        cartTotal={getTotalCartValue()}
        isVisible={getTotalCartCount() > 0}
      />

      {/* Bottom Tab Bar */}
      <BottomTabBar
        cartCount={getTotalCartCount()}
        orderCount={0}
      />
    </div>
  );
};

export default ModDetails;