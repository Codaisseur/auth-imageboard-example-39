const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models").user;

const { toJWT } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  // 1. get params => email and password and validate.
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Missing login parameters");
  } else {
    // 2. Look in our DB for user with the email.
    const user = await User.findOne({ where: { email } });
    // if no user found, user doesn't exist!
    if (!user) {
      res.status(404).send("User with that email address not found");
    } else {
      // 3. check if passwords match
      const passwordsMatch = bcrypt.compareSync(password, user.password);

      if (passwordsMatch) {
        const token = toJWT({ userId: user.id }); // => userId
        // This guy exists and we have to log him in
        // Create a jwt.
        res.send({ token });
      } else {
        res.status(400).send("Wrong password");
      }
    }
  }
});

// 1. Check if there is an authorization header with a token.
// 2. Decode the token, to get the userId back.
// 3. add the user to the request object

module.exports = router;
