const express=require("express")
const app=express()
const mongoose=require("mongoose")
const passport=require("passport")
const session=require("express-session")
const MongoStore = require("connect-mongo")(session);
const methodOverride=require("method-override")
const flash=require("express-flash")
const logger=require("morgan")
const connectDB=require("./config/database")
const mainRoutes=require("./routes/main")
const issuesRoutes=require("./routes/issues")
const notesRoutes=require("./routes/notes")
const taxisRoutes=require("./routes/taxis")
const wakeUpCallsRoutes=require("./routes/wakeUpCalls")
const usersRoutes=require("./routes/users")
const moment=require("moment")


//dotenv config
require("dotenv").config({path: "./config/config.env"})

//mongoose settings
mongoose.set('strictQuery', false);

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//moment setup
app.locals.moment = moment; 

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//Method Override
app.use(methodOverride(function (req,res){
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
      let method=req.body._method
      delete req.body._method
      return method
  }
}))

//Logging
app.use(logger("dev")); //to start morgan

//Sessions setup
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash setup
app.use(flash())

//Setup Routes
app.use("/", mainRoutes)
app.use("/issues",issuesRoutes)
app.use("/notes",notesRoutes)
app.use("/taxis",taxisRoutes)
app.use("/wakeUpCalls",wakeUpCallsRoutes)
app.use("/users",usersRoutes)

//Server Running
app.listen(process.env.PORT, () => {
    console.log(console.log(`Server running in ${process.env.NODE_ENV} mode`));
});