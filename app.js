var databaseURL="mongodb+srv://ziad:ziad1234@cluster0.canikqt.mongodb.net/?retryWrites=true&w=majority"
const express = require("express");
const mongoose = require('mongoose');
const bodyParser=require("body-parser");
const User=require("./Models/User")
const Item=require("./Models/Item")
const productRouter=require("./Routes/item")
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
// const MongoURI="mongodb+srv://ziad:ZAheg1234@cluster0.wl2og51.mongodb.net/?retryWrites=true&w=majority"

//App variables
const authRouter=require("./Routes/auth")
const app = express();
const port = process.env.PORT || "8000";
const cors=require("cors")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const req = require("express/lib/request");
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({limit:'20mb'}))
app.use("/",productRouter)
app.use("/",authRouter)
mongoose.connect(databaseURL)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
