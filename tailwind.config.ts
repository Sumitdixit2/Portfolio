import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A192F',       /* Deep Navy Blueprint Foundation */
        surface: '#112240',          /* Slightly elevated navy */
        border: 'rgba(100, 150, 255, 0.15)', /* Blueprint Blue lines */
        foreground: '#E6F1FF',       /* Soft technical white */
        muted: '#8892B0',            /* Muted navy-gray for prose */
        accent: '#64FFDA',           /* Restrained technical accent */
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)'],
        mono: ['var(--font-fira-code)'],
      },
      backgroundImage: {
        'blueprint-grid': `
          linear-gradient(rgba(100, 150, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 150, 255, 0.05) 1px, transparent 1px)
        `,
      },
    },
  },
  plugins: [],
};

export default config;
