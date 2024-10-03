const { signup,loginUser} = require("./authService")

const router = require("express").Router()

router.post("/signup",signup)
router.post("/login",loginUser)

module.exports = router;