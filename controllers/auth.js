const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/feed");
      }
    res.render("login", {
       title: "Login",
    });
}

exports.postLogin = (req,res,next) => {
    
    const validationErrors = [];
    
    //check email
    if(!validator.isEmail(req.body.email)){
        validationErrors.push({msg:"Please enter a valid email address."})
    }

    //check password
    if(validator.isEmpty(req.body.password)){
        validationErrors.push({mesg: "Password cannot be blank."})
    }

    //if there are errors on logging redirect
    if(validationErrors.length){
        req.flash("errors",validationErrors);
        return res.redirect("/login")
    }

}