const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const env = require("dotenv");

env.config()

app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended: true})); 


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/stripe');


mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("connection successful")
}).catch((error)=>{
    console.log(error)
});


app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/stripe',paymentRoutes);


app.listen(process.env.PORT || 5000,()=>{
    console.log(`Api Server running on port ${process.env.PORT}`);
})