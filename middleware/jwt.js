const jwt=require('jsonwebtoken');
const { createError } = require('../Utils/CreateError');

module.exports.verifytoken=function async(req,res,next){
    console.log("verify");
    const authHeader=req.headers['authorization'];
    const tokenId= authHeader&& req.headers["authorization"].split(" ")[1];
    
    console.log(tokenId,"hey");
    if(!tokenId){
        console.log("hi");
        return next(createError(404,"not authenticated"));
    }

    jwt.verify(tokenId,process.env.JWT_KEY,async(err,payload)=>{
        if(err){
            console.log(err);
            res.status(401).send("token is not valid");
        }
        req.userId=payload.id;
        req.isSeller=payload.isSeller;
        next()
     
    })
}