const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const express = require('express');

const cors = require('cors')

const userRoute = require('./router/userRouter');

const expenceRoute = require('./router/expenceRouter')

const buyPremiumRoute = require('./router/buyPremiumRoute')

const premiumRoute = require('./router/premiumRoute')



const db = require('./config/dbConfig')

const User = require('./model/userModel')

const Expence = require('./model/expenceModel')

const Order = require('./model/orderModel')





const app = express();

// Global middelware

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// route middelware

app.use('/user',userRoute)

app.use('/expence',expenceRoute)

app.use('/buy',buyPremiumRoute)

app.use('/premium',premiumRoute)



// db association

User.hasMany(Expence);
Expence.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);



// db sync

db.sync({force:true}).then().catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log("Server is running...!");
})