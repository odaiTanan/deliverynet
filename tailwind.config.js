/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tab: { max: "850px" },
      mobile: { max: "450px" },
    },
    extend: {
      colors: {
        main: "   rgb(37 99 235 )",
      },

      animationDuration: {
        "300ms": "300ms",
        "900ms": "900ms",
      },

      backgroundImage: {
        landing: "url('src/assets/header_img.png')",
      },
      boxShadow: {
        btn: "inset 0px 0px 6px 0px #0000008a",
        form: "0 0 20px 0px #00000047",
      },
      borderRadius: {
        circle: "50%",
        halfcircle: "40%",
      },
      fontFamily: {
        font: "Rubik,sans-serif",
        font2: "Work Sans, sans-serif",
      },
    },
  },
  plugins: [],
};
