const express = require("express");
const { requireSignin, adminMiddleware,superAdminMiddleware } = require("../common-middleware");
const { addCategory, getCategories,updateCategories,deleteCategories } = require("../controller/cateogry");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

//storage used
const upload = multer({ storage });

router.post("/category/create",requireSignin,adminMiddleware,upload.array("categoryImage"),addCategory);
router.get("/category/getcategory", getCategories);
router.post("/category/update",upload.array("categoryImage"),updateCategories);
router.post("/category/delete",deleteCategories);
 
//requireSignin,superAdminMiddleware,

//,requireSignin


module.exports = router;
