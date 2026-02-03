/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        muted: "#5B6472",
        line: "#E9E9E4",
        paper: "#FAFAF7",
        navy: "#1E3A8A",
        teal: "#0F766E",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(11, 18, 32, 0.08)",
        card: "0 16px 60px rgba(11, 18, 32, 0.10)",
      },
    },
  },
  plugins: [],
};

