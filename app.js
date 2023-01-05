
const express = require('express');

const cors = require('cors')

const userRoute = require('./router/userRouter');

const db = require('./config/dbConfig')

const user = require('./model/userModel')



const app = express();

// Global middelware
app.use(cors())

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// route middelware

app.use('/user',userRoute)

// db sync
db.sync().then().catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log("Server is running...!");
})