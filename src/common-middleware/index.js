const jwt=require('jsonwebtoken');


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