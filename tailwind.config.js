/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#121212", // Charcoal/Near-black
                secondary: "#1E1E1E", // Slightly lighter for cards
                accent: {
                    blue: "#3B82F6", // Electric Blue
                    green: "#10B981", // Neon Green
                },
                text: {
                    main: "#FFFFFF",
                    muted: "#9CA3AF",
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Sora', 'sans-serif'],
            },
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    lg: "1200px",
                    xl: "1280px",
                    "2xl": "1400px",
                },
            },
        },
    },
    plugins: [],
}
