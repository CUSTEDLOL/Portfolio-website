import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');

  // Array of quotes 
  const quotes = [
  "Until the lion learns how to write every story will glorify the hunter.",
  "The day you plant the seed isn't the day you eat the fruit.",
  "The sooner you figure out what chairs don't belong to the table, the more peaceful your meals become.",
  "Admit you walked through the wrong door than to spend your life in the wrong road.",
  "A ship is safe in harbour but that's not what ships are made for, neither are you.",
  "We all die, the goal isn't to live forever, the goal is to create something that will.",
  "Don't wake up early to watch the sunrise, wake up earlier to let the sun watch you rise.",
  "The pawns always hate each other but the ones playing chess are usually friends."
  ];

  // Randomly select 1 quote
  const getRandomQuote = () => {
    const shuffled = [...quotes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 1).map((quote, index) => ({
      name: quote,
      progress: 100,
      delay: 0.5  // Staggered delay (though only 1, it's fine)
    }));
  };

  const [selectedQuote, setSelectedQuote] = useState(getRandomQuote());

  const terminalText = 'INITIALISING SYSTEM...';

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Fast terminal typing effect
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= terminalText.length) {
        setDisplayText(terminalText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50); // Faster typing

    // Quick quote loading animation
    selectedQuote.forEach((quote, index) => {
      tl.to(`.progress-${index}`, {
        width: "100%",
        duration: 1, // Much faster
        ease: "power2.out",
        delay: quote.delay,
      });
      
      tl.to(`.quote-${index}`, {
        color: "#00ff41",
        duration: 0.2,
        ease: "power2.out",
      }, `+=${quote.delay}`);
    });

    // Quick glitch effect
    tl.to('.glitch-text', {
      opacity: 1,
      duration: 0.1,
      repeat: 2,
      yoyo: true,
      ease: "power2.inOut",
    }, "+=0.2");

    // Fast fade out - total time around 2.5 seconds
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        gsap.to('.main-content', {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }, "+=0.3");

    // Fast circuit lines animation
    gsap.to('.circuit-line', {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.1
    });

    // Particles animation
    gsap.to('.particle', {
      y: -15,
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: "power1.inOut"
    });

    return () => {
      clearInterval(typeInterval);
    };
  }, [selectedQuote]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary-foreground))" />
            </linearGradient>
          </defs>
          {/* Circuit-like lines */}
          <path 
            className="circuit-line" 
            d="M0,50 Q200,20 400,50 T800,50" 
            stroke="url(#circuit-gradient)" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <path 
            className="circuit-line" 
            d="M100,100 Q300,70 500,100 T900,100" 
            stroke="url(#circuit-gradient)" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="800"
            strokeDashoffset="800"
          />
        </svg>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-2xl w-full px-8">
        {/* Main Terminal Text */}
        <div className="text-center">
          <div className="text-5xl font-mono font-bold text-primary tracking-wider mb-4 relative">
            {displayText}
            <span className="animate-pulse">|</span>
            <div className="glitch-text absolute inset-0 text-red-500 opacity-0">
              {displayText}
            </div>
          </div>
          
          <div className="text-xl font-mono text-accent tracking-wide opacity-80">
            Generating all components - Standby
          </div>
        </div>

        {/* Randomized Single Quote */}
        <div className="w-full space-y-4">
          {selectedQuote.map((quote, index) => (
            <div key={index} className="flex items-center justify-between text-sm font-mono">
              <span className={`quote-${index} text-muted-foreground transition-colors duration-300`}>
                {quote.name}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`progress-${index} h-full w-0 bg-primary rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                  </div>
                </div>
                <span className="text-xs text-primary w-8">OK</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tech ornaments */}
        <div className="flex space-x-4 text-primary/30 text-xs font-mono">
          <span>[████████████████████████████████] 100%</span>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-8 left-8 text-primary/40 font-mono text-xs">
          &gt; SYSTEM_BOOT_v6.9.
        </div>
        <div className="absolute bottom-8 right-8 text-primary/40 font-mono text-xs">
          STATUS: ONLINE
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
