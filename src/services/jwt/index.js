const jwt = require('jsonwebtoken');

const config = require('../../config');

const TOKEN_KIND = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};

async function signJWT(payload, tokenKind) {
  const expiresIn = tokenKind === TOKEN_KIND.REFRESH ? '2w' : '1d';
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
}

async function verifyJWT(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  TOKEN_KIND,
  signJWT,
  verifyJWT,
};
