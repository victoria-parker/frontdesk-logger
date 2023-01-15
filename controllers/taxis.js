const Taxi=require("../models/Taxi")

module.exports={
  createTaxi: async (req,res)=>{
        try{
            Taxi.create(
                {
                    roomNumber:req.body.roomNumber,
                    observations: req.body.text,
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
  }
}