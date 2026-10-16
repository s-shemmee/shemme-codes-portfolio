import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['var(--font-poppins)', 'sans-serif'],
      serif: ['var(--font-jura)', 'serif'],
    },
    extend: {
      colors: {
        bgLight: '#f7fafc',
        bgDark: '#111827',
        bluebell: '#6A71FA',
        lavenderRose: '#B98BF9',
        softLilac: '#E0D0F2',
        bluebellText: '#4F56E8',
        bluebellTextDark: '#8B90FC',
        lavenderRoseText: '#8B4FE0',
      },
      maxWidth: {
        custom: '1070px',
      },
    },
  },
  plugins: [],
};

export default config;
