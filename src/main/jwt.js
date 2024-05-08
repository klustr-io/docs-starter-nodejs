const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const fetchJwksUri = async (issuer) => {
  const response = await fetch(`${issuer}/.well-known/openid-configuration`);
  const { jwks_uri } = await response.json();
  return jwks_uri;
};

const getKey = (jwksUri) => (header, callback) => {
  const client = jwksClient({ jwksUri });
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    callback(null, key.publicKey || key.rsaPublicKey);
  });
};

/**
 * Verify an OpenID Connect ID Token
 * @param {string} token - The JWT Token to verify
 */
const verifyToken = async (token, callback) => {
  const { iss: issuer } = jwt.decode(token);
  const jwksUri = await fetchJwksUri(issuer);
  var dfd = new Promise((resolve, reject) => {
    jwt.verify(token, getKey(jwksUri), (err, v) => {
      if (err) {
        reject(err);
      } else {
        resolve(v);
      }
    });
  });
  return dfd;
};

export default verifyToken;
