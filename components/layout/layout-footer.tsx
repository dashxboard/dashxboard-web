import { site } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built as part of the{" "}
            <a
              href={site.links.edp}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              SHx Ecosystem Development Program (EDP)
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
