/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            primary: '#0FC8A9',
            secondary: '#EA7022'
         }
      },
      fontFamily: {
         sans: ['Inter', 'sans-serif']
      },
      container: {
         center: true,
         padding: '2rem'
      }
   },
   plugins: []
};
