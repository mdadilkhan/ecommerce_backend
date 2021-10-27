const express=require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addCategory,getCategories } = require('../controller/cateogry');
const router=express.Router();


router.post('/category/create',requireSignin,adminMiddleware,addCategory);
router.get('/category/getcategory',getCategories);

module.exports=router;