const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const {verifyTokenAndAuthorization} = require("../middlewares/verifyToken");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

//Update User 
//REQUEST : PUT
//PERMISSION : ADMIN,USER
router.put('/:id',verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.ENCRYPTION_SECRET).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete User 
//REQUEST : DELETE
//PERMISSION : ADMIN,USER
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/stats",verifyTokenAndAdmin,async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data = await User.aggregate([
            {$match : {createdAt : {$gte: lastYear}}},
            {
                $project:{
                    month: {$month:"$createdAt"},
                },
            },
            {
                $group : {
                    _id : "$month",
                    total : {$sum: 1},
                },
            },
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});

//Get User
//REQUEST : GET
//PERMISSION : ADMIN
router.get("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others } = user._doc;
        res.status(200).json(others);
        
    }catch(err){
        res.status(500).json(err);
    }
});

//Get All Users
//REQUEST : GET
//PERMISSION : ADMIN
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    // /api/users?new=true
    const query = req.query.new;
    const limit = 10;
    try{
        const users = query ? await User.find().sort({ _id : -1}).limit(limit) : await User.find();
        //const {password, ...others } = users._doc;
        res.status(200).json(users);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;
