import { useState } from 'react';
import { FolderGit, UploadCloud, File, Image, Music, Film, Check, Trash2, Calendar, Tag, ShieldCheck, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Upload from '../../components/Upload';
import { apiService } from '../../services/api';
import { useAppContext } from '../../context/AppContext';

export default function EvidenceManager() {
  const { evidence, addEvidence, deleteEvidence } = useAppContext();
  const evidenceList = evidence; // Map to the existing list variable

  const [uploading, setUploading] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    
    try {
      const response = await apiService.manageEvidence(file);
      const newEvidence = {
        id: Date.now().toString(),
        ...response
      };
      addEvidence(newEvidence);
      setActiveItem(newEvidence);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    deleteEvidence(id);
    if (activeItem?.id === id) setActiveItem(null);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5 text-emerald-500" />;
      case 'audio': return <Music className="w-5 h-5 text-amber-500" />;
      case 'video': return <Film className="w-5 h-5 text-rose-500" />;
      default: return <File className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="text-left mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sovereign Evidence Locker</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Securely store supporting proofs, transcriptions, and OCR logs locally.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Upload and list column (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-5 shadow-sm">
            <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-4 text-left">Upload New Proof</h4>
            <Upload onUpload={handleUpload} accept="*/*" label="Drop evidence (PDF, Invoice, Audio, MP4, JPEG)" />
            {uploading && (
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
                <span className="w-4 h-4 border border-blue-500 border-t-transparent animate-spin rounded-full"></span>
                <span>Gemma is running OCR & classification...</span>
              </div>
            )}
          </Card>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider text-left">Preserved Evidence Timeline</h4>
            
            {evidenceList.length === 0 ? (
              <Card className="glass-card p-8 border border-slate-200/50 dark:border-slate-850 text-center text-slate-400">
                <p className="font-semibold text-xs">No evidence records uploaded yet.</p>
              </Card>
            ) : (
              evidenceList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`w-full glass-card p-4 border rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    activeItem?.id === item.id 
                      ? 'border-blue-500 dark:border-blue-600 bg-blue-50/10 dark:bg-blue-950/10'
                      : 'border-slate-200/50 dark:border-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800/80">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-150 truncate max-w-xs">{item.name}</p>
                      <div className="flex flex-wrap gap-2 items-center mt-1">
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase">{item.extension}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-350 dark:bg-slate-700" />
                        <span className="text-[9px] text-slate-400 dark:text-slate-500">{item.size}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-350 dark:bg-slate-750" />
                        <span className="text-[9px] font-semibold text-emerald-500 dark:text-emerald-450">{item.aiCategory}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-slate-400 dark:text-slate-550 hidden sm:inline">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Evidence details inspector sidebar (col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-left">Evidence Metadata Inspector</h3>
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-5 shadow-sm min-h-[400px] text-left flex flex-col justify-between">
            {activeItem ? (
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Classification</h4>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> {activeItem.aiCategory}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Automated tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.tags.map((t, idx) => (
                      <span key={idx} className="flex items-center gap-1 text-[9px] font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/80">
                        <Tag className="w-2.5 h-2.5" /> {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Extracted Text (OCR / Transcribe)</h4>
                  <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-850 rounded-xl text-[10px] sm:text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-mono overflow-y-auto max-h-56">
                    {activeItem.ocrText}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-550 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {new Date(activeItem.timestamp).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-emerald-500" /> Local Gemma
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6 space-y-2 flex-1">
                <FolderGit className="w-8 h-8 text-slate-300 dark:text-slate-700" />
                <p className="font-semibold text-xs leading-normal">Select an uploaded proof item to inspect OCR textual extractions and tags.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
