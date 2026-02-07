import React from 'react';
import type { CalculationStep } from '@/lib/loveCalculator';

interface NumberPyramidProps {
  steps: CalculationStep[];
  visibleRows: number;
}

export const NumberPyramid: React.FC<NumberPyramidProps> = ({ steps, visibleRows }) => {
  return (
    <div className="flex flex-col items-center gap-2 py-4 overflow-x-auto w-full">
      {steps.slice(0, visibleRows).map((step, rowIndex) => (
        <div 
          key={rowIndex}
          className="flex justify-center gap-1 md:gap-2 animate-write-in flex-wrap"
          style={{ animationDelay: `${rowIndex * 0.1}s` }}
        >
          {step.numbers.map((num, numIndex) => (
            <span
              key={numIndex}
              className={`
                inline-flex items-center justify-center
                w-7 h-7 md:w-8 md:h-8 text-sm md:text-base
                rounded-full
                ${step.isFirstRow 
                  ? 'bg-secondary text-secondary-foreground' 
                  : rowIndex === steps.length - 1 
                    ? 'bg-primary text-primary-foreground font-bold' 
                    : 'bg-muted text-foreground'
                }
                transition-all duration-200
              `}
              style={{ 
                animationDelay: `${rowIndex * 0.1 + numIndex * 0.03}s`,
              }}
            >
              {num}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
