const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

// Creates a token
function toJWT(data) {
  //to create unique tokens with some user data. => user.id
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

// Checks tokens.
function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };

// "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUzNTM2MjIzMCwiZXhwIjoxNTM1MzY5NDMwfQ.DxFRClbZLP0L-fczkSiNHEiLqYI4HGbC8Ezrh3JhlG8"
