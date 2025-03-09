"use client";
import { useEffect, useState } from "react";
import { Canvas } from "@/components/Canvas";
import { DrawingTools } from "@/components/DrawingTools";
import { Timer } from "@/components/Timer";
import { LogoPrompt } from "@/components/LogoPrompt";
import { getRandomLogo, Logo } from "@/utils/logos";
import { calculateScore } from "@/utils/scoring";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Game = () => {
  const router = useRouter()
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [currentLogo, setCurrentLogo] = useState<Logo | null>(null);
  const [userDrawing, setUserDrawing] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize the game with a random logo
  useEffect(() => {
    const logo = getRandomLogo();
    setCurrentLogo(logo);
    setColor(logo.primaryColor);

    // Start the game with a slight delay to allow loading
    const timer = setTimeout(() => {
      setGameStarted(true);
      toast("Challenge started! Draw from memory!");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle time up or user completion
  const handleGameComplete = () => {
    if (!currentLogo || !userDrawing) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    const timeTaken = 60 - timeLeft;
    const score = calculateScore(timeLeft, 60);

    // Navigate to results page with score and drawings
    const res = {
      userDrawing,
      originalLogo: currentLogo.imageUrl,
      brandName: currentLogo.brandName,
      score,
      timeTaken,
    }
    localStorage.setItem("resultsState",JSON.stringify(res))
    router.push("/results")
  };

  // Capture the drawing for the results page
  const handleImageCapture = (imageDataUrl: string) => {
    setUserDrawing(imageDataUrl);
  };

  // Handle early submission
  const handleSubmit = () => {
    if (timeLeft > 0) {
      toast.success("Drawing submitted early!");
      handleGameComplete();
    }
  };

  // Function to update timeLeft from Timer component
  const updateTimeLeft = (remainingTime: number) => {
    setTimeLeft(remainingTime);
  };

  return (
    <div className="page-container py-6 px-4 md:pt-8 relative min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-2 h-[92vh] flex flex-col gap-5">
          <Canvas
            color={color}
            brushSize={brushSize}
            tool={tool}
            onImageCapture={handleImageCapture}
            handleSubmit={handleSubmit}
            gameStarted={gameStarted}
          />
        </div>

        <div className="flex flex-col gap-5">
          {currentLogo && (
            <LogoPrompt
              brandName={currentLogo.brandName}
              brandColor={currentLogo.primaryColor}
            />
          )}

          <DrawingTools
            color={color}
            setColor={setColor}
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            tool={tool}
            setTool={setTool}
          />
          <Timer
            durationSeconds={60}
            onComplete={handleGameComplete}
            isActive={gameStarted}
            onTimeUpdate={updateTimeLeft}
            initialTimeLeft={timeLeft}
          />
          
          {/* Display current time left */}
          <div className="text-center text-sm text-muted-foreground">
            Time remaining: {timeLeft} seconds
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
