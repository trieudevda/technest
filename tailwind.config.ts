import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    // "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        color1: "rgb(var(--dark),.75)", //xám 
        color2: "rgb(var(--dark))", //xám 
        color3: "rgba(255,190,11)",
        color4: "rgb(var(--vz-warning-rgb))",
        color5: "#fff5da",
      },
      width:{
        '30px': "30px",
        '60px': "60px",
        '80px': "80px",
      },
      maxHeight: {
        // '20%': '20%',
        '70%': '70%',
        '80%': '80%',
      },
      minHeight: {
        '10%': '10%',
        '70%': '70%',
        // '80%': '80%',
      },
      top:{
        '0':'opx',
      }
    },
  },
  plugins: [],
} satisfies Config;
