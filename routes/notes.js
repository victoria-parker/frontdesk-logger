const express=require("express");
const router=express.Router();
const notesController=require("../controllers/notes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createNote", notesController.createNote)


module.exports=router;