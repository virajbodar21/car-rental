import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50',
    secondary: 'bg-text-secondary/10 text-text-secondary border border-text-secondary/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/50',
    warning: 'bg-neon-orange/20 text-neon-orange border border-neon-orange/50',
    danger: 'bg-neon-red/20 text-neon-red border border-neon-red/50',
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        ${variantClasses[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
