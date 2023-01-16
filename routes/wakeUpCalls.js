const express=require("express");
const router=express.Router();
const wakeUpCallsController=require("../controllers/wakeUpCalls");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createWakeUpCall",ensureAuth,wakeUpCallsController.createWakeUpCall)


module.exports=router;