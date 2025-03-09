
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Timer as TimerIcon, Clock } from "lucide-react";

interface TimerProps {
  durationSeconds: number;
  onComplete: () => void;
  isActive?: boolean;
}

export const Timer = ({ durationSeconds, onComplete, isActive = true }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        
        // Pulse during last 10 seconds
        if (prev <= 11 && !isPulsing) {
          setIsPulsing(true);
        }
        
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [durationSeconds, onComplete, isActive]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  // Calculate percentage for progress bar
  const progressPercentage = (timeLeft / durationSeconds) * 100;
  
  return (
    <div className="glass-panel p-5 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-40 -z-10" />
      
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          timeLeft <= 10 
            ? "bg-destructive/10 text-destructive animate-pulse" 
            : "bg-primary/10 text-primary"
        )}>
          <Clock 
            size={24} 
            className={cn(
              "transition-all",
              timeLeft <= 10 && "animate-pulse"
            )} 
          />
        </div>
        
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span
              className={cn(
                "text-2xl font-bold transition-all",
                timeLeft <= 10 
                  ? "text-destructive animate-pulse" 
                  : "text-foreground"
              )}
            >
              {formatTime(timeLeft)}
            </span>
            
            <span className="text-xs text-muted-foreground">
              {timeLeft <= 10 ? "Hurry up!" : "Time remaining"}
            </span>
          </div>
          
          <div className="w-full h-3 bg-secondary/60 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={cn(
                "h-full transition-all duration-1000 ease-linear rounded-full shadow-inner",
                timeLeft > 30 
                  ? "bg-gradient-to-r from-primary/90 to-primary" 
                  : timeLeft > 10 
                    ? "bg-gradient-to-r from-amber-400 to-amber-500" 
                    : "bg-gradient-to-r from-destructive/90 to-destructive"
              )}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
