import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { getLocalBusinessSchema } from "@/lib/structuredData";
import SkipLink from "@/components/SkipLink";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading - show fallback font immediately
  preload: true, // Preload critical fonts
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading - show fallback font immediately
  preload: false, // Only preload the main font
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riverpaws.dog"),
  title: {
    default: "Dog Grooming Waunakee & North Madison | River Paws Dog Hikes",
    template: "%s | River Paws"
  },
  description: "Full-service dog grooming and small-group dog hikes on the Waunakee/Madison border. Serving DeForest, Sun Prairie & Middleton. Book today.",
  authors: [{ name: "River Paws" }],
  alternates: {
    canonical: "https://www.riverpaws.dog/",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Dog Grooming Waunakee & North Madison | River Paws Dog Hikes",
    description:
      "Full-service dog grooming and small-group dog hikes on the Waunakee/Madison border. Serving DeForest, Sun Prairie & Middleton. Book today.",
    url: "https://www.riverpaws.dog/",
    siteName: "River Paws",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "River Paws professional dog grooming and adventure hiking services in Waunakee and Madison, Wisconsin serving Middleton, DeForest, and Sun Prairie",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Grooming & Hiking Near Me | River Paws Waunakee / Madison, WI",
    description:
      "Professional dog grooming and adventure hiking services near you in Waunakee, WI. Expert groomers serving Madison, Middleton, DeForest, Sun Prairie. Trusted by 2000+ families since 2017.",
    images: ["/og-image.jpg"],
    creator: "@riverpaws",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getLocalBusinessSchema();

  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        {/* Performance optimization: Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(resolved);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                      
                      // Check for updates on page load
                      registration.update();
                      
                      // Listen for new service worker installing
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              // New content available, refresh for best experience
                              console.log('New content available, refresh recommended');
                            }
                          });
                        }
                      });
                      
                      // Trigger periodic cache cleanup (every 30 minutes)
                      setInterval(() => {
                        if (registration.active) {
                          registration.active.postMessage({ type: 'CLEAN_CACHE' });
                        }
                        // Also check for SW updates
                        registration.update();
                      }, 30 * 60 * 1000); // 30 minutes
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
                
                // Reload when new SW takes control
                let refreshing = false;
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                  if (!refreshing) {
                    refreshing = true;
                    // Auto-refresh for seamless updates (comment out if you prefer manual refresh)
                    // window.location.reload();
                  }
                });
              }
            `,
          }}
        />
        <SkipLink />
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
