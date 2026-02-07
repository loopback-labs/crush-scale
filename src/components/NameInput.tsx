import React from 'react';
import { Heart } from 'lucide-react';

interface NameInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const NameInput: React.FC<NameInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Enter name...",
  disabled = false
}) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs">
      <label className="text-lg text-muted-foreground flex items-center gap-2">
        <Heart className="w-4 h-4 text-primary" fill="currentColor" />
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="notebook-input w-full py-2 px-1 text-foreground disabled:opacity-50"
        maxLength={30}
      />
    </div>
  );
};
