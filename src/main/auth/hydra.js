const session = require("express-session");
const cookieParser = require("cookie-parser");
const LokiStore = require("connect-loki")(session);

const { Issuer, Strategy } = require("openid-client");

export function init(app, passport) {
  app.get("/auth/oidc", (req, res, next) => {
    const authenticator = passport.authenticate("hydra", {
      scope: "profile openid",
      return_to: process.env.OIDC_RETURN_URL,
      prompt: req.query.prompt,
    });
    authenticator(req, res, next);
  });

  app.get(
    "/auth/oidc/redirect",
    passport.authenticate("hydra", {
      failureRedirect: "/?error",
      failureMessage: true,
    }),
    (req, res) => {
      res.cookie("token", req.user.id);
      var url = req.cookies["redirect"];
      url =
        url != null && url.trim().length > 0 && url.trim().indexOf("/") >= 0
          ? url
          : "/";
      url = url.indexOf("login") ? "/" : url;
      res.redirect(url);
    }
  );

  Issuer.discover(process.env.OIDC_ISSUER).then((iss) => {
    var client = new iss.Client({
      client_id: process.env.OIDC_CLIENT,
      client_secret: process.env.OIDC_SECRET,
      redirect_uris: [process.env.OIDC_REDIRECT_URL],
      post_logout_redirect_uris: [process.env.OIDC_LOGOUT_URL],
    });

    passport.use(
      "hydra",
      new Strategy({ client }, (tokenSet, userinfo, done) => {
        var user = {
          id: userinfo.sub,
          displayName: userinfo.given_name + " " + userinfo.family_name,
          preferred_username: userinfo.preferred_username,
          name: userinfo.given_name + " " + userinfo.family_name,
          email: userinfo.email,
          picture: userinfo.picture,
          accessToken: tokenSet.access_token,
          refreshToken: tokenSet.refresh_token,
          idToken: tokenSet.id_token,
          expires_at: tokenSet.expires_at,
        };
        return done(null, user);
      })
    );
  });
}
