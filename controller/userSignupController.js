
const { and } = require('sequelize');
const user = require('../model/userModel')

module.exports.addUser = (req,res)=>{
    let {name,email,password} = req.body;
  
    if(name == null || email == null || password == null){
        return res.status(400).json({err:"bad parameter"})
    }
    user.create({
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

