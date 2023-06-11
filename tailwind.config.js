/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#242528',
        secondary: '#f6f6f6',
        tertiary: '#fe7925',
        neon: '#fe7925',
        pink: '#ff385c',
      },
    },
  },
  plugins: [],
}
