import React from 'react';
import type { LetterCount } from '@/lib/loveCalculator';

interface LetterTallyProps {
  phrase: string;
  counts: LetterCount[];
  visibleCount: number;
}

export const LetterTally: React.FC<LetterTallyProps> = ({ phrase, counts, visibleCount }) => {
  return (
    <div className="space-y-4 text-center">
      {/* Show the phrase */}
      <div className="text-xl md:text-2xl tracking-wide text-foreground/80">
        "{phrase}"
      </div>
      
      {/* Letter counts */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
        {counts.slice(0, visibleCount).map((item, index) => (
          <div 
            key={`${item.letter}-${index}`}
            className="flex items-center gap-1 animate-write-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <span className="uppercase text-lg font-bold text-primary">{item.letter}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-lg text-foreground">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
