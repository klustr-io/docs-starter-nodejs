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
        user.experiments = v.experiments;
        user.source = v.source;
        user.permissions = v.permissions;
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
            user.experiments = v.experiments;
            user.source = v.source;
            user.permissions = v.permissions;
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

    let body = Object.assign({}, {
      scope: scopes,
      return_to: process.env.OIDC_RETURN_URL,
    }, req.query);
    console.log(body, 'oidc');

    const authenticator = passport.authenticate("oidc", body);
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
        console.log(tokenSet);
        var user = {
          id: userinfo.sub,
          displayName: userinfo.family_name + " " + userinfo.given_name,
          preferred_username: userinfo.preferred_username,
          name: userinfo.family_name + " " + userinfo.given_name,
          email: userinfo.email,
          picture: userinfo.picture,
          aud: tokenSet.aud,
          groups: tokenSet.groups,
          permissions: tokenSet.permissions,
          roles: tokenSet.roles,
          source: tokenSet.source,
          accessToken: tokenSet.access_token,
          refreshToken: tokenSet.refresh_token,
          experiments: tokenSet.experiments,
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
