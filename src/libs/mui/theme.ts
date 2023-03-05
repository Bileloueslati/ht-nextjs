import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
      fontSize: 40,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },

    caption: {
      fontWeight: 400,
    },

    allVariants: {
      fontFamily: "Poppins",
      fontWeight: 300,
      color: "#545454",
    },
  },
  palette: {
    primary: {
      main: "#5BB7E1",
    },
    secondary: {
      main: "#545454",
    },

    common: {
      black: "#222",
      white: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fff",
        },
        root: {
          fontFamily: "poppins",
          fontWeight: 500,
          borderRadius: 25,
        },
      },
    },
  },
});

export default theme;
