const express=require("express");
const router=express.Router();
const issuesController=require("../controllers/issues");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createIssue", issuesController.createIssue)


module.exports=router;