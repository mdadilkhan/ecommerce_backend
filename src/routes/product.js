const express=require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct, getProductsBySlug, getProductDetailsById} = require('../controller/product');
const multer=require('multer');//for file upload,you can use formadible or file-uploader from npm for simiar work
const router=express.Router();
const shortid=require('shortid'); 
const path=require('path');

 


// its a multer library it is going to use method diskStorage which has two properties
// destination(where to store file) and file name and save in mongo db database
//  we set the destination parealel to rendering js file or just inside src folder
//created storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      
      cb(null, shortid.generate() + '-' + file.originalname);
    }
  }) 

//storage used
  const upload=multer({storage})//used as a middleware


router.post('/product/create',requireSignin,adminMiddleware,upload.array('productPicture'),createProduct);
router.get('/products/:slug', getProductsBySlug);
// router.get('/category/getcategory',getCategories);
router.get('/product/:productId',getProductDetailsById);

module.exports=router;