"use client";

import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonProps {
  className?: string;
}

export function ShareButton({ className }: ShareButtonProps) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Button
      variant="outline"
      className={`shrink-0 ${className || ""}`}
      onClick={handleShare}
    >
      Share
      <Share className="h-4 w-4 ml-2" />{" "}
    </Button>
  );
}
