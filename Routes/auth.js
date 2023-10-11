const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const secretKey="asasafssaff12412"
const expire='24h'
const Item=require("../Models/Item")
const User=require("../Models/User")
const Admin=require("../Models/Admin")

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
router.get("/getTokenNoLogin",async function(req,res){

    const token=jwt.sign({id:uuidv4()},secretKey,{expiresIn:expire})
    res.json(token)
})
router.post("/getTokenLogin",async function(req,res){
    const username=req.body.username
    const password=req.body.password
    const token=jwt.sign({username:username,password:password},secretKey,{expiresIn:expire})
    res.json(token)
})
router.post("/validateToken",async function(req,res){
    const token=req.body.token
    try{
        const data=jwt.verify(token,secretKey)
        res.json("goodToken")
    }
    catch(error){
        const token=jwt.sign({id:uuidv4()},secretKey,{expiresIn:expire})
        res.json(token)

    }
})
router.post("/addToCart",async function(req,res){
    const token=req.body.token
    const count=req.body.count
    const productId=req.body.productId
    const userData=jwt.verify(token,secretKey)
    const toBeAddedItem=await Item.findById(productId)
    var cart=[]
    if(userData.cart){
        cart=userData.cart
    }
    var found=false
    var foundIndex=0
    for(var i=0;i<cart.length;i++){
        if(cart[i]._id==productId){
            found=true
            foundIndex=i
            break;
        }
    }
    if(!found){

        cart.push({...toBeAddedItem,count:count})
    }else{
        cart[foundIndex]={...cart[foundIndex],count:cart[foundIndex].count+count}
    }
    const newToken=jwt.sign({...userData,cart:cart},secretKey)
    res.json(newToken)

})
router.post("/getMyCart",async function(req,res){
    const token=req.body.token
    const data=jwt.verify(token,secretKey)
    console.log(data.cart)
    res.json(data.cart)

})
router.post("/login",async function(req,res){
    const admin=await Admin.find({$or:[{mobile:req.body.mobile,password:req.body.password},{email:req.body.mobile,password:req.body.password}]})
    if(admin.length==0){
        const token=req.body.token
        const data=jwt.verify(token,secretKey)
        const user=await User.find({$or:[{mobile:req.body.mobile,password:req.body.password},{email:req.body.mobile,password:req.body.password}]})
        if(user.length==0){
            res.json("wrong username or password")
        }else{
            const newToken=jwt.sign({mobile:req.body.mobile,password:req.body.password,cart:data.cart},secretKey)
            res.json(newToken)
        }
    }else{
        const token=jwt.sign({admin:"true",mobile:req.body.mobile},secretKey)
        res.json({admin:true,token:token})
    }

})
module.exports=router