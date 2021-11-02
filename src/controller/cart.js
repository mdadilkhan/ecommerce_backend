const Cart=require('../models/cart');

exports.addItemToCart=(req,res)=>{
      
    Cart.findOne({user:req.user.id})
    .exec((error,cart)=>{
      if(error)
      return res.status(400).json({error});
      if(cart){
          //if cart exist update quantity
           const product=req.body.cartItems.product;
           const item=cart.cartItems.find(c=>c.product==product);
           let condition,update;
       
           if(item){
             condition={"user":req.user.id, "cartItems.product":product};
             update={
                    "$set":{
                        "cartItems.$":{
                            ...req.body.cartItems,
                            quantity: item.quantity + parseInt(req.body.cartItems.quantity)
                     }
                    }
                  };
             }else{
                 condition={user:req.user.id};
                 update={
                         "$push":{
                             "cartItems":req.body.cartItems
                         }
                     }
             }
             Cart.findOneAndUpdate(condition,update)
             .exec((error,_cart)=>{
              if(error)
                return res.status(400).json({error});
              if(_cart)
                return res.status(200).json({cart:_cart});
          })
        
      }else{
        //if cart not exist create cart
        const cart=new Cart({
            user:req.user.id,
            cartItems:[req.body.cartItems]
        });
        cart.save((error,cart)=>{
            if(error)
             return res.status(400).json({error});
            if(cart){
                return res.status(201).json({cart});
            } 
        });
      }
    });
};