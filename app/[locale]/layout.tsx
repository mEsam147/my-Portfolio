// app/[locale]/layout.tsx
import { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LenisProvider } from '@/components/LenisProvider';
import Cursor from '@/components/Cursor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { locales } from '@/i18n/config';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

interface Props {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

// Site configuration
const SITE_CONFIG = {
  name: 'Mohamed Essam - Full Stack Developer',
  title: 'Mohamed Essam | Full Stack Developer & MERN Stack Specialist',
  description: 'Professional Full Stack Developer specializing in React, Next.js, Node.js, and MERN stack. Building scalable web applications with modern technologies.',
  url: 'https://yourdomain.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@yourusername',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isValidLocale = locales.includes(locale as any);
  const currentLocale = isValidLocale ? locale : 'en';

  // Localized metadata
  const metadata = {
    en: {
      title: 'Mohamed Essam | Full Stack Developer & MERN Stack Specialist',
      description: 'Professional Full Stack Developer specializing in React, Next.js, Node.js, and MERN stack. Building scalable web applications with modern technologies.',
    },
    ar: {
      title: 'محمد عصام | مطور Full Stack ومتخصص في MERN Stack',
      description: 'مطور Full Stack محترف متخصص في React و Next.js و Node.js و MERN Stack. أبني تطبيقات ويب قابلة للتطوير باستخدام التقنيات الحديثة.',
    }
  };

  const currentMetadata = metadata[currentLocale as keyof typeof metadata] || metadata.en;

  return {
    title: {
      default: currentMetadata.title,
      template: `%s | ${SITE_CONFIG.name}`
    },
    description: currentMetadata.description,
    keywords: [
      'Full Stack Developer',
      'React Developer',
      'Next.js Developer',
      'MERN Stack',
      'TypeScript',
      'Node.js',
      'Frontend Developer',
      'Web Developer',
      'JavaScript Developer',
      locale === 'ar' ? 'مطور ويب' : '',
      locale === 'ar' ? 'مطور Full Stack' : '',
      locale === 'ar' ? 'مطور React' : '',
    ].filter(Boolean),
    authors: [{ name: 'Mohamed Essam' }],
    creator: 'Mohamed Essam',
    publisher: 'Mohamed Essam',

    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },

    openGraph: {
      type: 'website',
      locale: currentLocale,
      url: SITE_CONFIG.url,
      title: currentMetadata.title,
      description: currentMetadata.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.title,
      description: currentMetadata.description,
      creator: SITE_CONFIG.twitterHandle,
      images: [SITE_CONFIG.ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      // Add your verification codes here
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },

    category: 'technology',
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  const isValidLocale = locales.includes(locale as any);
  const currentLocale = isValidLocale ? locale : 'en';

  // Structured data for better SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohamed Essam',
    jobTitle: 'Full Stack Developer',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    sameAs: [
      'https://github.com/yourusername',
      'https://linkedin.com/in/yourusername',
      'https://twitter.com/yourusername'
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'MERN Stack',
      'Web Development',
      'Frontend Development',
      'Backend Development'
    ],
    knowsLanguage: ['English', 'Arabic'],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Developer',
      description: 'Building modern web applications using React, Next.js, and MERN stack'
    }
  };

  return (
    <html lang={currentLocale} dir={currentLocale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Performance optimizations */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
      </head>

      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LenisProvider>
            <Cursor />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1" id="main-content">
                {children}
              </main>
              <Footer />
              <ScrollToTopButton />
            </div>

            {/* Schema.org markup for organization */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: SITE_CONFIG.name,
                  description: SITE_CONFIG.description,
                  url: SITE_CONFIG.url,
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                  }
                })
              }}
            />
          </LenisProvider>
        </ThemeProvider>

        {/* Performance monitoring script (optional) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR_GA_ID');
            `,
          }}
        />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

// Add viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by layout or page itself
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
};
