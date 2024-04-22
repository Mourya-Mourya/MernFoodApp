/* 
Here we will create end points for orders.
*/

const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async(req,res)=>{
    // this order_data we will send from frontend to backend db. from cart.js we will write logic
    let data = req.body.order_data
    await data.splice(0,0,{Order_Date: req.body.order_date})

    //if email not exits in db then create a new order for that particular email address.
    let eId= await Order.findOne({'email':req.body.email});
    console.log(eId);
    if(eId === null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error.message);
            res.send("server error: " + error.message)
        }
    }

    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}
                ).then(()=>{
                    res.json({success:true})
                })
        } catch (error) {
            res.send("server error: " + error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;