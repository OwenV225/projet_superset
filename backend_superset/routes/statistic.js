const express = require("express");
const Statistic = require("../models/statistic");
const bcrypt =require('bcrypt');

let router =express.Router();

router.get('', (req,res)=>{
    Statistic.findAll()
    .then(statistic => res.json({data:statistic}))
    .catch(err => res.status(5001).json({message:'error', error:err}))
});

router.get('/:id', (req,res)=>{
    const statistic_id = parseInt(req.params.id);
    if (!statistic_id){
        return res.json(400).json({message:'paramettre id oublié'})
    };
    Statistic.findOne({where:{id:statistic_id},raw: true})
    .then(statistic => {
        if((statistic===null)){
           return res.status(404).json({message:'cet utilisateur N\'existe pas'})
        }
        return res.json({data:statistic})
    })
    .catch(err => res.status(500).json({message:`database error,${err}`}))

});

router.put('',(req,res)=>{
    const {id,sector_id,region_id,year_stat,value,indicator}= req.body;
    if(!id || !sector_id || !region_id || !year_stat || !value || !indicator){
        return res.status(400).json({message:'données manquantes'})
    }
    Statistic.findOne({where:{id:id},raw: true})
    .then(statistic=> {
        if(statistic !==null){
           return res.status(409).json({message:`l'utilisateur ${id} existe deja`});
        }
         Statistic.create(req.body)
        .then(user=> res.json({message:'User created', data:user}))
        .catch(err => res.status(500).json({message:'error database', data:err}))
    })
});



router.patch('/:id',(req,res)=>{
    const statistic_id = parseInt(req.params.id);
   if(!statistic_id){
    return res.status(400).json({message:'vous avez oublié le paramettre'});
   }
   Statistic.findOne({where:{id:statistic_id},raw:true})
   .then(statistic => {
    if(statistic===null){
        return res.status(404).json({message: 'cet identifiant n\'existe pas'});
    }
   })
   Statistic.update(req.body,{where:{id:statistic_id}})
   .then(statistic => res.json({message:'utilisateur mise à jour avec succès', data:statistic}))
   .catch(err => res.status(500).json({message:'error database', data:err}))
});


router.delete('/trash/:id',(req,res)=>{
    const statistic_id = parseInt(req.params.id);
    if(!statistic_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Statistic.destroy({where:{id:statistic_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.delete('/:id',(req,res)=>{
    const statistic_id = parseInt(req.params.id);
    if(!statistic_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Statistic.destroy({where:{id:statistic_id},force:true})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.post('/trash/:id',(req,res)=>{
    const statistic_id = parseInt(req.params.id);
    if(!statistic_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Statistic.restore({where:{id:statistic_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});


module.exports=router;