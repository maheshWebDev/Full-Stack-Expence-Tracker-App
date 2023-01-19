const Expence = require('../model/expenceModel');

const AWS = require('aws-sdk')

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

function uploadToS3(data,fileName){

    let s3bucket = new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECRET,
    })
    
        var params = {
            Bucket:process.env.BUCKET_NAME,
            Key: fileName,
            Body:data,
            ACL: 'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,success)=>{
                if(err){
                    console.log("something went wrong")
                    reject(err)
                }else{
                    console.log('result', success)
                    resolve(success.Location)
                }
            })
        })
        
    

}




module.exports.downloadExpense = async(req,res)=>{

    try {
       const expenses = await Expence.findAll({where:{userId:req.user.id}})
         const stringifiendExpenses = JSON.stringify(expenses)
         const fileName = `Expense/${req.user.id}/${new Date()}.txt`;
         const fileURL = await uploadToS3(stringifiendExpenses,fileName )
       res.status(200).json({fileURL,success:true})
    

       
        
    } catch (error) {
        res.status(500).json({fileURL:'',success:false})
    }
  
}