const express= require("express");
const bodyParser= require("body-parser");
const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
let listItems =["eat","sleep","repeat"];
let workItems=[];
app.use(bodyParser.urlencoded({extended:true})); 
app.get("/",function(req,res){
let today= new Date();
let options={
    weekday:"long",
    day:"numeric",
    month:"long"
};
let day=today.toLocaleDateString("en-US",options);
res.render("list",{listTitle: day,newlistItems:listItems});  
});
app.post("/",function(req,res){
  let item=req.body.newItem;
  if(req.body.list==="Work List"){
    workItems.push(item);
res.redirect("/Work");  
}
else{
listItems.push(item);
    res.redirect("/");
}
});
app.get("/Work",function(req,res){
res.render("list",{listTitle: "Work List",newlistItems:workItems})
});
app.get("/About",function(req,res){
    res.render("About");
});
app.listen(3000,function(){
    console.log("Listening to port 3000!!!");
});