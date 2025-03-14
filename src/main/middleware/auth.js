import axios from "axios";
import * as React from "react";
import { createContext } from "react";
import _ from "underscore";
export const AuthContext = createContext();

export const isAuthenticated = function () {
  if (typeof document !== "undefined") {
    if (document.cookie.indexOf("token") >= 0) {
      return true;
    }
  }
  return false;
};

export const getAccessToken = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token.accessToken;
    }
  }
  console.error("No access token defined.");
  return null;
};

export const getApiKey = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token.apikey;
    }
  }
  console.error("No access token defined.");
  return null;
};

export const getUser = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token;
    }
  }
  console.error("No access token defined.");
  return null;
};

export const getIdToken = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token.idToken;
    }
  }
  console.error("No access token defined.");
  return null;
};

export const getToken = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token;
    }
  }
  console.error("No access token defined.");
  return null;
};

export const getAccessTokenExpiry = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token.expires_at;
    }
  }
  return null;
};

export const handleExpiredLogin = function (navigate) {
  var now = Math.floor(new Date().valueOf() / 1000);
  var expry = getAccessTokenExpiry();

  var expired = false;
  if (expry == null) {
    expired = true;
  } else if (expry < now) {
    expired = true;
  }

  if (!expired) {
    _.delay(handleExpiredLogin, 5000, navigate);
    return;
  }

  logoutUser(() => {
    navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
  });
};

export const handleSignIn = function () {
  return new Promise((resolve, reject) => {
    // have we already signed in!
    if (typeof sessionStorage !== "undefined") {
      var json = sessionStorage.getItem("token");
      if (json != null) {
        var dt = sessionStorage.getItem("_last_validated");
        if (dt != null) {
          var difference = (new Date(dt) - new Date()) / 1000;
          if (Math.abs(difference) <= 30) {
            resolve(JSON.parse(json));
            return;
          }
        }
      }
    }

    axios({
      method: "get",
      url: "/whoami",
    })
      .then(function (response) {
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("token", JSON.stringify(response.data));
          resolve(response.data);
        } else {
          resolve(response.data);
        }
      })
      .catch(function (error) {
        reject();
      });
  });
};

export const logoutUser = function (callback) {
  sessionStorage.removeItem("organizationId");
  sessionStorage.removeItem("projectId");
  sessionStorage.removeItem("token");
  
  axios({
    method: "get",
    url: "/logout",
  })
    .then(function (response) {
      if (callback) {
        callback();
      } else {
        window.location.reload();
      }
    })
    .catch(function (error) {
      if (callback) {
        callback(null);
      } else {
        window.location.reload();
      }
    });
};

function Auth({ children }) {
  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        logoutUser,
        isAuthenticated,
        getAccessToken,
        getUser,
        getAccessTokenExpiry,
        handleExpiredLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
