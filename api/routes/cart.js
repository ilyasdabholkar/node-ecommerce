const router = require("express").Router();
const Cart = require("../models/Cart");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");

//Add User Cart
//REQUEST : POST
//PERMISSION : ADMIN,USER
router.post("/",verifyToken,async (req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})

//Update User Cart
//REQUEST : PUT
//PERMISSION : ADMIN,USER
router.put('/:id',verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete User Cart
//REQUEST : DELETE
//PERMISSION : ADMIN,USER
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//Get User Cart
//REQUEST : GET
//PERMISSION : ADMIN,USER
router.get("/:userId",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId : req.params.userId});
        res.status(200).json(cart);
        
    }catch(err){
        res.status(500).json(err);
    }
});

//Get All User Cart
//REQUEST : GET
//PERMISSION : ADMIN
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
