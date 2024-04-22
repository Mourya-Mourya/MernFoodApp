/* 
Here we are creating end points for displaying data in the frontend. card
*/

const express = require('express');
const router = express.Router();

router.post('/foodData', (req,res)=>{
    try {
       // console.log(global.food_items, global.food_category);
        res.send([global.food_items,global.food_category]);
    } catch (error) {
        console.log(error.message);
        res.send("Server error");
    }
})

module.exports = router;