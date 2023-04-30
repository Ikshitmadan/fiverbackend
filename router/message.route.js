const express=require('express');
const { getMessages, createMessage } = require('../Controller/MessageController');
const { verifytoken } = require('../middleware/jwt');
const MessageRouter=express.Router();
MessageRouter.get('/:id',verifytoken,  getMessages);
MessageRouter.post('/:id', verifytoken, createMessage)
module.exports=MessageRouter;