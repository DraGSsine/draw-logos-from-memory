"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import {
  Play,
  Info,
  Trophy,
  BarChart,
  PenTool,
} from "lucide-react";
import { HowToPlayModal } from "@/components/HowToPlayModal";
import { PopularChallenges } from "@/components/PopularChallenges";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter()
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  return (
    <>
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="badge bg-primary/5 border-primary border text-primary mb-4 font-medium">
              Challenge Your Memory
            </span>
          </div>

          <h1 className="heading-xl text-primary mb-6">
            Draw Logos From Memory
          </h1>

          <p className="text-xl text-muted-foreground mb-10 mx-auto max-w-2xl">
            Test your brand recognition skills by drawing famous logos from
            memory. Race against the clock to recreate iconic designs with just
            60 seconds per logo!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={()=>router.push("/game")}
                size="lg"
                className="w-full sm:w-auto shadow-soft hover:shadow-soft-lg transform transition-all hover:-translate-y-1"
              >
                <Play size={18} className="mr-2" />
                Start Challenge
              </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => setHowToPlayOpen(true)}
            >
              <Info size={18} className="mr-2" />
              How to Play
            </Button>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <PenTool className="h-6 w-6 text-primary" />,
                title: "Test Your Memory",
                description:
                  "Challenge yourself to recall the details of famous brand logos from memory alone.",
              },
              {
                icon: <BarChart className="h-6 w-6 text-primary" />,
                title: "Track Progress",
                description:
                  "See how your drawings compare to the real logos and improve over time.",
              },
              {
                icon: <Trophy className="h-6 w-6 text-primary" />,
                title: "Compete Globally",
                description:
                  "Compare your scores with players around the world on our leaderboards.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-panel p-6 flex flex-col items-center text-center"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <PopularChallenges />
        </div>
      </section>

      <HowToPlayModal
        isOpen={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
      />
    </>
  );
};
export default Home;
