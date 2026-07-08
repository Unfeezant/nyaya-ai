export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${hover ? 'glass-card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
