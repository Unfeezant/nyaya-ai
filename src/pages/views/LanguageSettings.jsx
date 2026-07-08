import { useAppContext } from '../../context/AppContext';
import { Languages, Check, Globe } from 'lucide-react';
import Card from '../../components/Card';

export default function LanguageSettings() {
  const { language, setLanguage } = useAppContext();

  const langList = [
    { code: 'English', label: 'English (US & India)', native: 'English', complete: '100%' },
    { code: 'Hindi', label: 'Hindi', native: 'हिन्दी', complete: '96%' },
    { code: 'Punjabi', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', complete: '90%' },
    { code: 'Tamil', label: 'Tamil', native: 'தமிழ்', complete: '92%' },
    { code: 'Gujarati', label: 'Gujarati', native: 'ગુજરાતી', complete: '88%' },
    { code: 'Marathi', label: 'Marathi', native: 'मराठी', complete: '94%' },
    { code: 'Kannada', label: 'Kannada', native: 'ಕನ್ನಡ', complete: '89%' },
    { code: 'Telugu', label: 'Telugu', native: 'తెలుగు', complete: '91%' },
    { code: 'Malayalam', label: 'Malayalam', native: 'മലയാളം', complete: '87%' },
    { code: 'Bengali', label: 'Bengali', native: 'বাংলা', complete: '93%' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="text-left mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Language Localisation Options</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Select your preferred regional language for AI outputs and UI localisations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {langList.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`glass-card p-5 border text-left rounded-2xl flex flex-col justify-between cursor-pointer w-full transition-all duration-200 ${
                isSelected 
                  ? 'border-blue-500 dark:border-blue-600 bg-blue-50/10 dark:bg-blue-950/10'
                  : 'border-slate-200/50 dark:border-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-900/30'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">{lang.native}</span>
                  {isSelected && (
                    <span className="p-1 bg-emerald-500 text-white rounded-lg">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-705 dark:text-slate-300">{lang.label}</h4>
              </div>
              
              <div className="flex justify-between items-center mt-6 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" /> translation
                </span>
                <span>{lang.complete} Complete</span>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 dark:text-slate-600">
        <span>🟢 Localization models run locally. Local BNS/IPC dataset translation is active.</span>
      </div>
    </div>
  );
}
