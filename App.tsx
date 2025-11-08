
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

import { ImageProcessor } from './components/ImageProcessor';
import { MainToolbar } from './components/MainToolbar';
import { DetailedEditor } from './components/DetailedEditor';
import { VipModal } from './components/VipModal';
import { HistoryPanel } from './components/HistoryPanel';
import { FEATURES } from './constants';
import type { Feature, Style, SubFeature, HistoryItem } from './types';
import { ImageToolbar } from './components/ImageToolbar';

// A simple debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    } as T;
}

const Button: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
}> = ({ onClick, disabled, children, variant }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base";
    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses[variant]}`}>
            {children}
        </button>
    );
};


const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [preEditImage, setPreEditImage] = useState<string | null>(null);
  
  const [activeTool, setActiveTool] = useState<Feature | null>(null);
  const [activeSubFeature, setActiveSubFeature] = useState<SubFeature | null>(null);
  const [activeStyle, setActiveStyle] = useState<Style | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<number>(70);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- VIP State Management ---
  const [isVip, setIsVip] = useState<boolean>(false);
  const [showVipModal, setShowVipModal] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // --- API Key State Management ---
  const [manualApiKey, setManualApiKey] = useState<string>('');
  const [manualApiKeyInput, setManualApiKeyInput] = useState<string>('');
  const [hasManualApiKeyStored, setHasManualApiKeyStored] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'no_key'>('no_key');
  const [apiStatusMessage, setApiStatusMessage] = useState<string>('Đang kiểm tra...');


  useEffect(() => {
    // VIP Status
    try {
      const vipStatusString = localStorage.getItem('vipStatus');
      if (vipStatusString) {
        const vipStatus = JSON.parse(vipStatusString);
        if (vipStatus.isVip && vipStatus.expiry && Date.now() < vipStatus.expiry) {
          setIsVip(true);
        } else {
          localStorage.removeItem('vipStatus');
        }
      }
    } catch (e) {
      console.error("Failed to parse VIP status from localStorage", e);
      localStorage.removeItem('vipStatus');
    }

    // API Key Status
    const storedKey = localStorage.getItem('manualApiKey');
    if (storedKey) {
        setManualApiKey(storedKey);
        setHasManualApiKeyStored(true);
        setApiStatus('connected');
        setApiStatusMessage('Đã đặt khóa thủ công');
    } else if (process.env.API_KEY) {
        setApiStatus('connected');
        setApiStatusMessage('Đã đặt khóa môi trường');
    } else {
        setApiStatus('no_key');
        setApiStatusMessage('Không có khóa API');
    }
  }, []);

  const handleSaveManualApiKey = () => {
    if (!manualApiKeyInput.trim()) return;
    localStorage.setItem('manualApiKey', manualApiKeyInput.trim());
    setManualApiKey(manualApiKeyInput.trim());
    setHasManualApiKeyStored(true);
    setApiStatus('connected');
    setApiStatusMessage('Đã đặt khóa thủ công');
    setManualApiKeyInput('');
  };

  const handleClearManualApiKey = () => {
      localStorage.removeItem('manualApiKey');
      setManualApiKey('');
      setHasManualApiKeyStored(false);
      if (process.env.API_KEY) {
          setApiStatus('connected');
          setApiStatusMessage('Đã đặt khóa môi trường');
      } else {
          setApiStatus('no_key');
          setApiStatusMessage('Không có khóa API');
      }
  };

  const requestVipAccess = (action: () => void) => {
    setPendingAction(() => action);
    setShowVipModal(true);
  };

  const handleVipCodeSubmit = (code: string): boolean => {
    const vipCodeRegex = /^DNCD.*/;
    if (vipCodeRegex.test(code)) {
      setIsVip(true);
      const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('vipStatus', JSON.stringify({ isVip: true, expiry }));
      setShowVipModal(false);
      if (pendingAction) {
        setTimeout(() => {
            pendingAction();
            setPendingAction(null);
        }, 100);
      }
      return true;
    }
    return false;
  };

  const generateImageFromApi = useCallback(async (
      baseImage: string,
      tool: Feature,
      subFeature: SubFeature | null,
      style: Style | null,
      currentIntensity: number
    ): Promise<string> => {
      const apiKey = manualApiKey || process.env.API_KEY;
      if (!apiKey) {
        setApiStatus('no_key');
        setApiStatusMessage('Không có khóa API');
        throw new Error("API Key is not configured. Please set it in the management section.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const base64Data = baseImage.split(',')[1];

      const baseInstruction = "The result should be realistic, high-quality, and seamlessly blended with the original photo. Only return the modified image.";
      let prompt: string;

      const customPrompt = style?.promptInstruction || subFeature?.promptInstruction || tool?.promptInstruction;

      if (customPrompt) {
          let finalCustomPrompt = customPrompt;

          if (subFeature?.hasIntensitySlider && style && style.id !== 'none') {
            finalCustomPrompt += ` with an intensity of ${currentIntensity} percent.`;
          }

          if (style) finalCustomPrompt = finalCustomPrompt.replace('{{style}}', style.englishLabel);
          if (subFeature) finalCustomPrompt = finalCustomPrompt.replace('{{sub_feature}}', subFeature.englishLabel);
          if(tool) finalCustomPrompt = finalCustomPrompt.replace('{{tool}}', tool.englishLabel);
          prompt = `${finalCustomPrompt} ${baseInstruction}`;
      } else {
          let effectDescription = `a '${tool.englishLabel}' effect`;
          if (subFeature && style && style.id !== 'none') {
              effectDescription += `, specifically for the '${subFeature.englishLabel}' with the style '${style.englishLabel}'`;
          }
           if (subFeature?.hasIntensitySlider && style && style.id !== 'none') {
              effectDescription += ` with an intensity of ${currentIntensity} percent.`;
           }
          prompt = `You are an expert AI photo retouching artist. The user wants to apply ${effectDescription}. ${baseInstruction}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: prompt },
          ],
        },
        config: { responseModalities: [Modality.IMAGE] },
      });
      
      if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
      }
      
      throw new Error("No image was generated. The response may have been blocked or the API key may be invalid.");
  }, [manualApiKey]);

  const handleInteractiveModification = useCallback(async (
      { subFeature = activeSubFeature, style = activeStyle, newIntensity = intensity }: 
      { subFeature?: SubFeature | null, style?: Style | null, newIntensity?: number }
  ) => {
      const baseImage = preEditImage;
      if (!baseImage || !activeTool) return;
      
      if (!style || style.id === 'none') {
        setGeneratedImage(baseImage); // Revert to pre-edit state if no style is selected
        return;
      }
      
      setIsLoading(true);
      setError(null);
      try {
          const newImage = await generateImageFromApi(baseImage, activeTool, subFeature, style, newIntensity);
          setGeneratedImage(newImage);
      } catch (e) {
          console.error(e);
          const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during image generation.";
          setError(`Failed to generate image. ${errorMessage}`);
          setGeneratedImage(baseImage); // Revert on error
      } finally {
          setIsLoading(false);
      }
  }, [preEditImage, activeTool, activeSubFeature, activeStyle, intensity, generateImageFromApi]);

  const debouncedInteractiveModification = useCallback(debounce(handleInteractiveModification, 400), [handleInteractiveModification]);

  const handleOneClickModification = useCallback(async (tool: Feature) => {
    const imageToModify = generatedImage || originalImage;
    if (!imageToModify) {
      setError("Please upload an image first.");
      return;
    }

    if (tool.isPremium && !isVip) {
      requestVipAccess(() => handleOneClickModification(tool));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
        setUndoStack(prev => [...prev, imageToModify]);
        const newImage = await generateImageFromApi(imageToModify, tool, null, null, 70);
        setGeneratedImage(newImage);
        
        const newHistoryItem: HistoryItem = { id: Date.now().toString(), imageDataUrl: newImage };
        setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during image generation.";
        setError(`Failed to generate image. ${errorMessage}`);
        setUndoStack(prev => prev.slice(0, -1)); // Pop from undo stack on error
    } finally {
        setIsLoading(false);
    }
  }, [originalImage, generatedImage, isVip, generateImageFromApi]);

  const handleToolSelect = useCallback((tool: Feature) => {
    if (tool.isPremium && !isVip) {
      requestVipAccess(() => handleToolSelect(tool));
      return;
    }
    
    if (!tool.subFeatures || tool.subFeatures.length === 0) {
        handleOneClickModification(tool);
        return;
    }

    setPreEditImage(generatedImage || originalImage);
    setActiveTool(tool);
    
    const defaultSubFeature = tool.subFeatures[0] || null;
    setActiveSubFeature(defaultSubFeature);
    
    const stylesToConsider = isVip ? defaultSubFeature?.styles : (defaultSubFeature?.styles?.filter(s => !s.isPremium) || []);
    const defaultStyle = stylesToConsider?.find(s => s.id !== 'none') || stylesToConsider?.[0] || defaultSubFeature?.styles?.find(s => s.id === 'none') || null;
    setActiveStyle(defaultStyle);
    setIntensity(70);

  }, [originalImage, generatedImage, isVip, handleOneClickModification]);

  const handleClearActiveTool = useCallback(() => {
    setActiveTool(null);
    setActiveSubFeature(null);
    setActiveStyle(null);
  }, []);

  const handleConfirmEdit = useCallback(() => {
    if (preEditImage) {
        setUndoStack(prev => [...prev, preEditImage]);
        if (generatedImage) {
          const newHistoryItem: HistoryItem = { id: Date.now().toString(), imageDataUrl: generatedImage };
          setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
        }
    }
    setPreEditImage(null);
    handleClearActiveTool();
  }, [preEditImage, generatedImage, handleClearActiveTool]);

  const handleCancelEdit = useCallback(() => {
      if (preEditImage) {
          setGeneratedImage(preEditImage);
      }
      setPreEditImage(null);
      handleClearActiveTool();
  }, [preEditImage, handleClearActiveTool]);

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setGeneratedImage(null);
    setPreEditImage(null);
    setError(null);
    setHistory([]);
    setUndoStack([]);
    handleClearActiveTool();
  };

  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack];
      const previousImage = newUndoStack.pop();
      setUndoStack(newUndoStack);
      
      if (previousImage === originalImage) {
        setGeneratedImage(null);
      } else {
        setGeneratedImage(previousImage || null);
      }
    } else {
      setGeneratedImage(null);
    }
  }, [undoStack, originalImage]);

  const handleSave = useCallback(() => {
    const imageToSave = generatedImage || originalImage;
    if (imageToSave) {
      const link = document.createElement('a');
      link.href = imageToSave;
      link.download = 'beauty-ai-result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [originalImage, generatedImage]);

  const handleChangeImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleImageUpload(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    if(generatedImage) {
        setUndoStack(prev => [...prev, generatedImage]);
    } else if (originalImage) {
        setUndoStack(prev => [...prev, originalImage]);
    }
    setGeneratedImage(item.imageDataUrl);
    handleClearActiveTool();
  };
  
  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <VipModal 
        isOpen={showVipModal}
        onClose={() => {
            setShowVipModal(false)
            setPendingAction(null)
        }}
        onSubmit={handleVipCodeSubmit}
      />
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8 bg-pink-400 rounded-xl py-6 px-4 shadow-lg">
          <h1 className="text-6xl sm:text-7xl title-beauty-plus pb-2">Beauty Plus</h1>
          <p className="text-white/80 mt-2 max-w-md mx-auto">
            Biết trước gương mặt bạn thay đổi sau 30 giây với gương thần AI.
          </p>
        </header>

        <main className="space-y-6">
          {/* API Key Management Section */}
          <div className="flex flex-col gap-4 p-6 border border-slate-200 rounded-2xl bg-white/60 backdrop-blur-sm shadow-inner">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Quản lý Khóa API
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  apiStatus === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                  {apiStatusMessage}
              </span>
            </h2>
            <p className="text-slate-600 text-sm">
              Bạn có thể nhập khóa API Gemini của mình để sử dụng. Khóa này sẽ được ưu tiên hơn và lưu trong trình duyệt của bạn.
              <br />
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline text-xs font-semibold">
                Xem tài liệu về thanh toán và hạn mức sử dụng.
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="password" 
                value={manualApiKeyInput}
                onChange={(e) => setManualApiKeyInput(e.target.value)}
                className="flex-grow p-2 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder={hasManualApiKeyStored ? "Khóa API đã được lưu (ẩn)" : "Nhập khóa API của bạn"}
                disabled={isLoading} 
              />
              <Button onClick={handleSaveManualApiKey} disabled={isLoading || !manualApiKeyInput.trim()} variant="primary"> 
                Lưu khóa
              </Button>
              <Button onClick={handleClearManualApiKey} disabled={isLoading || !hasManualApiKeyStored} variant="secondary"> 
                Xóa khóa
              </Button>
            </div>
            {hasManualApiKeyStored && (
              <p className="text-sm text-green-600">
                &#10003; Đang sử dụng khóa API được lưu thủ công.
              </p>
            )}
            {!hasManualApiKeyStored && !!process.env.API_KEY && (
               <p className="text-sm text-blue-600">
                &#10003; Đang sử dụng khóa API được định cấu hình sẵn.
               </p>
            )}
            {!hasManualApiKeyStored && !process.env.API_KEY && (
              <p className="text-sm text-red-600">
                &#9888; Không có khóa API nào được đặt. Vui lòng nhập khóa để sử dụng ứng dụng.
              </p>
            )}
          </div>
          
          <div className="relative">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            
            {originalImage && (
              <ImageToolbar 
                onBack={handleCancelEdit}
                onUndo={handleUndo}
                showBack={!!activeTool}
                showUndo={undoStack.length > 0 && !activeTool}
              />
            )}
            
            <ImageProcessor
              originalImage={originalImage}
              generatedImage={generatedImage}
              onUploadClick={handleChangeImageClick}
              isLoading={isLoading}
              error={error}
              onSave={handleSave}
              canSave={!!originalImage}
            />
          </div>

          <HistoryPanel 
            history={history} 
            onSelect={handleHistorySelect}
            currentImage={generatedImage}
            onClear={handleClearHistory}
          />
          
          <div className="pt-2">
            <div
              className={`w-full text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500`}
            >
              Trải nghiệm gương thần AI
            </div>
          </div>
          
          {activeTool ? (
             <DetailedEditor
                activeTool={activeTool}
                activeSubFeature={activeSubFeature}
                activeStyle={activeStyle}
                onSubFeatureSelect={setActiveSubFeature}
                onStyleSelect={setActiveStyle}
                onConfirm={handleConfirmEdit}
                onCancel={handleCancelEdit}
                isVip={isVip}
                requestVipAccess={requestVipAccess}
                intensity={intensity}
                onIntensityChange={setIntensity}
                onGenerate={handleInteractiveModification}
                onDebouncedGenerate={debouncedInteractiveModification}
              />
          ) : (
             <MainToolbar
                tools={FEATURES}
                onToolSelect={handleToolSelect}
                isDisabled={!originalImage || isLoading}
             />
          )}

        </main>
        
        <footer className="mt-8 pt-6 pb-6 border-t border-slate-200 text-center">
          <div className="max-w-md mx-auto text-slate-600 text-sm space-y-3">
              <p className="font-semibold text-slate-700">HÃY MỜI TÔI 1 LY CAFFE NẾU BẠN THẤY HỮU ÍCH.</p>
              <p>MB BANK : <span className="font-bold text-slate-800">0917939111</span></p>
              
              <div>
                  <p>THAM GIA NHÓM ĐỂ ĐƯỢỢC HỖ TRỢ MIỄN PHÍ:</p>
                  <a 
                      href="https://zalo.me/g/xxgxqm429" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow text-xs"
                  >
                      [ THAM GIA ]
                  </a>
              </div>

              <div>
                  <p>Theo dõi FB cá nhân nhận chia sẻ mỗi ngày:</p>
                  <a 
                      href="https://www.facebook.com/share/1BP8N5L87d/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-block bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors shadow text-xs"
                  >
                      [ THEO DÕI FB ]
                  </a>
              </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
