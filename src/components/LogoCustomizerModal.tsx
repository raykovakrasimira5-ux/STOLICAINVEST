import React, { useState } from 'react';
import { X, Image as ImageIcon, Check, RefreshCw, Upload } from 'lucide-react';
import { AgencyLogo } from './AgencyLogo';

interface LogoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customLogoUrl: string;
  onSaveLogo: (url: string) => void;
}

export const LogoCustomizerModal: React.FC<LogoCustomizerModalProps> = ({
  isOpen,
  onClose,
  customLogoUrl,
  onSaveLogo,
}) => {
  const [urlInput, setUrlInput] = useState(customLogoUrl);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUrlInput(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSaveLogo(urlInput.trim());
    onClose();
  };

  const handleResetToDefault = () => {
    setUrlInput('');
    onSaveLogo('');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#2F54A3]" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Фирмено лого & Цветове
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Приложението използва официалното лого и фирмени цветове на <strong className="text-[#2F54A3]">Столица Инвест Недвижими Имоти</strong> (кралско синьо и лайм зелено). Тук можете да качите персонализиран файл или да възстановите стандартния вектор.
          </p>

          {/* Current Logo Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center min-h-24">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">
              Визуален предварителен преглед
            </span>
            <AgencyLogo customLogoUrl={urlInput} size="lg" />
          </div>

          {/* File Upload Option */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Качи лого от компютъра
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-[#2F54A3] rounded-xl p-3 text-center cursor-pointer transition-colors bg-slate-50">
              <Upload className="w-5 h-5 text-[#2F54A3] mb-1" />
              <span className="text-xs font-semibold text-slate-700">Избери изображение (JPG, PNG, SVG)</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Ще се приложи незабавно в навигацията</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Or Paste URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Или постави директен линк към лого (URL)
            </label>
            <input
              type="url"
              placeholder="https://example.com/logo.png"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2F54A3]"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F54A3] hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#67B82D]" />
              Възстанови Столица Инвест
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Отказ
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 text-xs font-bold bg-[#2F54A3] hover:bg-[#25468B] text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <Check className="w-3.5 h-3.5 text-[#67B82D]" />
                Запази
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
