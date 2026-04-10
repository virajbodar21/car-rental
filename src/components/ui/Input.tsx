import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-primary text-sm font-semibold mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-4 top-3.5">{icon}</div>}
        <input
          className={`
            w-full bg-glass-dark/50 border border-white/10 rounded-lg 
            text-text-primary placeholder-text-secondary/50
            px-4 py-3 ${icon ? 'pl-12' : 'pl-4'}
            focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue focus:shadow-lg
            transition-all duration-300
            ${error ? 'border-neon-red/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-neon-red text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
