var express = require("express");
var router = express.Router();
var Phone = require("../models/phone");
var Comment = require("../models/comment");


router.get("/phones" , function(req, res){
     //Get phones from DB
     
     Phone.find({}, function(err, allphone){
         if(err){
             console.log("error get");
         }
         else{
             res.render("phones/index", {phones:allphone, currentUser:req.user});
         }
     })
    
        // res.render("phones", {phones:phones});
});
// router.post("/s/phones" , function(req, res) {
//   var search=req.body.search;
//   var searchPhones = [{name:"" , image:""}];
//  var findOne;
//   for(var i=0; i<phones.length; i++){
//       if(search==phones[i].name){
//          findOne={name:phones[i].name , image:phones[i].image};
//       searchPhones.push(findOne);
//           console.log(searchPhones);
//       }
//   }
//   res.render("s" , {searchPhones:searchPhones});
   
// });
router.post("/phones", isLoggedIn , function(req , res){
  var name=req.body.name;
  var image=req.body.name;
  var desc=req.body.description
  var author = {
      id:req.user._id,
      username:req.user.username
  }
  var newPhone={name:name , image:image , description:desc , author:author};
    Phone.create(newPhone, function(err, newphone){
        if(err){
            console.log(err)
        }
        else{
             res.redirect("/phones");
        }
    });
  
});

router.get("/phones/new", isLoggedIn , function(req, res) {
   res.render("phones/new.ejs");
});


///Show info
router.get("/phones/:id" , function(req, res) {
    Phone.findById(req.params.id).populate("comments").exec(function(err , phone){
       if(err){
       console.log(err);}
       else{
           res.render("phones/show" , {phone:phone})
       }
    });
    
    
    
});


router.get("/phones/:id/edit" , function(req, res) {
    Phone.findById(req.params.id, function(err, foundPhone){
        if(err) {
            console.log(err);
        }
        else{
             res.render("phones/edit" , {phone:foundPhone});
        }
    })
   
})

router.put("/phones/:id", function(req,res){
 
    Phone.findByIdAndUpdate(req.params.id,req.body.phone, function(err, updated){
        if(err) {
            console.log(err);
        }
        else{
             res.render("phones/"+req.params.id);
        }
    })
})






function isLoggedIn(req , res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
    
}

module.exports = router;