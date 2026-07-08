import { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Upload({ onUpload, accept = '*', maxSize = 15, label = 'Upload legal document' }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Check size (maxSize in MB)
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds the limit of ${maxSize}MB.`);
      return;
    }

    setError('');
    setFile(selectedFile);
    if (onUpload) {
      onUpload(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setError('');
    if (onUpload) {
      onUpload(null);
    }
  };

  return (
    <div className="w-full">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        animate={{
          scale: isDragOver ? 1.01 : 1,
          borderColor: isDragOver ? '#1E40AF' : 'rgba(148, 163, 184, 0.25)',
          backgroundColor: isDragOver ? 'rgba(30, 64, 175, 0.05)' : 'rgba(255, 255, 255, 0)'
        }}
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 glass-card bg-slate-50/20 dark:bg-slate-900/10 ${
          isDragOver ? 'border-blue-500' : 'border-slate-200 dark:border-slate-800'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
        
        {file ? (
          <div className="flex flex-col items-center gap-3 w-full text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full">
              <File className="w-8 h-8" />
            </div>
            <div className="max-w-[80%]">
              <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{file.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={clearFile}
                className="text-xs text-rose-500 dark:text-rose-400 font-medium hover:underline px-3 py-1 cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-600 rounded-full">
              <UploadCloud className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">{label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Drag and drop your file here, or <span className="text-blue-500 font-semibold hover:underline">browse</span>
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-3">
                Supports PDF, DOCX, Images, Video, Audio up to {maxSize}MB
              </p>
            </div>
          </div>
        )}
      </motion.div>
      {error && (
        <div className="flex items-center gap-2 mt-2 text-rose-500 dark:text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
