const Expence = require('../model/expenceModel');

module.exports.addExpence = (req,res)=>{
    const {expenceName,amount,description} = req.body;
    
    console.log(expenceName,amount,description)
    Expence.create({
        expenceName : expenceName,
        amount : amount,
        description:description

    })
    .then((data)=>{
        console.log(data.toJSON())
        res.status(200).json({message:"sucssesfully added"});
    }).catch((err)=>{
        res.status(400).json({err:"something went wrong"});
    })
}

module.exports.getExpence = (req,res)=>{
    Expence.findAll()
    .then((data)=>{
       
        console.log(data.toJSON())
     res.status.json({data:data.toJSON()})
        
    }).catch((err)=>{
        res.status(400).json(({err:"something went wrong"}))
    })
}