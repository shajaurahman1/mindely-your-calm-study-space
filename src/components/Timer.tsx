import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSessionSound } from "@/hooks/useSessionSound";

interface TimerProps {
  focusMinutes?: number;
  breakMinutes?: number;
  showBreakToggle?: boolean;
  label?: string;
}

const focusMessages = [
  "You're doing great! 🌟",
  "Keep going, you've got this!",
  "Focus at your pace 🍃",
  "One step at a time ✨",
  "You're making progress!",
  "Stay calm, stay focused 🧘",
  "Believe in yourself 💪",
  "Deep breaths, you're amazing",
];

const breakMessages = [
  "Rest well, you earned it 🌿",
  "Take a breath, relax 😌",
  "Stretch and unwind 🧘",
  "Recharge your mind ✨",
  "Enjoy this peaceful moment",
  "Let your thoughts settle 🍃",
  "You're doing wonderfully",
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
  const [message, setMessage] = useState(focusMessages[0]);
  const [sessionCount, setSessionCount] = useState(1);
  
  const { playStartFocusSound, playStartBreakSound } = useSessionSound(soundEnabled);

  const totalTime = isBreak ? breakMinutes * 60 : focusMinutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStop = useCallback(() => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(focusMinutes * 60);
    setSessionCount(1);
    setMessage(focusMessages[0]);
  }, [focusMinutes]);

  const handleReset = useCallback(() => {
    setTimeLeft(isBreak ? breakMinutes * 60 : focusMinutes * 60);
  }, [isBreak, breakMinutes, focusMinutes]);

  const toggleMode = (toBreak: boolean) => {
    setIsBreak(toBreak);
    setIsRunning(false);
    setTimeLeft(toBreak ? breakMinutes * 60 : focusMinutes * 60);
    setMessage(toBreak ? breakMessages[0] : focusMessages[0]);
  };

  // Auto-transition between focus and break
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      if (isBreak) {
        // Break ended, start new focus session
        setIsBreak(false);
        setTimeLeft(focusMinutes * 60);
        setSessionCount(prev => prev + 1);
        setMessage(focusMessages[Math.floor(Math.random() * focusMessages.length)]);
        playStartFocusSound();
      } else {
        // Focus ended, start break
        setIsBreak(true);
        setTimeLeft(breakMinutes * 60);
        setMessage(breakMessages[Math.floor(Math.random() * breakMessages.length)]);
        playStartBreakSound();
      }
    }
  }, [timeLeft, isRunning, isBreak, focusMinutes, breakMinutes, playStartFocusSound, playStartBreakSound]);

  // Main timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Change message periodically
  useEffect(() => {
    if (!isRunning) return;
    
    const messages = isBreak ? breakMessages : focusMessages;
    const messageInterval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 30000);

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card rounded-3xl p-8 max-w-md mx-auto"
    >
      {/* Session Status */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isBreak ? "break" : "focus"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
              isBreak
                ? "bg-blue-500/20 text-blue-400"
                : "bg-primary/20 text-primary"
            }`}
          >
            {isBreak ? "🌿 Rest Session" : "🎯 Study Session"} {!isBreak && `#${sessionCount}`}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Mode Toggle */}
      {showBreakToggle && !isRunning && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center gap-2 mb-8"
        >
          <button
            onClick={() => toggleMode(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              !isBreak 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => toggleMode(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isBreak 
                ? "bg-blue-500 text-white shadow-lg" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Break
          </button>
        </motion.div>
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
            stroke={isBreak ? "hsl(210 100% 60%)" : "hsl(var(--primary))"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={628}
            initial={{ strokeDashoffset: 628 }}
            animate={{ strokeDashoffset: 628 - (progress / 100) * 628 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              filter: isBreak 
                ? "drop-shadow(0 0 10px hsl(210 100% 60% / 0.4))"
                : "drop-shadow(0 0 10px hsl(var(--primary) / 0.4))",
            }}
          />
        </svg>
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{ 
            scale: isRunning ? [1, 1.02, 1] : 1
          }}
          transition={{ 
            duration: 2, 
            repeat: isRunning ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <span className="text-5xl font-bold text-foreground tracking-tight">
            {formatTime(timeLeft)}
          </span>
          <span className={`text-sm mt-2 transition-colors duration-500 ${
            isBreak ? "text-blue-400" : "text-muted-foreground"
          }`}>
            {isBreak ? "Take a break" : label}
          </span>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={isRunning ? handleStop : handleReset}
          className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80 transition-all duration-300"
        >
          {isRunning ? <Square className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
        </Button>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-16 h-16 rounded-full text-primary-foreground shadow-lg transition-all duration-500 ${
              isBreak 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-primary hover:bg-primary/90"
            }`}
            style={{
              boxShadow: isRunning 
                ? isBreak 
                  ? "0 0 30px hsl(210 100% 60% / 0.4)" 
                  : "0 0 30px hsl(145 80% 42% / 0.4)"
                : isBreak
                  ? "0 4px 20px hsl(210 100% 60% / 0.3)"
                  : "0 4px 20px hsl(145 80% 42% / 0.3)",
            }}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>
        </motion.div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80 transition-all duration-300"
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
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`text-center text-sm transition-colors duration-500 ${
            isBreak ? "text-blue-400/80" : "text-muted-foreground"
          }`}
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default Timer;
