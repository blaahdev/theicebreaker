import { createTheme } from "@mui/material";
import BobbyJonesSoftRegular from "./assets/font/Bobby-Jones-Soft-Regular.woff";

const theme = createTheme({
  typography: {
    fontFamily: "BobbyJonesSoftRegular, Arial",
    // fontSize: 5, //12,
    // h1: {
    //   fontSize: "1.5rem", // Default font size
    //   // Use breakpoints for responsive font size
    //   [theme.breakpoints.down("sm")]: {
    //     fontSize: "1rem", // Smaller font size on mobile (screen width < 600px)
    //   },
    // },
    // body1: {
    //   fontSize: "1.5rem",
    // },
  },
  palette: {
    background: {
      default: "#fde8d9",
    },
    primary: {
      main: "#37c2bf",
    },
    secondary: {
      main: "#fa755c",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'BobbyJonesSoftRegular';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(${BobbyJonesSoftRegular}) format('woff');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem", // This specifically targets button font size if needed
          // padding: "10px 100px",
          // borderRadius: "100vw",
        },
      },
    },
  },
});

export default theme;
