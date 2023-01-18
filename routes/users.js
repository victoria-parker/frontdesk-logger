const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth");
const usersController=require("../controllers/users");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createUser", ensureAuth, usersController.createUser)
router.put("/removeUser/:id",ensureAuth, usersController.removeUser)
router.get("/modifyUser/:id",ensureAuth, usersController.getUser)
router.put("/modifyUser/:id",ensureAuth, usersController.modifyUser)

module.exports=router;