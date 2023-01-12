const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

module.exports.authenticate = async(req,res,next)=>{
try {
    const token = req.header('Authorization');
    // console.log(token);

    const userObj = jwt.verify(token,'jwtPrivateKey');
    // console.log(userObj);
    const user = await User.findByPk(userObj.userId);

    if(!user) return res.status(404).json({Message:"user not found"});

    req.user = user;
    next();

} catch (error) {
    return res.status(401).json({success:false});
}
}