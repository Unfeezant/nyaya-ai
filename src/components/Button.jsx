import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseStyle = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 dark:bg-blue-700 dark:hover:bg-blue-600',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 shadow-md',
    outline: 'border border-slate-200 dark:border-slate-800 text-slate-700 hover:bg-slate-50/50 dark:text-slate-300 dark:hover:bg-slate-900/50',
    ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/50',
    accent: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 dark:bg-emerald-600 dark:hover:bg-emerald-500',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-xl',
    lg: 'text-base px-6 py-3 rounded-2xl',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
