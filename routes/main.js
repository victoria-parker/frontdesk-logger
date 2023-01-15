const express=require("express")
const router=express.Router();
const authController=require("../controllers/auth")
const homeController=require("../controllers/home")
const recordingsController=require("../controllers/recordings")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Main Routes
router.get("/",homeController.getIndex)
router.get("/login",authController.getLogin)
router.get("/signup",authController.getSignup)
router.get("/feed",ensureAuth, recordingsController.getFeed)
router.post("/login",authController.postLogin)
router.post("/signup",authController.postSignup)

module.exports=router;