const review=require('../models/ReviewModel');
const Gig=require('../models/GigModel');

module.exports.getReview=async function(req,res,next){
    try{
const id=req.params.id;

        const reviews = await review.find({GigId:id});


        res.status(200).send(reviews);


    }
    catch(err){
        next(err)

    }

}


module.exports.createReview= async function(req,res,next){
    const id=req.params.id;

    try{
 const gig=await Gig.findById(id);
var x = Number(req.body.star);
        gig.totalStars+=x;

        gig.starNumber+=1;
        await gig.save();

        const Review=new review({
            GigId:id,
            UserId:req.userId,
            star:req.body.star,
            desc:req.body.desc,
            
        });

        
        await Review.save()

        res.send(Review);
    }
    catch(err){
        next(err)

    }

}

module.exports.DeleteReview =async function(req,res,next){
    const id=req.params.id;
    const rev =await review.findById(id);
    if(!rev){
       return res.send('review does not exist');
    }
    if(req.userId!=rev.UserId){

return res.send('you can only delete your review');
    }
   await  review.findByIdAndDelete(rev);
   
}

