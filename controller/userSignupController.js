const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

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

module.exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

       let user = await User.findAll({where:{email:email},raw:true});
       if(!user) return res.status(400).json({message:"Invalid email."});

       const validPassword = await bcrypt.compare(password,user[0].password);
       if(!validPassword) return res.status(400).json({message:"Invalid password."});

      const token = jwt.sign({userId:user[0].id,ispremiumuser:user[0].ispremiumuser},"jwtPrivateKey");
      res.status(200).json({message:"user logged in successful",token:token});

    } catch (error) {
        res.status(500).json({err:"not found",success:false})
    }
}


