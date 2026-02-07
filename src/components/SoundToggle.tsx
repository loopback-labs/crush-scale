import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, onToggle }) => {
  return (
    <Button
      onClick={onToggle}
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </Button>
  );
};
