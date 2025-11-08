import React from 'react';
import type { Feature, BadgeType } from '../types';
import { PremiumIcon } from '../constants';

interface MainToolbarProps {
    tools: Feature[];
    onToolSelect: (tool: Feature) => void;
    isDisabled: boolean;
}

const Badge: React.FC<{ type: BadgeType }> = ({ type }) => {
    const baseClasses = "absolute -top-1 -right-1 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow";
    const colorClasses = {
        Free: 'bg-gradient-to-br from-purple-500 to-pink-500',
        Hot: 'bg-gradient-to-br from-red-500 to-orange-500',
        NEW: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    };
    return <span className={`${baseClasses} ${colorClasses[type]}`}>{type}</span>;
};

const FeatureItem: React.FC<{ feature: Feature; onSelect: () => void; }> = ({ feature, onSelect }) => (
    <div
        onClick={onSelect}
        className="flex flex-col items-center justify-start text-center cursor-pointer group space-y-1.5 p-1 flex-shrink-0 w-20"
    >
        <div className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:scale-105">
            <div className="w-8 h-8 text-slate-700">{feature.icon}</div>
            {feature.isPremium ? (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                    <PremiumIcon className="w-3 h-3 text-yellow-300" />
                </div>
            ) : feature.badge && <Badge type={feature.badge} />}
        </div>
        <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{feature.label}</span>
    </div>
);

export const MainToolbar: React.FC<MainToolbarProps> = ({ tools, onToolSelect, isDisabled }) => {
    return (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-inner p-2">
            <h2 className="text-lg font-bold text-slate-800 mb-2 px-3 pt-1">Công cụ làm đẹp</h2>
            <div className={`overflow-x-auto overflow-y-hidden pb-2 ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex items-start space-x-1">
                    {tools.map(tool => (
                        <FeatureItem
                            key={tool.id}
                            feature={tool}
                            onSelect={() => onToolSelect(tool)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};