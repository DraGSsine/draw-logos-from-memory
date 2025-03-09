import Link from "next/link";
import { Button } from "./Button";
import { Download, Play } from "lucide-react";
import Image from "next/image";

interface GameResultsProps {
  userDrawing: string;
  originalLogo: string;
  brandName: string;
  score: number;
  timeTaken: number;
}

export const GameResults = ({
  userDrawing,
  originalLogo,
  brandName,
  score,
  timeTaken,
}: GameResultsProps) => {
  // Function to give feedback based on score
  const getFeedback = (score: number) => {
    if (score >= 90) return "Masterpiece!";
    if (score >= 70) return "Pretty close!";
    if (score >= 50) return "Nice effort!";
    if (score >= 30) return "Getting there!";
    return "Good try!";
  };

  const DownloadDraw = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");

    // Set the href to the data URL
    link.href = userDrawing;

    // Set the download filename - clean brand name for the filename
    const cleanName = brandName.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    link.download = `${cleanName}-drawing.png`;

    // Append to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up - remove the element
    document.body.removeChild(link);
  };
  return (
    <div className="glass-panel p-6 md:p-8 w-full max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in">
      <div className="text-center">
        <div className="badge bg-primary/10 text-primary mb-2">Results</div>
        <h1 className="heading-lg">{brandName} Logo Challenge</h1>
        <p className="text-xl mt-2 font-medium">{getFeedback(score)}</p>
        <div className="mt-4 flex justify-center items-center gap-3">
          <div className="text-2xl font-bold">{score}</div>
          <div className="text-sm text-muted-foreground">points</div>
          <div className="w-px h-6 bg-border mx-1"></div>
          <div className="text-sm text-muted-foreground">
            {timeTaken} seconds
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-lg font-medium">Your Drawing</h3>
          <div className="bg-white rounded-lg overflow-hidden border border-border w-full aspect-square relative">
            <Image
              src={userDrawing}
              alt="Your drawing"
              className="object-contain p-2"
              fill
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-lg font-medium">Original Logo</h3>
          <div className="bg-white rounded-lg overflow-hidden border border-border w-full aspect-square relative">
            <Image
              src={originalLogo}
              alt="Original logo"
              className="object-contain p-2"
              fill
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="secondary" onClick={() => DownloadDraw()}>
          <Download size={18} className="mr-2" />
          Download
        </Button>
        <Link href="/game">
          <Button size="lg">
            <Play size={18} className="mr-2" />
            Try Another Logo
          </Button>
        </Link>
      </div>
    </div>
  );
};
