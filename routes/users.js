const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth");
const homeController=require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createUser", ensureAuth, authController.createUser)

module.exports=router;