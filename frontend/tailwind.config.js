/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
// ...
'node_modules/flowbite-react/lib/esm/**/*.js'],
darkMode: 'class',  
theme: {
    extend: {
      animation: {
        // adjust speed according to your need
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-200%)' },
        }
      }
      
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    }
  },
  container: {
    center: true,
    padding: {
      DEFAULT: "1rem",
      sm: "3rem",
    },
  },
  animation: {
    "spin-slow": "spin 40s linear infinite",
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

// tailwind.config = {
//   darkMode: 'class',
//   theme: {
//     extend: {}
//   }
// }

