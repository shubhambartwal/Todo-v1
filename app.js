const express= require("express");
const bodyParser= require("body-parser");
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
var listItems =["eat","sleep","repeat"];
app.use(bodyParser.urlencoded({extended:true})); 
app.get("/",function(req,res){
var today= new Date();
var options={
    weekday:"long",
    day:"numeric",
    month:"long"
};
var day=today.toLocaleDateString("en-US",options);
res.render("list",{kindOfDay: day,listItems:listItems});  
});
app.post("/",function(req,res){
    listItems.push(req.body.newItem);
    console.log(listItems);
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Listening to port 3000!!!");
});