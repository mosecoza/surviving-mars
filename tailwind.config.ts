import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  layer: {
    // Define a custom layer for your theme classes
    'mars-theme': {
      // Add your custom classes and any overrides here
      'font-mars': 'mars-font', // Define the font class within the layer
    },
  },
  theme: {
    extend: {
      fontFamily: {
        'mars': ['Roboto', 'sans-serif'], // Replace with your desired font family
      },
      fontSize: {
        'base': ['16px', '1.6'], // Adjust base font size and line-height
      },
    },
  },
  plugins: [],
};
export default config;
