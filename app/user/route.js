const { AddUserAdmin,updateUser,deleteUser } = require("./controller")

const router = require("express").Router()

router.post("/add",AddUserAdmin)
router.post("/update",updateUser)
router.post("/removeuser",deleteUser)

module.exports = router