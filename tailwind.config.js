module.exports = {
  purge: ["./src/pages/**/*.js", "./src/components/**/*.js"],

  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        display: ["Poppins"],
      },
      colors: {
        coco: {
          normal: "#948E68",
          brigth: "#DDA619",
        },
        primary: {
          dark: "#125C13",
          normal: "#3E7C17",
          light: "#F4A442",
          white: "#FEFDF9",
          lesswhite: "#F0EEE7",
          coco: "#F4A442",
          darkcoco: "#E39A40",
          krem: "#F7F3E7",
          red: "#FF0000",
          redlight: "#FF4C4C",
        },
        green: {
          normal: "#339710",
        },
      },
      maxHeight: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
      width: {
        128: "32rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
