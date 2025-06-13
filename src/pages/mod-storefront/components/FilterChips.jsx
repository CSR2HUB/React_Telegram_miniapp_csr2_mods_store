import React from 'react';
import Icon from 'components/AppIcon';

const FilterChips = ({ filterOptions, selectedFilters, onFilterChange }) => {
  const renderFilterChip = (label, value, filterType, isSelected) => (
    <button
      key={value}
      onClick={() => onFilterChange(filterType, value)}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-body
        transition-all duration-150 ease-racing whitespace-nowrap
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
        active:scale-95
        ${isSelected
          ? 'bg-accent text-primary shadow-neon'
          : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary'
        }
      `}
    >
      {isSelected && <Icon name="Check" size={14} />}
      {label}
    </button>
  );

  return (
    <div className="space-y-3">
      {/* Manufacturers */}
      <div>
        <h3 className="text-xs font-medium text-text-secondary font-caption mb-2 uppercase tracking-wide">
          Manufacturer
        </h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2">
          {filterOptions.manufacturers.map(manufacturer => 
            renderFilterChip(
              manufacturer,
              manufacturer,
              'manufacturer',
              selectedFilters.manufacturer === manufacturer.toLowerCase()
            )
          )}
        </div>
      </div>

      {/* Types */}
      <div>
        <h3 className="text-xs font-medium text-text-secondary font-caption mb-2 uppercase tracking-wide">
          Type
        </h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2">
          {filterOptions.types.map(type => 
            renderFilterChip(
              type,
              type,
              'type',
              selectedFilters.type === type.toLowerCase()
            )
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-medium text-text-secondary font-caption mb-2 uppercase tracking-wide">
          Price Range
        </h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2">
          {filterOptions.priceRanges.map(range => 
            renderFilterChip(
              range,
              range,
              'priceRange',
              selectedFilters.priceRange === range.toLowerCase()
            )
          )}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedFilters.manufacturer !== 'all' || 
        selectedFilters.type !== 'all' || 
        selectedFilters.priceRange !== 'all') && (
        <div className="pt-2">
          <button
            onClick={() => onFilterChange('all', 'all')}
            className="
              flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-hover
              text-text-secondary hover:text-text-primary rounded-full text-sm font-medium font-body
              transition-all duration-150 ease-racing
              focus:outline-none focus:ring-2 focus:ring-accent
              active:scale-95
            "
          >
            <Icon name="X" size={14} />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterChips;