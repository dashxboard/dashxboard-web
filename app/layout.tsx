import Script from "next/script";
import { Metadata } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/layout/layout-header";
import { Footer } from "@/components/layout/layout-footer";
import { getBaseURL } from "@/lib/utils";
import { site } from "@/lib/site-config";
import "@/styles/globals.css";

const GeistSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: "400",
});

const GeistMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  metadataBase: new URL(getBaseURL()),
  alternates: {
    canonical: getBaseURL(),
  },
  description: site.description,
  keywords: [
    "Stronghold",
    "Stronghold Governance",
    "SHx",
    "SHx Token",
    "SHx Dashxboard",
    "SHx Governance",
    "SHx Community",
    "Stellar Blockchain",
    "Stellar Ecosystem",
    "Cryptocurrency Governance Platform",
    "Blockchain Voting System",
    "Decentralized Governance",
  ],
  openGraph: {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    type: "website",
    url: getBaseURL(),
    siteName: site.name,
    images: [
      {
        url: `${getBaseURL()}/og-image.png`,
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [`${getBaseURL()}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-regular antialiased tracking-wide`}
        suppressHydrationWarning
      >
        <Script id="microsoft-clarity-analytics">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");           
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Header />
          <main className="sm:container mx-auto mb-16 w-[90vw] h-auto scroll-smooth">
            {children}
          </main>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
