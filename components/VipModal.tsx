import React, { useState } from 'react';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => boolean;
}

export const VipModal: React.FC<VipModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const success = onSubmit(code);
    if (!success) {
      setError('Mã không hợp lệ. Vui lòng thử lại.');
    } else {
      setError('');
      setCode('');
    }
  };
  
  const handleClose = () => {
    setError('');
    setCode('');
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="vip-modal-title">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center relative animate-fade-in-up">
        <button onClick={handleClose} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100 text-slate-500" aria-label="Close modal">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="mx-auto w-14 h-14 mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5L14.326 8.326L21.5 9.5L16.25 14.5L17.652 21.652L12 18L6.348 21.652L7.75 14.5L2.5 9.5L9.674 8.326L12 1.5Z" />
            </svg>
        </div>

        <h2 id="vip-modal-title" className="text-2xl font-bold text-slate-800">Tính năng VIP</h2>
        <p className="text-slate-600 mt-2">
            Đây là tính năng dành riêng cho thành viên VIP.
        </p>

        <div className="bg-slate-50 rounded-lg p-4 my-6">
            <p className="font-semibold text-slate-700">Để mở khóa, vui lòng:</p>
            <p className="text-sm text-slate-500 mt-1">Liên hệ Zalo để nhận mã kích hoạt.</p>
             <a 
                href="http://zaloapp.com/qr/p/10pdhjwfwuit5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-block bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Liên hệ Zalo
            </a>
        </div>
        
        <div className="space-y-2">
            <input 
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Nhập mã VIP"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
                aria-label="VIP Code Input"
            />
            {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
            <button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
                Kích hoạt
            </button>
        </div>
      </div>
       <style>{`
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};