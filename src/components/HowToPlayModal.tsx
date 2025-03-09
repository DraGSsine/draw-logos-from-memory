"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { X, CheckCircle } from "lucide-react";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal = ({ isOpen, onClose }: HowToPlayModalProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setTimeout(() => setAnimate(false), 300);
    }
  }, [isOpen]);
  
  if (!isOpen && !animate) return null;
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 
      ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} 
      transition-opacity duration-300`}
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className={`bg-white rounded-2xl w-full max-w-lg shadow-soft-lg overflow-hidden
        ${isOpen ? "scale-100" : "scale-95"} 
        transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold">How to Play</h3>
          <Button variant="ghost"  onClick={onClose} aria-label="Close">
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-6">
          <ol className="space-y-5">
            {[
              "You'll be shown a brand name and its primary color.",
              "Using the drawing tools, recreate the logo from memory.",
              "You have 60 seconds to complete your drawing.",
              "After time expires, you'll see how your drawing compares to the actual logo.",
              "You'll earn points based on accuracy and completion time."
            ].map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
          
          <div className="mt-8 flex justify-end">
            <Button onClick={onClose}>
              Got It
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
