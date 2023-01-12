const Razorpay = require('razorpay');

const Order = require('../model/orderModel');

module.exports.buyPremiumMembership = async(req,res)=>{

    try {
        let instance = new Razorpay({
            key_id:'rzp_test_wtF5m6hLgdVcFy',
            key_secret:'GPWZSFClrI8BLFEOoRHxdQr4'
        })
        //  creating order
       instance.orders.create({amount:299,currency:"INR"},(err,order)=>{
        if(err){
            console.log(err);
        }
        console.log(order);
        
      Order.create({orderid:order.id,status:'PENDING',userId:req.user.id})
      .then(()=>{
          return res.status(201).json({order,key_id:instance.key_id})
      })
       })
       

    } catch (error) {
        res.status(403).json({message:"something went wrong",success:false})
    }


}

module.exports.updateStatus = async(req,res)=>{
    try {
        const {payment_id,order_id} = req.body;

        const order= await Order.findOne({where:{orderid:order_id}});

        order.update({paymentid:payment_id,status:"SUCCESSFUL"});

       await req.user.update({ispremiumuser:true});

       return res.status(200).json({success:true,message:"transaction successful"})



    } catch (error) {
        res.status(404).json({success:false})
    }
}