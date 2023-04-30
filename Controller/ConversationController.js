const Conversation=require('../models/ConversationModel');
const {createError}=require('../Utils/CreateError')
module.exports.createCoversation=async function(req,res,next){
  console.log(req.body.id);
const newConversation=new Conversation({
    id:req.isSeller?(req.userId+req.body.id):(req.body.id+req.userId),
    BuyerId:req.isSeller?(req.body.id):(req.userId),
    readByBuyer:!req.isSeller,
    readySeller:req.isSeller,
    sellerId:(req.isSeller)?(req.userId):(req.body.id)

});
await newConversation.save();
res.send(newConversation);
}

module.exports.getSingleConversation = async function(req,res,next){
    try {
        const conversation = await Conversation.findOne({ id: req.params.id });
        if (!conversation) return next(createError(404, "Not found!"));
        res.status(200).send(conversation);
      } catch (err) {
        console.log(err);
        next(err);
      }

}
module.exports.getCoversations =async (req,res,next)=>{
    try {
      console.log(req.isSeller,req.userId);;
        const conversations = await Conversation.find(
          req.isSeller ? { sellerId: req.userId } : { BuyerId: req.userId }
        )?.sort({ updatedAt: -1 });

        console.log(conversations);

        if(!conversations){
res.send([]);
        }
        res.status(200).send(conversations);
      } catch (err) {
        console.log(err);
        next(err);
      }
}

module.exports.updateConversation = async (req, res, next) => {
    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {

            readBySeller: true,
            readByBuyer: true,
          },
        },
        { new: true }
      );
      res.status(200).send(updatedConversation);
    } catch (err) {
      next(err);
    }
  };