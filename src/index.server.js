//remote name-origin
//branch master

const express = require("express");
const env=require("dotenv");
const app=express();
const mongoose=require("mongoose");
const path=require('path');
const cors =require('cors');


//routes
const authRoutes=require("./routes/auth");
const adminRoutes=require("./routes/admin/auth");
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
const initialDataRoutes=require('./routes/admin/initialData');
const pageRoutes=require('./routes/admin/page');
const addressRoutes = require("./routes/address");
// const orderRoutes = require("./routes/order");
// const adminOrderRoute = require("./routes/admin/order.routes");

 // environment variable or consttant
 env.config();

//  mongodb connection

 mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ccz2p.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
     {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex:true
     })
     .then(()=>console.log("databse connected..."))
     .catch(err=>console.log(err));


      
   


//validate the cross origin resourse sharing or it will aloow all the url;
app.use(cors());

//using middlewere for passing data in json file none of the file is exposed towards
// the browser
app.use(express.json());
//using middleware for exposing static files and u have to
// mention the folder which you want to expose
app.use('/public',express.static(path.join(__dirname,'uploads')));



app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);
app.use("/api", addressRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", adminOrderRoute);


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})