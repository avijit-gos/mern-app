const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      res.status(401).json({ msg: "Authentication error" });
    } else {
      try {
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodeToken;
      } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
      }
      return next();
    }
  } catch (error) {
    console.log(error);
  }
};
