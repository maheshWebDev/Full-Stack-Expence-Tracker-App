
const user = require('../model/userModel')

module.exports.addUser = (req,res)=>{
    user.create({
        name : req.body.name,
        email : req.body.email,
        password:req.body.password
    })
    .then(()=>{
        res.sendStatus(200)
    })
    .catch((err)=>{
        console.log(err);
    })
}