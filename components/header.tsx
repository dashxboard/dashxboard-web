import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Mobile } from "@/components/mobile";
import { Toggle } from "@/components/toggle";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="sm:container mx-auto w-[95vw] h-14 flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-0.5">
          <Mobile />
          <Navbar />
        </div>
        <div className="flex items-center gap-0.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                  <Link
                    href={site.links.discord}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <DiscordLogoIcon className="h-4 w-4" />
                    <span className="sr-only">Discord</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Discord</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                  <Link
                    href={site.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Toggle />
        </div>
      </div>
    </header>
  );
}
