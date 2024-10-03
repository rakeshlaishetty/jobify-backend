const { AddUserAdmin,updateUser,deleteUser,listUsers } = require("./controller")

const router = require("express").Router()

router.post("/add",AddUserAdmin)
router.post("/update",updateUser)
router.post("/removeuser",deleteUser)
router.get("/listuser",listUsers)

module.exports = router