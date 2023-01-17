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
  },
  getNote: async (req,res)=>{
    try{
        let note=await Note.findOne({id:req.params.id}).lean()
        let user=await User.findOne({id: note.user})
        if(!note){
            return res.render('error/404')
        }

        if(req.path == '/modifyNote/'+req.params.id){
            if(note.user != req.user.id){
                res.redirect('feed')
            }else{
                res.render('noteFormModify',{note})
            }
        }else if(req.path == '/'+req.params.id){
            res.render('showNote',{note, user})
        
        }else{
            res.render('404')
        }
        
    }catch(err){
        console.error(err)
    }
  }
}