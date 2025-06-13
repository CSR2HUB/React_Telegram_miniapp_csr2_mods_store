import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ModCard = ({ mod, onPress, onAddToCart, isInCart = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(mod);
  };

  return (
    <div
      onClick={() => onPress(mod)}
      className="
        bg-surface rounded-lg overflow-hidden shadow-inner-glow
        transition-all duration-150 ease-racing cursor-pointer
        hover:bg-surface-hover active:scale-98
        focus:outline-none focus:ring-2 focus:ring-accent
      "
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={mod.image}
          alt={mod.name}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {mod.isNew && (
            <span className="px-2 py-1 bg-accent text-primary text-xs font-bold font-caption rounded">
              NEW
            </span>
          )}
          {mod.discount && (
            <span className="px-2 py-1 bg-error text-white text-xs font-bold font-caption rounded">
              -{mod.discount}%
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className={`
            absolute bottom-2 right-2 w-8 h-8 rounded-full
            flex items-center justify-center transition-all duration-150 ease-racing
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface
            active:scale-90
            ${isInCart 
              ? 'bg-accent text-primary' :'bg-background/80 backdrop-blur-sm text-text-primary hover:bg-accent hover:text-primary'
            }
          `}
        >
          <Icon 
            name={isInCart ? "Check" : "Plus"} 
            size={16} 
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Name */}
        <h3 className="font-semibold text-text-primary font-body text-sm mb-1 line-clamp-2">
          {mod.name}
        </h3>

        {/* Category & Brand */}
        <p className="text-xs text-text-secondary font-caption mb-2">
          {mod.category} • {mod.carBrand}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Icon name="Star" size={12} className="text-accent fill-current" />
          <span className="text-xs font-medium text-text-primary font-data">
            {mod.rating}
          </span>
          <span className="text-xs text-text-secondary font-caption">
            ({mod.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent font-data text-sm">
              {formatPrice(mod.price)}
            </span>
            {mod.originalPrice && (
              <span className="text-xs text-text-secondary font-data line-through">
                {formatPrice(mod.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Compatible Cars */}
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-xs text-text-secondary font-caption">
            Compatible: {mod.compatibleCars.slice(0, 2).join(', ')}
            {mod.compatibleCars.length > 2 && ` +${mod.compatibleCars.length - 2} more`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModCard;