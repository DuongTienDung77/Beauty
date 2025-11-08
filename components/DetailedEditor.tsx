import React, { useCallback, useEffect } from 'react';
import type { Feature, Style, SubFeature } from '../types';
import { StyleSelector } from './StyleSelector';
import { SubFeatureTabs } from './SubFeatureTabs';

interface DetailedEditorProps {
    activeTool: Feature | null;
    activeSubFeature: SubFeature | null;
    activeStyle: Style | null;
    onSubFeatureSelect: (subFeature: SubFeature) => void;
    onStyleSelect: (style: Style) => void;
    onConfirm: () => void;
    onCancel: () => void;
    isVip: boolean;
    requestVipAccess: (action: () => void) => void;
    intensity: number;
    onIntensityChange: (value: number) => void;
    onGenerate: (params: {}) => void;
    onDebouncedGenerate: (params: {}) => void;
}

export const DetailedEditor: React.FC<DetailedEditorProps> = (props) => {
    const { 
        activeTool, 
        activeSubFeature, 
        activeStyle, 
        onSubFeatureSelect, 
        onStyleSelect, 
        onConfirm, 
        onCancel,
        isVip,
        requestVipAccess,
        intensity,
        onIntensityChange,
        onGenerate,
        onDebouncedGenerate,
    } = props;

    useEffect(() => {
        // Trigger initial generation when editor opens with a valid style.
        if (activeTool) {
             onGenerate({});
        }
    }, [activeTool]); // Run only when the tool changes


    const handleSubFeatureSelect = useCallback((subFeature: SubFeature) => {
        if (subFeature.isPremium && !isVip) {
            requestVipAccess(() => handleSubFeatureSelect(subFeature));
            return;
        }

        onSubFeatureSelect(subFeature);
        const stylesToConsider = isVip ? subFeature.styles : (subFeature.styles?.filter(s => !s.isPremium) || []);
        const defaultStyle = stylesToConsider.find(s => s.id !== 'none') || stylesToConsider[0] || subFeature.styles?.find(s => s.id === 'none') || null;
        
        if(defaultStyle) {
          onStyleSelect(defaultStyle);
        }
        
        const newIntensity = 70;
        if (subFeature.hasIntensitySlider) {
            onIntensityChange(newIntensity);
        }
        
        onGenerate({ subFeature, style: defaultStyle, newIntensity });

    }, [onSubFeatureSelect, onStyleSelect, isVip, requestVipAccess, onIntensityChange, onGenerate]);

    const handleStyleSelect = useCallback((style: Style) => {
        if (style.isPremium && !isVip) {
            requestVipAccess(() => handleStyleSelect(style));
            return;
        }
        onStyleSelect(style);
        onGenerate({ style });
    }, [onStyleSelect, isVip, requestVipAccess, onGenerate]);

    const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        onIntensityChange(value);
        onDebouncedGenerate({ newIntensity: value });
    }

    if (!activeTool) return null;

    return (
        <div className="bg-white rounded-t-2xl shadow-lg fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto animate-slide-up z-30">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <button onClick={onCancel} className="p-2 rounded-full hover:bg-slate-100" aria-label="Close editor">
                    <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-lg font-bold text-slate-800">{activeTool.label}</h2>
                <button 
                  onClick={onConfirm} 
                  className="p-2 rounded-full hover:bg-slate-100"
                  aria-label="Confirm changes"
                >
                    <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </button>
            </div>

            {/* Sub-Features and Styles */}
            <div>
                <SubFeatureTabs
                    subFeatures={activeTool.subFeatures || []}
                    selectedSubFeature={activeSubFeature}
                    onSelect={handleSubFeatureSelect}
                />
                <StyleSelector
                    subFeature={activeSubFeature}
                    selectedStyle={activeStyle}
                    onSelect={handleStyleSelect}
                />
            </div>
            
            {activeSubFeature?.hasIntensitySlider && activeStyle?.id !== 'none' && activeStyle?.type !== 'intensity' && (
                <div className="px-4 pt-3 pb-4 border-t border-slate-100">
                    <label htmlFor="intensity" className="block text-sm font-medium text-slate-700 mb-2">
                        Độ đậm nhạt: <span className="font-bold text-slate-900">{intensity}%</span>
                    </label>
                    <input
                        type="range"
                        id="intensity"
                        min="10"
                        max="100"
                        step="5"
                        value={intensity}
                        onChange={handleIntensityChange}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                </div>
            )}

             <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};