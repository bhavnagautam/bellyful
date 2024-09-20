/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  safelist: [
    'bg-[#4CD47B]',
    'text-white',
    'border-none',
    // Add any other dynamic classes you use here
  ],
  theme: {
    extend: {
      backgroundImage: {
        'household-cleaners-gradient': 'linear-gradient(to bottom, #EEEDFF, #9D95FF)',
        'grocery-gradient': 'linear-gradient(to bottom, #DFFFC0, #6CBD44)',
      },
      boxShadow: {
        'custom': '0px 1px 9px 0px rgba(0, 0, 0, 0.25)', 
      },
    }
  },
  plugins: [],
}
