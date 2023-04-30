const { createError } = require('../Utils/CreateError');
const Gig=require('../models/GigModel')
const mongoose=require('mongoose');

module.exports.createGig=async function(req,res,next){
    try{
        if(!req.isSeller){
            return next(createError(401,'you are not owner'));
    
        }
    const newGig=new Gig({...req.body,userId:req.userId});
    await newGig.save();
    
    res.send(newGig);

    }
    catch(err){
      next(createError(401,"you have not filled properly"));
    }


}

module.exports.deleteGig=async function(req,res,next){
    try{
        const gig= await Gig.findById(req.params.id);
        const gigOwnerId=gig.userId;
        if(req.userId!=gigOwnerId){
    return next(createError(401,"you can only delete your gig"));
    
        }
        await Gig.findByIdAndDelete(req.params.id);
        res.send("gig deleted sucessfully");
    }

    catch(err){
        res.send(err);
    }

}

module.exports.getGig= async function(req,res,next){
    
try{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        console.log("fixed");
return next(createError(400,'your id is not valid'));

    }
    const gig= await Gig.findById(req.params.id);
    console.log(`gug`,gig);
    if(!gig){
        
        return next(createError(400,'gig does not exist'));
    }
    return res.send(gig);

}
catch(err){

   res.send(err);
}

    
}
module.exports.getGigs= async  function  (req,res,next){
    
const q=req.query;
const{min,max,cat}=q;
console.log(q.search,"hi");
const filter={};
if(q.search){
    filter.title= {$regex: q.search, $options: "i" };

}

if(q.userId){
    filter.userId=q.userId;
}
if(q.cat){
    filter.cat={$regex: cat, $options: "i" };
}
if(q.max&&q.min){
    filter.price={$gte:q.min,$lte:q.max}
}
    else if(q.min){
        filter.price={$gt:q.min};
    }
    else if(q.max){
        filter.price={$lt:q.max}
    }
    console.log(filter,"filter");

    const gigs=await Gig.find(filter).sort({[q.sort]:1});
    console.log(gigs,'GIGS');
    if(gigs.length==0){
       console.log(gigs,"complete");
      return  res.send([]);
    }
    return res.send(gigs);

}

  

