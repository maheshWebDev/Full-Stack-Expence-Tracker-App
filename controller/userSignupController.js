const bcrypt = require('bcrypt')

const User = require('../model/userModel')

module.exports.addUser = async(req,res)=>{


    try {
        let {name,email,password} = req.body;
  
    if(name == null || email == null || password == null){
        return res.status(400).json({err:"bad parameter"})
    }

    const saltRound = 10
    bcrypt.hash(password,saltRound, async(err,hash)=>{
    await User.create({ name : name, email : email, password:hash})
    return res.status(201).json({message:"successfully Registred"})

})
    }
    catch(err) {
     res.status(500).json(err);
    }
    
}

module.exports.loginUser = (req,res)=>{
    
    let {email,password} = req.body;
    
    User.findAll({where:{email:email},raw:true})
    .then((data)=>{
        if(data){
            console.log(data)
bcrypt.compare(password, data[0].password,(err,result)=>{
    if(err){
            return  res.status(401).json({message:"password is incorrect"})
    }
    if(result){
        res.status(200).json({message:" User login sucessfu"})
    }
})
        }else{
          return  res.status(404).json({err:"User not found"})
        }
    }).catch((err)=>{
        res.status(500).json({err:"not found",success:false})
    })

}
