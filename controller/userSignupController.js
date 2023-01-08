

const User = require('../model/userModel')

module.exports.addUser = (req,res)=>{
    let {name,email,password} = req.body;
  
    if(name == null || email == null || password == null){
        return res.status(400).json({err:"bad parameter"})
    }
    User.create({
        name : name,
        email : email,
        password:password
    })
    .then(()=>{
      return res.status(201).json({message:"successfully Registred"});
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

module.exports.loginUser = (req,res)=>{
    let {email,password} = req.body;
    
    User.findAll({where:{email:email},raw:true})
    .then((data)=>{
        if(data){
        if(data[0].password===password){
          res.status(200).json({message:" User login sucessfu"})
        }else{
            res.status(401).json({message:"User not authorized"})
        }
        }
    }).catch((err)=>{
        res.status(404).json({err:"User not found"})
    })

}
