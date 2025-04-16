const express = require('express');
const router = express.Router();

//mongodb user model
const User = require('../models/User.js');

//password hashing
const bcrypt = require('bcrypt');


//Signup
router.post('/signup', (req, res) => {
    let { name,email,password,dateOfBirth} = req.body;
    name= name.trim();
    email= email.trim();
    password= password.trim();
    dateOfBirth= dateOfBirth.trim();

    if(name=="" || email=="" || password=="" || dateOfBirth==""){
        res.status(400).json({
            message:"Empty input fields"
        });
    } else if(!/^[a-zA-Z ]+$/.test(name)){
        res.status(400).json({
            message:"Invalid name"
        });
    } else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        res.status(400).json({
            message:"Invalid email"
        });
    } else if(password.length<8){
        res.status(400).json({
            message:"Password should be at least 8 characters long"
        });
    } else if(!new Date(dateOfBirth).getTime()){
        res.status(400).json({
            message:"Invalid date of birth entered"
        });
    } else {
        // Add your signup logic here
        User.find({email}).then((result)=>{
            if(result.length){
                res.status(400).json({
                    message:"User with the provided email already exists"
                });
            } else {
                //Try to create a new user

                //password hashing
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then((hashedPassword) => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });
                    newUser.save().then((result)=>{
                        res.status(201).json({
                            message:"User created successfully",
                            data:result
                        });
                    }).catch((err)=>{
                        res.status(500).json({
                            message:"An error occurred while saving user account!"
                        });
                    });
            }).catch((err)=>{
                    res.status(500).json({
                        message:"An error occurred while hashing the password!"
                    })
                });
            };
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                message:"An error occurred while checking for existing user!"
            });
        });
    }

});

//Signin
router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    email= email.trim();
    password= password.trim();

    if(email=="" || password==""){
        res.status(400).json({
            message:"Empty input fields"
        });
    } else {
        User.find({email}).then((result)=>{
            if(result.length){
                //compare password
                bcrypt.compare(password, result[0].password).then((isMatch)=>{
                    if(isMatch){
                        res.status(200).json({
                            message:"User signed in successfully",
                            data:result[0]
                        });
                    } else {
                        res.status(400).json({
                            message:"Invalid password"
                        });
                    }
                }).catch((err)=>{
                    res.status(500).json({
                        message:"An error occurred while comparing passwords!"
                    });
                });
            } else {
                res.status(400).json({
                    message:"User with the provided email does not exist"
                });
            };
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                message:"An error occurred while checking for existing user!"
            });
        });
    }
});

module.exports = router;