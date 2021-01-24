const Blog = require('../models/Blog');


const create =(blog)=>{
   return Blog.create(blog);

}
const getAll=(query)=>{
    return Blog.find(query).exec();
}
const getbyId=(Id)=>{
    return Blog.findById(Id).exec();
}
// const edit=(Id,body)=>{
//     return Blog.findByIdAndUpdate(Id,body,{new: true}).exec();
// }
const editMyBlog=(Id,Eid,body)=>{
    return Blog.updateOne({$and:[{_id:Eid},{author:Id}]},{$set:body}).exec();
}
const deleteOne=(id,Did)=>{
    return Blog.find({$and:[{_id:Did},{author:id}]}).remove();
}
const getByTitle=(title)=>{
    return Blog.find({title}).exec();
}
const getTag=(tags)=>{
    return Blog.find({tags}).exec();
}



module.exports = { 
    create,getAll,getbyId,deleteOne,getByTitle,getTag,editMyBlog
}