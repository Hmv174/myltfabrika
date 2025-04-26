module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        bg: '#fff5f0',       // фон
        primary: '#00bfff',   // голубой
        mint: '#98ff98',      // мятный
        highlight: '#ffd700'  // желтый акцент
      },
      fontFamily: {
        cartoon: ['Comic Neue', 'sans-serif'] // пример кастомного мультяшного шрифта
      }
    }
  },
  plugins: []
};