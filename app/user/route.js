const { AddUserAdmin } = require("./controller")

const router = require("express").Router()

router.post("/add",AddUserAdmin)