import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://melius-ajnahal.com";
const siteName = "MELIUS";
const siteDescription =
  "Empowering businesses with expert financial guidance and strategic solutions tailored to drive sustainable growth and success.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Strategic Excellence in Business Advisory`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "business advisory",
    "financial consulting",
    "strategic planning",
    "business consulting",
    "financial advisory",
    "corporate strategy",
    "business growth",
    "financial planning",
    "strategic excellence",
  ],
  authors: [{ name: "MELIUS team" }],
  creator: "Mayura Kataria",
  publisher: "GT Abhishek",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - Strategic Excellence in Business Advisory`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Strategic Excellence in Business Advisory`,
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@melius",
    site: "@melius",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/melius-logo.svg`,
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai, Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "melius.ajnahal@gmail.com",
      contactType: "Customer Service",
    },
    sameAs: [
      // Add social media links when available
      // "https://www.linkedin.com/company/melius",
      // "https://twitter.com/melius",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Script
          id="suppress-extension-errors"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress MediaSession errors from browser extensions
              const originalError = console.error;
              console.error = function(...args) {
                const errorMessage = args.join(' ');
                if (errorMessage.includes('MediaSession') && errorMessage.includes('enterpictureinpicture')) {
                  // Suppress this specific extension error
                  return;
                }
                originalError.apply(console, args);
              };
              
              // Also catch uncaught errors
              window.addEventListener('error', (event) => {
                if (event.message && event.message.includes('MediaSession') && event.message.includes('enterpictureinpicture')) {
                  event.preventDefault();
                  return false;
                }
              }, true);
            `,
          }}
        />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
