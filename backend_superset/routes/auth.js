const express = require("express");
const User = require("../models/user");
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
let router =express.Router();


router.post('/login',(req,res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        return res.status(400).json({message:"email ou mot de passe incorrecte"});
    }
    User.findOne({where:{email:email}, raw:true})
    .then(user =>{
        if(user === null){
            return res.status(401).json({message: 'ce compte n\'existe pas'})
        }
        bcrypt.compare(password, user.password)
        .then(test=>{
            if(!test){
                return res.status(401).json({message:"mauvais mot de passe"})
            }else{
                const token =jwt.sign({
                    id: user.id,
                    nom: user.nom,
                    prenoms: user.prenoms,
                    email: user.email,
                },
                process.env.jwt_secret,{expiresIn:process.env.jwt_during}
                )
               return res.json({ message: 'Connexion réussie', user: { id: user.id, email: user.email, nom: user.nom, prenoms: user.prenoms, pseudo: user.pseudo },access_token:token }); 
                // return res.json({access_token:token})
        }
           
        })
        .catch(err=> res.status(500).json({message:'login procecusse faild', error:err}))
    })
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

module.exports=router;