import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PurchaseCard = ({
  purchase,
  isExpanded,
  onToggleExpand,
  onRetryPayment,
  onDownload,
  formatDate,
  formatPrice,
  getStatusColor,
  getStatusIcon
}) => {
  const [downloadingItems, setDownloadingItems] = useState(new Set());

  const handleDownload = async (item) => {
    if (!item.downloadUrl || downloadingItems.has(item.id)) return;

    setDownloadingItems(prev => new Set([...prev, item.id]));
    
    // Simulate download delay
    setTimeout(() => {
      onDownload(item);
      setDownloadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 1500);
  };

  const getDownloadButtonText = (item) => {
    if (downloadingItems.has(item.id)) return 'Downloading...';
    if (item.downloadStatus === 'processing') return 'Processing';
    if (item.downloadStatus === 'unavailable') return 'Unavailable';
    return 'Download';
  };

  const isDownloadDisabled = (item) => {
    return !item.downloadUrl || 
           downloadingItems.has(item.id) || 
           item.downloadStatus === 'processing' ||
           item.downloadStatus === 'unavailable';
  };

  return (
    <div className="bg-surface rounded-lg shadow-inner-glow overflow-hidden">
      {/* Card Header */}
      <button
        onClick={onToggleExpand}
        className="
          w-full p-4 text-left transition-all duration-150 ease-racing
          hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset
        "
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon
              name={getStatusIcon(purchase.status)}
              size={16}
              className={getStatusColor(purchase.status)}
            />
            <span className="text-sm font-medium text-text-secondary font-caption">
              {formatDate(purchase.date)}
            </span>
          </div>
          <Icon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            size={20}
            className="text-text-secondary transition-transform duration-150"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-text-primary font-body mb-1">
              {purchase.items.length === 1 
                ? purchase.items[0].name
                : `${purchase.items.length} items`
              }
            </h3>
            <p className="text-sm text-text-secondary font-caption capitalize">
              {purchase.status} • {formatPrice(purchase.totalAmount)}
            </p>
          </div>
          
          {purchase.items.length === 1 && (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary">
              <Image
                src={purchase.items[0].image}
                alt={purchase.items[0].name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Transaction Details */}
          <div className="p-4 bg-secondary/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary font-caption">Transaction ID</span>
                <p className="text-text-primary font-data">{purchase.id}</p>
              </div>
              <div>
                <span className="text-text-secondary font-caption">Payment Method</span>
                <p className="text-text-primary font-body">{purchase.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="p-4 space-y-3">
            {purchase.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary font-body truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm text-text-secondary font-caption">
                    {item.category} • {formatPrice(item.price)}
                  </p>
                </div>

                {purchase.status === 'completed' && (
                  <button
                    onClick={() => handleDownload(item)}
                    disabled={isDownloadDisabled(item)}
                    className={`
                      px-4 py-2 rounded-lg font-medium font-body text-sm
                      transition-all duration-150 ease-racing
                      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface
                      ${isDownloadDisabled(item)
                        ? 'bg-secondary text-text-secondary cursor-not-allowed' :'bg-accent hover:bg-accent-hover text-primary active:scale-95'
                      }
                    `}
                  >
                    {downloadingItems.has(item.id) && (
                      <Icon name="Download" size={16} className="mr-2 animate-bounce" />
                    )}
                    {getDownloadButtonText(item)}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {purchase.status === 'failed' && (
            <div className="p-4 border-t border-border">
              <button
                onClick={() => onRetryPayment(purchase.id)}
                className="
                  w-full flex items-center justify-center gap-2 px-4 py-3
                  bg-accent hover:bg-accent-hover text-primary
                  rounded-lg font-medium font-body
                  transition-all duration-150 ease-racing
                  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface
                  active:scale-98
                "
              >
                <Icon name="RefreshCw" size={16} />
                Retry Payment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PurchaseCard;