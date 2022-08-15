const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send({success: true, message: 'Hello Kreatorverse!'});
});

module.exports = router;