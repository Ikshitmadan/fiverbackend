const Message=require('../models/messageModel')
const Conversation=require('../models/ConversationModel');
const createMessage=async (req,res,next)=>{
    try{
        const id=req.params.id;
        const desc=req.body.desc;
        const userId=req.userId;
        // console.log(userId,"inside create msg");
        const message=new Message({
            conversationId:id,
            userId:userId,
            desc:desc
        })
        await message.save();
        console.log(message);
        const conversation=await Conversation.findOneAndUpdate({
            id:id
        },{ $set:{
            readByBuyer:!req.isSeller,
            readySeller:req.isSeller,
            lastMessage:desc
        }
        },{new:true}
        );
        res.json(message);
    }
    catch(err){
        next(err)
    }
}

const getMessages=async (req,res,next)=>{
    try{
        const id=req.params.id;
        const msgs=await Message.find({
            conversationId:id
        })
        res.send(msgs);
    }
    catch(err){
        next(err);
    }
}

module.exports={
    createMessage,getMessages
}


