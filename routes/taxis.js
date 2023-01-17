const express=require("express");
const router=express.Router();
const taxisController=require("../controllers/taxis");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createTaxi",ensureAuth,taxisController.createTaxi)
router.get("/modifyTaxi/:id",ensureAuth,taxisController.getTaxi)
router.put("/modifyTaxi/:id",ensureAuth,taxisController.modifyTaxi)
router.get("/:id",ensureAuth,taxisController.getTaxi)
router.put("/:id",ensureAuth,taxisController.removeTaxi)


module.exports=router;