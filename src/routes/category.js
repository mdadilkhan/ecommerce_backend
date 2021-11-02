const express=require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addCategory,getCategories } = require('../controller/cateogry');
const router=express.Router();
const path=require('path');
const multer=require('multer');
const shortid=require('shortid');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      
      cb(null, shortid.generate() + '-' + file.originalname);
    }
  }) 

//storage used
  const upload=multer({storage})


router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addCategory);
router.get('/category/getcategory',getCategories);

module.exports=router;