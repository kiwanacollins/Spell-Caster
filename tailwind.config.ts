import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ancient mystical color palette
        parchment: {
          50: "#faf8f3",
          100: "#f5f1e6",
          200: "#ebe3cd",
          300: "#dfd0a8",
          400: "#d1b97f",
          500: "#c4a563",
          600: "#b89357",
          700: "#997a49",
          800: "#7c6340",
          900: "#655136",
        },
        ink: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#1a1a1a",
          950: "#0a0a0a",
        },
        mystical: {
          purple: "#4a1f5e",
          deepPurple: "#2d1240",
          gold: "#d4af37",
          bronze: "#cd7f32",
          amber: "#ffbf00",
          moonstone: "#e8f4f8",
          amethyst: "#9966cc",
          obsidian: "#1c1c1e",
        },
        ritual: {
          candle: "#ffcf87",
          flame: "#ff6b35",
          smoke: "#b8b8b8",
          crystal: "#e0f2ff",
          rune: "#8b7355",
        },
        energy: {
          low: "#8b4513",
          medium: "#d4af37",
          high: "#ffd700",
          aligned: "#9966cc",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        // Ancient mystical fonts
        gothic: ["var(--font-unifraktur)", "serif"],
        serif: ["var(--font-crimson)", "Georgia", "serif"],
        garamond: ["var(--font-garamond)", "Georgia", "serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        // Ancient measurements inspired by historical units
        ritual: "3.5rem", // ~56px, inspired by ritual circle dimensions
        scroll: "6rem", // ~96px, scroll length
        grimoire: "8.5rem", // ~136px, grimoire width
        altar: "12rem", // ~192px, altar spacing
        tome: "16rem", // ~256px, large tome height
      },
      fontSize: {
        "rune-sm": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.05em" }],
        rune: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.05em" }],
        "rune-lg": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.05em" }],
        spell: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0.025em" }],
        incantation: [
          "1.5rem",
          { lineHeight: "2rem", letterSpacing: "0.025em" },
        ],
        prophecy: ["2rem", { lineHeight: "2.5rem", letterSpacing: "0.015em" }],
        ancient: [
          "3rem",
          { lineHeight: "3.5rem", letterSpacing: "0.01em", fontWeight: "700" },
        ],
      },
      borderRadius: {
        ritual: "0.25rem",
        scroll: "0.5rem",
        grimoire: "0.75rem",
        tome: "1rem",
      },
      boxShadow: {
        parchment: "0 2px 8px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)",
        "parchment-hover":
          "0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1)",
        candle: "0 0 20px rgba(255, 207, 135, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)",
        glow: "0 0 15px rgba(153, 102, 204, 0.5), 0 0 30px rgba(153, 102, 204, 0.3)",
        crystal: "0 0 25px rgba(224, 242, 255, 0.6), 0 0 50px rgba(224, 242, 255, 0.4)",
        obsidian: "0 4px 20px rgba(0, 0, 0, 0.5), 0 8px 40px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "flicker-slow": "flicker 4s ease-in-out infinite",
        flicker: "flicker 2s ease-in-out infinite",
        "flicker-fast": "flicker 1s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "float-fast": "float 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "smoke-rise": "smoke-rise 10s ease-out infinite",
        "rune-pulse": "rune-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        glow: {
          "0%, 100%": {
            opacity: "1",
            filter: "brightness(1) drop-shadow(0 0 15px rgba(153, 102, 204, 0.5))",
          },
          "50%": {
            opacity: "0.9",
            filter: "brightness(1.2) drop-shadow(0 0 25px rgba(153, 102, 204, 0.7))",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "smoke-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-100px) scale(1.5)", opacity: "0" },
        },
        "rune-pulse": {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
        },
      },
      backdropBlur: {
        mystic: "8px",
      },
      backgroundImage: {
        "parchment-texture": "url('/textures/parchment.webp')",
        "leather-texture": "url('/textures/leather.webp')",
        "stone-texture": "url('/textures/stone.webp')",
        "ancient-gradient":
          "linear-gradient(135deg, #4a1f5e 0%, #2d1240 50%, #1c1c1e 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #d4af37 0%, #ffbf00 50%, #cd7f32 100%)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
