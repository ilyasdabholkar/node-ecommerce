const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

//Add Order
//REQUEST : POST
//PERMISSION : ADMIN,USER
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update Order
//REQUEST : PUT
//PERMISSION : ADMIN
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete Order
//REQUEST : DELETE
//PERMISSION : ADMIN,USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Income Stats
//REQUEST : GET
//PERMISSION : ADMIN
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const data = await Order.aggregate([
            {$match : {createdAt : {$gte: prevMonth}, ...(productId && {
                products : {$elemMatch : { productId : productId}}
            })}},
            {
                $project:{
                    month: {$month:"$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group : {
                    _id : "$month",
                    total : {$sum: "$sales"},
                },
            },
        ]);

        res.status(200).json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//Get User Orders
//REQUEST : GET
//PERMISSION : ADMIN,USER
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json(err);
    }
});

//Get All User Cart
//REQUEST : GET
//PERMISSION : ADMIN
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
