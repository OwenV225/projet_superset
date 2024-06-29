const express = require("express");
const Product = require("../models/product");
const bcrypt =require('bcrypt');

let router =express.Router();

router.get('', (req,res)=>{
    Product.findAll()
    .then(users => res.json({data:users}))
    .catch(err => res.status(5001).json({message:'error', error:err}))
});

router.get('/:id', (req,res)=>{
    const user_id = parseInt(req.params.id);
    if (!user_id){
        return res.json(400).json({message:'paramettre id oublié'})
    };
    Product.findOne({where:{id:user_id},raw: true})
    .then(user => {
        if((user===null)){
            res.status(404).json({message:'cet utilisateur N\'existe pas'})
        }
        return res.json({data:user})
    })
    .catch(err => res.status(500).json({message:`database error,${err}`}))

});

router.put('',(req,res)=>{
    const {nom,prenoms,pseudo,email,password}= req.body;
    if(!nom || !prenoms || !pseudo || !email || !password){
        return res.status(400).json({message:'données manquantes'})
    }
    Product.findOne({where:{email:email},raw: true})
    .then(user=> {
        if(user !==null){
            res.status(409).json({message:`l'utilisateur ${nom} existe deja`});
        }
        bcrypt.hash(password,parseInt(process.env.bcrypt_salt_round),)
        .then(hash=>{
            req.body=hash
         User.create(req.body)
        .then(user=> res.json({message:'User created', data:user}))
        .catch(err => res.status(500).json({message:'error database', data:err}))
        })
        .catch(err=> res.status(500).json({message:'hash process error', error:err}))

    })
});

router.patch('/:id',(req,res)=>{
    const id_user = parseInt(req.params.id);
   if(!id_user){
    return res.status(400).json({message:'vous avez oublié le paramettre'});
   }
   Product.findOne({where:{id:id_user},raw:true})
   .then(user => {
    if(user===null){
        return res.status(404).json({message: 'cet identifiant n\'existe pas'});
    }
   })
   Product.update(req.body,{where:{id:id_user}})
   .then(user => res.json({message:'utilisateur mise à jour avec succès', data:user}))
   .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.delete('/:id',(req,res)=>{
    const id_user = parseInt(req.params.id);
    if(!id_user){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    User.destroy({where:{id:id_user},force:true})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.post('/trash/:id',(req,res)=>{
    const id_user = parseInt(req.params.id);
    if(!id_user){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Product.restore({where:{id:id_user}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});


module.exports=router