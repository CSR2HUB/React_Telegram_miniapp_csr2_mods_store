import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-4 border border-transparent hover:border-border transition-all duration-150">
      <div className="flex gap-4">
        {/* Item Image */}
        <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary font-body truncate">
                {item.name}
              </h3>
              <p className="text-sm text-text-secondary font-caption">
                {item.compatibleCar}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-accent text-primary rounded font-caption font-medium">
                  {item.category}
                </span>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="text-accent fill-current" />
                  <span className="text-xs text-text-secondary font-data">
                    {item.rating}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onRemove(item.id)}
              className="
                p-2 -mt-2 -mr-2 text-text-secondary hover:text-error
                transition-colors duration-150 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-error focus:ring-opacity-50
                active:scale-95
              "
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center bg-secondary rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={item.quantity <= 1}
                  className="
                    p-2 text-text-secondary hover:text-text-primary
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors duration-150 rounded-l-lg
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
                    active:scale-95
                  "
                >
                  <Icon name="Minus" size={16} />
                </button>
                
                <span className="px-4 py-2 text-text-primary font-medium font-data min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="
                    p-2 text-text-secondary hover:text-text-primary
                    transition-colors duration-150 rounded-r-lg
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
                    active:scale-95
                  "
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-lg font-bold text-accent font-data">
                {formatPrice(item.price * item.quantity)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-text-secondary font-caption">
                  {formatPrice(item.price)} each
                </p>
              )}
            </div>
          </div>

          {/* Download Size */}
          <div className="flex items-center gap-1 mt-2">
            <Icon name="Download" size={12} className="text-text-secondary" />
            <span className="text-xs text-text-secondary font-caption">
              {item.downloadSize}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;