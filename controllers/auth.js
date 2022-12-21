const express = require("express");
const client = require("../configs/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = (req,res)=>{
    const {email,password} = req.body;
    client.query(`select * from users where email = '${email}';`)
    .then((data)=>{
        let rows = data.rows;
        if(rows.length===0){
            res.status(400).json({
                msg:"user doesn't exist"
            })
        }
        else{
            const hashPassword = rows[0].password
            bcrypt.compare(password, hashPassword, function(err, result) {
                // result == true
                if(err){
                    res.status(400).json({
                        msg:"Incorrect password"
                    })
                }
                else if(result){
                    const token = jwt.sign({ email:email }, process.env.SECREAT_KEY);
                    res.status(200).json({
                        msg:"user logged in successfully",
                        token:token
                      })
                }
                else{
                    res.status(500).json({
                        msg:"user login failed",
                      })
                }
            });
        }
    })
    
}


exports.signup = (req,res)=>{
    const {email,name,password} = req.body;
    // console.log(email," ",name," ",password);
    client.query(`select * from users where email = '${email}';`)
    .then((data)=>{
        let rows = data.rows;
        if(rows.length!==0){
            res.status(400).json({
                msg:"User already exist"
            })
        }
        else{
            const userData={
                email,
                name,
                password
            }
            bcrypt.hash(userData.password, 10, function(err, hash) {
                if(err){
                    console.log(err);
                }
                else{
                    client.query(`insert into users(name,email,password) values ('${userData.name}','${userData.email}','${hash}')`)
                    .then((data)=>{
                        console.log("insside query insert");
                        const token = jwt.sign({ email:email }, process.env.SECREAT_KEY);
                        if(token){
                            res.status(200).json({
                                msg:"user created",
                                token:token
                            })
                        }
                        else{
                            res.status(400).json({
                                msg:"problem in creating token"
                            })
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            msg:"database error"
                        })
                    })
                }
                
            });
        }
    })
};