const express= require("express");
const bodyParser= require("body-parser");

const mongoose=require("mongoose");
const app = express();
app.set("view engine","ejs");
app.use(express.static("public")); 

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true})); 

const itemSchema={
    name:String
}
const Item= mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome to your todolist!"
});
const item2=new Item({
    name:"Hit + button to add new item!"
});
const item3=new Item({
    name:"Hit - to delete the item !"
});
const defaultItems=[item1,item2,item3];
Item.insertMany(defaultItems,function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Successfully default items to database");
    }
})
app.get("/",function(req,res){

res.render("list",{listTitle: "Today",newlistItems:listItems});  
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