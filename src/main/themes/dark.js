import { createTheme } from "@mui/material/styles";

const colors = {
  background: "#111",
  font: {
    hero: "#fefefe",
    body: "#fefefe",
  },
};

// Create a theme instance.
const darkTheme = createTheme({
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
      color: colors.font.hero,
    },
    hero: {
      fontSize: "2em",
      fontWeight: "500",
      color: colors.font.hero,
      display: "block",
      lineHeight: "1.3em",
    },
    h2: {
      fontSize: "3em",
      fontWeight: "400"
    },
    h3: {
      fontSize: "2em",
      fontWeight: "500"
    },
    h4: {
      fontSize: "1.5em",
      fontWeight: "400"
    },
    h5: {
      fontSize: "1.3em",
      fontWeight: "300"
    },
    h6: {
      fontSize: "1.1em",
      fontWeight: "500"
    },
    "form-label": {
      fontSize: "0.9em",
      fontWeight: "600",
      display: "block",
    },
    title: {
      fontSize: "1.05em",
      fontWeight: "600",
      display: "block",
    },
    label: {
      fontSize: "1.05em",
      fontWeight: "600",
      display: "block",
      color: "#9af7d3",
    },
    tag: {
      fontSize: "1em",
      fontWeight: "400",
      display: "block",
      padding: "2px 8px 2px 8px",
      borderRadius: "5px",
    },
    p1: {
      lineHeight: "1.6em",
      fontSize: "0.92em",
      fontWeight: 400,
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
    },
    metric_value: {
      fontSize: "1.5em",
      fontWeight: 800,
    },
    subtitle: {
      lineHeight: "1.6em",
      fontSize: "0.90em",
      fontWeight: 400,
      margin: "1em 0em 1em 0em",
      display: "block",
    },
    disclaimer: {
      fontSize: ".85em",
      fontWeight: "400",
      display: "block",
      margin: "0px",
    },
    small: {
      fontSize: ".9em",
      fontWeight: "400",
      display: "block",
      margin: 0,
      marginBottom: 1,
    },
    code: {
      fontFamily: "Courier New",
      fontSize: "1em",
      fontWeight: "500",
      color: "#eee",

      display: "block",
      margin: "0px",
    },
    small_code: {
      fontFamily: "Courier New",
      fontSize: "0.9em",
      fontWeight: "400",
      display: "block",
      margin: "0px",
    },
    description: {
      fontSize: ".88em",
      fontWeight: "400",
      display: "block",
      margin: "0px",
    },
    button: {
      textTransform: "none",
    },
    body: {
      fontSize: "1em",
      color: colors.font.body,
    },
  },
  button: {
    textTransform: "none",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          main: "#000",
          backgroundColor: "#000",
          foregroundColor: "#fff",
          color: "#000",
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
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          ".MuiInputBase": {
            color: "#F1F1F9",
          },
          ".MuiInputLabel": {
            color: "#9BBDB0",
          },
          "& fieldset": {
            borderColor: "#9BBDB0",
          },
          "&:hover": {
            borderColor: "#9BBDB0",
          },
          "&.Mui-focused": {
            borderColor: "#9BBDB0",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiInputBase-inputSizeSmall": {
            fontSize: "0.9em",
            color: "#F1F1F9",
          },
          ".MuiInputLabel-sizeSmall": {
            fontSize: "0.8em",
            color: "#9BBDB0",
          },
          ".MuiInputLabel-shrink": {
            fontSize: "0.8em",
            color: "#9BBDB0",
            fontWeight: "600",
            padding: "2px",
            transform: "translate(12px, -9px) scale(1.0)",
          },
          /* line */
          // "& fieldset": {
          //   borderColor: "#9BBDB0",
          // },
          "&:hover": {
            borderColor: "#9BBDB0",
          },
          "&.Mui-focused": {
            borderColor: "#9BBDB0",
          },
        },
      },
    },
  },
  /* theme.palette.grey */
  palette: {
    mode: "dark",
    primary: {
      main: "#9af7d3",
      light: "#c8e4d8",
      contrastText: "#024838",
    },
    secondary: {
      main: "#5CB391", // 9af7d3
      light: "#c8e4d8",
      contrastText: "#024838",
    },
    text: {
      primary: "#e8e8e8",
      secondary: "#f1f1f1",
      disabled: "#71aaa0",
      hint: "#ecebf1",
    },
    divider: "rgba(59,59,59,0.27)",
    grey: {
      50: "#000",
    },
    // text: {
    //   primary: "#F4F4F4",
    //   secondary: "#8D8DDF",
    //   icon: "#000",
    // },
    background: {
      default: colors.background,
    },
  },
});

// custom for our appbar
// darkTheme.shadows[1] = `1px 2px 2px 1px #eaeaea`;
// darkTheme.shadows[24] = `1px 1px 1px 0px #eee`;

export default darkTheme;
