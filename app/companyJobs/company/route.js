const router = require("express").Router()
const { listcompany, addcompany, deletecompany, updatecompany } = require("./controller")

router.post("/addcompany", addcompany)
router.post("/deletecompany", deletecompany)
router.post("/updatecompany", updatecompany)
router.post("/listcompany", listcompany)
module.exports = router;