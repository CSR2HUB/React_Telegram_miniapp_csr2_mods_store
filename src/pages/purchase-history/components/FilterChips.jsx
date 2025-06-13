import React from 'react';

const FilterChips = ({ selectedFilter, onFilterChange, purchases }) => {
  const filters = [
    { id: 'all', label: 'All', count: purchases.length },
    { 
      id: 'completed', 
      label: 'Completed', 
      count: purchases.filter(p => p.status === 'completed').length 
    },
    { 
      id: 'pending', 
      label: 'Pending', 
      count: purchases.filter(p => p.status === 'pending').length 
    },
    { 
      id: 'failed', 
      label: 'Failed', 
      count: purchases.filter(p => p.status === 'failed').length 
    }
  ];

  return (
    <div className="px-4 py-3 border-b border-border">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
              font-medium font-body text-sm transition-all duration-150 ease-racing
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
              active:scale-95
              ${selectedFilter === filter.id
                ? 'bg-accent text-primary' :'bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary'
              }
            `}
          >
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-bold font-data
                ${selectedFilter === filter.id
                  ? 'bg-primary text-accent' :'bg-secondary text-text-primary'
                }
              `}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;