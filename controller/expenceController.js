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
    Expence.findAll({raw:true}).then((expence)=>{
        // console.log(expence )
    return res.status(200).json({expence,sucsses:true});
        
    }).catch((err)=>{
        res.status(500).json(({error:err,success:false}))
    })
}


module.exports.deleteExpence = async(req,res)=>{

    try {
       const expenceID = req.params.id;
       const responce = await Expence.destroy({where:{id:expenceID}});
       res.status(200).json({message:"expence deleted", success:true});

    } catch (error) {
        res.status(500).json({err:error});
        
    }


}