const jwt=require('jsonwebtoken');
const multer=require('multer');//for file upload,you can use formadible or file-uploader from npm for simiar work
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
   exports.upload=multer({storage})//used as a middleware


exports.requireSignin=(req,res,next)=>{

    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1];   
        const user=jwt.verify(token,process.env.JWT_SECRET);
        req.user=user;
        
    }else{
        return res.status(400).json({message:'Authorization required'});
    }
   
   next();
   
}

//user middle for customers

exports.userMiddleware=(req,res,next)=>{
    if(req.user.role!=='user'){
        return res.status(400).json({message:'User Access denied'})
    }
    next();

}


//admin middle for admin
exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(400).json({message:'Admin Access denied'})
    }
    next();
}

// exports.superAdminMiddleware = (req, res, next) => {
//     if (req.user.role !== "super-admin") {
//       return res.status(200).json({ message: "Super Admin access denied" });
//     }
//     next();
//   };