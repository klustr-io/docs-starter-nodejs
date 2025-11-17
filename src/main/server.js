import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { CssBaseline } from "@mui/material";
import express from "express";
import * as React from "react";
import { AuthProvider } from "react-auth-verification-context";
import ReactDOM from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import uuid4 from "uuid4";
import App from "./app";
import Passport from "./auth/passport";
import createEmotionCache from "./cache";
import lightTheme from "./themes/light";

const path = require("path");

let dotenv = require("dotenv");

console.log("============ ENV " + process.env.NODE_ENV + " ===========");

switch (process.env.NODE_ENV) {
  case "development":
    dotenv.config({ path: ".env.development" });
    break;
  case "production":
    dotenv.config({ path: ".env.production" });
    break;
  default:
    dotenv.config({ path: ".env" });
    break;
}

const app = express();

// *************************************
// *************************************
const client = require("prom-client");
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5], // Customize as needed
});
register.registerMetric(httpRequestDuration);
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });
  next();
});
// Expose metrics endpoint for Prometheus scraping
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
// *************************************
// *************************************

// ?? Only apply in development
if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const webpackConfig = require("../../webpack.config.js");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      stats: "minimal",
    })
  );

  app.use(webpackHotMiddleware(compiler));
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

export function getUserThemeFromCookie(req) {
  const themeCookie =
    req.headers.cookie
      ?.split("; ")
      .find((c) => c.startsWith("theme="))
      ?.split("=")[1] || "dark";
  return themeCookie;
}

function handleRender(req, res) {
  const staticContext = {};

  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

    let theme = getUserThemeFromCookie(req);

  // Render the component to a string.
  const html = ReactDOM.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <StaticRouter location={req.url}>
          <AuthProvider>
            <App user={req.user} defaultTheme={theme} source="renderToString" />
          </AuthProvider>
        </StaticRouter>
      </ThemeProvider>
    </CacheProvider>
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  if (req.path == '/') {
    if (!req.session.user) {
      res.redirect('/login');
      return;
    }
  }

  if (req.query.logout) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      // res.redirect('/login');
    });
    return;
  }


  // Send the rendered page back to the client.
  res.status(staticContext.statusCode || 200);
  res.send(renderFullPage(html, emotionCss));
  res.end();
}


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

app.set("trust proxy", 1);
/**
 * Check if user is signed in.
 */
const router = express.Router();
router.get("/whoami", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  if (req.session.user) {
    res.send(req.session.user);
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
app.get('/', handleRender);
app.get('/login', handleRender);

/**
 * Handle errors
 */
app.use(function (err, req, res, next) {
  if (err) {
    if (err.name) {
      console.log(".");
      console.log("=============================");
      console.log("=============================");
      console.log(err.name);
      console.log(err.message);
      console.log(err.error);
      console.log("=============================");
      console.log("=============================");
      console.log(".");
    }
    // handle invalid sign in
    if (err && err.name === "TokenExpiredError") {
      console.log('***********');
      req.logout({}, () => {
        res.redirect("/?s=" + uuid4());
      });
    } else {
      res.redirect(
        "/error?s=" +
          uuid4() +
          "&name=" +
          encodeURIComponent(err.name) +
          "&code=" +
          encodeURIComponent(err.error) +
          "&message=" +
          encodeURIComponent(err.message)
      );
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
