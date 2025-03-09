"use client";
import { GameResults } from "@/components/GameResults";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Results = () => {
  const router = useRouter();
  const state = JSON.parse(localStorage.getItem("resultsState") || "");
  if (!state) router.push("/game");
  if (!state) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg mb-4">No Results to Display</h1>
          <p className="text-muted-foreground mb-6">
            You need to complete a drawing challenge first!
          </p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft size={18} className="mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col justify-center items-center gap-8">
      <GameResults
        userDrawing={state.userDrawing}
        originalLogo={state.originalLogo}
        brandName={state.brandName}
        score={state.score}
        timeTaken={state.timeTaken}
      />
    </div>
  );
};

export default Results;
