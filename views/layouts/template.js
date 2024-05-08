import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import * as React from "react";

import { ThemeProvider } from "@emotion/react";
import lightTheme from "../../src/main/themes/light";
import darkTheme from "../../src/main/themes/dark";
import { getDefaultUserTheme, setDefaultUserTheme } from "../mixin";

export default function AppTemplate(Component) {

  const switchTheme = () => {
    let current = getDefaultUserTheme();
    if (current == "light") {
      current = "dark";
    } else {
      current = "light";
    }
    setDefaultUserTheme(current);
    setTheme(getThemeByName(current));
  };

  const getThemeByName = (name) => {
    if (name == "dark") {
      return darkTheme;
    } else {
      return lightTheme;
    }
  };

  const applyCurrentTheme = () => {
    let activeTheme = getDefaultUserTheme();
    return getThemeByName(activeTheme);
  };

  const [theme, setTheme] = React.useState(applyCurrentTheme());

  React.useEffect(() => {
    document.addEventListener("switchTheme", switchTheme, true);
    setTheme(applyCurrentTheme());

    // cleanup method
    return () => {
      document.removeEventListener("switchTheme", switchTheme, true);
    };
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
          {Component}
    </ThemeProvider>
  );
}
