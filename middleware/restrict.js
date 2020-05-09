const jwt = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials",
    };

    try {
      console.log("HEADERS", req.headers);
      // express-session will automatically get the session ID from the cookie
      // header, and check to make sure it's valid and the session for this user exists.
      // if (!req.session || !req.session.user) {
      // 	return res.status(401).json(authError)
      // }

      // validate the token
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json(authError);
      }

      // instead of using sessions
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        // if error is NOT empty
        if (err) {
          return res.status(401).json(authError);
        }
        // if the token verifies
        // incase you need to access it later in the app
        req.token = decodedPayload;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
