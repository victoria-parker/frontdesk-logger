const Issue=require("../models/Issue")
const Note=require("../models/Note")
const Taxi=require("../models/Taxi")
const WakeUpCall=require("../models/WakeUpCall")

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
}
  };