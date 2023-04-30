const express=require('express');
const { verifytoken } = require('../middleware/jwt');
const { getReview, DeleteReview, createReview } = require('../Controller/ReviewController');
const  ReviewRouter=express.Router();
ReviewRouter.get('/:id',getReview);
ReviewRouter.delete('/:id',verifytoken,DeleteReview);
ReviewRouter.post('/:id',verifytoken,createReview);
module.exports=ReviewRouter;
