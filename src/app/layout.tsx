import type { Metadata } from 'next';
import { Space_Grotesk, Fira_Code } from 'next/font/google';
import './globals.css';
import { MotionLayers } from '@/components/ui/motion-layers';
import { FloatingNav } from '@/components/ui/floating-nav';
import { CommandMenu } from '@/components/ui/command-menu';
import { BackgroundAudio } from '@/components/ui/background-audio';
import { JsonLd } from '@/components/json-ld';


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.timus.co.in'),
  title: {
    default: 'Sumit Dixit | Backend Developer & DevOps Engineer',
    template: '%s | Sumit Dixit',
  },
  description:
    'Portfolio of Sumit Dixit — Backend Developer & DevOps Engineer specializing in Node.js, Express, PostgreSQL, Docker, and scalable system architecture.',
  keywords: [
    'Sumit Dixit',
    'backend developer',
    'DevOps engineer',
    'Node.js developer',
    'Express.js',
    'PostgreSQL',
    'Docker',
    'system architecture',
    'portfolio',
    'full-stack developer',
    'React',
    'Next.js',
    'TypeScript',
    'Redis',
    'Nginx',
    'GitHub Actions',
  ],
  authors: [{ name: 'Sumit Dixit', url: 'https://github.com/Sumitdixit2' }],
  creator: 'Sumit Dixit',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.timus.co.in',
    title: 'Sumit Dixit | Backend Developer & DevOps Engineer',
    description:
      'Architecting robust, scalable systems built to last. Explore projects, skills, and system designs.',
    siteName: 'Sumit Dixit Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumit Dixit | Backend Developer & DevOps Engineer',
    description:
      'Architecting robust, scalable systems built to last. Explore projects, skills, and system designs.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} font-sans antialiased bg-background text-foreground relative`}
      >
        {/* JSON-LD Structured Data — injected server-side for rich snippets */}
        <JsonLd />

        {/* Absolute vertical alignment guides (left and right margins) */}
        <div className="fixed inset-y-0 left-8 md:left-24 w-px bg-border pointer-events-none z-0 hidden sm:block" />
        <div className="fixed inset-y-0 right-8 md:right-24 w-px bg-border pointer-events-none z-0 hidden sm:block" />

        <div className="relative z-10">
          <MotionLayers />
          <FloatingNav />
          <CommandMenu />
          <BackgroundAudio />
          {children}
        </div>
      </body>
    </html>
  );
}
