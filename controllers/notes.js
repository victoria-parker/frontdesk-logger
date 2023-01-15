const Note=require("../models/Note")

module.exports={
  createNote: async (req,res)=>{
        try{
            Note.create(
                {
                    text: req.body.text,
                    user:req.user.id,
                    company:req.user.company,
                })
            console.log("Note has been added!");
            res.redirect("/feed");
        }catch(err){
            console.error(err)
        }
  }
}