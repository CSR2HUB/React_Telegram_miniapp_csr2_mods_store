import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/mod-storefront');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <Icon 
            name="AlertTriangle" 
            size={80} 
            className="text-accent mx-auto mb-4" 
          />
          <h1 className="text-6xl font-bold text-accent font-heading mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary font-heading mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary font-body mb-8">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>
        
        <button
          onClick={handleGoHome}
          className="
            btn-base bg-accent hover:bg-accent-hover text-primary
            px-8 py-3 text-lg font-semibold font-body
            shadow-neon animate-scale-tap
          "
        >
          <Icon name="Home" size={20} className="mr-2" />
          Back to Store
        </button>
      </div>
    </div>
  );
};

export default NotFound;