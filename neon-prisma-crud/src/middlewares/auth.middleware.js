const jwt = require("jsonwebtoken");

exports.validate = async (req, res, next) => {
  const auth = req.headers?.authorization;
  if (!auth) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized!!!",
    });
  }

  const token = auth.split(" ")[1];

  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  req.user = decoded;

  next()
};
