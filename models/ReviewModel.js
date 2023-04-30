const mongoose=require('mongoose');
const {Schema} =mongoose

const ReviewSchema=new Schema({
    GigId:{
        type:String,
        require:true
    },

    UserId:{
        type:String,
        require:true,

    },
    star:{
        type:Number,
        require:true,
        enum:[1,2,3,4,5]
    },
    desc:{
        type:String,
        require:true,
    }
    },
    {
        timestamps:true,
    }
    )
module.exports=mongoose.model('review',ReviewSchema);