import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RelatedMods = ({ mods = [] }) => {
  const navigate = useNavigate();

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
        <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-text-secondary" />
      );
    }

    return stars;
  };

  const handleModClick = (modId) => {
    navigate(`/mod-details?id=${modId}`);
  };

  if (!mods.length) {
    return null;
  }

  return (
    <div className="p-4 bg-background">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-text-primary font-heading mb-2">
          Related Mods
        </h3>
        <p className="text-text-secondary font-body">
          You might also like these modifications
        </p>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="overflow-x-auto scrollbar-thin">
        <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
          {mods.map((mod) => (
            <button
              key={mod.id}
              onClick={() => handleModClick(mod.id)}
              className="
                flex-shrink-0 w-48 bg-surface hover:bg-surface-hover
                rounded-lg overflow-hidden transition-all duration-150 ease-racing
                focus:outline-none focus:ring-2 focus:ring-accent
                active:scale-98 shadow-inner-glow hover:shadow-neon
              "
            >
              {/* Mod Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={mod.image}
                  alt={mod.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-accent text-primary text-xs font-bold font-caption rounded-full">
                    {mod.category}
                  </span>
                </div>

                {/* Quick Add Button */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle quick add to cart
                    }}
                    className="
                      w-8 h-8 bg-background bg-opacity-80 hover:bg-opacity-100
                      rounded-full flex items-center justify-center
                      transition-all duration-150
                    "
                  >
                    <Icon name="Plus" size={14} className="text-text-primary" />
                  </button>
                </div>
              </div>

              {/* Mod Info */}
              <div className="p-3">
                <h4 className="font-bold text-text-primary font-body text-left mb-1 line-clamp-2">
                  {mod.name}
                </h4>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-0.5">
                    {renderStars(mod.rating)}
                  </div>
                  <span className="text-xs text-text-secondary font-data">
                    {mod.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent font-data">
                    {formatPrice(mod.price)}
                  </span>
                  
                  <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/mod-storefront')}
          className="
            btn-base bg-secondary hover:bg-surface-hover text-text-primary
            px-6 py-3 font-medium font-body
            transition-all duration-150
            flex items-center gap-2 mx-auto
          "
        >
          <Icon name="Grid3X3" size={16} />
          Browse All Mods
        </button>
      </div>
    </div>
  );
};

export default RelatedMods;