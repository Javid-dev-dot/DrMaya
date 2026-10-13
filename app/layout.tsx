import type { Metadata } from "next";
import { Inter, Mea_Culpa, Limelight } from "next/font/google";
import "./globals.css";
import { practice } from "@/lib/practice";
import StaircaseLoaderWrapper from "@/components/StaircaseLoaderWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const meaCulpa = Mea_Culpa({
  variable: "--font-mea-culpa",
  subsets: ["latin"],
  weight: "400",
});

const limelight = Limelight({
  variable: "--font-limelight",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(practice.siteUrl),
  title: {
    default: `${practice.name} | Clinical Psychologist in Santa Monica, CA`,
    template: `%s | ${practice.name}`,
  },
  description:
    "Specialized therapy for anxiety, trauma, and burnout in Santa Monica and across California. In-person and telehealth sessions for high-achieving adults.",
  applicationName: practice.name,
  keywords: [
    "clinical psychologist",
    "anxiety therapy",
    "EMDR trauma therapy",
    "burnout therapist",
    "Santa Monica therapy",
    "telehealth California",
  ],
  authors: [{ name: practice.name }],
  creator: practice.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: practice.siteUrl,
    siteName: practice.name,
    title: `${practice.name} | Clinical Psychologist in Santa Monica, CA`,
    description:
      "Evidence-based therapy for anxiety, trauma, and burnout. In-person in Santa Monica and secure telehealth across California.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${practice.name} | Clinical Psychologist`,
    description:
      "Evidence-based therapy for anxiety, trauma, and burnout in Santa Monica and across California.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: practice.name,
  description:
    "Private clinical psychology practice specializing in anxiety, trauma, and burnout for high-achieving adults.",
  medicalSpecialty: "Psychiatric",
  url: practice.siteUrl,
  telephone: practice.phoneDisplay,
  email: practice.emailDisplay,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1230 Montana Ave, Suite 300",
    addressLocality: "Santa Monica",
    addressRegion: "CA",
    postalCode: "90403",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "State",
    name: "California",
  },
  availableService: [
    { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy (CBT)" },
    { "@type": "MedicalTherapy", name: "EMDR Trauma Therapy" },
    { "@type": "MedicalTherapy", name: "Somatic Nervous System Regulation" },
    { "@type": "MedicalTherapy", name: "Telehealth Therapy" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning on <html>: the pre-paint script below stamps
    // data-theme/color-scheme onto it before React hydrates, so the attributes
    // intentionally differ from the server render.
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${meaCulpa.variable} ${limelight.variable} antialiased bg-brand-cream text-brand-dark font-sans`}
      >
        {/* Applies the saved/OS theme before paint so dark mode never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='theme';var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;if(t==='dark'){r.setAttribute('data-theme','dark');}else{r.removeAttribute('data-theme');}r.style.colorScheme=t;}catch(e){}})();",
          }}
        />
        <StaircaseLoaderWrapper />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div aria-hidden="true" className="noise-overlay" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
