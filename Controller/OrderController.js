const order=require('../models/orderModel');
const Gig=require('../models/GigModel');
const createError=require('../Utils/CreateError');
const stripe = require("stripe")('sk_test_51MoMDSSIl4VwGEZmz84GWLn0AqNhrvdxTjTilcVbVbjf41IDJdYN3apAcwX75ujqFkpTcILtVRuqjpSVFO5bo9vW00qtydumBL');

module.exports.getOrders=async function(req,res,next){
try{
  console.log(req.userId," user id");
const orders=await order.find
({
    ...(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}),isCompleted:true
})

res.send(orders);
}
catch(err){
next(err);
}
}

module.exports.createOrders=async function(req,res,next){
    console.log(`create order`);
    const GigId=req.params.id;
    const gig=await Gig.findById(GigId);
    if(!gig){
        next((401,'order does not exist'));
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
      });
    
    const Order=new order({
        gigId:GigId,
        img:gig.cover,
        title:gig.title,
        buyerId:req.userId,
        sellerId:gig.userId,
        payment_intent:paymentIntent.id,
        price:gig.price
    })
    await Order.save()
    res.send({
        clientSecret: paymentIntent.client_secret,
      });

}

module.exports.confirmOrder = async function(req, res, next) {
    try {
      const orders = await order.findOneAndUpdate(
        {
          payment_intent: req.body.payment_intent,
        },
        {
          $set: {
            isCompleted: true,
          },
        }
      );
  
      res.status(200).send("Order has been confirmed.");
    } catch (err) {
      next(err);
    }
}