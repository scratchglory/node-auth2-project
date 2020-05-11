const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const restrict = require("../middleware/restrict");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials",
  };

  //
  try {
    const user = await Users.findBy({ username: req.body.username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    // salting: bcrypt hashes generate diff results
    // compares hashes rather than using "!=="
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    //   req.session.user = user;

    // generate new token beause we aren't creating a session
    // this is shown to the whole public
    const tokenPayload = {
      userId: user.id,
      userRole: "normal", // this would normally come from the db
    };

    // send back to client
    // res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET));
    res.json({
      message: `Welcome ${user.username}!`,
      //   token: jwt.sign(tokenPayload, "secret string"),
      // pulling seret string from .env which was added to our server script pacakge.json
      token: jwt.sign(tokenPayload, process.env.JWT_SECRET),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", restrict(), (req, res, next) => {
  // this will delete the session in the database and try to expire the cookie,
  // though it's ultimately up to the client if they delete the cookie or not.
  // becomes useless to client once session is deleted server-side
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "Logged out",
      });
    }
  });
});

module.exports = router;
