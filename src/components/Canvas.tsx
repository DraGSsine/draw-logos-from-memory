import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Undo, Redo, Download, Trash } from "lucide-react";

interface CanvasProps {
  color: string;
  brushSize: number;
  tool: "brush" | "eraser";
  onImageCapture?: (imageDataUrl: string) => void;
  handleSubmit: VoidFunction;
  gameStarted: boolean;
}

export const Canvas = ({
  color,
  brushSize,
  tool,
  onImageCapture,
  handleSubmit,
  gameStarted,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 450 });

  // Initialize the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set initial canvas state
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

    // Save the context to state
    setContext(ctx);

    // Initialize clean canvas state for history
    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialState]);
    setHistoryStep(0);

    // Handle responsive canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      setCanvasSize({
        width: width,
        height: height, // Make it square for logo drawing
      });
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // Update canvas size on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    // Save current drawing
    const currentDrawing = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Resize canvas
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Restore drawing settings
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;

    // Try to restore the drawing (might be scaled)
    try {
      context.putImageData(currentDrawing, 0, 0);
    } catch (e) {
      console.log("Could not restore drawing after resize");
    }
  }, [canvasSize]);

  // Update brush properties
  useEffect(() => {
    if (!context) return;

    if (tool === "brush") {
      context.strokeStyle = color;
      context.globalCompositeOperation = "source-over";
    } else if (tool === "eraser") {
      context.globalCompositeOperation = "destination-out";
    }

    context.lineWidth = brushSize;
  }, [color, brushSize, tool, context]);

  // Capture canvas image data when requested
  useEffect(() => {
    if (onImageCapture && canvasRef.current) {
      const captureCanvas = () => {
        if (canvasRef.current) {
          const imageDataUrl = canvasRef.current.toDataURL("image/png");
          onImageCapture(imageDataUrl);
        }
      };

      // Set up interval to capture periodically
      const captureInterval = setInterval(captureCanvas, 2000);

      return () => {
        clearInterval(captureInterval);
        captureCanvas(); // Capture one final time on unmount
      };
    }
  }, [onImageCapture]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!context) return;

    setIsDrawing(true);

    let clientX: number;
    let clientY: number;

    // Handle both mouse and touch events
    if ("touches" in e) {
      e.preventDefault();
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing || !context) return;

    let clientX: number;
    let clientY: number;

    // Handle both mouse and touch events
    if ("touches" in e) {
      e.preventDefault();
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !context || !canvasRef.current) return;

    context.closePath();
    setIsDrawing(false);

    // Save the current canvas state to history
    const canvas = canvasRef.current;
    const newState = context.getImageData(0, 0, canvas.width, canvas.height);

    // Remove any "future" history if we went back and then drew something new
    const updatedHistory = history.slice(0, historyStep + 1);

    setHistory([...updatedHistory, newState]);
    setHistoryStep(updatedHistory.length);
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Save the cleared state to history
    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([...history, newState]);
    setHistoryStep(history.length);
  };

  const undo = () => {
    if (historyStep <= 0 || !context || !canvasRef.current) return;

    const newStep = historyStep - 1;
    const canvas = canvasRef.current;

    context.putImageData(history[newStep], 0, 0);
    setHistoryStep(newStep);
  };

  const redo = () => {
    if (historyStep >= history.length - 1 || !context || !canvasRef.current)
      return;

    const newStep = historyStep + 1;
    const canvas = canvasRef.current;

    context.putImageData(history[newStep], 0, 0);
    setHistoryStep(newStep);
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;

    const dataURL = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "logo-drawing.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="glass-panel w-full">
        <div className="canvas-container w-full h-full">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="touch-none w-full h-full bg-white"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={undo}
          disabled={historyStep <= 0}
          aria-label="Undo"
          className="w-10 h-10 p-0 rounded-full"
        >
          <Undo size={18} />
        </Button>
        <Button
          variant="outline"
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          aria-label="Redo"
          className="w-10 h-10 p-0 rounded-full"
        >
          <Redo size={18} />
        </Button>
        <Button
          variant="outline"
          onClick={clearCanvas}
          aria-label="Clear Canvas"
          className="w-10 h-10 p-0 rounded-full"
        >
          <Trash size={18} />
        </Button>
        <Button
          variant="outline"
          onClick={downloadCanvas}
          aria-label="Download Drawing"
          className="w-10 h-10 p-0 rounded-full"
        >
          <Download size={18} />
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!gameStarted}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
        >
          Submit Drawing
        </Button>
      </div>
    </div>
  );
};
