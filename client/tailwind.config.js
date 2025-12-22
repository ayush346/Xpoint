/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#e0f2fe",
					100: "#bae6fd",
					200: "#7dd3fc",
					300: "#38bdf8",
					400: "#0ea5e9",
					500: "#0284c7",
					600: "#0369a1",
					700: "#075985",
					800: "#0b4a6f",
					900: "#0f3a56"
				},
				ink: "#0b132b",
				surface: "#ffffff",
				midnight: "#0b132b",
				soft: "#f1f5f9"
			},
			boxShadow: {
				glow: "0 10px 30px rgba(14, 165, 233, 0.25)",
				card: "0 10px 20px rgba(2, 132, 199, 0.15)"
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"]
			}
		}
	},
	plugins: []
};






