var express =               require("express");
var app =                   express();
var mongoose =              require("mongoose");
var bodyParser =            require("body-parser");
var Phone = require("./models/phone");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var commentRoutes = require("./routes/comments");
var phonesRoutes = require("./routes/phones");
var authRoutes = require("./routes/auth");

var seedDB = require("./seeds");
// seedDB();
var phones = [
        {name: "Samsung" , image: "http://images.samsung.com/is/image/samsung/p5/global/mkt/pfs/PCD_Purple.jpg?$ORIGIN_JPG$"},
        {name:"Huawei" , image:"https://f01.esfr.pl/foto/1/18141416353/51ee19e5089e53431fc81b73eabd147b/huawei-p10-lite-czarny,18141416353_7.jpg"},
         {name: "Samsung" , image: "http://images.samsung.com/is/image/samsung/p5/global/mkt/pfs/PCD_Purple.jpg?$ORIGIN_JPG$"},
        {name:"Huawei" , image:"https://f01.esfr.pl/foto/1/18141416353/51ee19e5089e53431fc81b73eabd147b/huawei-p10-lite-czarny,18141416353_7.jpg"},
        {name:"Huawei" , image:"https://f01.esfr.pl/foto/1/18141416353/51ee19e5089e53431fc81b73eabd147b/huawei-p10-lite-czarny,18141416353_7.jpg"}
        
        ];
mongoose.connect("mongodb://localhost/smart_world");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.set("view engine" , "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
// Schema setup
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
app.use(require("express-session")({
    secret:"dog",
    resave:false,
    saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Phone.create({
//   name:"Huawei" , 
//   image:"https://f01.esfr.pl/foto/1/18141416353/51ee19e5089e53431fc81b73eabd147b/huawei-p10-lite-czarny,18141416353_7.jpg",
//     description:"Huawej fajny fajny nie drogi no lofciam<3"
    
// }, function(err, phone){
//     if(err){
//         console.log("error");
//     }
//     else{
//         console.log("Dodano");
//         console.log(phone);
//     }
// });






//Coments

//===================
/////////Authorysation!!!!!!!!!
//Show register
app.use(authRoutes);
app.use(commentRoutes);
app.use(phonesRoutes);

app.listen(process.env.PORT , process.env.IP , function(){
    console.log("started");
});