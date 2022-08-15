const express = require("express");
const AuthServices = require("../../services/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const userLogin = await AuthServices.Login(req.body);
  req.apiRes = userLogin;
  if (userLogin.success) {
    res.status(userLogin.status).send(userLogin);
  } else {
    res.status(userLogin.status).send(userLogin);
  }
});

module.exports = router;
