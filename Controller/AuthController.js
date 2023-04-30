const { createError } = require('../Utils/CreateError');
const User=require('../models/UserModel');
const jwt=require('jsonwebtoken');
module.exports.register =async function  register(req,res) {
    try{
        const {username}=req.body;
        console.log(username);
    const user=new User(req.body);
    await user.save();
    res.json({
        user
    })
    }
    catch(err){
        res.send(err);
    }


}
module.exports.login= async function  login(req,res,next) {
    console.log("inside login");

    try{
        const {username}=req.body;

        const user = await User.findOne({ username: username });

        if(!user){
           return next(createError(401,"user not found"))
        }

        if(req.body.password!=user.password){
           return next(createError(401,'password is incorrect'));
        }


        const token = jwt.sign(
            {
              id: user._id,
              isSeller: user.isSeller,
            },
            process.env.JWT_KEY
          );
      
          const { password, ...info } = user._doc;
          res
            .cookie("accesstoken", token, {
              httpOnly: true,
              expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            })
            .status(200)
            .send(info);

    }
    catch(err){
        res.send(err);
    }
  

}
module.exports.logout= async function logout(req,res) {
    
    res.clearCookie("accesstoken",{
        secure:true,
        sameSite:'none'
    }).status(200).send("you are logged out");
    
}