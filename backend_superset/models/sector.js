const {DataTypes}= require('sequelize');
const db= require('../db.config');

const Sector =db.define('Sector',{
    id:{
        type:DataTypes.INTEGER(10),
        primaryKey:true,
        autoIncrement:true
    },
    nom:{
        type:DataTypes.STRING(100),
        defaultValue:'',
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        defaultValue:'',
        allowNull:false
    },
   
},{paranoid:true});

// Sector.sync()
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });


//   Sector.sync({ alter: true })
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });


//   Sector.sync({ force: true })
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });

module.exports=Sector;