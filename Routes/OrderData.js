const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

router.post('/order',async(req,res)=>{

    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date1})

    let eId = await Order.findOne({'email':req.body.email})
    console.log(eId)
    if(eId === null){
        try{
            let order = new Order({
                email:req.body.email,
                order_data:[data],
                // order_date:req.body.date
            })
            await order.save()
            res.json({success:true})
        }
        catch(err){
            console.log(err)
            res.json({success:false})
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {   $push:{order_data:data}})
                res.json({success:true})
            }
        catch(err){
                console.log(err)
                res.json({success:false})
        }
    }
    
   
})

router.post('/myorder',async(req,res)=>{
    try {
        let data = await Order.findOne({'email':req.body.email})
        res.json({orderData:data});
    } catch (error) {
        res.json({success:false})
    }
})

module.exports = router;