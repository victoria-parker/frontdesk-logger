const Taxi=require("../models/Taxi")
const User=require("../models/User")

module.exports={
  createTaxi: async (req,res)=>{
        try{
            Taxi.create(
                {
                    roomNumber:req.body.roomNumber,
                    observations: req.body.observations,
                    bookingNumber:req.body.bookingNumber,
                    pickUpTime:req.body.pickUpTime,
                    company:req.user.company,
                    user:req.user.id
                })
            console.log("Taxi has been added!");
            res.redirect("/feed");
        }catch(err){
            console.error(err)
        }
  },
  getTaxi: async (req,res)=>{
    try{
        let taxi=await Taxi.findOne({id:req.params.id}).lean()
        let user=await User.findOne({id: taxi.user})
        if(!taxi){
            return res.render('error/404')
        }

        if(req.path == '/modifyTaxi/'+req.params.id){
            if(taxi.user != req.user.id){
                res.redirect('feed')
            }else{
                res.render('taxiFormModify',{taxi})
            }
        }else if(req.path == '/'+req.params.id){
            res.render('showTaxi',{taxi, user})
        
        }else{
            res.render('404')
        }
        
    }catch(err){
        console.error(err)
    }
  },
}