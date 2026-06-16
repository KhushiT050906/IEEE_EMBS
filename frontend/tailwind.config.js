/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F6E56',
          dark: '#0A4D3C',
          light: '#E6F1EE',
        },
        danger: {
          DEFAULT: '#E24B4A',
          light: '#FCEBEB',
        },
        surface: '#F7F8FA',
        clinical: {
          gray: '#6B7280',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'clinical': '0 1px 4px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'clinical': '12px',
        'clinical-sm': '6px',
      }
    },
  },
  plugins: [],
}
