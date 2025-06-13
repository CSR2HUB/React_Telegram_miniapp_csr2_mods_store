import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import BottomTabBar from 'components/ui/BottomTabBar';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Turbo Stage 3 Kit",
      compatibleCar: "McLaren 720S",
      price: 24.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      category: "Engine Tune",
      rating: 4.8,
      downloadSize: "45 MB"
    },
    {
      id: 2,
      name: "Carbon Fiber Body Kit",
      compatibleCar: "BMW M4",
      price: 19.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
      category: "Body Kit",
      rating: 4.9,
      downloadSize: "78 MB"
    },
    {
      id: 3,
      name: "Racing Livery Pack",
      compatibleCar: "Porsche 911 GT3",
      price: 12.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
      category: "Livery",
      rating: 4.7,
      downloadSize: "23 MB"
    }
  ];

  useEffect(() => {
    // Simulate loading cart from localStorage
    const timer = setTimeout(() => {
      const savedCart = localStorage.getItem('csr2_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems(mockCartItems);
        localStorage.setItem('csr2_cart', JSON.stringify(mockCartItems));
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Setup Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      // Setup back button
      if (cartItems.length > 0) {
        tg.BackButton.show();
        tg.BackButton.onClick(() => navigate('/mod-storefront'));
      }

      // Setup main button for checkout
      if (cartItems.length > 0) {
        const total = calculateTotal();
        tg.MainButton.setText(`Proceed to Payment • $${total.toFixed(2)}`);
        tg.MainButton.color = '#ffdb00';
        tg.MainButton.textColor = '#1a1a1a';
        tg.MainButton.show();
        tg.MainButton.onClick(handleCheckout);
      } else {
        tg.MainButton.hide();
      }

      return () => {
        tg.BackButton.hide();
        tg.MainButton.hide();
      };
    }
  }, [cartItems, navigate]);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('csr2_cart', JSON.stringify(updatedItems));

    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  const removeItem = (itemId) => {
    setShowDeleteConfirm(itemId);
  };

  const confirmRemoveItem = () => {
    const updatedItems = cartItems.filter(item => item.id !== showDeleteConfirm);
    setCartItems(updatedItems);
    localStorage.setItem('csr2_cart', JSON.stringify(updatedItems));
    setShowDeleteConfirm(null);

    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }

    // Show toast
    showToast('Item removed from cart');
  };

  const showToast = (message) => {
    if (window.Telegram?.WebApp?.showPopup) {
      window.Telegram.WebApp.showPopup({
        title: 'Cart Updated',
        message: message,
        buttons: [{ type: 'ok' }]
      });
    }
  };

  const handleCheckout = () => {
    if (window.Telegram?.WebApp?.openInvoice) {
      const invoice = {
        title: 'CSR2 Mods Purchase',
        description: `${cartItems.length} mod${cartItems.length > 1 ? 's' : ''}`,
        payload: JSON.stringify({ cartItems, timestamp: Date.now() }),
        provider_token: 'DEMO_PROVIDER_TOKEN',
        currency: 'USD',
        prices: [
          {
            label: 'Subtotal',
            amount: Math.round(calculateSubtotal() * 100)
          },
          {
            label: 'Tax',
            amount: Math.round(calculateTax() * 100)
          }
        ]
      };
      
      window.Telegram.WebApp.openInvoice(invoice.payload, (status) => {
        if (status === 'paid') {
          // Clear cart and redirect to purchase history
          setCartItems([]);
          localStorage.removeItem('csr2_cart');
          navigate('/purchase-history');
        }
      });
    } else {
      // Fallback for non-Telegram environment
      navigate('/purchase-history');
    }
  };

  const handleContinueShopping = () => {
    navigate('/mod-storefront');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="w-6 h-6 bg-surface rounded animate-pulse"></div>
            <div className="w-32 h-6 bg-surface rounded animate-pulse"></div>
            <div className="w-6 h-6"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-lg p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-secondary rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-secondary rounded"></div>
                  <div className="w-1/2 h-3 bg-secondary rounded"></div>
                  <div className="w-1/4 h-4 bg-secondary rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/mod-storefront')}
            className="
              flex items-center justify-center w-10 h-10 -ml-2
              text-text-secondary hover:text-text-primary
              transition-colors duration-150 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-accent
              active:scale-95
            "
          >
            <Icon name="ArrowLeft" size={24} />
          </button>
          
          <h1 className="text-xl font-bold text-text-primary font-heading">
            Shopping Cart
          </h1>
          
          <div className="w-10 h-10" />
        </div>
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart onContinueShopping={handleContinueShopping} />
      ) : (
        <>
          {/* Cart Summary */}
          <div className="p-4 bg-surface border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary font-heading">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </h2>
                <p className="text-sm text-text-secondary font-body">
                  Ready for checkout
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent font-data">
                  ${calculateTotal().toFixed(2)}
                </p>
                <p className="text-sm text-text-secondary font-caption">
                  Total including tax
                </p>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-4 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <OrderSummary
            subtotal={calculateSubtotal()}
            tax={calculateTax()}
            total={calculateTotal()}
            onCheckout={handleCheckout}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-200 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <Icon name="Trash2" size={48} className="text-error mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary font-heading mb-2">
                Remove Item?
              </h3>
              <p className="text-text-secondary font-body mb-6">
                This item will be removed from your cart.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="
                    flex-1 px-4 py-2 bg-secondary hover:bg-surface-hover
                    text-text-primary rounded-lg font-medium font-body
                    transition-all duration-150 ease-racing
                    focus:outline-none focus:ring-2 focus:ring-accent
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemoveItem}
                  className="
                    flex-1 px-4 py-2 bg-error hover:bg-red-600
                    text-white rounded-lg font-medium font-body
                    transition-all duration-150 ease-racing
                    focus:outline-none focus:ring-2 focus:ring-error
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomTabBar cartCount={cartItems.length} />
    </div>
  );
};

export default ShoppingCart;