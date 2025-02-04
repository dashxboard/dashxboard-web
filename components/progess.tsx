"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Progress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const position = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (position / height) * 100;
      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="h-[2px] w-full bg-border">
        <div
          className={cn(
            "h-full bg-primary",
            "transition-all duration-150 ease-out"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
