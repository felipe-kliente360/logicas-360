/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Os tokens reais vivem em CSS variables (ver src/ds/tokens.css e themes.css).
      // Aqui só expomos atalhos que leem dessas variables, pra trocar tema por fase.
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        card: "var(--card)",
        card2: "var(--card2)",
        line: "var(--line)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        "ink-faint": "var(--ink-faint)",
        glow: "var(--glow)",
      },
      borderRadius: {
        ds: "var(--radius)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
