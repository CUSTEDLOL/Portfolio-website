import React, { useState, useRef, useEffect } from 'react';
import QRCodeSVG from 'react-qr-code';
import { QrCode, X, Copy, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const QRCodeGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('https://example.com');
  const [isVisible, setIsVisible] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Animate in the floating button after page load
    const timer = setTimeout(() => setIsVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = async () => {
    if (!qrRef.current) return;
    
    try {
      const svg = qrRef.current.querySelector('svg');
      if (!svg) return;

      // Convert SVG to canvas and then to blob
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            toast({
              title: "QR Code copied!",
              description: "The QR code has been copied to your clipboard.",
            });
          }
        });
        
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy QR code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "QR Code downloaded!",
        description: "The QR code has been saved to your downloads.",
      });
    };
    
    img.src = url;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <>
  
      {/* Floating Button */}
      <div className="fixed top-6 right-6 z-50 group">
        {/* Surprise Badge */}
        <div className={cn(
          "absolute -top-2 -left-2 z-10",
          "px-2 py-1 rounded-full text-xs font-medium",
          "bg-gradient-to-r from-primary to-primary/80",
          "text-primary-foreground",
          "shadow-lg shadow-primary/30",
          "transition-all duration-500",
          "group-hover:scale-110",
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          Bonus!
        </div>
        
        <button
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-14 h-14 rounded-full",
            "glassmorphic neon-border",
            "transition-all duration-500 ease-out",
            "hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            "active:scale-95",
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8 pointer-events-none"
          )}
          aria-label="Open QR Code Generator - Surprise Tool"
          title="QR Code Generator - A little surprise tool!"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <QrCode className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={cn(
          "glassmorphic-card border-0 max-w-md w-[90vw]",
          "animate-in fade-in-0 zoom-in-95 duration-300"
        )}>
          <DialogHeader className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              
              <DialogTitle className="text-xl font-semibold text-glow">
                QR Code Generator
              </DialogTitle>
              
            </div>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              A little tool to generate QR codes — just for fun and convenience! 
              <br />
              <span className="text-primary/80">Part of the portfolio's surprise features.</span>
            </p>
          </DialogHeader>
          
          <div className="space-y-6 pt-2">
            {/* Input Section */}
            <div className="space-y-3">
              <label htmlFor="qr-input" className="text-sm font-medium text-muted-foreground">
                Enter URL or text:
              </label>
              <Input
                id="qr-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://www.example.com"
                className={cn(
                  "glassmorphic border-primary/20",
                  "focus:border-primary focus:ring-primary/30",
                  "transition-all duration-300"
                )}
                autoFocus
              />
            </div>

            {/* QR Code Preview */}
            <div className="flex justify-center">
              <div 
                ref={qrRef}
                className={cn(
                  "p-4 rounded-xl",
                  "bg-white/95 backdrop-blur-sm",
                  "border border-primary/20",
                  "shadow-lg shadow-primary/10"
                )}
              >
                <QRCodeSVG
                  value={text || "https://example.com"}
                  size={200}
                  bgColor="transparent"
                  fgColor="#0c0a09"
                  level="M"
                  className="drop-shadow-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className={cn(
                  "flex-1 glassmorphic border-primary/30",
                  "hover:bg-primary/10 hover:border-primary/50",
                  "transition-all duration-300"
                )}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                onClick={downloadQR}
                variant="outline"
                className={cn(
                  "flex-1 glassmorphic border-primary/30",
                  "hover:bg-primary/10 hover:border-primary/50",
                  "transition-all duration-300"
                )}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
         
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QRCodeGenerator;