"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Frame } from "lucide-react";
import { routes, site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Frame className="h-6 w-6 text-foreground" />
        <span className="hidden font-bold text-foreground lg:inline-block">
          {site.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {routes.items.map((item) => (
          <Link
            key={item.href}
            href={item.href || "/"}
            className={cn(
              "relative transition-colors duration-300",
              "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
              pathname === item.href
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
