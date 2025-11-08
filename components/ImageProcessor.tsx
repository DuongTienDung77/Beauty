import React, { useRef, useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ImageProcessorProps {
  originalImage: string | null;
  generatedImage: string | null;
  onUploadClick: () => void;
  isLoading: boolean;
  error: string | null;
  onSave: () => void;
  canSave: boolean;
}

// --- Icons ---
const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const PlusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const FitToScreenIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" />
    </svg>
);

const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ChangeImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


// --- Loader Component ---
const Loader: React.FC = () => (
  <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-20 rounded-xl p-4">
    <div className="w-16 h-16 border-4 border-t-4 border-pink-500 border-gray-200 rounded-full animate-spin"></div>
    <p className="mt-4 text-slate-700 font-semibold text-center">AI đang phân tích gương mặt bạn...</p>
    <p className="mt-2 text-slate-500 text-sm text-center">Quá trình này có thể mất khoảng 30 giây.</p>
  </div>
);

// --- Action Controls Component ---
const ActionControls: React.FC<{
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onSave: () => void;
  canSave: boolean;
  onUploadClick: () => void;
}> = ({ onZoomIn, onZoomOut, onReset, onSave, canSave, onUploadClick }) => (
  <div className="absolute top-3 right-3 z-20 flex flex-col items-end space-y-2">
    {/* Zoom Controls */}
    <div className="bg-white bg-opacity-70 backdrop-blur-sm p-1 rounded-lg shadow-md flex items-center space-x-1">
      <button onClick={onZoomOut} className="p-1.5 rounded-md hover:bg-slate-200 transition-colors" aria-label="Zoom out"><MinusIcon /></button>
      <button onClick={onReset} className="p-1.5 rounded-md hover:bg-slate-200 transition-colors" aria-label="Reset zoom"><FitToScreenIcon /></button>
      <button onClick={onZoomIn} className="p-1.5 rounded-md hover:bg-slate-200 transition-colors" aria-label="Zoom in"><PlusIcon /></button>
    </div>
    {/* Other action buttons */}
    <div className="flex items-center space-x-2">
      <button onClick={onSave} disabled={!canSave} title="Lưu ảnh" className="p-2 rounded-full bg-black/40 text-white disabled:opacity-50 hover:bg-black/50 transition-all"><SaveIcon /></button>
      <button onClick={onUploadClick} title="Nhập ảnh khác" className="p-2 rounded-full bg-black/40 text-white hover:bg-black/50 transition-all"><ChangeImageIcon /></button>
    </div>
  </div>
);


// --- Main Image Processor Component ---
export const ImageProcessor: React.FC<ImageProcessorProps> = ({ originalImage, generatedImage, onUploadClick, isLoading, error, onSave, canSave }) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(3/4);
  
  // --- Zoom and Pan State ---
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (originalImage) {
      const img = new Image();
      img.onload = () => {
        setImageAspectRatio(img.naturalWidth / img.naturalHeight);
      };
      img.src = originalImage;
    } else {
      setImageAspectRatio(3/4);
    }
    // Reset zoom and pan when image changes
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [originalImage]);
  
  useEffect(() => {
    if (zoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    e.preventDefault();
    isPanning.current = true;
    lastPanPoint.current = { x: e.clientX, y: e.clientY };
    if (imageContainerRef.current) {
        imageContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    isPanning.current = false;
    if (imageContainerRef.current) {
        imageContainerRef.current.style.cursor = zoom > 1 ? 'grab' : 'default';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastPanPoint.current.x;
    const dy = e.clientY - lastPanPoint.current.y;
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPanPoint.current = { x: e.clientX, y: e.clientY };
  };

  const hasResult = originalImage && generatedImage;

  return (
    <div 
        className="bg-white rounded-xl shadow-lg p-2 sm:p-3 relative w-full max-w-2xl mx-auto flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: imageAspectRatio }}
    >
      {isLoading && <Loader />}

      {!originalImage && (
        <div 
            onClick={onUploadClick}
            className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-300 rounded-lg h-full w-full cursor-pointer hover:border-pink-400 hover:bg-slate-50 transition-colors"
        >
          <UploadIcon />
          <h3 className="font-bold text-slate-800">Tải ảnh của bạn lên</h3>
          <p className="text-sm text-slate-500 mt-1">Chọn một bức ảnh chân dung rõ nét</p>
        </div>
      )}
      
      {originalImage && (
         <div 
            ref={imageContainerRef}
            className="w-full h-full relative"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
         >
            <div
                className="w-full h-full rounded-lg overflow-hidden"
                style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    cursor: zoom > 1 ? 'grab' : 'default',
                    transition: isPanning.current ? 'none' : 'transform 0.2s ease-out',
                }}
            >
                {!hasResult ? (
                    <img src={originalImage} alt="Original" className="object-cover w-full h-full" />
                ) : (
                    <ReactCompareSlider
                        className="w-full h-full"
                        itemOne={<ReactCompareSliderImage style={{objectFit: 'cover'}} src={originalImage} alt="Original" />}
                        itemTwo={<ReactCompareSliderImage style={{objectFit: 'cover'}} src={generatedImage} alt="Generated" />}
                    />
                )}
            </div>

            {/* Overlays */}
             <ActionControls
                onZoomIn={() => setZoom(z => Math.min(z + 0.25, 4))}
                onZoomOut={() => setZoom(z => Math.max(z - 0.25, 1))}
                onReset={() => setZoom(1)}
                onSave={onSave}
                canSave={canSave}
                onUploadClick={onUploadClick}
            />
         </div>
      )}
    </div>
  );
};