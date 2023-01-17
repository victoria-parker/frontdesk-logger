const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth");
const homeController=require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Main Routes
router.get("/",homeController.getIndex)
router.get("/feed",ensureAuth, homeController.getFeed)
router.get("/archive",ensureAuth,homeController.getArchive)
router.get("/login",authController.getLogin)
router.get("/signup",authController.getSignup)
router.get("/logout",authController.logout)
router.post("/login",authController.postLogin)
router.post("/signup",authController.postSignup)

module.exports=router;