/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Adjust paths according to your project structure
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily : {
        sans: ['Poppins', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
        PoppinsBold: ['Poppins-Bold', 'sans-serif'],
        PoppinsMedium: ['Poppins-Medium', 'sans-serif'],
        PoppinsRegular: ['Poppins-Regular', 'sans-serif'],
        PoppinsSemiBold: ['Poppins-SemiBold', 'sans-serif'],
        PoppinsThin: ['Poppins-Thin', 'sans-serif'],
        PoppinsExtraBold: ['Poppins-ExtraBold', 'sans-serif'],
        PoppinsExtraLight: ['Poppins-ExtraLight', 'sans-serif'],
        PoppinsLight: ['Poppins-Light', 'sans-serif'],
        PoppinsBlack: ['Poppins-Black', 'sans-serif'],
      },
      colors: {
        primary: {
          100: "#FFE9EA", // Very light shade, for backgrounds or highlights
          200: "#FFC9CB", // Light shade, for hover effects
          300: "#FFA9AC", // Medium-light shade, for secondary buttons
          400: "#FF5A5F", // Original color, for primary buttons and calls to action
          500: "#E14E52", // Slightly darker shade, for active states or outlines
          600: "#C14245", // Dark shade, for headings or stronger accents
          700: "#A13638", // Even darker shade, for contrast
          800: "#822A2C", // Deep shade, for shadows or overlays
          900: "#661E20", // Very dark shade, for text or deep accents
        },
        secondary: {
          100: "#E0E0FF",  // Lightest variant
          200: "#B3B3FF",  // Light variant
          300: "#8080FF",  // Light-medium variant
          400: "#5A5FFF",  // Base color (main color)
          500: "#4A4AE6",  // Slightly darker variant
          600: "#3A3AD1",  // Dark variant
          700: "#2A2A9C",  // Darker variant
          800: "#1A1A66",  // Even darker variant
          900: "#0A0A33",  // Darkest variant
        },
        success: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#38A169",
          600: "#2F855A",
          700: "#276749",
          800: "#22543D",
          900: "#1C4532",
        },
        danger: {
          100: "#FFF5F5",
          200: "#FED7D7",
          300: "#FEB2B2",
          400: "#FC8181",
          500: "#F56565",
          600: "#E53E3E",
          700: "#C53030",
          800: "#9B2C2C",
          900: "#742A2A",
        },
        warning: {
          100: "#FFFBEB",
          200: "#FEF3C7",
          300: "#FDE68A",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
        },
        general: {
          100: "#CED1DD",
          200: "#858585",
          300: "#EEEEEE",
          400: "#0CC25F",
          500: "#F6F8FA",
          600: "#E6F3FF",
          700: "#EBEBEB",
          800: "#ADADAD",
        },
        // Listing Status Colors
        active: {
          100: "#CBEE56",
          200: "#6C890B",
        },
        inactive: {
          100: "#FC8181",
          200: "#A58315",
        },
        draft: {
          100: "#C9C9C9",
          200: "#6D6D6D",
        },
        sold: {
          100: "#6DB2F2",
          200: "#1D64A7",
        },
      },
    },
  },
  plugins: [],
}