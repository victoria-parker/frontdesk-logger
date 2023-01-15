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
const moment=require("moment")


//dotenv config
require("dotenv").config({path: "./config/config.env"})

//mongoose settings
mongoose.set('strictQuery', true);

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

//Server Running
app.listen(process.env.PORT, () => {
    console.log(console.log(`Server running in ${process.env.NODE_ENV} mode`));
});