import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ModCard = ({ mod, onAddToCart, onClick, featured = false }) => {
  const handleCardClick = () => {
    onClick(mod.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(mod);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const discountedPrice = mod.discount ? mod.price * (1 - mod.discount / 100) : mod.price;

  return (
    <div
      onClick={handleCardClick}
      className={`
        card-base p-4 cursor-pointer group
        transition-all duration-150 ease-racing
        hover:bg-surface-hover hover:shadow-neon
        active:scale-98 focus:outline-none focus:ring-2 focus:ring-accent
        ${featured ? 'ring-2 ring-accent ring-opacity-50' : ''}
      `}
    >
      {/* Image Container */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <div className="aspect-video bg-secondary">
          <Image
            src={mod.image}
            alt={mod.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {featured && (
            <div className="bg-accent text-primary px-2 py-1 rounded-full text-xs font-bold font-data">
              FEATURED
            </div>
          )}
          {mod.discount && (
            <div className="bg-error text-white px-2 py-1 rounded-full text-xs font-bold font-data">
              -{mod.discount}%
            </div>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="
            absolute bottom-2 right-2 w-8 h-8 bg-accent hover:bg-accent-hover
            text-primary rounded-full flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface
            active:scale-90
          "
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="font-semibold text-text-primary font-body text-sm line-clamp-2 group-hover:text-accent transition-colors duration-150">
          {mod.name}
        </h3>

        {/* Manufacturer & Type */}
        <div className="flex items-center gap-2 text-xs text-text-secondary font-caption">
          <span>{mod.manufacturer}</span>
          <span>•</span>
          <span>{mod.type}</span>
        </div>

        {/* Compatible Cars */}
        <div className="text-xs text-text-secondary font-caption">
          <span className="text-accent">Compatible:</span> {mod.compatible.slice(0, 2).join(', ')}
          {mod.compatible.length > 2 && ` +${mod.compatible.length - 2} more`}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                className={`${
                  i < Math.floor(mod.rating) 
                    ? 'text-accent fill-current' :'text-text-secondary'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary font-data">
            {mod.rating} ({mod.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mod.discount ? (
              <>
                <span className="text-lg font-bold text-accent font-data">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="text-sm text-text-secondary line-through font-data">
                  {formatPrice(mod.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-accent font-data">
                {formatPrice(mod.price)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="
              btn-base bg-accent hover:bg-accent-hover text-primary
              px-3 py-1 text-xs font-medium font-body
              opacity-0 group-hover:opacity-100 transition-all duration-150
              sm:opacity-100
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModCard;