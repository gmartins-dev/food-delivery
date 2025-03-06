import type { Config } from "tailwindcss";
import { colors, typography, spacing, radius, elevation } from "./src/lib/pie-tokens";

const config: Config = {
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
  		colors: {
  			...colors,
  			// Map the PIE colors to Tailwind's expected format
  			border: colors.border,
  			input: colors.border,
  			ring: colors.primary[200],
  			background: colors.background,
  			foreground: colors.foreground,
  			primary: {
  				DEFAULT: colors.primary.DEFAULT,
  				foreground: colors.primary.foreground,
  				...colors.primary
  			},
  			secondary: {
  				DEFAULT: colors.neutral[500],
  				foreground: colors.background,
  			},
  			destructive: {
  				DEFAULT: colors.error.DEFAULT,
  				foreground: colors.error.foreground,
  			},
  			muted: {
  				DEFAULT: colors.muted,
  				foreground: colors.neutral[500],
  			},
  			accent: {
  				DEFAULT: colors.accent.DEFAULT,
  				foreground: colors.accent.foreground,
  			},
  			popover: {
  				DEFAULT: colors.background,
  				foreground: colors.foreground,
  			},
  			card: {
  				DEFAULT: colors.card,
  				foreground: colors.foreground,
  			},
  		},
  		fontFamily: {
  			sans: typography.fontFamily.sans,
  			mono: typography.fontFamily.mono,
  		},
  		fontSize: typography.fontSize,
  		fontWeight: typography.fontWeight,
  		lineHeight: typography.lineHeight,
  		spacing,
  		borderRadius: {
  			lg: radius.lg,
  			md: radius.md,
  			sm: radius.sm,
  			xl: radius.xl,
  			'2xl': radius['2xl'],
  			full: radius.full,
  		},
  		boxShadow: {
  			sm: elevation.sm,
  			DEFAULT: elevation.md,
  			md: elevation.md,
  			lg: elevation.lg,
  			xl: elevation.xl,
  			'2xl': elevation['2xl'],
  			none: elevation.none,
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
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
