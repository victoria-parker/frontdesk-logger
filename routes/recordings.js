const express=require("express");
const router=express.Router();
const recordingsController=require("../controllers/recordings");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createIssue", recordingsController.createIssue)