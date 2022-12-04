const router = require("express").Router();
const Product = require("../models/Product");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

//Add Product 
//REQUEST : POST
//PERMISSION : ADMIN
router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//Update Product
//REQUEST : PUT
//PERMISSION : ADMIN
router.put('/:id',verifyTokenAndAdmin,async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true});
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete Product
//REQUEST : DELETE
//PERMISSION : ADMIN
router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

//Get Product
//REQUEST : GET
//PERMISSION : ALL
router.get("/:id",async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
        
    }catch(err){
        res.status(500).json(err);
    }
});

//Get All Products
//REQUEST : GET
//PERMISSION : ADMIN
router.get("/",async (req,res)=>{
    // /api/products?new=true
    // /api/products?category=Men
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const limit = 10
    try{
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt : -1}).limit(limit);
        }else if(qCategory){
            products = await Product.find({category : {
                $in : [qCategory],
            }});
        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;
