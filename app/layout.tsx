import { Metadata } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/components/provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBaseURL } from "@/lib/utils";
import { site } from "@/lib/site";
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
    template: `%s - ${site.name}`,
  },
  metadataBase: new URL(getBaseURL()),
  alternates: {
    canonical: getBaseURL(),
  },
  description: site.description,
  keywords: [
    "Stronghold",
    "SHx",
    "SHx Token",
    "Dashxboard",
    "Governance",
    "SHx Governance",
    "Stellar",
    "Stellar Blockchain",
    "Cryptocurrency",
    "Blockchain",
  ],
  openGraph: {
    title: {
      default: site.name,
      template: `%s - ${site.name}`,
    },
    description: site.description,
    type: "website",
    url: getBaseURL(),
    siteName: site.name,
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.description,
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
        <Provider
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
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
