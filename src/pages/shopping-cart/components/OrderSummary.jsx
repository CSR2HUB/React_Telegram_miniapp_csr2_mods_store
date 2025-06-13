import React from 'react';
import Icon from 'components/AppIcon';

const OrderSummary = ({ subtotal, tax, total, onCheckout }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="sticky bottom-20 bg-background border-t border-border p-4">
      <div className="bg-surface rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
          Order Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary font-body">Subtotal</span>
            <span className="text-text-primary font-data">{formatPrice(subtotal)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary font-body">Tax (8%)</span>
            <span className="text-text-primary font-data">{formatPrice(tax)}</span>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-text-primary font-heading">
                Total
              </span>
              <span className="text-xl font-bold text-accent font-data">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-4 p-3 bg-secondary rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={16} className="text-success mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary font-body">
                Secure Payment
              </p>
              <p className="text-xs text-text-secondary font-caption">
                Powered by Telegram Payments • Instant delivery after purchase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="
          w-full bg-accent hover:bg-accent-hover text-primary
          py-4 rounded-lg font-bold text-lg font-heading
          shadow-neon transition-all duration-150 ease-racing
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
          active:scale-98 flex items-center justify-center gap-3
        "
      >
        <Icon name="CreditCard" size={20} className="text-primary" />
        Proceed to Payment • {formatPrice(total)}
      </button>

      {/* Additional Info */}
      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-text-secondary font-caption">
        <div className="flex items-center gap-1">
          <Icon name="Download" size={12} />
          <span>Instant Download</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="RefreshCw" size={12} />
          <span>30-Day Refund</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Headphones" size={12} />
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;