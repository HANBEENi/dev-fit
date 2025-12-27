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
        dark: '#0f0a1f',
        card: '#1a1330',
        inner: '#231a3d',
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-20px, -20px) rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
