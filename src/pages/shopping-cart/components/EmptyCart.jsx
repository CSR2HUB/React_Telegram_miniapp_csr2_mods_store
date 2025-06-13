import React from 'react';
import Icon from 'components/AppIcon';

const EmptyCart = ({ onContinueShopping }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-sm mx-auto">
        {/* Empty Cart Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ShoppingCart" size={48} className="text-text-secondary" />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 left-8 w-8 h-8 bg-accent rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-8 right-12 w-6 h-6 bg-success rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-8 left-12 w-4 h-4 bg-warning rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-text-primary font-heading mb-3">
          Your Cart is Empty
        </h2>
        
        <p className="text-text-secondary font-body mb-8 leading-relaxed">
          Discover amazing mods to enhance your CSR2 racing experience. From engine tunes to custom liveries, we have everything you need to dominate the streets.
        </p>

        {/* Action Button */}
        <button
          onClick={onContinueShopping}
          className="
            bg-accent hover:bg-accent-hover text-primary
            px-8 py-4 rounded-lg font-bold text-lg font-heading
            shadow-neon transition-all duration-150 ease-racing
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
            active:scale-98 flex items-center justify-center gap-3 mx-auto
          "
        >
          <Icon name="Store" size={20} className="text-primary" />
          Continue Shopping
        </button>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
          <div className="text-center">
            <Icon name="Zap" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-xs text-text-secondary font-caption">
              Instant
              <br />
              Download
            </p>
          </div>
          
          <div className="text-center">
            <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
            <p className="text-xs text-text-secondary font-caption">
              Secure
              <br />
              Payment
            </p>
          </div>
          
          <div className="text-center">
            <Icon name="Star" size={24} className="text-warning mx-auto mb-2" />
            <p className="text-xs text-text-secondary font-caption">
              Premium
              <br />
              Quality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;