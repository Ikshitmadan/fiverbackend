const User= require("../models/UserModel");
const jwt=require('jsonwebtoken');
 
 module.exports.getUser= async function  (req,res){
    try{
        console.log(req.params.id);

        const user= await User.findById(req.params.id);

        // console.log(user);
        res.status(200).send(user);
        
    }
    catch(err){
        res.send(err);
    }


}

module.exports.deleteUser= async function (req,res){
    try{
        const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return res.status(401).send("you cannot delete other user");
  }
        console.log('inside delete');
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("user deleted");
    }
    catch(err){
        res.send(err);
    }


}

