const express=require('express');
const { verify } = require('jsonwebtoken');
const { getSingleConversation, createCoversation, getCoversations, updateConversation } = require('../Controller/ConversationController');
const { verifytoken } = require('../middleware/jwt');
const ConverationRouter=express.Router();
ConverationRouter.get('/single/:id',verify,getSingleConversation);
ConverationRouter.post('/',verifytoken,createCoversation);
ConverationRouter.get('/',verifytoken,getCoversations);
ConverationRouter.put("/:id", verifytoken, updateConversation);

module.exports=ConverationRouter;