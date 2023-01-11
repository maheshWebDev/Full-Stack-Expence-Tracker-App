const Expence = require('../model/expenceModel');

module.exports.addExpence = async(req,res)=>{

    try {
        const {expenceName,amount,description} = req.body;
        
       const expence = await Expence.create({ expenceName : expenceName, amount : amount,description:description,userId:req.user.id})
         return res.status(200).json({message:"sucssesfully added",success:true});

    } catch ( error) {
        res.status(400).json({err:"something went wrong",success:false});
    }
    
}

module.exports.getExpence = async (req,res)=>{
    
    try {
      const expence = await  Expence.findAll({where:{userId:req.user.id}})

      if(!expence) return res.status(400).json({message:"no expence found"});

      return res.status(200).json({expence,sucsses:true});

    } catch (error) {
        return res.status(500).json({success:false})
    }

    
}


module.exports.deleteExpence = async(req,res)=>{

    try {
       const expenceID = req.params.id;
       
       const responce = await Expence.destroy({where:{id:expenceID,userId:req.user.id}});
       res.status(200).json({message:"expence deleted", success:true});

    } catch (error) {
        res.status(500).json({err:error});
        
    }


}