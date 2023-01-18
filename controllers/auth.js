const passport = require("passport")
const validator = require("validator")
const User = require("../models/User")

//Get Login
exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/feed");
      }
    res.render("login", {
       title: "Login",
    });
}

//Post Login
exports.postLogin = (req,res,next) => {
    console.log(req)
    const validationErrors = [];
    
    //check email
    if(!validator.isEmail(req.body.email)){
        validationErrors.push({msg:"Please enter a valid email address."})
    }

    //check password
    if(validator.isEmpty(req.body.password)){
        validationErrors.push({msg: "Password cannot be blank."})
    }

    //if there are errors on logging redirect
    if(validationErrors.length){
        req.flash("errors",validationErrors);
        return res.redirect("/login")
    }

    //all ok login
    passport.authenticate("local", (err, user, info) => {
      console.log(user)
      if (err) {
        return next(err);
      }

      if (!user) {
        req.flash("errors", info);
        return res.redirect("/login");
      }

      if (!user.active) {
        req.flash("errors", info);
        return res.redirect("/login");
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        res.redirect(req.session.returnTo || "/feed");
      });
    })(req, res, next);
}

//log out
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};


//Get SignUp
exports.getSignup = (req,res) =>{
    if(req.user){
        return res.render("/feed");
    }

    res.render("signup", {
        title: "Create Account"
    })
}

//Post SignUp
exports.postSignup= (req,res,next) => {

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
        return res.redirect("../signup");
    }

    //Create new user and company
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false
    });

    const user= new User({
        company:req.body.company,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        admin:true,
        password:req.body.password
    })

    User.findOne(
        { $or: [{email:req.body.email}, {company:req.body.company}]},
        (err, existingUser) => {
            if (err) {
              return next(err);
            }
            if (existingUser) {
              req.flash("errors", {
                msg: "Account with that email address or company already exists.",
              });
              return res.redirect("../signup");
            }
            user.save((err) => {
              if (err) {
                return next(err);
              }
              req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                res.redirect("/feed");
              });
            });
          }
    )

}

