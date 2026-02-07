import React, { useState, useEffect, useCallback } from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotebookDoodles } from '@/components/NotebookDoodles';
import { NameInput } from '@/components/NameInput';
import { LetterTally } from '@/components/LetterTally';
import { NumberPyramid } from '@/components/NumberPyramid';
import { ResultDisplay } from '@/components/ResultDisplay';
import { ShareButtons } from '@/components/ShareButtons';
import { SoundToggle } from '@/components/SoundToggle';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { 
  countLetters, 
  buildPyramid, 
  getFinalPercentage,
  type LetterCount,
  type CalculationStep 
} from '@/lib/loveCalculator';

type CalculatorPhase = 'input' | 'tally' | 'pyramid' | 'result';

const LoveCalculator: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [phase, setPhase] = useState<CalculatorPhase>('input');
  
  // Animation state
  const [phrase, setPhrase] = useState('');
  const [letterCounts, setLetterCounts] = useState<LetterCount[]>([]);
  const [visibleLetterCount, setVisibleLetterCount] = useState(0);
  const [pyramidSteps, setPyramidSteps] = useState<CalculationStep[]>([]);
  const [visiblePyramidRows, setVisiblePyramidRows] = useState(0);
  const [finalPercentage, setFinalPercentage] = useState(0);
  
  const { playSound, isMuted, toggleMute } = useSoundEffects();

  const canCalculate = name1.trim().length > 0 && name2.trim().length > 0;

  const handleCalculate = useCallback(() => {
    if (!canCalculate) return;
    
    // Reset animation state
    setVisibleLetterCount(0);
    setVisiblePyramidRows(0);
    
    // Get letter counts and build pyramid
    const { phrase: calcPhrase, counts, sequence } = countLetters(name1.trim(), name2.trim());
    const steps = buildPyramid(sequence);
    const percentage = getFinalPercentage(steps);
    
    setPhrase(calcPhrase);
    setLetterCounts(counts);
    setPyramidSteps(steps);
    setFinalPercentage(percentage);
    
    // Start animation sequence
    setPhase('tally');
    playSound('pencil');
  }, [canCalculate, name1, name2, playSound]);

  // Animate letter tally
  useEffect(() => {
    if (phase !== 'tally') return;
    
    if (visibleLetterCount < letterCounts.length) {
      const timer = setTimeout(() => {
        setVisibleLetterCount(prev => prev + 1);
        playSound('scribble');
      }, 80);
      return () => clearTimeout(timer);
    } else {
      // Move to pyramid phase after a short delay
      const timer = setTimeout(() => {
        setPhase('pyramid');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleLetterCount, letterCounts.length, playSound]);

  // Animate pyramid rows
  useEffect(() => {
    if (phase !== 'pyramid') return;
    
    if (visiblePyramidRows < pyramidSteps.length) {
      const timer = setTimeout(() => {
        setVisiblePyramidRows(prev => prev + 1);
        playSound('scribble');
        
        // Play heartbeat as we get closer to the end
        if (visiblePyramidRows >= pyramidSteps.length - 3) {
          playSound('heartbeat');
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // Move to result phase
      const timer = setTimeout(() => {
        setPhase('result');
        playSound('chime');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, visiblePyramidRows, pyramidSteps.length, playSound]);

  const handleReset = () => {
    setPhase('input');
    setName1('');
    setName2('');
    setPhrase('');
    setLetterCounts([]);
    setVisibleLetterCount(0);
    setPyramidSteps([]);
    setVisiblePyramidRows(0);
    setFinalPercentage(0);
  };

  return (
    <div className="min-h-screen notebook-paper relative overflow-hidden">
      {/* Decorative doodles */}
      <NotebookDoodles />
      
      {/* Sound toggle */}
      <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
      
      {/* Red margin line */}
      <div className="absolute left-10 md:left-16 top-0 bottom-0 w-0.5 bg-notebook-margin opacity-60" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl text-primary mb-2 text-center">
          💕 Love Calculator 💕
        </h1>
        <p className="text-muted-foreground mb-8 text-center">
          Find out your love percentage!
        </p>
        
        {/* Calculator card */}
        <div className="w-full max-w-lg bg-card/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 border border-border">
          
          {phase === 'input' && (
            <div className="space-y-6">
              {/* Name inputs */}
              <NameInput
                label="Your Name"
                value={name1}
                onChange={setName1}
                placeholder="Enter your name..."
              />
              
              {/* LOVES text */}
              <div className="text-center py-4">
                <span className="text-2xl md:text-3xl text-primary font-bold">
                  L
                  <span className="text-accent">♥</span>
                  VES
                </span>
              </div>
              
              <NameInput
                label="Crush's Name"
                value={name2}
                onChange={setName2}
                placeholder="Enter their name..."
              />
              
              {/* Calculate button */}
              <div className="pt-4 flex justify-center">
                <Button
                  onClick={handleCalculate}
                  disabled={!canCalculate}
                  className="gap-2 text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                  Calculate Love!
                </Button>
              </div>
            </div>
          )}
          
          {phase === 'tally' && (
            <div className="space-y-6">
              <h2 className="text-xl text-center text-muted-foreground">Counting letters...</h2>
              <LetterTally 
                phrase={phrase} 
                counts={letterCounts} 
                visibleCount={visibleLetterCount} 
              />
            </div>
          )}
          
          {phase === 'pyramid' && (
            <div className="space-y-4">
              <h2 className="text-xl text-center text-muted-foreground">Calculating...</h2>
              <NumberPyramid 
                steps={pyramidSteps} 
                visibleRows={visiblePyramidRows} 
              />
            </div>
          )}
          
          {phase === 'result' && (
            <div className="space-y-4">
              <ResultDisplay 
                percentage={finalPercentage} 
                name1={name1.trim()} 
                name2={name2.trim()} 
              />
              
              <ShareButtons 
                percentage={finalPercentage} 
                name1={name1.trim()} 
                name2={name2.trim()} 
              />
              
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <p className="text-sm text-muted-foreground mt-8 text-center">
          Made with 💕 for fun
        </p>
      </div>
    </div>
  );
};

export default LoveCalculator;
