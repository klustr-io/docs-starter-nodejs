import { CacheProvider, ThemeProvider } from "@emotion/react";
import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./app";
import createEmotionCache from "./cache";

import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import lightTheme from "./themes/light";
import { handleSignIn } from "./middleware/auth";

const cache = createEmotionCache();

function Main() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    handleSignIn()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <CacheProvider value={cache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <App user={user} />
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");

hydrateRoot(rootElement, <Main />);
