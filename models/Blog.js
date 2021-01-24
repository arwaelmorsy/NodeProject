const mongooose = require('mongoose');

const { Schema } = mongooose;


const blogSchema = new Schema({
    title:{
        type:String,
        maxlength: 256, 
        required:true,       
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    tags:[String],
    photo: String ,
    body:String,

})
const BlogModel= mongooose.model('Blog',blogSchema); 

module.exports=BlogModel;