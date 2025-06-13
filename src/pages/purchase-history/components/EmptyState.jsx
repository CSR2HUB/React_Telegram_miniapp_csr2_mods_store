import React from 'react';
import Icon from 'components/AppIcon';

const EmptyState = ({ searchQuery, selectedFilter, onClearFilters, onGoToStore }) => {
  const isFiltered = searchQuery || selectedFilter !== 'all';

  return (
    <div className="text-center py-12 px-4">
      <div className="mb-6">
        <Icon 
          name={isFiltered ? "Search" : "ShoppingBag"} 
          size={64} 
          className="text-text-secondary mx-auto mb-4" 
        />
        
        <h3 className="text-xl font-bold text-text-primary font-heading mb-2">
          {isFiltered ? 'No purchases found' : 'No purchases yet'}
        </h3>
        
        <p className="text-text-secondary font-body max-w-sm mx-auto">
          {isFiltered 
            ? searchQuery 
              ? `No purchases match "${searchQuery}". Try different keywords or clear filters.`
              : `No ${selectedFilter} purchases found. Try adjusting your filters.`
            : 'Start shopping for amazing CSR2 mods and they\'ll appear here with download links.'
          }
        </p>
      </div>

      <div className="space-y-3">
        {isFiltered && (
          <button
            onClick={onClearFilters}
            className="
              w-full flex items-center justify-center gap-2 px-6 py-3
              bg-surface hover:bg-surface-hover text-text-primary
              rounded-lg font-medium font-body
              transition-all duration-150 ease-racing
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
              active:scale-98
            "
          >
            <Icon name="X" size={16} />
            Clear Filters
          </button>
        )}
        
        <button
          onClick={onGoToStore}
          className="
            w-full flex items-center justify-center gap-2 px-6 py-3
            bg-accent hover:bg-accent-hover text-primary
            rounded-lg font-medium font-body shadow-neon
            transition-all duration-150 ease-racing
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
            active:scale-98
          "
        >
          <Icon name="Store" size={16} />
          {isFiltered ? 'Browse Store' : 'Start Shopping'}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;