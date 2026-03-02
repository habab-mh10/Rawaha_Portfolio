/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ya 'media' agar system preference chahiye
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          hover: "var(--accent-hover)",
        },
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)",
        },
        muted: "var(--muted)",
      },

      boxShadow: {
        soft: "var(--shadow-soft)",
        float: "var(--shadow-float)",
        depth: "var(--shadow-depth)",
      },

      backgroundImage: {
        app: "var(--bg-gradient)",
      },

      backdropBlur: {
        glass: "var(--glass-blur)",
      },

      backgroundColor: {
        glass: "var(--glass-bg)",
        neo: "var(--neo-bg)",
      },

      borderColor: {
        glass: "var(--glass-border)",
        card: "var(--card-border)",
      },

      dropShadow: {
        neo: "var(--neo-shadow)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
      },
      screens: {
        sm2: "480px",
        lg2: "992px",
      },
      transitionProperty: {
        border: "border-color",
      },
      keyframes: {
        bigPing: {
          from: {
            transform: "scale(1)",
            opacity: "1",
            borderRadius: "9999px",
          },
          to: { transform: "scale(5)", opacity: "0", borderRadius: "0px" },
        },
      },
      animation: {
        bigPing: "bigPing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
