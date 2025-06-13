import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ReviewsSection = ({ rating, reviewCount, modId }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock reviews data
  const mockReviews = [
    {
      id: '1',
      user: 'SpeedDemon92',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      date: '2024-01-10',
      comment: `Absolutely incredible mod! The performance boost is exactly as advertised. Installation was straightforward and the results are phenomenal. My Hellcat feels like a completely different beast now.

The attention to detail in the tuning parameters is outstanding. You can really feel the difference in throttle response and power delivery. Highly recommended for anyone looking to maximize their Hellcat's potential.`,
      helpful: 23,
      verified: true
    },
    {
      id: '2',user: 'TunerPro',avatar: 'https://randomuser.me/api/portraits/women/44.jpg',rating: 4,date: '2024-01-08',comment: `Great mod overall! The power increase is noticeable and the installation guide was very helpful. Only minor issue is that it took a few restarts to get it working properly, but once it did, it's been perfect.

The creator clearly knows what they're doing. The dyno charts match real-world performance perfectly.`,
      helpful: 15,
      verified: true
    },
    {
      id: '3',user: 'RacingFan88',avatar: 'https://randomuser.me/api/portraits/men/67.jpg',rating: 5,date: '2024-01-05',comment: `Best mod I've purchased so far! The quality is top-notch and the performance gains are substantial. Worth every penny.`,
      helpful: 8,
      verified: false
    },
    {
      id: '4',
      user: 'ModEnthusiast',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      rating: 4,
      date: '2024-01-03',
      comment: `Solid modification with good documentation. The installation process was smooth and the results speak for themselves. Would definitely buy from this creator again.`,
      helpful: 12,
      verified: true
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-text-secondary" />
      );
    }

    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 2);

  // Rating distribution (mock data)
  const ratingDistribution = [
    { stars: 5, count: 198, percentage: 58 },
    { stars: 4, count: 89, percentage: 26 },
    { stars: 3, count: 34, percentage: 10 },
    { stars: 2, count: 14, percentage: 4 },
    { stars: 1, count: 7, percentage: 2 }
  ];

  return (
    <div className="p-4 bg-background">
      <div className="bg-surface rounded-lg p-4">
        {/* Reviews Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary font-heading">
            Reviews & Ratings
          </h3>
          <button className="text-accent hover:text-accent-hover font-medium font-body text-sm transition-colors duration-150">
            Write Review
          </button>
        </div>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-text-primary font-data mb-2">
              {rating}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {renderStars(rating)}
            </div>
            <p className="text-text-secondary font-body">
              Based on {reviewCount} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm text-text-secondary font-data w-6">
                  {item.stars}★
                </span>
                <div className="flex-1 bg-secondary rounded-full h-2">
                  <div 
                    className="bg-accent rounded-full h-2 transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary font-data w-8">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-text-primary font-heading">
            Customer Reviews
          </h4>
          
          {displayedReviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-3 mb-3">
                <Image
                  src={review.avatar}
                  alt={review.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-text-primary font-body">
                      {review.user}
                    </span>
                    {review.verified && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-success bg-opacity-20 rounded-full">
                        <Icon name="CheckCircle" size={12} className="text-success" />
                        <span className="text-xs text-success font-caption">Verified</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-text-secondary font-data">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="ml-13">
                <p className="text-text-primary font-body leading-relaxed mb-3">
                  {review.comment}
                </p>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors duration-150">
                    <Icon name="ThumbsUp" size={14} />
                    <span className="text-sm font-data">{review.helpful}</span>
                  </button>
                  
                  <button className="text-text-secondary hover:text-text-primary transition-colors duration-150">
                    <Icon name="Flag" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Reviews Button */}
        {mockReviews.length > 2 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="
                btn-base bg-secondary hover:bg-surface-hover text-text-primary
                px-6 py-3 font-medium font-body
                transition-all duration-150
              "
            >
              {showAllReviews 
                ? 'Show Less Reviews' 
                : `Show All ${mockReviews.length} Reviews`
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;