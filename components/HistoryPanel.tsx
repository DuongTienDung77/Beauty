import React from 'react';
import type { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  currentImage: string | null;
  onClear: () => void;
}

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, currentImage, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-inner p-2">
      <div className="flex justify-between items-center mb-2 px-3 pt-1">
        <h2 className="text-lg font-bold text-slate-800">Lịch sử tạo ảnh</h2>
        <button 
          onClick={onClear} 
          className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
          title="Xóa lịch sử"
          aria-label="Clear history"
        >
          <ClearIcon />
        </button>
      </div>
      <div className="overflow-x-auto overflow-y-hidden pb-2">
        <div className="flex items-center space-x-3 px-2">
          {history.map(item => (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer p-0.5 transition-all duration-200 ${currentImage === item.imageDataUrl ? 'bg-pink-400' : 'bg-transparent'}`}
            >
              <img
                src={item.imageDataUrl}
                alt={`History item ${item.id}`}
                className="w-full h-full object-cover rounded-md border-2 border-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};