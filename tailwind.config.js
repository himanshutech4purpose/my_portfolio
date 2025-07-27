/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#ffb3d9',
        'soft-pink': '#ffb3d9',
        'soft-purple': '#dda0dd',
        'soft-blue': '#add8e6',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'title': ['Brush Script MT', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'petal': 'petal 10s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        petal: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
} 