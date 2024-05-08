import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const lightTheme = createTheme({
  button: {
    textTransform: "none",
    whiteSpace: "nowrap",
    minWidth: "max-content",
  },
  typography: {
    fontFamily: "Inter",
    htmlFontSize: 18,
    h1: {
      fontSize: "4em",
      fontWeight: "500",
      color: "#2d2d2d",
    },
    hero: {
      fontSize: "2em",
      fontWeight: "500",
      color: "#1d1d1d",
      display: "block",
      lineHeight: "1.3em",
    },
    h2: {
      fontSize: "3em",
      fontWeight: "400",
      color: "#2d2d2d",
    },
    h3: {
      fontSize: "2em",
      fontWeight: "500",
      color: "#2d2d2d",
    },
    h4: {
      fontSize: "1.5em",
      fontWeight: "400",
      color: "#2d2d2d",
    },
    h5: {
      fontSize: "1.3em",
      fontWeight: "300",
      color: "#2d2d2d",
    },
    h6: {
      fontSize: "1.1em",
      fontWeight: "500",
      color: "#2d2d2d",
    },
    "form-label": {
      fontSize: "0.9em",
      fontWeight: "600",
      display: "block",
    },
    title: {
      fontSize: "1.05em",
      fontWeight: "600",
      color: "#2d2d2d",
      display: "block",
    },
    label: {
      fontSize: "1.05em",
      fontWeight: "600",
      color: "#2d2d2d",
      display: "block",
    },
    tag: {
      fontSize: "1em",
      fontWeight: "400",
      color: "#000",
      display: "block",
      backgroundColor: "#eee",
      padding: "2px 8px 2px 8px",
      borderRadius: "5px",
    },
    p1: {
      lineHeight: "1.6em",
      fontSize: "0.92em",
      fontWeight: 400,
      color: "#2d2d2d",
      margin: "1em 0em 1em 0em",
      display: "block",
    },
    p: {
      fontSize: "1em",
      margin: "1em 0em 1em 0em",
      display: "block",
    },
    metric: {
      fontSize: "1em",
      fontWeight: 600,
      color: "#2d2d2d",
    },
    metric_value: {
      fontSize: "1.5em",
      fontWeight: 800,
      color: "#2d2d2d",
    },
    subtitle: {
      lineHeight: "1.6em",
      fontSize: "0.90em",
      fontWeight: 400,
      color: "#6d6d6d",
      margin: "1em 0em 1em 0em",
      display: "block",
    },
    disclaimer: {
      fontSize: ".85em",
      fontWeight: "400",
      color: "#4d4d4d",
      display: "block",
      margin: "0px",
    },
    small: {
      fontSize: ".8em",
      fontWeight: "400",
      color: "#5d5d5d",
      display: "block",
      margin: "0px",
    },
    code: {
      fontFamily: "Courier New",
      fontSize: "1em",
      fontWeight: "500",
      color: "#000",
      display: "block",
      margin: "0px",
    },
    small_code: {
      fontFamily: "Courier New",
      fontSize: "0.8em",
      fontWeight: "400",
      color: "#2d2d2d",
      display: "block",
      margin: "0px",
    },
    description: {
      fontSize: ".88em",
      fontWeight: "400",
      color: "#5d5d5d",
      display: "block",
      margin: "0px",
    },
    button: {
      textTransform: "none",
    },
    body: {
      fontSize: "0.8em",
      color: "#888",
    },
  },
  button: {
    textTransform: "none",
    whiteSpace: "nowrap",
    minWidth: "max-content",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // body: {
        //   scrollbarColor: "#6b6b6b #2b2b2b",
        //   "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
        //     backgroundColor: "#2b2b2b",
        //   },
        //   "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
        //     borderRadius: 8,
        //     backgroundColor: "#6b6b6b",
        //     minHeight: 24,
        //     border: "3px solid #2b2b2b",
        //   },
        //   "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
        //     {
        //       backgroundColor: "#959595",
        //     },
        //   "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
        //     {
        //       backgroundColor: "#959595",
        //     },
        //   "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
        //     {
        //       backgroundColor: "#959595",
        //     },
        //   "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
        //     backgroundColor: "#2b2b2b",
        //   },
        // },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fff",
          foregroundColor: "#2d2d2d",
          color: "#2d2d2d",
        },
      },
    },
    MuiPaper: {
      root: {
        padding: "10px",
        marginBottom: "10px",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          whiteSpace: "nowrap",
          minWidth: "max-content",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          width: "100%",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textAlign: "left",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiInputBase-inputSizeSmall": {
            fontSize: "0.9em",
            color: "#1d1d1d",
          },
          ".MuiInputLabel-sizeSmall": {
            fontSize: "0.8em",
            color: "#101010",
          },
          ".MuiInputLabel-shrink": {
            fontSize: "0.8em",
            color: "#1d1d1d",
            fontWeight: "600",
            padding: "2px",
            transform: "translate(12px, -9px) scale(1.0)",
          },
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#3367d6",
    },
    secondary: {
      main: "#2d2d2d",
    },
    error: {
      main: "#f40000",
    },
    // warning: {
    //   // main: '#b78438',
    //   // light: '#6f5026',
    //   // dark: '#f5a937',
    // },
    grey: {
      50: "#eee",
    },
    text: {
      primary: "#333333",
      secondary: "#5d5d5d",
      icon: "#222222",
    },
    background: {
      default: "#ffffff",
    },
  },
  common: {
    black: "#101010",
    white: "#fff",
  },
  background: {
    default: "#fff",
  },
});

// custom for our appbar
lightTheme.shadows[1] = `1px 2px 2px 1px #eaeaea`;
lightTheme.shadows[24] = `1px 1px 1px 0px #eee`;

export default lightTheme;
