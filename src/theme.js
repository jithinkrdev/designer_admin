import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009966", // Green shade from screenshot
    },
    background: {
      default: "#eafff2", // Light green background
      paper: "#fff",
    },
    text: {
      primary: "#222",
      secondary: "#009966",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
      color: "#009966",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#009966",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
