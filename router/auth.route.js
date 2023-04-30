const express=require('express');
const { register, login, logout } = require('../Controller/AuthController');

const authRouter=express.Router();
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.get('/logout',logout);
module.exports=authRouter