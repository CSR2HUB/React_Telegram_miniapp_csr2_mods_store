import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="card-base p-4 animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-video bg-secondary rounded-lg mb-3"></div>
          
          {/* Content Skeleton */}
          <div className="space-y-2">
            {/* Title */}
            <div className="h-4 bg-secondary rounded w-3/4"></div>
            
            {/* Manufacturer & Type */}
            <div className="h-3 bg-secondary rounded w-1/2"></div>
            
            {/* Compatible Cars */}
            <div className="h-3 bg-secondary rounded w-full"></div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-secondary rounded"></div>
                ))}
              </div>
              <div className="h-3 bg-secondary rounded w-12 ml-2"></div>
            </div>
            
            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="h-5 bg-secondary rounded w-16"></div>
              <div className="h-6 bg-secondary rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;