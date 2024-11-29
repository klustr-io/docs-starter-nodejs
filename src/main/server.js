import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { CssBaseline } from "@mui/material";
import express from "express";
import * as React from "react";
import { AuthProvider } from "react-auth-verification-context";
import ReactDOM from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./app";
import createEmotionCache from "./cache";
import Passport from "./passport";
import lightTheme from "./themes/light";
import uuid4 from "uuid4";

const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

function renderFullPage(html, css) {

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>

        <title>Demo App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">

        <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
        
        <meta name="emotion-insertion-point" content="" />
        ${css}
      </head>
      <body>
        <script async src="/build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const staticContext = {};

  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);


  // Render the component to a string.
  const html = ReactDOM.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <StaticRouter location={req.url}>
          <AuthProvider>
            <App user={req.user} />
          </AuthProvider>
        </StaticRouter>
      </ThemeProvider>
    </CacheProvider>
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  if (req.path == '/' && req.user == null) {
    res.redirect('/login');
    return;
  }
  if (req.query.logout) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
    return;
  }


  // Send the rendered page back to the client.
  res.status(staticContext.statusCode || 200);
  res.send(renderFullPage(html, emotionCss));
  res.end();
}

const app = express();

/**
 * Intgerate passport OIDC client.
 */
Passport(app);

/**
 * Host images and static files.
 */
app.use("/public", express.static("public"));
app.use("/build", express.static("build"));
app.use(express.static("build"));

/**
 * Check if user is signed in.
 */
const router = express.Router();
router.get("/whoami", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(403);
  }
});

/**
 * Sign a user out.
 */
router.get("/logout", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.send({});
    });
  } else {
    res.sendStatus(403);
  }
});
app.use("/", router);

/**
 * Render through MUI and React
 */
app.get("*", handleRender);

/**
 * Handle errors
 */
app.use(function (err, req, res, next) {
  if (err) {
    // handle invalid sign in
    if (err && err.name === "TokenExpiredError") {
      req.logout({}, () => {
        res.redirect("/?s=" + uuid4());
      });
      // next();
    } else {
      console.log(err, "err");
      res.redirect("/error?s=" + uuid4());
      next(err);
    }
  } else {
    next();
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on ${port}... `);
});
