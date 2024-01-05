const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey = "The Product Manager is responsible for both product planning and product marketing."

const User = require("../models/User");

router.post("/createuser",async(req,res)=>{
    let salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try {
        let user = new User({
            name:req.body.name,
            email:req.body.email,
            password:secPassword,
            location:req.body.location
        });
        let result = await user.save();
        console.log(`this data is added in database ${result}`);
        console.log("registered successfully")
        res.status(200).json({success:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false})
    }
})

router.post('/login',async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.send('please enter all fields');
    }else{
        try {
            let user = await User.findOne({email:email});
            if(!user){
                res.json({success:false})
            }
            else{
                let isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){
                    const data = {
                        user:{
                            id:user.id
                        }
                    }
                    const authToken = jwt.sign(data,jwtSecretKey)
                    res.json({success:true,authToken:authToken})
                    console.log("Loggedin successfully")
                }else{
                    res.send("enter valid details").status(400);
                }
            }
        }
        catch(err){
            console.log(err);
            res.json({success:false})
        } 
    }
}
)           

module.exports = router;