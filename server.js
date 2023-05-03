const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRouter = require('./router/auth.route');
const app=express();
const  cookieParser = require('cookie-parser');
const userRouter = require('./router/user.route');
const cors=require('cors');
const GigRouter = require('./router/gig.route');
const ReviewRouter = require('./router/review.route');
const OrderRouter = require('./router/order.route');
const ConverationRouter = require('./router/conversation.route');
const MessageRouter = require('./router/message.route');
const port=process.env.port||8800
const BASE_URL=process.env.BASE_URL
dotenv.config()
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };



  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use(cors({origin:"https://fiver-ui.onrender.com",credentials:true}))



app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRouter )
app.use('/api/user',userRouter);
app.use("/api/gigs", GigRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/conversations", ConverationRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/reviews", ReviewRouter);


app.use((err,req,res,next)=>{
    
    const errorStatus=err.status||500;
    const errorMessage=err.message||"something went wrong";
    return res.status(errorStatus).send(errorMessage);

})
app.listen(port,()=>{
    connect()
    console.log("backend is running");
})