import { logos } from "@/utils/logos";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export const PopularChallenges = () => {
  // Only show some selected logos
  const featuredLogos = logos.slice(0, 4);
  
  return (
    <section className="w-full py-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Trophy className="text-primary h-5 w-5" />
        <h2 className="heading-md">Popular Challenges</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredLogos.map((logo, index) => (
          <motion.div
            key={logo.id}
            className="glass-panel group cursor-pointer h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div 
              className="h-24 rounded-t-xl flex items-center justify-center" 
              style={{ backgroundColor: `${logo.primaryColor}20` }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: logo.primaryColor }}
              >
                <span className="text-white font-semibold">
                  {logo.brandName.charAt(0)}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {logo.brandName}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 flex-1">
                {logo.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary">
                  {logo.difficulty}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  60 sec
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};