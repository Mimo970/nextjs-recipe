/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
// module.exports = {
//   darkMode: "class",
//   purge: {
//     enabled: true,
//     content: [
//       "./components/**/*.{js,ts,jsx,tsx}",
//       "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//   },
//   theme: {
//     typography: (theme) => ({}),
//     extend: {},
//   },
//   variants: {},
//   plugins: [require("@tailwindcss/typography")],
// };
