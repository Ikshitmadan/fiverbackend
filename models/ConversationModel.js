const mongoose=require('mongoose');
const {Schema} =mongoose

const ConversationSchema=new Schema({
    id:{
        type:String,
        require:true
    },

    BuyerId:{
        type:String,
        require:true,

    },
    sellerId:{
        type:String,
        require:true,
    },
    readByBuyer:{
        type:Boolean,
        require:true,
    },
    readySeller:{
        type:Boolean,
        require:true,

    },
    lastMessage:{
        type:String,
    }
},
{
    timestamps:true,
}

)
module.exports=mongoose.model('Conversation',ConversationSchema);