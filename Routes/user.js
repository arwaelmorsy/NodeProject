const express=require('express');
const router=express.Router();
const authMiddleWare = require('../middlwares/auth');
const { create,login,edit,getAll,pushFId,pullFId } = require('../controllers/user');



router.post('/', async (req,res,next)=>{
    const { body } = req;
    try{
        const user = await  create(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.post('/login', async(req ,res ,next )=>{
    const { body } = req;
    try{
        const user = await  login(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.patch('/:id', async (req,res,next)=>{
    const { body } = req;
    const Id = req.params.id;
    try{
        const user = await  edit(Id,body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.get('/',async (req,res,next)=>{
    try{
        const user = await  getAll();
        res.json(user);
    } catch (e) {
        next(e);
    }
});
router.post('/follow/:fid',authMiddleWare,async(req,res,next)=>{
    const { user:{ id },params:{ fid }}=req;
     try{
        const userFollowedId = await  pushFId(id, fid);
        res.json(userFollowedId);
    } catch (e) {
        next(e);
    }
})

router.post('/unfollow/:fid',authMiddleWare,async(req,res,next)=>{
    const { user:{ id },params:{ fid }}=req;
     try{
        const userunFollowedId = await  pullFId(id, fid);
        res.json(userunFollowedId);
    } catch (e) {
        next(e);
    }
})


module.exports=router;