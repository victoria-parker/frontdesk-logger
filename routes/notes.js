const express=require("express");
const router=express.Router();
const notesController=require("../controllers/notes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createNote",ensureAuth,notesController.createNote)
router.get("/modifyNote/:id",ensureAuth,notesController.getNote)
router.put("/modifyNote/:id",ensureAuth,notesController.modifyNote)
router.get("/:id",ensureAuth,notesController.getNote)


module.exports=router;