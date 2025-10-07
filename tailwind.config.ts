import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        light: '#ffffff',
        accent: '#e50914',
        secondary: '#22d3ee',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
export default config


