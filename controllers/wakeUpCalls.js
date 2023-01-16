const WakeUpCall=require("../models/WakeUpCall")

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
  }
}