import type { Metadata } from 'next';
import { Space_Grotesk, Fira_Code } from 'next/font/google';
import './globals.css';
import { MotionLayers } from '@/components/ui/motion-layers';
import { FloatingNav } from '@/components/ui/floating-nav';
import { CommandMenu } from '@/components/ui/command-menu';


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
  title: 'Sumit Dixit | Systems Architect',
  description: 'Backend Developer & DevOps Engineer. Technical portfolio and architecture schematics.',
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
        {/* Absolute vertical alignment guides (left and right margins) */}
        <div className="fixed inset-y-0 left-8 md:left-24 w-px bg-border pointer-events-none z-0 hidden sm:block" />
        <div className="fixed inset-y-0 right-8 md:right-24 w-px bg-border pointer-events-none z-0 hidden sm:block" />
        
        <div className="relative z-10">
          <MotionLayers />
          <FloatingNav />
          <CommandMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
