const express=require('express');
const { verifytoken } = require('../middleware/jwt');
const { deleteUser, getUser } = require('../Controller/userController');

const userRouter=express.Router();
userRouter.delete('/:id',verifytoken,deleteUser);
userRouter.get('/:id',verifytoken,getUser);

module.exports=userRouter
