const Issue=require("../models/Issue")

module.exports={
  createIssue: async (req,res)=>{
        try{
            Issue.create(
                {
                    roomNumber:req.body.roomNumber,
                    text: req.body.text,
                    guestName:req.body.guestName,
                    company:req.user.company,
                    user:req.user.id
                })
            console.log("Issue has been added!");
            res.redirect("/feed");
        }catch(err){
            console.error(err)
        }
  }
}