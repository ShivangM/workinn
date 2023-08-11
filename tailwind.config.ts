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
        brand: '#2EC4B6',
        primary: '#FF9F1C',
        secondary: '#FFBF69',
        tertiary: '#CBF3F0',
        light: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
