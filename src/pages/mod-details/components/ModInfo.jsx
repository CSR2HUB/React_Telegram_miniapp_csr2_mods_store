import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ModInfo = ({ 
  mod, 
  onAddToCart, 
  onQuantityChange, 
  currentQuantity = 0 
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-text-secondary" />
      );
    }

    return stars;
  };

  return (
    <div className="p-4 bg-background">
      {/* Title and Category */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-accent text-primary text-xs font-bold font-caption rounded-full">
            {mod.category}
          </span>
          {mod.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-surface text-text-secondary text-xs font-medium font-caption rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-2xl font-bold text-text-primary font-heading mb-2">
          {mod.name}
        </h1>
        
        {mod.compatibleCars && (
          <div className="mb-3">
            <p className="text-sm text-text-secondary font-body mb-1">Compatible with:</p>
            <div className="flex flex-wrap gap-1">
              {mod.compatibleCars.map((car, index) => (
                <span key={index} className="text-sm text-accent font-medium font-body">
                  {car}{index < mod.compatibleCars.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          {renderStars(mod.rating)}
        </div>
        <span className="text-lg font-bold text-text-primary font-data">
          {mod.rating}
        </span>
        <span className="text-text-secondary font-body">
          ({mod.reviewCount} reviews)
        </span>
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl font-bold text-accent font-data">
          {formatPrice(mod.price)}
        </span>
        {mod.originalPrice && mod.originalPrice > mod.price && (
          <span className="text-lg text-text-secondary line-through font-data">
            {formatPrice(mod.originalPrice)}
          </span>
        )}
        {mod.originalPrice && mod.originalPrice > mod.price && (
          <span className="px-2 py-1 bg-success text-primary text-sm font-bold font-caption rounded">
            SAVE {Math.round(((mod.originalPrice - mod.price) / mod.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Key Features */}
      {mod.features && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-text-primary font-heading mb-3">
            Key Features
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {mod.features.slice(0, showFullDescription ? mod.features.length : 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                <span className="text-text-primary font-body">{feature}</span>
              </div>
            ))}
          </div>
          
          {mod.features.length > 3 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-3 text-accent hover:text-accent-hover font-medium font-body text-sm transition-colors duration-150"
            >
              {showFullDescription ? 'Show Less' : `Show ${mod.features.length - 3} More Features`}
              <Icon 
                name={showFullDescription ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="inline ml-1" 
              />
            </button>
          )}
        </div>
      )}

      {/* Requirements */}
      {mod.requirements && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-text-primary font-heading mb-3">
            Requirements
          </h3>
          <div className="bg-surface rounded-lg p-4">
            {mod.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-3 mb-2 last:mb-0">
                <Icon name="Info" size={16} className="text-accent flex-shrink-0" />
                <span className="text-text-secondary font-body text-sm">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mod Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Download" size={16} className="text-accent" />
            <span className="text-sm text-text-secondary font-caption">Downloads</span>
          </div>
          <span className="text-lg font-bold text-text-primary font-data">
            {mod.downloads?.toLocaleString() || 'N/A'}
          </span>
        </div>
        
        <div className="bg-surface rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="HardDrive" size={16} className="text-accent" />
            <span className="text-sm text-text-secondary font-caption">Size</span>
          </div>
          <span className="text-lg font-bold text-text-primary font-data">
            {mod.downloadSize || 'N/A'}
          </span>
        </div>
      </div>

      {/* Add to Cart Section */}
      <div className="sticky bottom-20 bg-background pt-4 border-t border-border">
        {currentQuantity === 0 ? (
          <button
            onClick={onAddToCart}
            className="
              w-full btn-base bg-accent hover:bg-accent-hover text-primary
              py-4 text-lg font-bold font-body
              shadow-neon animate-scale-tap
              flex items-center justify-center gap-3
            "
          >
            <Icon name="ShoppingCart" size={20} />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-surface rounded-lg p-2">
              <button
                onClick={() => onQuantityChange(currentQuantity - 1)}
                className="
                  w-10 h-10 flex items-center justify-center
                  bg-secondary hover:bg-surface-hover rounded-lg
                  transition-colors duration-150
                  focus:outline-none focus:ring-2 focus:ring-accent
                "
              >
                <Icon name="Minus" size={16} className="text-text-primary" />
              </button>
              
              <span className="text-xl font-bold text-text-primary font-data min-w-[2rem] text-center">
                {currentQuantity}
              </span>
              
              <button
                onClick={() => onQuantityChange(currentQuantity + 1)}
                className="
                  w-10 h-10 flex items-center justify-center
                  bg-accent hover:bg-accent-hover text-primary rounded-lg
                  transition-colors duration-150
                  focus:outline-none focus:ring-2 focus:ring-accent
                "
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
            
            <div className="flex-1 text-right">
              <p className="text-sm text-text-secondary font-caption">Total</p>
              <p className="text-xl font-bold text-accent font-data">
                {formatPrice(mod.price * currentQuantity)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModInfo;