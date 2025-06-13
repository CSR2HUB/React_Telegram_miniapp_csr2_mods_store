import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabBar = ({ cartCount = 0, orderCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Shop',
      path: '/mod-storefront',
      icon: 'Store',
      activeIcon: 'Store',
      badge: null
    },
    {
      label: 'Cart',
      path: '/shopping-cart',
      icon: 'ShoppingCart',
      activeIcon: 'ShoppingCart',
      badge: cartCount > 0 ? cartCount : null
    },
    {
      label: 'Orders',
      path: '/purchase-history',
      icon: 'History',
      activeIcon: 'History',
      badge: orderCount > 0 ? orderCount : null
    }
  ];

  const handleTabPress = (path) => {
    navigate(path);
  };

  const isActiveTab = (tabPath) => {
    if (tabPath === '/mod-storefront') {
      return location.pathname === '/mod-storefront' || location.pathname === '/search-results';
    }
    return location.pathname === tabPath;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border pb-safe">
      <div className="flex items-center justify-around px-4 py-2 h-16">
        {tabs.map((tab) => {
          const isActive = isActiveTab(tab.path);
          
          return (
            <button
              key={tab.path}
              onClick={() => handleTabPress(tab.path)}
              className={`
                relative flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-2
                transition-all duration-150 ease-racing rounded-lg
                ${isActive 
                  ? 'text-accent' :'text-text-secondary hover:text-text-primary'
                }
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
              `}
            >
              <div className="relative">
                <Icon
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={24}
                  className={`transition-colors duration-150 ${
                    isActive ? 'text-accent' : 'text-current'
                  }`}
                />
                {tab.badge && (
                  <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-error rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white font-data">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  </div>
                )}
              </div>
              <span className={`
                text-xs font-medium mt-1 font-caption truncate
                ${isActive ? 'text-accent' : 'text-current'}
              `}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabBar;