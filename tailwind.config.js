module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "128/85": "128 / 85",
        "128/70": "128 / 70",
        "128/55": "128 / 55",
        // "650/459": "650 / 459",
      },
      boxShadow: {
        "preview": "0 4px 30px rgba(0, 0, 0, 0.1)"
      }
      // backgroundImage: {
      //   "night-3": "url('/images/night_3.jpg')"
      // }
    },
    fontFamily: {
      "mokoto-0": ['mokoto-0', 'sans-serif'],
      "mokoto": ['mokoto-1', 'sans-serif'],
      "mokoto-2": ['mokoto-2', 'sans-serif'],
      "mokoto-3": ['mokoto-3', 'sans-serif'],
      "anxiety": ['Anxiety', 'sans-serif'],
      "modern-sans": ['Moderne Sans', 'sans-serif'],
      "product-sans": ['Product Sans', 'sans-serif'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ],
}
