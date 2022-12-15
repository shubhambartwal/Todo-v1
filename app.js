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
app.get("/",function(req,res){
Item.find({},function(err,foundItems){
    if(foundItems.length===0)
    {

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

    }
    res.render("list",{listTitle: "Today",newlistItems:foundItems});  
    //console.log(foundItems);
});

});

app.post("/",function(req,res){
  const  itemName=req.body.newItem;
  const item= new Item({name:itemName});
item.save();
res.redirect("/");
});
app.post("/delete",function(req,res)
{
    const checkedItemId=req.body.checkbox;
   Item.findByIdAndRemove(checkedItemId,function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Successfully deleted the item from database");
    res.redirect("/");
    }

   }); 
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