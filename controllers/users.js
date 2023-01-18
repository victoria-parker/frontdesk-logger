const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")

//Create User from settings
exports.createUser= (req,res,next) => {

    //validations
    const validationErrors=[]
    
    if(!validator.isEmail(req.body.email)){
        validationErrors.push({ msg: "Please enter a valid email address." })
    }
  
    if(!validator.isLength(req.body.password, { min:8 })){
        validationErrors.push({msg:"Password must be at least 8 characters long"})
    }
  
    if(req.body.password !== req.body.confirmPassword){
        validationErrors.push({msg:"Passwords do not match"})
    }
  
    if(validationErrors.length){
        req.flash("errors",validationErrors)
        return res.redirect("../settings");
    }
  
    //Create new user and company
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false
    });

    const user= new User({
        company:req.user.company,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        admin:req.body.admin == 'true' ? true : false,
        password:req.body.password
    })

    User.findOne(
        { $or: [{email:req.body.email}]},
        (err, existingUser) => {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                req.flash("errors", {
                msg: "Account with that email address already exists.",
                });
                return res.redirect("/settings");
            }
            user.save((err) => {
                if (err) {
                return next(err);
                }
                req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/settings");
                });
            });
            }
    )

}
  
exports.removeUser= async(req,res)=>{

    try{
        await User.findOneAndUpdate({_id:req.params.id},{$set: {active: false}})
        res.redirect('/settings')
    }catch(err){
        console.error(err)
    }

}
exports.getUser= async (req,res)=>{
    try{
        let user=await User.findById(req.params.id).lean()
        let admin=await User.findById(req.user.id)
        if(!user){
            return res.render('error/404')
        }

        if(req.path == '/modifyUser/'+req.params.id){
            if(!admin.admin){
                res.redirect('feed')
            }else{
                res.render('userFormModify',{user})
            }
        }else if(req.path == '/'+req.params.id){
            res.render('showUser',{admin, user})
        
        }else{
            res.render('404')
        }
        
    }catch(err){
        console.error(err)
    }
}

exports.modifyUser= async (req,res)=>{
try{
    let user=await User.findById(req.params.id).lean()
    
    if(!user){
        return res.render('404')
    }
    
    user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
    res.redirect('/settings')
    

}catch(err){
    console.error(err)
    return res.render('500')
}
}