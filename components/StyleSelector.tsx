import React from 'react';
import type { Style, SubFeature } from '../types';
import { PremiumIcon } from '../constants';

interface StyleSelectorProps {
  subFeature: SubFeature | null;
  selectedStyle: Style | null;
  onSelect: (style: Style) => void;
}

const StyleItemImage: React.FC<{ style: Style; isSelected: boolean; onSelect: () => void; }> = ({ style, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className="flex flex-col items-center cursor-pointer group space-y-2 flex-shrink-0"
    >
        <div className={`relative w-16 h-16 rounded-full p-0.5 transition-all duration-200 ${isSelected ? 'bg-gradient-to-tr from-pink-400 to-fuchsia-500' : 'bg-transparent'}`}>
            {style.id === 'none' ? (
                 <div className="w-full h-full rounded-full bg-white border-2 border-slate-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                 </div>
            ) : (
                <img src={style.value} alt={style.label} className="w-full h-full rounded-full object-cover border-2 border-white" />
            )}
            {style.isPremium && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <PremiumIcon className="w-3 h-3 text-yellow-300" />
              </div>
            )}
        </div>
        <span className={`text-xs font-medium text-center transition-colors ${isSelected ? 'text-pink-500' : 'text-slate-600 group-hover:text-slate-900'}`}>{style.label}</span>
    </div>
);

const StyleItemColor: React.FC<{ style: Style; isSelected: boolean; onSelect: () => void; }> = ({ style, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className="flex flex-col items-center cursor-pointer group space-y-2 flex-shrink-0"
    >
        <div className={`relative w-14 h-14 rounded-lg p-0.5 transition-all duration-200 ${isSelected ? 'bg-pink-400' : 'bg-transparent'}`}>
            {style.id === 'none' ? (
                 <div className="w-full h-full rounded-md bg-white border-2 border-slate-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                 </div>
            ) : (
                <div style={{ backgroundColor: style.value }} className="w-full h-full rounded-md border border-slate-200" />
            )}
             {style.isPremium && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <PremiumIcon className="w-3 h-3 text-yellow-300" />
              </div>
            )}
        </div>
        <span className={`text-xs font-medium text-center transition-colors ${isSelected ? 'text-pink-500' : 'text-slate-600 group-hover:text-slate-900'}`}>{style.label}</span>
    </div>
);

const StyleItemIntensity: React.FC<{ style: Style; isSelected: boolean; onSelect: () => void; }> = ({ style, isSelected, onSelect }) => (
    <button
        onClick={onSelect}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 relative ${isSelected ? 'bg-pink-500 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
    >
        {style.label}
        {style.isPremium && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <PremiumIcon className="w-3 h-3 text-yellow-300" />
            </div>
        )}
    </button>
);


export const StyleSelector: React.FC<StyleSelectorProps> = ({ subFeature, selectedStyle, onSelect }) => {
  if (!subFeature || !subFeature.styles || subFeature.styles.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10 h-36 flex items-center justify-center">
        Coming soon!
      </div>
    );
  }

  const styles = subFeature.styles;
  const styleType = styles.find(s => s.id !== 'none')?.type || styles[0]?.type;

  return (
    <div className="h-36 overflow-x-auto overflow-y-hidden py-2 flex items-center">
      {styleType === 'image' && (
        <div className="flex items-start space-x-4 px-4">
            {styles.map((style) => (
                <StyleItemImage
                    key={style.id}
                    style={style}
                    isSelected={selectedStyle?.id === style.id}
                    onSelect={() => onSelect(style)}
                />
            ))}
        </div>
      )}
      {styleType === 'color' && (
        <div className="flex items-start space-x-4 px-4">
            {styles.map((style) => (
                <StyleItemColor
                    key={style.id}
                    style={style}
                    isSelected={selectedStyle?.id === style.id}
                    onSelect={() => onSelect(style)}
                />
            ))}
        </div>
      )}
      {styleType === 'intensity' && (
        <div className="flex items-center space-x-3 px-4">
            {styles.map((style) => (
                <StyleItemIntensity
                    key={style.id}
                    style={style}
                    isSelected={selectedStyle?.id === style.id}
                    onSelect={() => onSelect(style)}
                />
            ))}
        </div>
      )}
    </div>
  );
};