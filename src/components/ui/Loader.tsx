import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-neon-blue/20 border-t-neon-blue animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-2 border-neon-orange/10 border-b-neon-orange animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
};

export default Loader;
