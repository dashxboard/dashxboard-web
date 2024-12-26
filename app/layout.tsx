import { Metadata } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/components/provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
  metadataBase: new URL(site.url),
  description: site.description,
  keywords: ["Stronghold", "SHx", "Dashxboard", "Governance", "Stellar"],
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
      </body>
    </html>
  );
}
