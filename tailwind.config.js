/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      extend: {
        gridAutoColumns: {
          '1fr': 'minmax(8rem, 1fr)',
        }
      }
    },
    plugins: [],
  }
}

export default config;