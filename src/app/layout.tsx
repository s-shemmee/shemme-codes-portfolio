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

const SITE_URL = 'https://shemme.codes';
const SITE_NAME = 'Shemme Codes';
const TITLE = `${SITE_NAME} | Front-End Engineer`;
const DESCRIPTION =
  'Front-end engineer in Morocco building accessible, carefully crafted interfaces with React, Next.js, and TypeScript. Projects, toolbox, and contact.';
const SOCIAL_DESCRIPTION =
  'Front-end engineer in Morocco building accessible, carefully crafted interfaces with React, Next.js, and TypeScript.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Shemmee',
    'Shemmee Codes',
    'Front-End Engineer',
    'Frontend Engineer',
    'Front-End Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Web Accessibility',
    'WCAG',
    'Portfolio',
    'Morocco',
  ],
  authors: [{ name: 'Shemmee', url: SITE_URL }],
  creator: 'Shemmee',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Shemmee, front-end engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@s_shemmee',
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 630,
        alt: 'Shemmee, front-end engineer',
      },
    ],
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
  name: 'Chaimae Lamirine',
  alternateName: 'Shemmee',
  jobTitle: 'Front-End Engineer',
  url: SITE_URL,
  address: { '@type': 'PostalAddress', addressCountry: 'MA' },
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
