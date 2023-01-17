const express=require("express");
const router=express.Router();
const issuesController=require("../controllers/issues");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createIssue",ensureAuth,issuesController.createIssue)
router.get("/modifyIssue/:id",ensureAuth,issuesController.getIssue)

module.exports=router;