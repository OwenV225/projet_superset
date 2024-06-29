const express = require("express");
const Sector_pro = require("../models/sector_productivity");
const bcrypt =require('bcrypt');

let router =express.Router();

router.get('', (req,res)=>{
    Sector_pro.findAll()
    .then(sector_pro => res.json({data:sector_pro}))
    .catch(err => res.status(5001).json({message:'error', error:err}))
});

router.get('/:id', (req,res)=>{
    const sector_pro_id = parseInt(req.params.id);
    if (!sector_pro_id){
        return res.json(400).json({message:'paramettre id oublié'})
    };
    Sector_pro.findOne({where:{id:sector_pro_id},raw: true})
    .then(sector_pro => {
        if((sector_pro===null)){
           return res.status(404).json({message:'cet utilisateur N\'existe pas'})
        }
        return res.json({data:sector_pro})
    })
    .catch(err => res.status(500).json({message:`database error,${err}`}))

});

router.put('',(req,res)=>{
    const {id , sector_id ,total_value, average_value, year, is_most_productive}= req.body;
    if(!id || !sector_id || !total_value || !average_value || !year || !is_most_productive){
        return res.status(400).json({message:'données manquantes'})
    }
    Sector_pro.findOne({where:{id:id},raw: true})
    .then(sector_pro=> {
        if(sector_pro !==null){
           return res.status(409).json({message:`l'utilisateur ${id} existe deja`});
        }
        Sector_pro.create(req.body)
        .then(sector_pro=> res.json({message:'User created', data:sector_pro}))
        .catch(err => res.status(500).json({message:'error database', data:err}))
    })
});


router.patch('/:id',(req,res)=>{
    const sector_pro_id = parseInt(req.params.id);
   if(!sector_pro_id){
    return res.status(400).json({message:'vous avez oublié le paramettre'});
   }
   Sector_pro.findOne({where:{id:sector_pro_id},raw:true})
   .then(sector_pro => {
    if(sector_pro===null){
        return res.status(404).json({message: 'cet identifiant n\'existe pas'});
    }
   })
   Sector_pro.update(req.body,{where:{id:sector_pro_id}})
   .then(sector_pro => res.json({message:'utilisateur mise à jour avec succès', data:sector_pro}))
   .catch(err => res.status(500).json({message:'error database', data:err}))
});


router.delete('/trash/:id',(req,res)=>{
    const sector_pro_id = parseInt(req.params.id);
    if(!sector_pro_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Sector_pro.destroy({where:{id:sector_pro_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.delete('/:id',(req,res)=>{
    const sector_pro_id = parseInt(req.params.id);
    if(!sector_pro_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Sector_pro.destroy({where:{id:sector_pro_id},force:true})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});

router.post('/trash/:id',(req,res)=>{
    const sector_pro_id = parseInt(req.params.id);
    if(!sector_pro_id){
     return res.status(400).json({message:'vous avez oublié le paramettre'});
    }
    Sector_pro.restore({where:{id:sector_pro_id}})
    .then(()=>res.status(204).json({}))
    .catch(err => res.status(500).json({message:'error database', data:err}))
});


module.exports=router;