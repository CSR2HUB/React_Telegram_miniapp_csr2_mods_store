import React from 'react';
import Icon from 'components/AppIcon';

const SearchSuggestions = ({ onSuggestionClick }) => {
  const popularSuggestions = [
    { text: 'Engine Tunes', icon: 'Zap' },
    { text: 'Body Kits', icon: 'Car' },
    { text: 'Racing Wheels', icon: 'Circle' },
    { text: 'Neon Liveries', icon: 'Palette' },
    { text: 'Turbo Kits', icon: 'Wind' },
    { text: 'Exhaust Systems', icon: 'Volume2' }
  ];

  const trendingSearches = [
    'BMW M4 tune',
    'Carbon fiber',
    'Drift suspension',
    'Street racing',
    'Performance parts',
    'Custom livery'
  ];

  return (
    <div className="space-y-6">
      {/* Popular Categories */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary font-heading mb-3">
          Popular Categories
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {popularSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion.text)}
              className="
                flex items-center gap-2 p-3 bg-surface hover:bg-surface-hover
                rounded-lg transition-all duration-150 ease-racing text-left
                focus:outline-none focus:ring-2 focus:ring-accent
                active:scale-98
              "
            >
              <Icon name={suggestion.icon} size={16} className="text-accent" />
              <span className="text-sm font-medium text-text-primary font-body">
                {suggestion.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Searches */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary font-heading mb-3">
          Trending Searches
        </h4>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(search)}
              className="
                px-3 py-2 bg-surface hover:bg-surface-hover text-text-primary
                rounded-full text-sm font-body transition-all duration-150 ease-racing
                focus:outline-none focus:ring-2 focus:ring-accent
                active:scale-95
              "
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-text-secondary font-caption">
          Try searching for mod names, car brands, or categories
        </p>
      </div>
    </div>
  );
};

export default SearchSuggestions;