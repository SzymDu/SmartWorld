var mongoose = require("mongoose");
var Phone = require("./models/phone");
var Comment = require("./models/comment");
var data = [
        {name: "Samsung" , image: "http://images.samsung.com/is/image/samsung/p5/global/mkt/pfs/PCD_Purple.jpg?$ORIGIN_JPG$"},
        {name:"Huawei" , image:"https://f01.esfr.pl/foto/1/18141416353/51ee19e5089e53431fc81b73eabd147b/huawei-p10-lite-czarny,18141416353_7.jpg"},
         {name: "Samsung" , image: "http://images.samsung.com/is/image/samsung/p5/global/mkt/pfs/PCD_Purple.jpg?$ORIGIN_JPG$"},
        {name:"Huawei" , image:"https://f01.esfr.pl/foto/1/18141416353/51ee19e5089e53431fc81b73eabd147b/huawei-p10-lite-czarny,18141416353_7.jpg"},
        {name:"Huawei" , image:"https://f01.esfr.pl/foto/1/18141416353/51ee19e5089e53431fc81b73eabd147b/huawei-p10-lite-czarny,18141416353_7.jpg"}
        
        ];
//Remove
function seedDB(){
Phone.remove({} , function(err){
  if(err){
      console.log("removed campgrounds");
  }
    
});
data.forEach(function(seed){
  Phone.create(seed, function(err, phone){
      if(err){
          console.log("error");
      }else{
          console.log(phone)
          Comment.create({
                text:"WOW ten telefon jest super",
              author:"Wojtek"
          },function(err , comment){
              if(err){
                  console.log(err);
              }
              else{
                    phone.comments.push(comment);
                    phone.save();
              }
              
          })
      }
  }) 
});
 }
module.exports=seedDB