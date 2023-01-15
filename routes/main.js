const express=require("express")
const router=express.Router();
const authController=require("../controllers/auth")
const homeController=require("../controllers/home")


//Main Routes
router.get("/",homeController.getIndex)
router.get("/login",authController.getLogin)
router.get("/signup",authController.getSignup)
router.post("/login",authController.postLogin)
router.post("/signup",authController.postSignup)


//temp feed
router.get("/feed",homeController.getFeed)

module.exports=router;