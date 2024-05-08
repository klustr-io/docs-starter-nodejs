import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";

import lightTheme from "../../src/main/themes/light";

export default function FocusTemplate(Component) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {Component}
    </ThemeProvider>
  );
}
