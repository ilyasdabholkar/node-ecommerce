const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId : {type: String,required:true},
        products : [
            {
                productId : {
                    type: String
                },
                quantity : {
                    type: Number,
                    default : 1,
                }
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart",CartSchema);

/* {
    userId : _id176687767,
    products : [
        {
            productId : _id765767687,
            quantity : 1
        },
        {
            productId : _id761234687,
            quantity : 3
        }
    ]
} */