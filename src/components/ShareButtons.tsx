import React from 'react';
import { Share2, Copy, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonsProps {
  percentage: number;
  name1: string;
  name2: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ percentage, name1, name2 }) => {
  const shareText = `💕 ${name1} + ${name2} = ${percentage}% love compatibility! Calculate yours at`;
  const shareUrl = window.location.href;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lovemeter result 💕',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    const fullText = `${shareText} ${shareUrl}`;
    try {
      await navigator.clipboard.writeText(fullText);
      toast.success('Copied to clipboard! 💕');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 pt-4 animate-write-in" style={{ animationDelay: '0.7s' }}>
      {/* Native share button (primary on mobile) */}
      {'share' in navigator && (
        <Button
          onClick={handleNativeShare}
          variant="default"
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      )}
      
      {/* Copy link */}
      <Button
        onClick={handleCopyLink}
        variant="outline"
        className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <Copy className="w-4 h-4" />
        Copy
      </Button>
      
      {/* Twitter/X */}
      <Button
        onClick={handleTwitterShare}
        variant="outline"
        className="gap-2 border-muted-foreground/30 hover:border-primary hover:text-primary"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      
      {/* WhatsApp */}
      <Button
        onClick={handleWhatsAppShare}
        variant="outline"
        className="gap-2 border-muted-foreground/30 hover:border-primary hover:text-primary"
      >
        <MessageCircle className="w-4 h-4" />
      </Button>
    </div>
  );
};
