/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      border: {
        "border-width": "1px",
        "border-style": "solid",
        "border-color": "black"
      }
    },
    theme: {
      linearGradientDirections: {
        // defaults to these values
        t: "to top",
        tr: "to top right",
        r: "to right",
        br: "to bottom right",
        b: "to bottom",
        bl: "to bottom left",
        l: "to left",
        tl: "to top left"
      },
      colors: {
        gold: "#ad966c",
        lightgold: "#f4eacf",
        gold: "#ad966c"
      },
      // linearGradientColors: (theme) => theme("colors"),
      // radialGradientColors: (theme) => theme("colors"),
      // conicGradientColors: (theme) => theme("colors")

      linearGradientColors: {
        "gold-w-gold": ["#ad966c", "#f4eacf", "#ad966c"]
      }
    },
    plugins: [
      require("tailwindcss-debug-screens"),
      require("tailwindcss-gradients")
    ]
  }
}
