const Issue=require("../models/Issue")
const Note=require("../models/Note")
const Taxi=require("../models/Taxi")
const WakeUpCall=require("../models/WakeUpCall")
const User=require('../models/User')

module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs");
    },
    
    getFeed: async (req, res) => {
      try{
          const issues=await Issue.find({company:req.user.company, resolved:false})
          const notes=await Note.find({company:req.user.company, resolved:false})
          const taxis=await Taxi.find({company:req.user.company, resolved:false})
          const wakeUpCalls=await WakeUpCall.find({company: req.user.company, resolved:false})
          
          res.render("feed.ejs",{issues:issues,notes:notes,taxis:taxis,wakeUpCalls:wakeUpCalls, user:req.user});
          
      }catch(err){
          console.error(err)
      }
},
  getArchive: async (req, res) => {
    try{
        const issues=await Issue.find({company:req.user.company, resolved:true})
        const notes=await Note.find({company:req.user.company, resolved:true})
        const taxis=await Taxi.find({company:req.user.company, resolved:true})
        const wakeUpCalls=await WakeUpCall.find({company: req.user.company, resolved:true})
        
        res.render("archive.ejs",{issues:issues,notes:notes,taxis:taxis,wakeUpCalls:wakeUpCalls, user:req.user});
        
    }catch(err){
        console.error(err)
    }
  },
  getSettings: async (req, res) => {
    try{
        const users=await User.find({company:req.user.company, active:true})
        res.render("settings.ejs",{ users:users, user:req.user});
        
    }catch(err){
        console.error(err)
    }
  }
};