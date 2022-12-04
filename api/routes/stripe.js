const router = require("express").Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment',async (req,res)=>{

    await stripe.paymentIntents.create({
        //source : req.body.tokenId,
        amount: req.body.amount,
        currency: 'inr',
        payment_method_types: ['card'],
    },(stripeError,stripeResponse)=>{
        if(stripeError){
            res.status(500).json(stripeError);
        }else{
            res.status(200).json(stripeResponse);
        }
    });

    // await stripe.charges.create({
    //     source : req.body.tokenId,
    //     amount : req.body.amount,
    //     currency : 'inr',
    // });
});



module.exports = router;