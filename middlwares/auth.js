
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncVerify = promisify(jwt.verify);
const User = require('../models/User');

const auth = async (req,res,next)=>{
    const { headers: { authorization } } = req;
    if(!authorization){
        next((new Error('UN_AUTHENTICATED')));
    }
    try{
        //debugger
      const { id } = await asyncVerify(authorization,'$JWTSECRET$852741$');
      const user =await User.findById(id).exec();
      req.user=user;
      //debugger
      next();
    }catch (e){
        next((new Error('UN_AUTHENTICATED')));
    }
}

module.exports=auth;