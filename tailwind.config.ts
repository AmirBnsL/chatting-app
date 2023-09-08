import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'DeepBlue': '#4A55A2',
        'FajrBlue': '#7895CB',
        'MondayBlue': '#A0BFE0',
        'ClearBlue': '#C5DFF8',
        'mauve': { DEFAULT: '#dabfff', 100: '#250059', 200: '#4a00b1', 300: '#710bff', 400: '#a564ff', 500: '#dabfff', 600: '#e0caff', 700: '#e8d7ff', 800: '#f0e4ff', 900: '#f7f2ff' }, 'tropical_indigo': { DEFAULT: '#907ad6', 100: '#181033', 200: '#302067', 300: '#482f9a', 400: '#6547c6', 500: '#907ad6', 600: '#a695de', 700: '#bcafe7', 800: '#d3caef', 900: '#e9e4f7' }, 
        'ultra_violet': { DEFAULT: '#4f518c', 100: '#10101c', 200: '#202038', 300: '#2f3154', 400: '#3f4170', 500: '#4f518c', 600: '#6a6cab', 700: '#8f91c0', 800: '#b5b6d5', 900: '#dadaea' },
        'space_cadet': { DEFAULT: '#2c2a4a', 100: '#09080f', 200: '#12111e', 300: '#1b192d', 400: '#24223c', 500:'#2c2a4a', 600: '#4a477d', 700: '#6d68aa', 800: '#9d9ac6', 900: '#cecde3' },
        'pale_azure': { DEFAULT: '#7fdeff', 100: '#00394d', 200: '#007399', 300: '#00ace6', 400: '#33ccff', 500: '#7fdeff', 600: '#99e6ff', 700: '#b3ecff', 800: '#ccf2ff', 900: '#e5f9ff' }
      },
      
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to bottom, rgba(87,246,252,1) 0%, rgba(4,213,255,1) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
