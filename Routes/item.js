const express=require("express")
const router=express.Router()
const Item=require("../Models/Item")
const User=require("../Models/User")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.post("/addProduct",upload.single('image'),async function(req,res){
    var objectItem=new Item({name:req.body.name,description:req.body.description,price:Number(req.body.price),category:req.body.category,
        pack:req.body.type,info:req.body.info,image:{data:req.file.buffer,contentType:req.body.contentType}})
    objectItem.save()
})
router.get("/getProductImage/:id",async function(req,res){
    var object=await Item.findById(req.params.id)
    var defaultImage=await Item.findById("651e99f849a6fb298bf71037")
    // return res.json(object)
    if(object.image.contentType!="false"){
        res.set('Content-Type', object.image.contentType);
        res.send(object.image.data);
    }else{
        res.set('Content-Type', defaultImage.image.contentType);
        res.send(defaultImage.image.data);
    }
})
router.get("/getProduct/:id",async function(req,res){
    var object=await Item.findById(req.params.id)
    res.json(object)
})
router.get("/getAllProducts",async function(req,res){
    var all=await Item.find({})
    res.json(all.splice(1))
})
// router.get("/getAllProductImages",async function(req,res){
//     var all=await Item.find({})
//     res.json(all.filter())
// })


module.exports=router