const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);

const create =(user)=>{
   return User.create(user);

 }
 const login= async ({username,password})=>{
    const user =await User.findOne({username}).exec();
    if(!user){
        throw Error('UN_AUTHENTICATED');
    }
    const isValidPass = user.validatePassword(password);
    if(!isValidPass){
       // debugger
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        username: user.username,
        id: user.id,
    },'$JWTSECRET$852741$',{ expiresIn: '1d'});
    return {...user.toJSON(), token};
 }
 const edit=(Id,body)=>{
    return User.findByIdAndUpdate(Id,body, { new: true }).exec();
}
const getAll=()=>{
    return User.find({}).exec();
}
const pushFId = async (id, target)=>{
    const currentUser = await User.findById(id).exec();
    if(target != id && !currentUser.following.find(item=>item == target)){
        User.updateOne({ _id:id },{$push :{ followers: target }},{ new: true }).exec();
        User.updateOne({ _id:target },{$push :{ following: id }},{ new: true }).exec();
        return {"status":"followed"};
    }else{
        throw Error("INVALID_ID");
    }
}
const pullFId = async (id, target)=>{  
        User.updateOne({ _id:id },{$pull :{ followers: target }},{ new: true }).exec();
        User.updateOne({ _id:target },{$pull :{ following: id }},{ new: true }).exec();
        return {"status":"unfollowed"};    
}

module.exports = { 
    create,login,edit,getAll,pushFId,pullFId
    
}