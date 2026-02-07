import React from 'react';

export const NotebookDoodles: React.FC = () => {
  return (
    <>
      {/* Top left hearts */}
      <div className="absolute top-8 left-8 text-primary opacity-60 animate-float" style={{ animationDelay: '0s' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      
      {/* Top right stars */}
      <div className="absolute top-12 right-12 text-accent opacity-50 animate-sparkle" style={{ animationDelay: '0.5s' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      </div>
      
      {/* Bottom left arrow with heart */}
      <div className="absolute bottom-20 left-6 text-primary opacity-40 animate-float hidden md:block" style={{ animationDelay: '1s' }}>
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 20 L45 20" strokeDasharray="4 2"/>
          <path d="M40 15 L50 20 L40 25"/>
          <circle cx="52" cy="20" r="6" fill="currentColor"/>
        </svg>
      </div>
      
      {/* Top center small hearts scattered */}
      <div className="absolute top-4 left-1/4 text-secondary-foreground opacity-30 animate-sparkle" style={{ animationDelay: '1.5s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      
      {/* Right side doodle swirl */}
      <div className="absolute top-1/3 right-4 text-accent opacity-30 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 5 C35 15, 5 25, 20 35 C35 45, 5 55, 20 55" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Bottom right stars */}
      <div className="absolute bottom-16 right-8 text-accent opacity-40 animate-sparkle hidden md:block" style={{ animationDelay: '0.8s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      </div>
      
      {/* Left side small hearts */}
      <div className="absolute top-1/2 left-12 text-primary opacity-25 animate-float hidden lg:block" style={{ animationDelay: '1.2s' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Cupid's arrow */}
      <div className="absolute bottom-32 right-16 text-primary opacity-30 hidden xl:block rotate-[-20deg] animate-float" style={{ animationDelay: '0.3s' }}>
        <svg width="80" height="20" viewBox="0 0 80 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 10 L60 10"/>
          <path d="M5 10 L12 5 L12 8 L5 10 L12 12 L12 15 Z" fill="currentColor"/>
          <path d="M60 10 L70 5"/>
          <path d="M60 10 L70 15"/>
          <path d="M65 10 L75 10"/>
          <circle cx="77" cy="10" r="3" fill="currentColor"/>
        </svg>
      </div>
    </>
  );
};
