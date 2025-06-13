import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const ModalDetailContainer = ({ 
  isVisible = false, 
  onClose, 
  children,
  title = '',
  showBackButton = true,
  className = ''
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Handle Telegram back button
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(handleClose);
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
      // Hide Telegram back button
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.BackButton.offClick(handleClose);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.BackButton.offClick(handleClose);
      }
    };
  }, [isVisible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-300 bg-background animate-fade-in"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Header */}
      {(showBackButton || title) && (
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            {showBackButton && (
              <button
                onClick={handleClose}
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
            )}
            
            {title && (
              <h1 className="flex-1 text-xl font-bold text-text-primary font-heading text-center">
                {title}
              </h1>
            )}
            
            {showBackButton && (
              <div className="w-10 h-10" /> // Spacer for centering
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div 
        className={`
          flex-1 overflow-y-auto scrollbar-thin
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalDetailContainer;