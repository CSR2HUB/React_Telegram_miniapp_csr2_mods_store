import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingCartIndicator = ({ 
  cartCount = 0, 
  cartTotal = 0, 
  isVisible = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartPress = () => {
    navigate('/shopping-cart');
  };

  // Don't show on cart page or when cart is empty
  if (!isVisible || cartCount === 0 || location.pathname === '/shopping-cart') {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="fixed bottom-20 right-4 z-110 animate-slide-up">
      <button
        onClick={handleCartPress}
        className="
          flex items-center gap-3 bg-accent hover:bg-accent-hover text-primary
          px-4 py-3 rounded-full shadow-neon
          transition-all duration-150 ease-racing
          active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
        "
      >
        <div className="relative">
          <Icon
            name="ShoppingCart"
            size={20}
            className="text-primary"
          />
          <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-accent font-data">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium font-body text-primary">
            {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
          </span>
          <span className="text-lg font-bold font-data text-primary">
            {formatPrice(cartTotal)}
          </span>
        </div>
        
        <Icon
          name="ChevronRight"
          size={16}
          className="text-primary ml-1"
        />
      </button>
    </div>
  );
};

export default FloatingCartIndicator;