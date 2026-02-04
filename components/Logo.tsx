import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-32",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
        <img 
            src="https://i.ibb.co/NdqvHvxf/Screenshot-2026-02-04-at-10-45-07-AM.png" 
            alt="Storm Fut Logo" 
            className={`${sizeClasses[size]} w-auto object-contain drop-shadow-lg rounded-lg`}
        />
    </div>
  );
};

export default Logo;