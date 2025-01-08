"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Frame } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Frame className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">{site.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/"
          className={cn(
            "relative transition-colors hover:text-foreground/80",
            "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
            pathname === "/" ? "text-foreground" : "text-foreground/80"
          )}
        >
          Proposals
        </Link>
        <Link
          href="/governance"
          className={cn(
            "relative transition-colors hover:text-foreground/80",
            "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
            pathname === "/governance"
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Governance
        </Link>
        <Link
          href="/faq"
          className={cn(
            "relative transition-colors hover:text-foreground/80",
            "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
            pathname === "/faq" ? "text-foreground" : "text-foreground/80"
          )}
        >
          FAQ
        </Link>
      </nav>
    </div>
  );
}
