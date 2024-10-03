const router = require("express").Router()
const { addJob, deleteJob, updateJob, listJobs } = require("../jobs/controller")

router.post("/addjob", addJob)
router.post("/deletejob", deleteJob)
router.post("/updatejob", updateJob)
router.post("/listjobs", listJobs)
module.exports = router;