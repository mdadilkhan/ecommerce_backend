
const express =require("express");
const { requireSignin } = require("../../common-middleware");
const { signup, signin, signout} = require("../../controller/admin/auth");
const { validateSignupRequest,isRequestValidated, validateSigninRequest } = require("../../validator/auth");
const router=express.Router();


router.post("/admin/signup",validateSignupRequest,isRequestValidated,signup);
router.post("/admin/signin",validateSigninRequest,isRequestValidated,signin);

router.post("/admin/signout",signout);
//router.post("/admin/signout",requireSignin,signout);
// router.post("/profile",requiresignin,(req,res)=>{
// res.status(200).json({user: "profile"})
// });


module.exports=router;