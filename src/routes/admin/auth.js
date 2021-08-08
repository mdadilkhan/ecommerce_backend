const { json } = require("body-parser");
const express =require("express");
const { signup, signin, requiresignin } = require("../../controller/admin/auth");
const router=express.Router();


router.post("/admin/signup",signup);
router.post("/admin/signin",signin);


// router.post("/profile",requiresignin,(req,res)=>{
// res.status(200).json({user: "profile"})
// });


module.exports=router;