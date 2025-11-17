import verifyToken from "./jwt";

const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const LokiStore = require("connect-loki")(session);

const { Issuer, Strategy } = require("openid-client");

const hydra = require("./hydra");

export default function Passport(app) {
  app.use(cookieParser());
  app.use(
    session({
      store: new LokiStore({
        path: "node_modules/.cache/session-store.db",
        ttl: 10,
      }),
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((req, user, done) => {
    try {
      verifyToken(user.idToken)
        .then((v) => {
          user.roles = v.roles;
          user.groups = v.groups;

          req.session.user = user;
          req.user = user;

          done(null, user.id);
        })
        .catch((err) => {
          done(err, null);
        });
    } catch (e) {
      done(err, null);
    }
  });

  passport.deserializeUser((req, user, done) => {

    let handleError = (err) => {
      done(err, null);
    };

    try {
      if (req.session.user == null) {
        done(null, null);
        return;
      }

      try {
        verifyToken(req.session.user.idToken)
          .then((v) => {
            req.session.user.roles = v.roles;
            req.session.user.groups = v.groups;
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

  hydra.init(app, passport);
}
