
import { cn } from "@/lib/utils";

interface LogoPromptProps {
  brandName: string;
  brandColor: string;
}

export const LogoPrompt = ({ brandName, brandColor }: LogoPromptProps) => {
  return (
    <div className="glass-panel p-6 w-full text-center relative overflow-hidden backdrop-blur-md bg-white/90 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 -z-10" />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-xl" />
      
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className="badge bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full animate-fade-in">
          Draw from memory
        </div>
        
        <h3 className="text-4xl font-bold tracking-tight animate-slide-in bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
          {brandName}
        </h3>
        
        <div className="mt-3 flex items-center justify-center gap-3 animate-fade-in delay-300">
          <div className="text-sm text-muted-foreground font-medium">Brand color:</div>
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full ring-2 ring-border shadow-md"
              style={{ backgroundColor: brandColor }}
            />
            <div 
              className="absolute inset-0 w-8 h-8 rounded-full blur-sm opacity-40"
              style={{ backgroundColor: brandColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
