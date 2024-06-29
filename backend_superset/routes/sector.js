const express = require("express");
const Sector = require("../models/sector");
const bcrypt =require('bcrypt');

let router =express.Router();

router.get('', (req,res)=>{
    Sector.findAll()
    .then(Sector => res.json({data:Sector}))
    .catch(err => res.status(5001).json({message:'error', error:err}))
});

router.get('/:id', (req,res)=>{
    const Sector_id = parseInt(req.params.id);
    if (!Sector_id){
        return res.json(400).json({message:'paramettre id oublié'})
    };
    Sector.findOne({where:{id:Sector_id},raw: true})
    .then(Sector => {
        if((Sector===null)){
           return res.status(404).json({message:'cet utilisateur N\'existe pas'})
        }
        return res.json({data:Sector})
    })
    .catch(err => res.status(500).json({message:`database error,${err}`}))

});

router.put('',(req,res)=>{
    const {id , nom, description}= req.body;
    if(!id || !nom || !description ){
        return res.status(400).json({message:'données manquantes'})
    }
    Sector.findOne({where:{id:id},raw: true})
    .then(sector=> {
        if(sector !==null){
           return res.status(409).json({message:`l'utilisateur ${id} existe deja`});
        }
        Sector.create(req.body)
        .then(sector=> res.json({message:'User created', data:sector}))
        .catch(err => res.status(500).json({message:'error database', data:err}))
    })
});


router.patch('/:id',(req,res)=>{
    const Sector_id = parseInt(req.params.id);
   if(!Sector_id){
    return res.status(400).json({message:'vous avez oublié le paramettre'});
   }
   Sector.findOne({where:{id:Sector_id},raw:true})
   .then(Sector => {
    if(Sector===null){
        return res.status(404).json({message: 'cet identifiant n\'existe pas'});
    }
   })
   Sector.update(req.body,{where:{id:Sector_id}})
   .then(Sector => res.json({message:'utilisateur mise à jour avec succès', data:Sector}))
   .catch(err => res.status(500).json({message:'error database', data:err}))
});


router.delete('/trash/:id',(req,res)=>{
    const Sector_id = parseInt(req.params.id);
    if(!Sector_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Sector.destroy({where:{id:Sector_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.delete('/:id',(req,res)=>{
    const Sector_id = parseInt(req.params.id);
    if(!Sector_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Sector.destroy({where:{id:Sector_id},force:true})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.post('/trash/:id',(req,res)=>{
    const Sector_id = parseInt(req.params.id);
    if(!Sector_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Sector.restore({where:{id:Sector_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});


module.exports=router;