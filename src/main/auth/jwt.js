const { promisify } = require("node:util");
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
const verifyToken = async (token) => {
  const { iss: issuer } = jwt.decode(token);
  const jwksUri = await fetchJwksUri(issuer);
  return promisify(jwt.verify)(token, getKey(jwksUri));
};

export default verifyToken;
