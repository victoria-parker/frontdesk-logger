const express=require("express")
const app=express()
// const mongoose=require("mongoose")
const passport=require("passport")
const session=require("express-session")
// const MongoStore = require("connect-mongo")(session);
const methodOverride=require("method-override")
const flash=require("express-flash")
const logger=require("morgan")
// const connectDB=require("./config/database")
const mainRoutes=require("./routes/main")

//dotenv config
require("dotenv").config({path: "./config/config.env"})

// Passport config
require("./config/passport")(passport);

//Connect To Database
// connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Setup Routes
app.use("/", mainRoutes)

//Server Running
app.listen(process.env.PORT, () => {
    console.log(console.log(`Server running in ${process.env.NODE_ENV} mode`));
});