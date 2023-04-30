const express=require('express');
const { verifytoken } = require('../middleware/jwt');
const { createGig,deleteGig, getGig,getGigs} = require('../Controller/GigController');
const GigRouter=express.Router();

GigRouter.post('/',verifytoken,createGig);
GigRouter.delete('/:id',verifytoken,deleteGig);
GigRouter.get('/single/:id',verifytoken,getGig);
GigRouter.get('/',verifytoken,getGigs);

module.exports=GigRouter;