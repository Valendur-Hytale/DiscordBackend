const expressJwt = require("express-jwt");
const config = require("config.json");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/members/addExp",
      "/members/addExp",
    ],
  });
}

async function isRevoked(req, payload, done) {
  done();
}
