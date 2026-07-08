import { motion } from 'framer-motion';

export default function ScalesOfJustice() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-blue-600 dark:text-blue-400">
      <div className="relative">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-24 h-24 text-blue-700 dark:text-blue-400"
        >
          {/* Base Pillar */}
          <line x1="50" y1="20" x2="50" y2="85" />
          <path d="M40 85h20M35 90h30" strokeWidth="3" />
          <circle cx="50" cy="20" r="3" fill="currentColor" />

          {/* Moving Scale Beam */}
          <motion.g
            animate={{
              rotate: [-6, 6, -6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: '50px 25px' }}
          >
            {/* Main horizontal beam */}
            <line x1="15" y1="25" x2="85" y2="25" strokeWidth="3" />
            
            {/* Left suspension strings & tray */}
            <motion.g
              animate={{
                y: [-2.5, 2.5, -2.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: '15px 25px' }}
            >
              <line x1="15" y1="25" x2="5" y2="48" />
              <line x1="15" y1="25" x2="25" y2="48" />
              <path d="M3 48h24c0 5-5 9-12 9s-12-4-12-9z" fill="currentColor" fillOpacity="0.15" />
            </motion.g>

            {/* Right suspension strings & tray */}
            <motion.g
              animate={{
                y: [2.5, -2.5, 2.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: '85px 25px' }}
            >
              <line x1="85" y1="25" x2="75" y2="48" />
              <line x1="85" y1="25" x2="95" y2="48" />
              <path d="M73 48h24c0 5-5 9-12 9s-12-4-12-9z" fill="currentColor" fillOpacity="0.15" />
            </motion.g>
          </motion.g>
        </svg>
        
        {/* Subtle glowing pulse */}
        <span className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
          Gemma is reasoning...
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-wider font-semibold">
          ⚡ Running local inference (gemma3:4b)
        </p>
      </div>
    </div>
  );
}
