const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongooose;


const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        maxlength:150,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstName:String,
    lastName:String,
    dob:Date,
    followers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
},{
    toJSON:{
        transform: (doc ,ret ,options)=>{
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', function preSave(next){
    this.password = bcrypt.hashSync(this.password ,8);
    next();
});
userSchema.pre('findOneAndUpdate', function preSave(next){
    if(!this._update.password){
        return;
    }
    this._update.password = bcrypt.hashSync(this._update.password ,8);
    next();
});

userSchema.methods.validatePassword = function validatePassword(password){
    return bcrypt.compareSync(password,this.password);
}

const userModel = mongooose.model('User',userSchema);
module.exports=userModel;