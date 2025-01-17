/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
        background: '#1B1E23',
        surface: '#262A34',
        textPrimary: '#FFFFFF',
        textSecondary: '#B0BEC5',
        error: '#FF5252',
        inputBackground: '#2C303A',
        inputText: '#FFFFFF',
        inputPlaceholder: '#9E9E9E',
      },
    },
  },
  plugins: [],
};
