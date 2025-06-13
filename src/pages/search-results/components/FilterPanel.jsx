import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isVisible, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Engine Tunes', label: 'Engine Tunes' },
    { value: 'Body Kits', label: 'Body Kits' },
    { value: 'Liveries', label: 'Liveries' },
    { value: 'Wheels', label: 'Wheels' },
    { value: 'Suspension', label: 'Suspension' },
    { value: 'Exhaust', label: 'Exhaust' }
  ];

  const carBrands = [
    { value: 'all', label: 'All Brands' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Ferrari', label: 'Ferrari' },
    { value: 'Lamborghini', label: 'Lamborghini' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'Porsche', label: 'Porsche' },
    { value: 'Toyota', label: 'Toyota' }
  ];

  const ratings = [
    { value: 0, label: 'All Ratings' },
    { value: 4.5, label: '4.5+ Stars' },
    { value: 4.0, label: '4.0+ Stars' },
    { value: 3.5, label: '3.5+ Stars' },
    { value: 3.0, label: '3.0+ Stars' }
  ];

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      category: 'all',
      priceRange: [0, 1000],
      rating: 0,
      carBrand: 'all'
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...localFilters.priceRange];
    newRange[index] = parseInt(value);
    setLocalFilters({ ...localFilters, priceRange: newRange });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-200 bg-background animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-bold text-text-primary font-heading">
          Filters
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Icon name="X" size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary font-heading mb-3">
            Category
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setLocalFilters({ ...localFilters, category: category.value })}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg
                  transition-all duration-150 ease-racing
                  focus:outline-none focus:ring-2 focus:ring-accent
                  ${localFilters.category === category.value
                    ? 'bg-accent text-primary' :'bg-surface hover:bg-surface-hover text-text-primary'
                  }
                `}
              >
                <span className="font-medium font-body">{category.label}</span>
                {localFilters.category === category.value && (
                  <Icon name="Check" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary font-heading mb-3">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-text-secondary font-caption mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  value={localFilters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className="input-base w-full"
                  min="0"
                  max="1000"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-text-secondary font-caption mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="input-base w-full"
                  min="0"
                  max="1000"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-text-secondary font-data">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary font-heading mb-3">
            Minimum Rating
          </h3>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <button
                key={rating.value}
                onClick={() => setLocalFilters({ ...localFilters, rating: rating.value })}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg
                  transition-all duration-150 ease-racing
                  focus:outline-none focus:ring-2 focus:ring-accent
                  ${localFilters.rating === rating.value
                    ? 'bg-accent text-primary' :'bg-surface hover:bg-surface-hover text-text-primary'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={16} className="text-accent fill-current" />
                  <span className="font-medium font-body">{rating.label}</span>
                </div>
                {localFilters.rating === rating.value && (
                  <Icon name="Check" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Car Brand Filter */}
        <div>
          <h3 className="text-lg font-semibold text-text-primary font-heading mb-3">
            Car Brand
          </h3>
          <div className="space-y-2">
            {carBrands.map((brand) => (
              <button
                key={brand.value}
                onClick={() => setLocalFilters({ ...localFilters, carBrand: brand.value })}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg
                  transition-all duration-150 ease-racing
                  focus:outline-none focus:ring-2 focus:ring-accent
                  ${localFilters.carBrand === brand.value
                    ? 'bg-accent text-primary' :'bg-surface hover:bg-surface-hover text-text-primary'
                  }
                `}
              >
                <span className="font-medium font-body">{brand.label}</span>
                {localFilters.carBrand === brand.value && (
                  <Icon name="Check" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-3">
          <button
            onClick={handleResetFilters}
            className="
              flex-1 btn-base bg-surface hover:bg-surface-hover text-text-primary
              py-3 font-semibold font-body
            "
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="
              flex-1 btn-base bg-accent hover:bg-accent-hover text-primary
              py-3 font-semibold font-body shadow-neon
            "
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;