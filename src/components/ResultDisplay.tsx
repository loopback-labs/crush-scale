import React from 'react';
import { getRelationshipMessage } from '@/lib/loveCalculator';

interface ResultDisplayProps {
  percentage: number;
  name1: string;
  name2: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ percentage, name1, name2 }) => {
  const { message, emoji } = getRelationshipMessage(percentage);
  
  return (
    <div className="text-center space-y-4 py-6">
      {/* Big percentage */}
      <div className="relative inline-block">
        <span className="text-6xl md:text-8xl font-bold text-primary animate-write-in">
          {percentage}%
        </span>
        <span className="absolute -top-2 -right-8 text-4xl animate-heartbeat">
          {emoji}
        </span>
      </div>
      
      {/* Relationship message */}
      <div className="text-2xl md:text-3xl text-foreground animate-write-in" style={{ animationDelay: '0.3s' }}>
        {message}
      </div>
      
      {/* Names */}
      <div className="text-lg text-muted-foreground animate-write-in" style={{ animationDelay: '0.5s' }}>
        <span className="text-primary font-medium">{name1}</span>
        {" 💕 "}
        <span className="text-primary font-medium">{name2}</span>
      </div>
      
      {/* Decorative hearts */}
      <div className="flex justify-center gap-2 pt-2">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className="text-primary opacity-60 animate-sparkle"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            💗
          </span>
        ))}
      </div>
    </div>
  );
};
