import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 dark:border-border md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built as part of the{" "}
            <a
              href={site.links.edp}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Stronghold Ecosystem Development Program
            </a>
            .
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Dashxboard.
          </p>
        </div>
      </div>
    </footer>
  );
}
