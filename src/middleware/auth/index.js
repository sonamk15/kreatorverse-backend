const jwt = require("jsonwebtoken");

const createJwtToken = (payload) => {
  return jwt.sign(payload, "kreatorasdf1234sf!@#msdk", { expiresIn: "1d" });
};

const authToken = (req, res, next) => {
  const authHeader =
    req.headers["x-access-token"] || req.headers["authorization"];
  let token =
    authHeader && authHeader.length > 0 ? authHeader.split(" ")[1] : null;
  if (!token && req.query.token) {
    token = req.query.token;
  }
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "kreatorasdf1234sf!@#msdk", (err, userCtx) => {
    if (err) return res.sendStatus(403);
    req.userCtx = userCtx;
    if (userCtx.role !== "super_admin" && req.baseUrl === "/api/super-admin") {
      return res.sendStatus(401);
    }
    next();
  });
};

module.exports = {
  createJwtToken,
  authToken,
};
