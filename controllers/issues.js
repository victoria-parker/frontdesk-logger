const Issue=require("../models/Issue")

module.exports={
  createIssue: async (req,res)=>{
        try{
            await Issue.create(
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
  },

  getIssue: async (req,res)=>{
    try{
        let issue=await Issue.findOne({id:req.params.id}).lean()
        
        if(!issue){
            return res.render('error/404')
        }

        if(req.path == '/modifyIssue/'+req.params.id){
            if(issue.user != req.user.id){
                res.redirect('feed')
            }else{
                res.render('issueFormModify',{issue})
            }
        }else if(req.path == '/showIssue/'+req.params.id){
            res.render('showIssue',{issue})
        
        }else{
            res.render('404')
        }
        
    }catch(err){
        console.error(err)
    }
  },
  modifyIssue: async (req,res)=>{
    try{
        let issue=await Issue.findById(req.params.id).lean()
        
        if(!issue){
            return res.render('404')
        }
        
        if(issue.user != req.user.id){
            return res.redirect('/feed')
        }else{
            issue=await Issue.findOneAndUpdate({id:req.params.id},req.body,{new:true, runValidators:true})
            res.redirect('/feed')
        }

    }catch(err){
        console.error(err)
    }
  }
}