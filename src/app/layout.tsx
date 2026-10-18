import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PreloadResources } from '@/utils/PreloadResources';
import { Poppins, Jura } from 'next/font/google';
import { config } from '@/config/config';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const jura = Jura({
  subsets: ['latin'],
  variable: '--font-jura',
  display: 'swap',
});

// Replace these placeholders with your own details.
const SITE_URL = 'https://your-domain.com';
const SITE_NAME = 'Your Name';
const TITLE = `${SITE_NAME} | Front-End Engineer`;
const DESCRIPTION =
  'Front-end engineer building accessible, carefully crafted interfaces with React, Next.js, and TypeScript. Projects, toolbox, and contact.';
const SOCIAL_DESCRIPTION =
  'Front-end engineer building accessible, carefully crafted interfaces with React, Next.js, and TypeScript.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Front-End Engineer',
    'Frontend Engineer',
    'Front-End Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Web Accessibility',
    'WCAG',
    'Portfolio',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: '/' },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: { index: true, follow: true },
  // To add share images, put opengraph-image.png and twitter-image.png
  // (1200x630) in src/app. Next.js picks them up automatically.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#1a202c' },
  ],
  colorScheme: 'light dark',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Front-End Engineer',
  url: SITE_URL,
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'Web Accessibility'],
  sameAs: [
    config.urls.linkedinProfile,
    config.urls.githubProfile,
    config.urls.XProfile,
    config.urls.behanceProfile,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jura.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bgLight dark:bg-bgDark">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PreloadResources />
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
