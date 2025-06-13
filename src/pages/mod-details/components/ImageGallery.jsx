import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ImageGallery = ({ images = [], modName = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollLeft = currentIndex * scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  if (!images.length) {
    return (
      <div className="h-80 bg-surface flex items-center justify-center">
        <Icon name="Image" size={48} className="text-text-secondary" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image Display */}
      <div 
        className="relative h-80 overflow-hidden bg-surface"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={scrollRef}
          className="flex h-full transition-transform duration-300 ease-racing"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <Image
                src={image}
                alt={`${modName} - Image ${index + 1}`}
                className={`
                  w-full h-full object-cover cursor-pointer transition-transform duration-300
                  ${isZoomed ? 'scale-150' : 'scale-100'}
                `}
                onClick={handleImageClick}
              />
              
              {/* Zoom Indicator */}
              {isZoomed && (
                <div className="absolute top-4 right-4 bg-background bg-opacity-80 rounded-full p-2">
                  <Icon name="ZoomOut" size={16} className="text-text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="
                absolute left-4 top-1/2 transform -translate-y-1/2
                w-10 h-10 bg-background bg-opacity-80 hover:bg-opacity-100
                rounded-full flex items-center justify-center
                transition-all duration-150 ease-racing
                focus:outline-none focus:ring-2 focus:ring-accent
              "
            >
              <Icon name="ChevronLeft" size={20} className="text-text-primary" />
            </button>
            
            <button
              onClick={goToNext}
              className="
                absolute right-4 top-1/2 transform -translate-y-1/2
                w-10 h-10 bg-background bg-opacity-80 hover:bg-opacity-100
                rounded-full flex items-center justify-center
                transition-all duration-150 ease-racing
                focus:outline-none focus:ring-2 focus:ring-accent
              "
            >
              <Icon name="ChevronRight" size={20} className="text-text-primary" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-background bg-opacity-80 rounded-full px-3 py-1">
            <span className="text-sm font-medium text-text-primary font-data">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="p-4 bg-background">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-150
                  ${currentIndex === index 
                    ? 'border-accent shadow-neon' 
                    : 'border-transparent hover:border-surface-hover'
                  }
                `}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-150
                ${currentIndex === index ? 'bg-accent' : 'bg-text-secondary bg-opacity-50'}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;