import React from 'react';

export const Input = React.forwardRef(({ label, error, className = '', id, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 ${error ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 font-medium mt-0.5">{error}</span>}
    </div>
  );
});

export const Textarea = React.forwardRef(({ label, error, className = '', id, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[100px] resize-y ${error ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 font-medium mt-0.5">{error}</span>}
    </div>
  );
});

export const Select = React.forwardRef(({ label, error, options = [], className = '', id, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 ${error ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500' : ''}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-rose-500 font-medium mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
Textarea.displayName = 'Textarea';
Select.displayName = 'Select';
