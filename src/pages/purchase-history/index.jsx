import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import BottomTabBar from 'components/ui/BottomTabBar';
import PurchaseCard from './components/PurchaseCard';
import FilterChips from './components/FilterChips';
import EmptyState from './components/EmptyState';

const PurchaseHistory = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  // Mock purchase data
  const mockPurchases = [
    {
      id: 'TXN_001',
      date: new Date('2024-01-15T14:30:00Z'),
      status: 'completed',
      totalAmount: 24.97,
      paymentMethod: 'Telegram Stars',
      items: [
        {
          id: 'mod_001',
          name: 'Lamborghini Huracán Performance Kit',
          price: 12.99,
          image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Engine Tune',
          downloadUrl: 'https://example.com/download/mod_001',
          downloadStatus: 'available'
        },
        {
          id: 'mod_002',
          name: 'Carbon Fiber Body Kit',
          price: 11.98,
          image: 'https://images.pixabay.com/photo/2016/05/06/16/32/car-1376190_960_720.jpg',
          category: 'Body Kit',
          downloadUrl: 'https://example.com/download/mod_002',
          downloadStatus: 'available'
        }
      ]
    },
    {
      id: 'TXN_002',
      date: new Date('2024-01-12T09:15:00Z'),
      status: 'completed',
      totalAmount: 8.99,
      paymentMethod: 'Telegram Stars',
      items: [
        {
          id: 'mod_003',
          name: 'Neon Underglow Kit',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          category: 'Visual',
          downloadUrl: 'https://example.com/download/mod_003',
          downloadStatus: 'available'
        }
      ]
    },
    {
      id: 'TXN_003',
      date: new Date('2024-01-10T16:45:00Z'),
      status: 'failed',
      totalAmount: 15.99,
      paymentMethod: 'Telegram Stars',
      items: [
        {
          id: 'mod_004',
          name: 'McLaren 720S Tune Package',
          price: 15.99,
          image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'Engine Tune',
          downloadUrl: null,
          downloadStatus: 'unavailable'
        }
      ]
    },
    {
      id: 'TXN_004',
      date: new Date('2024-01-08T11:20:00Z'),
      status: 'pending',
      totalAmount: 19.98,
      paymentMethod: 'Telegram Stars',
      items: [
        {
          id: 'mod_005',
          name: 'Racing Wheel Set',
          price: 9.99,
          image: 'https://images.pixabay.com/photo/2017/03/27/14/56/auto-2179220_960_720.jpg',
          category: 'Wheels',
          downloadUrl: null,
          downloadStatus: 'processing'
        },
        {
          id: 'mod_006',
          name: 'Custom Livery Pack',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          category: 'Livery',
          downloadUrl: null,
          downloadStatus: 'processing'
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPurchases(mockPurchases);
      setFilteredPurchases(mockPurchases);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter purchases based on search and filter
    let filtered = purchases;

    // Apply status filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(purchase => purchase.status === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(purchase =>
        purchase.items.some(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        purchase.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPurchases(filtered);
  }, [purchases, selectedFilter, searchQuery]);

  const handleRetryPayment = (purchaseId) => {
    // Mock retry functionality
    setPurchases(prev =>
      prev.map(purchase =>
        purchase.id === purchaseId
          ? { ...purchase, status: 'pending' }
          : purchase
      )
    );
  };

  const handleDownload = (item) => {
    // Mock download functionality
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank');
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="p-4">
            <div className="h-8 bg-surface rounded-lg animate-pulse mb-4"></div>
            <div className="h-12 bg-surface rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Filter Skeleton */}
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 w-20 bg-surface rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Purchase Cards Skeleton */}
        <div className="px-4 space-y-4 pb-20">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-secondary rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-secondary rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-secondary rounded w-1/4"></div>
            </div>
          ))}
        </div>

        <BottomTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-text-primary font-heading mb-4">
            Purchase History
          </h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search purchases..."
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
      </div>

      {/* Filter Chips */}
      <FilterChips
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        purchases={purchases}
      />

      {/* Content */}
      <div className="px-4 pb-20">
        {filteredPurchases.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            selectedFilter={selectedFilter}
            onClearFilters={() => {
              setSearchQuery('');
              setSelectedFilter('all');
            }}
            onGoToStore={() => navigate('/mod-storefront')}
          />
        ) : (
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <PurchaseCard
                key={purchase.id}
                purchase={purchase}
                isExpanded={expandedCard === purchase.id}
                onToggleExpand={() => setExpandedCard(
                  expandedCard === purchase.id ? null : purchase.id
                )}
                onRetryPayment={handleRetryPayment}
                onDownload={handleDownload}
                formatDate={formatDate}
                formatPrice={formatPrice}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            ))}
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
};

export default PurchaseHistory;