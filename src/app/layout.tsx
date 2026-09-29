import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ChatWidget } from "@/components/ChatWidget";
import { LeadSourceCapture } from "@/components/LeadSource";
import { getSettingsMap } from "@/lib/seed";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { localBusinessJsonLd } from "@/lib/seo";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_SETTINGS.siteUrl),
  title: {
    default: DEFAULT_SETTINGS.seoTitle,
    template: "%s | Gheith Insurance",
  },
  description: DEFAULT_SETTINGS.seoDescription,
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Gheith Insurance",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/gheith-logo.webp", alt: "Gheith Insurance Agency Inc. logo" }],
  },
  icons: {
    icon: "/images/gheith-logo.webp",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = DEFAULT_SETTINGS;
  try {
    settings = await getSettingsMap();
  } catch {
    settings = DEFAULT_SETTINGS;
  }

  return (
    <html lang="en">
      <body className={`${ibmPlex.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <LeadSourceCapture />
        <Header settings={settings} />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <WhatsAppFloat number={settings.whatsappNumber} message={settings.whatsappMessage} />
        <ChatWidget
          whatsappNumber={settings.whatsappNumber}
          whatsappMessage={settings.whatsappMessage}
          phone={settings.phone}
        />
      </body>
    </html>
  );
}
