const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

dotenv.config();
const app = express();
mongoose.connect(process.env.MOGODB_URL).then(()=> {
    console.log('Connected to DB')
  }).catch((err)=> {
    console.log(err)
  })


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/v1/auth", authRouter)
app.use("/v1/user", userRouter)

app.listen(8000, ()=>{
    console.log('Sever is running');
});