const express = require("express");
const router = express.Router();
const authControler = require("../controler/auth");

router.put("/signup", authControler.signup);
router.post("/login", authControler.login);
module.exports = router;
