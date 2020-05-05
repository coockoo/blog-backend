const jwt = require('jsonwebtoken');

const config = require('../../config');

async function signJWT(payload) {
  return jwt.sign(payload, config.jwtSecret);
}

async function verifyJWT(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  signJWT,
  verifyJWT,
};
