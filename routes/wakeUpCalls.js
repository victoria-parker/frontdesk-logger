const express=require("express");
const router=express.Router();
const wakeUpCallsController=require("../controllers/wakeUpCalls");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createWakeUpCall",ensureAuth,wakeUpCallsController.createWakeUpCall)
router.get("/modifyWakeUpCall/:id",ensureAuth,wakeUpCallsController.getWakeUpCall)
router.put("/modifyWakeUpCall/:id",ensureAuth,wakeUpCallsController.modifyWakeUpCall)
router.get("/:id",ensureAuth,wakeUpCallsController.getWakeUpCall)
router.put("/:id",ensureAuth,wakeUpCallsController.removeWakeUpCall)


module.exports=router;