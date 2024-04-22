/* 
Here we are creating end points for both login and signup pages along with some logic like basic 
validation and authentication etc.
*/
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcyrpt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtsecret = "MynameisEndtoEndYouTubeChannel$#";
/* router.post("/Create", async (req, res)=>{
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
        })
        res.json({"success": true})
    } catch (error) {
        console.log(error);
        res.json({"success": false})
    }
}); */

router.post("/Create",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "incorrect password").isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcyrpt.genSalt(10);
        let setpassword = await bcyrpt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                password: setpassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ "success": true })
        } catch (error) {
            console.log(error);
            res.json({ "success": false })
        }
    });
// new restapi to check login user.

router.post("/Loginuser",
    body('email').isEmail(),
    body('password', "incorrect password").isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({email});
            // to check email
            if (!userData) {
                return res.status(400).json({ errors: "Please do enter valid credentials" });
            }
            // to check password for that particular email.
           /*  if (req.body.password !== userData.password) {
                return res.status(400).json({ errors: "Please do enter valid password" });
            } */
            // password decrypt.
            const pwdCompare = await bcyrpt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Please do enter valid password" });
            }
            // creating data as object.
            const data = {
                user:{id :userData.id}
            }

            const authToken = jwt.sign(data, jwtsecret);
            return res.json({ success: true,authToken:authToken});
        } catch (error) {
            console.log(error);
            res.json({ "success": false })
        }
    });

module.exports = router;