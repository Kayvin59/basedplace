import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        primary: ["var(--font-merriweather)"],
        secondary: ["var(--font-abril-fatface)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Map colors 
        crimson: "hsl(var(--crimson))",
        orange: "hsl(var(--orange))",
        amber: "hsl(var(--amber))",
        yellow: "hsl(var(--yellow))",
        green: "hsl(var(--green))",
        light_green: "hsl(var(--light-green))",
        deep_aqua: "hsl(var(--deep-aqua))",
        sky_blue: "hsl(var(--sky-blue))",
        indigo: "hsl(var(--indigo))",
        cerulean: "hsl(var(--cerulean))",
        egg_blue: "hsl(var(--egg-blue))",
        purple: "hsl(var(--purple))",
        electric_purple: "hsl(var(--electric-purple))",
        magenta: "hsl(var(--magenta))",
        lavender: "hsl(var(--lavender))",
        hot_pink: "hsl(var(--hot-pink))",
        pink: "hsl(var(--pink))",
        brown: "hsl(var(--brown))",
        saddle_brown: "hsl(var(--saddle-brown))",
        black: "hsl(var(--black))",
        silver: "hsl(var(--silver))",
        light_gray: "hsl(var(--light-gray))",
        white: "hsl(var(--white))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        '250': '250px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config