const express=require("express");
const router=express.Router();
const notesController=require("../controllers/notes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createNote",ensureAuth,notesController.createNote)
router.get("/modifyNote/:id",ensureAuth,noteController.getNote)


module.exports=router;