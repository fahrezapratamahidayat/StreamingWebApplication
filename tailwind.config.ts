import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        inter : ['var(--font-inter)'],
        moul: ['var(--font-moul)'],
        monstserrat: ['var(--font-montserrat)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '13': 'repeat(13, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      screens: {
        '90-zoom' : "1777px",
        "80-zoom" : "2000px",
        "75-zoom" : "2133px",
        "67-zoom" : "2400px",
        "50-zoom" : "3200px",
        "33-zoom" : "4800px",
        "25-zoom" : "6400px",
      },
    },
  },
  plugins: [
    
  ],
}
export default config
