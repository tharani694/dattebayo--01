const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
//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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))


router.post('/signup', (req, res)=>{
    //console.log(req.body);
    const {name,email,password,pic} = req.body;
    if(!name || !email || !password){
        return res.status(422).json(
            {error :"Please enter valuable entries"}
            )
    }
    User.findOne({email : email})
    .then(savedUser => {
        if(savedUser){
            return res.status(422).json({ error : "User mail already existing"})
        }
        bcrypt.hash(password, 12)
        .then(hashedPassword =>{
            const user = new User({
                email,
                password: hashedPassword,
                name,
                pic
            });
    
            user.save()
            .then(user =>{
                // transporter.sendMail({
                //     to:user.email,
                //     from:"atqa694@gmail.com",
                //     subject:"Signed Up Successfully!!",
                //     html:"<h1>Welcome to Dattebayo!!</h1>"
                // })
                res.status(200).json({
                    message: "User has been saved successfully!!"
                })
            })
            .catch(err =>{
                console.log(err);
            })
        })
    })
    .catch(err =>{
        console.log(err);
    })
});



router.post('/signin', (req, res)=>{
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error : "Please enter email and password"});
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:" Invalid Email or Password"});
            }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message : "Successfully Signed In!!!"});
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                const {_id,name, email,followers,following,pic} = savedUser;
                res.json({token,user:{_id,name,email,followers,following,pic}});
            }
            else{
                return res.status(422).json({error : "Invalid Email or Password"});
            }
        })
    })
    .catch(err =>{
        console.log(err);
    })
})

module.exports = router;