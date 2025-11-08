import React from 'react';
import type { SubFeature } from '../types';
import { PremiumIcon } from '../constants';

interface SubFeatureTabsProps {
  subFeatures: SubFeature[];
  selectedSubFeature: SubFeature | null;
  onSelect: (subFeature: SubFeature) => void;
}

export const SubFeatureTabs: React.FC<SubFeatureTabsProps> = ({ subFeatures, selectedSubFeature, onSelect }) => {
  if (!subFeatures || subFeatures.length === 0) {
    return null; // Don't render if there are no sub-features
  }
  
  return (
    <div className="overflow-x-auto whitespace-nowrap border-b border-slate-200">
        <div className="flex items-center space-x-4 px-4">
            {subFeatures.map((subFeature) => (
                <button
                    key={subFeature.id}
                    onClick={() => onSelect(subFeature)}
                    className={`py-3 text-sm font-semibold transition-colors duration-200 relative ${
                    selectedSubFeature?.id === subFeature.id
                        ? 'text-pink-500'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    <div className="flex items-center space-x-1">
                        <span>{subFeature.label}</span>
                        {subFeature.isPremium && <PremiumIcon className="w-3 h-3 text-purple-400" />}
                    </div>
                    {selectedSubFeature?.id === subFeature.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-full"></div>
                    )}
                </button>
            ))}
      </div>
    </div>
  );
};