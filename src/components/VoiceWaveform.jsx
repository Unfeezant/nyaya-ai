import { motion } from 'framer-motion';
import { Mic, Volume2, Square, Loader } from 'lucide-react';

export default function VoiceWaveform({ state = 'idle', onClick }) {
  // state: 'idle' | 'listening' | 'thinking' | 'speaking'
  
  const barCount = 20;
  const bars = Array.from({ length: barCount });

  const getBarColor = () => {
    switch (state) {
      case 'listening': return 'bg-emerald-500 shadow-emerald-500/20';
      case 'speaking': return 'bg-blue-600 shadow-blue-500/20 dark:bg-blue-500';
      case 'thinking': return 'bg-amber-500 shadow-amber-500/20';
      default: return 'bg-slate-300 dark:bg-slate-700';
    }
  };

  const getAnimationDuration = (index) => {
    if (state === 'thinking') return 1.2;
    return 0.5 + (index % 6) * 0.12;
  };

  const getBarHeight = () => {
    if (state === 'idle') return [4, 8, 4];
    if (state === 'thinking') return [6, 14, 6];
    if (state === 'listening') return [4, 32, 10, 44, 8, 4];
    if (state === 'speaking') return [4, 40, 6, 28, 12, 4];
    return [4, 4, 4];
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl max-w-md mx-auto w-full glass-card">
      <div className="h-16 flex items-center justify-center gap-1.5 mb-8 w-full">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: getBarHeight()
            }}
            transition={{
              duration: getAnimationDuration(i),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 4) * 0.08
            }}
            className={`w-1 rounded-full ${getBarColor()} transition-colors duration-300`}
            style={{ height: '4px' }}
          />
        ))}
      </div>

      <div className="relative mb-6">
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 cursor-pointer ${
            state === 'listening' 
              ? 'bg-emerald-500 shadow-emerald-500/30' 
              : state === 'speaking'
              ? 'bg-blue-600 shadow-blue-500/30 dark:bg-blue-700'
              : state === 'thinking'
              ? 'bg-amber-500 shadow-amber-500/30'
              : 'bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-650'
          }`}
        >
          {state === 'listening' ? (
            <Square className="w-8 h-8 fill-white" />
          ) : state === 'speaking' ? (
            <Volume2 className="w-8 h-8 animate-pulse" />
          ) : state === 'thinking' ? (
            <Loader className="w-8 h-8 animate-spin" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </motion.button>
        {state === 'listening' && (
          <motion.div 
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-emerald-500 -z-10 opacity-30"
          />
        )}
      </div>

      <p className="text-sm font-semibold text-slate-850 dark:text-slate-100 uppercase tracking-wide">
        {state === 'listening' && "Listening... Speak now"}
        {state === 'speaking' && "Gemma is speaking"}
        {state === 'thinking' && "Gemma is reasoning..."}
        {state === 'idle' && "Click mic to start speaking"}
      </p>
      
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        {state === 'listening' && "Detecting voice input"}
        {state === 'speaking' && "Synthesizing AI output"}
        {state === 'thinking' && "Ollama gemma3:4b"}
        {state === 'idle' && "Microphone mode (Local Gemma)"}
      </p>
    </div>
  );
}
