const express = require("express");
const Region = require("../models/region");
const bcrypt =require('bcrypt');

let router =express.Router();

router.get('', (req,res)=>{
    Region.findAll()
    .then(region => res.json({data:region}))
    .catch(err => res.status(5001).json({message:'error', error:err}))
});

router.get('/:id', (req,res)=>{
    const region_id = parseInt(req.params.id);
    if (!region_id){
        return res.json(400).json({message:'paramettre id oublié'})
    };
    Region.findOne({where:{id:region_id},raw: true})
    .then(region => {
        if((Region===null)){
           return res.status(404).json({message:'cet utilisateur N\'existe pas'})
        }
        return res.json({data:region})
    })
    .catch(err => res.status(500).json({message:`database error,${err}`}))

});

router.put('',(req,res)=>{
    const {id , nom, description}= req.body;
    if(!id || !nom || !description ){
        return res.status(400).json({message:'données manquantes'})
    }
    Region.findOne({where:{id:id},raw: true})
    .then(region=> {
        if(region !==null){
           return res.status(409).json({message:`l'utilisateur ${id} existe deja`});
        }
        Region.create(req.body)
        .then(region=> res.json({message:'User created', data:region}))
        .catch(err => res.status(500).json({message:'error database', data:err}))
    })
});


router.patch('/:id',(req,res)=>{
    const region_id = parseInt(req.params.id);
   if(!region_id){
    return res.status(400).json({message:'vous avez oublié le paramettre'});
   }
   Region.findOne({where:{id:region_id},raw:true})
   .then(region => {
    if(region===null){
        return res.status(404).json({message: 'cet identifiant n\'existe pas'});
    }
   })
   Region.update(req.body,{where:{id:region_id}})
   .then(region => res.json({message:'utilisateur mise à jour avec succès', data:region}))
   .catch(err => res.status(500).json({message:'error database', data:err}))
});


router.delete('/trash/:id',(req,res)=>{
    const region_id = parseInt(req.params.id);
    if(!region_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Region.destroy({where:{id:region_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.delete('/:id',(req,res)=>{
    const region_id = parseInt(req.params.id);
    if(!region_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Region.destroy({where:{id:region_id},force:true})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.post('/trash/:id',(req,res)=>{
    const region_id = parseInt(req.params.id);
    if(!region_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Region.restore({where:{id:region_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});


module.exports=router;