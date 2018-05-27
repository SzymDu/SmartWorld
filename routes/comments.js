var express = require("express");
var router = express.Router();
var Phone = require("../models/phone");
var Comment = require("../models/comment");

router.get("/phones/:id/comments/new",isLoggedIn, function(req, res) {
    Phone.findById(req.params.id , function(err ,phone){
        if(err){
            console.log(err)
        }
        else{
            res.render("comments/new", {phone:phone});
        }
    });
  
});

router.post("/phones/:id/comments" , isLoggedIn ,  function(req, res) {
     Phone.findById(req.params.id , function(err ,phone){
         if(err){
             console.log(err);
         }else{
             console.log
            Comment.create(req.body.comment , function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username= req.user.username;
                    
                    comment.save();
                    phone.comments.push(comment);
                    phone.save();
                    console.log(comment);
                    res.redirect("/phones/" + phone._id);
                }
            })
         }
     });
});
function isLoggedIn(req , res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
    
}
module.exports = router;