/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agriGreen: {
          900: "#0D1F17",
          800: "#1E3A2B",
          700: "#2D5A40",
          600: "#3D7A56",
          500: "#10B981", // Emerald
          100: "#E6F4ED",
          50: "#F0FDF4",
        },
        agriGold: {
          600: "#D97706",
          500: "#F59E0B",
          100: "#FEF3C7",
        },
        agriBg: "#F4F7F4",
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
