const express=require('express');
const { getOrders, createOrders, confirmOrder } = require('../Controller/OrderController');
const { verifytoken } = require('../middleware/jwt');

const OrderRouter=express.Router();
// create route
OrderRouter.get('/',verifytoken,getOrders);
OrderRouter.post('/:id',verifytoken,createOrders);
OrderRouter.put('/',verifytoken,confirmOrder);
module.exports=OrderRouter;