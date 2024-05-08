import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import darkTheme from "../../src/main/themes/dark";
import lightTheme from "../../src/main/themes/light";
import { getDefaultUserTheme } from "../mixin";

export default function AuthTemplate(Component) {
  const [theme, setTheme] = React.useState(lightTheme);

  const getThemeByName = (name) => {
    if (name == "dark") {
      return darkTheme;
    } else {
      return lightTheme;
    }
  };

  const getTheme = () => {
    let activeTheme = getDefaultUserTheme();
    return getThemeByName(activeTheme);
  };

  React.useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {Component}
    </ThemeProvider>
  );
}
