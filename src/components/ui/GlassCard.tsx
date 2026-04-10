import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={`
        bg-glass-dark/40 backdrop-blur-xl border border-white/10 rounded-2xl
        shadow-glass overflow-hidden
        ${hover ? 'hover:border-neon-blue/50 hover:shadow-neon-blue hover:scale-105 cursor-pointer transition-all duration-300' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
