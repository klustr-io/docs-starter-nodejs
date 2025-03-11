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
  return null;
};

export const getApiKey = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token.apikey;
    }
  }
  return null;
};

export const getUser = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token;
    }
  }
  return null;
};

export const getIdToken = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token.idToken;
    }
  }
  return null;
};

export const getToken = function () {
  if (typeof sessionStorage !== "undefined") {
    if (sessionStorage.getItem("token")) {
      var token = JSON.parse(sessionStorage.getItem("token"));
      return token;
    }
  }
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

export const getUserInfo = function () {
  let accessToken = getAccessToken();
  if (accessToken.length <= 0) {
    throw "No token valid";
  }
  //https://hydra.dev.klustr.io/.well-known/openid-configuration
  return axios.get("https://secure.dev.klustr.io/hydra/userinfo", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
};

export const exit = function(callback) {
  logoutUser(() => {
    callback();
  });
}

export const handleExpiredLogin = function (callback) {
  var now = Math.floor(new Date().valueOf() / 1000);
  var expry = getAccessTokenExpiry();

  var expired = false;
  if (expry == null) {
    expired = true;
  } else if (expry < now) {
    expired = true;
  }

  // check token is still valid by fetching the userinfo endpoint

  if (!expired) {

    getUserInfo().then(({ data: info }) => {
      // all good
    }).catch((e) => {
      exit(callback);
    })

    _.delay(handleExpiredLogin, 60 * 1000, callback);
  } else {
    exit(callback);
  }
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
