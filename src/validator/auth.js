//this validator is working for both user and admin
//express validator is middleware used to validate input of a form

const {check, validationResult} =require('express-validator');

exports.validateSignupRequest = [
    check("firstName")
    .notEmpty()
    .withMessage("firstName is required"),
    check("lastName")
    .notEmpty()
    .withMessage("lastNAme is require"),
    check("email")
    .isEmail()
    .withMessage("valid email is required"),
    check("password")
    .isLength({min: 8 })
    .withMessage("password must be atleast 8 character long")
];


exports.validateSigninRequest = [
    check("email")
    .isEmail()
    .withMessage("valid email is required"),
    check("password")
    .isLength({min: 8 })
    .withMessage("password must be atleast 8 character long")
];






exports.isRequestValidated=(req,res,next)=>{
     const errors=validationResult(req);
     if(errors.array().length > 0){
         return res.status(400).json({error:errors.array()[0].msg})
     }
     next();
}
// now import both the function it on the signup page of admin and user