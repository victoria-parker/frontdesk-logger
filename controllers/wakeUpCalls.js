const WakeUpCall=require("../models/WakeUpCall")
const User=require("../models/User")

module.exports={
  createWakeUpCall: async (req,res)=>{
        try{
            WakeUpCall.create(
                {
                    roomNumber:req.body.roomNumber,
                    wakeUpTime: req.body.wakeUpTime,
                    guestName:req.body.guestName,
                    observations:req.body.observations,
                    company:req.user.company,
                    user:req.user.id
                })
            console.log("WakeUpCall has been added!");
            res.redirect("/feed");
        }catch(err){
            console.error(err)
        }
  },
  getWakeUpCall: async (req,res)=>{
    try{
        let wakeUpCall=await WakeUpCall.findById(req.params.id).lean()
        let user=await User.findById(wakeUpCall.user)
        if(!wakeUpCall){
            return res.render('error/404')
        }

        if(req.path == '/modifyWakeUpCall/'+req.params.id){
            if(wakeUpCall.user != req.user.id){
                res.redirect('feed')
            }else{
                res.render('wakeUpCallFormModify',{wakeUpCall})
            }
        }else if(req.path == '/'+req.params.id){
            res.render('showWakeUpCall',{wakeUpCall, user})
        
        }else{
            res.render('404')
        }
        
    }catch(err){
        console.error(err)
    }
  },
  modifyWakeUpCall: async (req,res)=>{
    try{
        let wakeUpCall=await WakeUpCall.findById(req.params.id).lean()
        
        if(!wakeUpCall){
            return res.render('404')
        }
        
        if(wakeUpCall.user != req.user.id){
            return res.redirect('/feed')
        }else{
            wakeUpCall=await WakeUpCall.findOneAndUpdate({id:req.params.id},req.body,{new:true, runValidators:true})
            res.redirect('/feed')
        }

    }catch(err){
        console.error(err)
    }
  },
  removeWakeUpCall: async(req,res)=>{

    try{
        await WakeUpCall.findOneAndUpdate({_id:req.params.id},{$set: {resolved: true}})
        res.redirect('/feed')
    }catch(err){
        console.error(err)
    }
  
  }

}