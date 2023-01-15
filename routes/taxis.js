const express=require("express");
const router=express.Router();
const taxisController=require("../controllers/taxis");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createTaxi", taxisController.createTaxi)


module.exports=router;