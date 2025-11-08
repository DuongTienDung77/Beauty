import React from 'react';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const UndoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
);

interface ImageToolbarProps {
  onBack: () => void;
  onUndo: () => void;
  showBack: boolean;
  showUndo: boolean;
}

export const ImageToolbar: React.FC<ImageToolbarProps> = ({ onBack, onUndo, showBack, showUndo }) => {
  return (
    <>
      <div className="absolute top-3 left-3 z-20 flex items-center space-x-2">
        {showBack && (
          <button onClick={onBack} title="Back" className="p-2 rounded-full bg-gray-900/40 text-white hover:bg-gray-900/60 transition-all backdrop-blur-sm">
            <BackIcon />
          </button>
        )}
        {showUndo && (
          <button onClick={onUndo} title="Hoàn tác" className="p-2 rounded-full bg-gray-900/40 text-white hover:bg-gray-900/60 transition-all backdrop-blur-sm">
            <UndoIcon />
          </button>
        )}
      </div>
    </>
  );
};