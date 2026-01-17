import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimerProps {
  focusMinutes?: number;
  breakMinutes?: number;
  showBreakToggle?: boolean;
  label?: string;
}

const encouragingMessages = [
  "You're doing great! 🌟",
  "Keep going, you've got this!",
  "Focus at your pace 🍃",
  "Take a breath, you're amazing",
  "One step at a time ✨",
  "You're making progress!",
  "Stay calm, stay focused 🧘",
  "Believe in yourself 💪",
];

const Timer = ({ 
  focusMinutes = 25, 
  breakMinutes = 5, 
  showBreakToggle = true,
  label = "Focus"
}: TimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusMinutes * 60);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [message, setMessage] = useState(encouragingMessages[0]);

  const totalTime = isBreak ? breakMinutes * 60 : focusMinutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakMinutes * 60 : focusMinutes * 60);
  }, [isBreak, breakMinutes, focusMinutes]);

  const toggleMode = (toBreak: boolean) => {
    setIsBreak(toBreak);
    setIsRunning(false);
    setTimeLeft(toBreak ? breakMinutes * 60 : focusMinutes * 60);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Cycle through messages
      setMessage(encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    // Change message every 30 seconds while running
    if (!isRunning) return;
    
    const messageInterval = setInterval(() => {
      setMessage(encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]);
    }, 30000);

    return () => clearInterval(messageInterval);
  }, [isRunning]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl p-8 max-w-md mx-auto"
    >
      {/* Mode Toggle */}
      {showBreakToggle && (
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => toggleMode(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              !isBreak 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => toggleMode(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              isBreak 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Break
          </button>
        </div>
      )}

      {/* Timer Circle */}
      <div className="relative w-56 h-56 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="100"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="112"
            cy="112"
            r="100"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={628}
            initial={{ strokeDashoffset: 628 }}
            animate={{ strokeDashoffset: 628 - (progress / 100) * 628 }}
            transition={{ duration: 0.5 }}
            style={{
              filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.4))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-foreground tracking-tight">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm text-muted-foreground mt-2">
            {isBreak ? "Break time" : label}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          style={{
            boxShadow: isRunning 
              ? "0 0 30px hsl(145 80% 42% / 0.4)" 
              : "0 4px 20px hsl(145 80% 42% / 0.3)",
          }}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </div>

      {/* Encouraging Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center text-muted-foreground text-sm"
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default Timer;
