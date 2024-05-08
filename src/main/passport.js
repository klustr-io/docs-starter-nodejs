import verifyToken from "./jwt";

const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const { Issuer, Strategy } = require("openid-client");

export default function Passport(app) {
  app.use(cookieParser());
  app.use(
    session({ secret: process.env.SECRET, resave: false, saveUninitialized: false })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    try {
      verifyToken(user.idToken).then((v) => {
        user.roles = v.roles;
        user.groups = v.groups;
        myCache.set(user.id, user);
        done(null, user.id);  
      })
    } catch (e) {
      done(err, null);
    }
  });

  passport.deserializeUser(function (userID, done) {
    let handleError = (err) => {
      myCache.del(userID);
      done(err, null);
    };

    try {
      var user = myCache.get(userID);
      if (user == null) {
        done(null, null);
        return;
      }

      try {
        verifyToken(user.idToken)
          .then((v) => {
            user.roles = v.roles;
            user.groups = v.groups;
            done(null, user);
          })
          .catch(handleError);
      } catch (e) {
        handleError(e);
      }
    } catch (e) {
      handleError(e);
    }
  });

  app.get("/auth/oidc", (req, res, next) => {
    res.cookie("redirect", req.query.redirect || null);

    let scopes = req.query.scopes || process.env.OIDC_SCOPES || "profile openid";
    const authenticator = passport.authenticate("oidc", {
      scope: scopes,
      return_to: process.env.OIDC_RETURN_URL,
    });
    authenticator(req, res, next);
  });

  app.get("/auth/experiment/:id", (req, res, next) => {
    let experiment_id = req.params.id;
    let scopes = req.query.scopes || process.env.OIDC_SCOPES || "profile openid";
    res.cookie("redirect", req.query.redirect || null);
    const authenticator = passport.authenticate("oidc", {
      scope: scopes,
      experiment: experiment_id,
      return_to: process.env.OIDC_RETURN_URL,
    });
    authenticator(req, res, next);
  });

  app.get(
    "/auth/oidc/redirect",
    passport.authenticate("oidc", {
      failureRedirect: "/login",
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
      "oidc",
      new Strategy({ client }, (tokenSet, userinfo, done) => {
        var user = {
          id: userinfo.sub,
          displayName: userinfo.family_name + " " + userinfo.given_name,
          preferred_username: userinfo.preferred_username,
          name: userinfo.family_name + " " + userinfo.given_name,
          email: userinfo.email,
          picture: userinfo.picture,
          accessToken: tokenSet.access_token,
          refreshToken: tokenSet.refresh_token,
          idToken: tokenSet.id_token,
          expires_at: tokenSet.expires_at,
          scopes: tokenSet.scope.split(' '),
          apikey: process.env.API_KEY
        };
        return done(null, user);
      })
    );
  });
}
