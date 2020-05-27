const { Router } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// CRUD operations as http methods => create === POST
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    // 1. Check if we have the params or something is missing
    if (!email || !password || !fullName) {
      res.status(400).send("missing some user parameters");
    } else {
      // 2. Hash the password => encrypt
      const hashedPassword = bcrypt.hashSync(password, 10);

      // 3. Try to create the user (this might fail because of email uniqueness)
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
