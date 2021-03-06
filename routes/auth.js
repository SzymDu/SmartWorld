var express = require("express");
var router = express.Router();
var Phone = require("../models/phone");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");


router.get("/register", function(req, res) {
    res.render("register");
})

router.post("/register" , function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser , req.body.password , function(err, user){
        if(err){
            console.log(err);
          return  res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/phones");
        })
    });
});

router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login" , passport.authenticate("local", {
    successRedirect:"/phones",
    failureRedirect:"/login"
    
}), function(req, res) {
  

});

router.get("/logout" , function(req, res) {
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req , res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
    
}
router.get("/" , function(req, res){
    res.render("landing");
});

module.exports= router;