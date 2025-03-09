
import { Brush, Eraser, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawingToolsProps {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  tool: "brush" | "eraser";
  setTool: (tool: "brush" | "eraser") => void;
}

export const DrawingTools = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  tool,
  setTool,
}: DrawingToolsProps) => {
  const colors = [
    "#000000", // Black
    "#FFFFFF", // White
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
    "#800080", // Purple
    "#A52A2A", // Brown
    "#808080", // Gray
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  return (
    <div className="glass-panel p-5 flex flex-col gap-6 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent -z-10" />
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Palette size={18} />
          </div>
          <p className="text-sm font-medium">Drawing Tools</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setTool("brush")}
            className={cn(
              "w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all gap-1",
              tool === "brush"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/80 text-muted-foreground hover:bg-secondary"
            )}
            aria-label="Brush Tool"
          >
            <Brush size={18} />
            <span className="text-[10px] font-medium">Brush</span>
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={cn(
              "w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all gap-1",
              tool === "eraser"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/80 text-muted-foreground hover:bg-secondary"
            )}
            aria-label="Eraser Tool"
          >
            <Eraser size={18} />
            <span className="text-[10px] font-medium">Erase</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Brush Size</p>
        <div className="flex gap-2 flex-wrap">
          {brushSizes.map((size) => (
            <button
              key={size}
              onClick={() => setBrushSize(size)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                brushSize === size
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/80 text-muted-foreground hover:bg-secondary"
              )}
              aria-label={`Brush Size ${size}`}
            >
              <div
                className={cn(
                  "rounded-full",
                  brushSize === size ? "bg-primary-foreground" : "bg-muted-foreground"
                )}
                style={{
                  width: `${Math.min(size, 16)}px`,
                  height: `${Math.min(size, 16)}px`,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">Colors</p>
        <div className="grid grid-cols-6 gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                "w-9 h-9 rounded-lg transition-all",
                color === c
                  ? "ring-2 ring-primary ring-offset-2 scale-110"
                  : "hover:scale-105 hover:shadow-md"
              )}
              style={{ 
                backgroundColor: c,
                boxShadow: color === c ? `0 0 10px ${c}80` : 'none' 
              }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
