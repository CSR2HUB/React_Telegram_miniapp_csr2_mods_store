import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const SearchOverlay = ({ 
  isVisible = false, 
  onClose, 
  onSearch,
  searchResults = [],
  isLoading = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      // Focus input when overlay opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isVisible]);

  useEffect(() => {
    // Debounced search
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() && onSearch) {
        onSearch(searchQuery.trim());
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch]);

  const handleSearchSubmit = (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // Add to recent searches
    const updatedRecent = [
      trimmedQuery,
      ...recentSearches.filter(item => item !== trimmedQuery)
    ].slice(0, 5);
    
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

    // Navigate to search results
    navigate(`/search-results?q=${encodeURIComponent(trimmedQuery)}`);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(searchQuery);
    }
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    handleSearchSubmit(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleResultClick = (result) => {
    navigate(`/mod-details?id=${result.id}`);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-200 bg-background animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>
        
        <div className="flex-1 relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search mods, parts, tunes..."
            className="
              w-full pl-10 pr-4 py-3 bg-surface border border-transparent rounded-lg
              text-text-primary placeholder-text-secondary font-body
              focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
              transition-all duration-150 ease-racing
            "
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary transition-colors duration-150 rounded"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {searchQuery.trim() ? (
          // Search Results
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-text-primary font-heading">
                  Search Results
                </h3>
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="
                      w-full flex items-center gap-3 p-3 bg-surface hover:bg-surface-hover
                      rounded-lg transition-all duration-150 ease-racing
                      focus:outline-none focus:ring-2 focus:ring-accent
                      active:scale-98
                    "
                  >
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Icon name="Package" size={20} className="text-text-secondary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-text-primary font-body">
                        {result.name}
                      </h4>
                      <p className="text-sm text-text-secondary font-caption">
                        {result.category} • {result.price}
                      </p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary font-heading mb-2">
                  No results found
                </h3>
                <p className="text-text-secondary font-body">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>
        ) : (
          // Recent Searches & Suggestions
          <div className="p-4 space-y-6">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-text-primary font-heading">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 font-body"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="
                        w-full flex items-center gap-3 p-3 text-left
                        hover:bg-surface rounded-lg transition-all duration-150 ease-racing
                        focus:outline-none focus:ring-2 focus:ring-accent
                      "
                    >
                      <Icon name="Clock" size={16} className="text-text-secondary" />
                      <span className="flex-1 text-text-primary font-body">{search}</span>
                      <Icon name="ArrowUpRight" size={16} className="text-text-secondary" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Categories */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-3">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Engine Tunes', icon: 'Zap' },
                  { name: 'Body Kits', icon: 'Car' },
                  { name: 'Wheels', icon: 'Circle' },
                  { name: 'Liveries', icon: 'Palette' }
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleRecentSearchClick(category.name)}
                    className="
                      flex items-center gap-3 p-4 bg-surface hover:bg-surface-hover
                      rounded-lg transition-all duration-150 ease-racing
                      focus:outline-none focus:ring-2 focus:ring-accent
                      active:scale-98
                    "
                  >
                    <Icon name={category.icon} size={20} className="text-accent" />
                    <span className="font-medium text-text-primary font-body">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;