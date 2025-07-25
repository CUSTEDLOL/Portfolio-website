import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const WORDS = [
  'ABOUT', 'REACT', 'WORLD', 'HAPPY', 'SMILE', 'DANCE', 'MUSIC', 'PEACE',
  'LIGHT', 'MAGIC', 'DREAM', 'HEART', 'SHINE', 'BRAVE', 'SWIFT', 'GRAND',
  'SMART', 'FRESH', 'CLEAN', 'POWER', 'SUPER', 'ULTRA', 'CYBER', 'PIXEL'
];

interface WordleGameProps {
  className?: string;
}

const WordleGame = ({ className = '' }: WordleGameProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [currentRow, setCurrentRow] = useState(0);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Initialize game
  const initializeGame = useCallback(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
    setCurrentGuess('');
    setGuesses([]);
    setGameState('playing');
    setCurrentRow(0);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((!isOpen && !isModalOpen) || gameState !== 'playing') return;

      if (e.key === 'Enter') {
        submitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (e.key.match(/[a-zA-Z]/) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, isModalOpen, gameState, currentGuess, targetWord]);

  const submitGuess = () => {
    if (currentGuess.length !== 5) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentRow(prev => prev + 1);

    if (currentGuess === targetWord) {
      setGameState('won');
    } else if (newGuesses.length >= 5) {
      setGameState('lost');
    }

    setCurrentGuess('');
  };

  const getCellClass = (letter: string, index: number, guessIndex: number) => {
    if (guessIndex >= guesses.length) return 'border-cyan-400/30 bg-slate-800/50';

    const guess = guesses[guessIndex];
    if (guess[index] === targetWord[index]) {
      return 'border-green-400 bg-green-500/20 text-green-400 neon-border';
    } else if (targetWord.includes(guess[index])) {
      return 'border-yellow-400 bg-yellow-500/20 text-yellow-400';
    } else {
      return 'border-red-400 bg-red-500/20 text-red-400';
    }
  };

  const handleGameClick = () => {
    if (gameState === 'playing' && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  const renderGrid = () => {
    const rows = [];
    for (let row = 0; row < 5; row++) {
      const cells = [];
      for (let col = 0; col < 5; col++) {
        let letter = '';
        const isCurrentCell = row === currentRow && col === currentGuess.length && gameState === 'playing' && row < guesses.length + 1;
        
        if (row < guesses.length) {
          letter = guesses[row][col] || '';
        } else if (row === currentRow) {
          letter = currentGuess[col] || '';
        }

        cells.push(
          <div
            key={`${row}-${col}`}
            className={`
              w-12 h-12 border-2 rounded-lg flex items-center justify-center relative
              font-mono font-bold text-lg transition-all duration-300
              ${getCellClass(letter, col, row)}
            `}
          >
            {letter}
            {/* Typing cursor */}
            {isCurrentCell && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0.5 h-6 bg-cyan-400 animate-pulse"></div>
              </div>
            )}
          </div>
        );
      }
      rows.push(
        <div key={row} className="flex gap-2 justify-center">
          {cells}
        </div>
      );
    }
    return rows;
  };

  const renderWinAnimation = () => {
    if (gameState !== 'won') return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg backdrop-blur-sm">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <div className="text-2xl font-mono font-bold text-cyan-400 text-glow mb-4">
            You Won!
          </div>
          <Button
            onClick={() => {
              initializeGame();
              setIsOpen(false);
              setTimeout(() => setIsOpen(true), 100);
            }}
            className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 
                     text-cyan-400 border border-cyan-400/50 hover:border-cyan-400/80 neon-border"
          >
            Play Again
          </Button>
        </div>
      </div>
    );
  };

  const renderLossAnimation = () => {
    if (gameState !== 'lost') return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-lg backdrop-blur-sm">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">💀</div>
          <div className="text-xl font-mono font-bold text-red-400 mb-2">
            Game Over!
          </div>
          <div className="text-lg font-mono text-gray-300 mb-4">
            Word was: <span className="text-cyan-400 text-glow">{targetWord}</span>
          </div>
          <Button
            onClick={() => {
              initializeGame();
              setIsOpen(false);
              setTimeout(() => setIsOpen(true), 100);
            }}
            className="bg-gradient-to-r from-red-500/20 to-purple-500/20 hover:from-red-500/30 hover:to-purple-500/30 
                     text-red-400 border border-red-400/50 hover:border-red-400/80"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  };

  const GameContent = () => (
    <div className="relative" onClick={handleGameClick}>
      {/* Hidden input for mobile keyboard */}
      <input
        ref={hiddenInputRef}
        className="absolute -top-full opacity-0 pointer-events-none"
        value={currentGuess}
        onChange={(e) => {
          const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5);
          setCurrentGuess(value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submitGuess();
          }
        }}
      />
      <div className="space-y-2 mb-4">
        {renderGrid()}
      </div>
      
      {gameState === 'playing' && (
        <div className="text-center">
          <p className="text-xs text-gray-400 font-mono mb-2">
            Type your guess and press Enter
          </p>
          <Button
            onClick={submitGuess}
            disabled={currentGuess.length !== 5}
            className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 
                     text-cyan-400 border border-cyan-400/50 hover:border-cyan-400/80 neon-border
                     disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Submit Guess
          </Button>
        </div>
      )}

      {renderWinAnimation()}
      {renderLossAnimation()}
    </div>
  );

  return (
    <>
      <div className={`glassmorphic-card border border-cyan-400/30 rounded-lg overflow-hidden ${className}`}>
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 flex items-center justify-between hover:bg-cyan-400/5 transition-colors duration-300"
        >
          <div className="text-left">
            <h3 className="text-lg md:text-xl font-mono font-bold text-cyan-400 text-glow mb-1">
              I have a problem...
            </h3>
            <p className="text-sm md:text-base text-gray-300 font-mono">
              I never outgrew my Wordle phase; why not give it a shot yourself?
            </p>
          </div>
          <div className="ml-4">
            {isOpen ? (
              <ChevronUp className="w-6 h-6 text-cyan-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-cyan-400" />
            )}
          </div>
        </button>

        {/* Game Area */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 border-t border-cyan-400/20 relative">
            {/* Pop-out button */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="absolute top-2 left-2 z-10 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-400/50 hover:border-cyan-400/80 neon-border"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md glassmorphic-card border border-cyan-400/30">
                <DialogHeader>
                  <DialogTitle className="font-mono text-cyan-400 text-glow">
                    Try this Wordle!
                  </DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <GameContent />
                </div>
              </DialogContent>
            </Dialog>

            <GameContent />
          </div>
        </div>
      </div>

      {/* Modal Dialog for pop-out game */}
    </>
  );
};

export default WordleGame;