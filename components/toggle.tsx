"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function Toggle() {
  const { theme, setTheme } = useTheme();

  const toggle = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="group/toggle h-8 w-8 px-0"
            onClick={toggle}
          >
            <SunIcon className="hidden [html.dark_&]:block" />
            <MoonIcon className="hidden [html.light_&]:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
