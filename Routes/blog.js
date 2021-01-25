const express=require('express');
const router=express.Router();
const multer = require("multer");
const path =require("path");
const { create,getAll,getbyId,deleteOne,getByTitle,getTag,editMyBlog } = require('../controllers/blog');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
      filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });

  router.post('/add',upload.single("photo"), async (req, res, next) => {

  const { body, user: { id } } = req;
  const _file =req.file.filename;
  try {
    const blog = await create({ ...body,photo:_file, auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req,res,next)=>{
    const { body, user:{ id } } = req;
    try{
        const blog = await  create({ ...body, author:id});
        res.json(blog);
    } catch (e) {
        next(e);
    }
});

router.get('/', async (req,res,next)=>{
    const { user: { id } } = req;
    try{
        const blog = await  getAll({ author: id });
        res.json(blog);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req,res,next)=>{
    Id=req.params.id;
    try{
        const blog = await  getbyId(Id);
        res.json(blog);
    } catch (e) {
        next(e);
    }
});

//editonly my blogs
router.patch('/:Edid', async (req,res,next)=>{
    const { user:{id},params:{Edid},body } = req;
    //Id=req.params.id;
    try{
        const blog = await  editMyBlog(id,Edid,body);
        res.json(blog);
    } catch (e) {
        next(e);
    }
})

router.delete('/:Did', async (req,res,next)=>{
    const { user:{id},params:{Did} } = req;
    //Id=req.params.id;
    try{
        const blog = await  deleteOne(id,Did);
        res.json(blog);
    } catch (e) {
        next(e);
    }
})

router.get('/title/:title',async (req, res, next)=>{
    Title=req.params.title;
    try{
        const blog = await  getByTitle(Title);
        res.json(blog);
    } catch (e) {
        next(e);
    }
})

router.get('/tags/:tags',async (req,res, next)=>{
    tag=req.params.tags;
    try{
        const blog = await  getTag(tag);
        res.json(blog);
    } catch (e) {
        next(e);
    }
});





module.exports=router;