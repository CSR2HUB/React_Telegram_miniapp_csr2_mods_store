import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ModDescription = ({ mod }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'installation', label: 'Installation', icon: 'Settings' },
    { id: 'specs', label: 'Specs', icon: 'Info' }
  ];

  const renderDescription = () => {
    if (!mod.description) return null;

    const paragraphs = mod.description.split('\n\n');
    const displayParagraphs = showFullDescription ? paragraphs : paragraphs.slice(0, 2);

    return (
      <div className="space-y-4">
        {displayParagraphs.map((paragraph, index) => (
          <p key={index} className="text-text-primary font-body leading-relaxed">
            {paragraph}
          </p>
        ))}
        
        {paragraphs.length > 2 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-accent hover:text-accent-hover font-medium font-body transition-colors duration-150 flex items-center gap-2"
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
            <Icon 
              name={showFullDescription ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        )}
      </div>
    );
  };

  const renderInstallation = () => {
    if (!mod.installationSteps) return null;

    return (
      <div className="space-y-4">
        <div className="bg-warning bg-opacity-10 border border-warning border-opacity-20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="font-bold text-warning font-body">Important</span>
          </div>
          <p className="text-text-secondary font-body text-sm">
            Always backup your game save before installing any modifications. 
            Modifications may affect game performance and stability.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-text-primary font-heading">Installation Steps:</h4>
          {mod.installationSteps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-6 h-6 bg-accent text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold font-data">{index + 1}</span>
              </div>
              <p className="text-text-primary font-body">{step}</p>
            </div>
          ))}
        </div>

        <div className="bg-success bg-opacity-10 border border-success border-opacity-20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-bold text-success font-body">Pro Tip</span>
          </div>
          <p className="text-text-secondary font-body text-sm">
            Test the modification in a practice race before using it in competitive events.
          </p>
        </div>
      </div>
    );
  };

  const renderSpecs = () => {
    const specs = [
      { label: 'File Size', value: mod.downloadSize || 'N/A', icon: 'HardDrive' },
      { label: 'Last Updated', value: mod.lastUpdated || 'N/A', icon: 'Calendar' },
      { label: 'Creator', value: mod.creator || 'Unknown', icon: 'User' },
      { label: 'Downloads', value: mod.downloads?.toLocaleString() || 'N/A', icon: 'Download' },
      { label: 'Category', value: mod.category || 'N/A', icon: 'Tag' },
      { label: 'Compatibility', value: mod.compatibleCars?.join(', ') || 'N/A', icon: 'Car' }
    ];

    return (
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex items-center gap-3">
              <Icon name={spec.icon} size={16} className="text-accent" />
              <span className="text-text-secondary font-body">{spec.label}</span>
            </div>
            <span className="text-text-primary font-medium font-data text-right max-w-[60%]">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 bg-background">
      <div className="bg-surface rounded-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-4 px-3
                font-medium font-body transition-all duration-150
                ${activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent bg-accent bg-opacity-5' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'description' && renderDescription()}
          {activeTab === 'installation' && renderInstallation()}
          {activeTab === 'specs' && renderSpecs()}
        </div>
      </div>
    </div>
  );
};

export default ModDescription;