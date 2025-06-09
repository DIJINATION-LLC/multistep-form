/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "../components/**/*.{js,ts,jsx,tsx}",
    "./multistep-form/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": '#012175',
        grey: '#353535',
        'light-black': '#2A2A2A',
      },
    },
  },
  plugins: [],
};
