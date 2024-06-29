const {DataTypes}= require('sequelize');
const db= require('../db.config');

const Statistic =db.define('Statistic',{
    id:{
        type:DataTypes.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    sector_id:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    region_id:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    year_stat:{
        type:DataTypes.INTEGER(4),
        allowNull:false
    },
    value:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    indicator:{
        type:DataTypes.STRING,
        defaultValue:'',
        allowNull:false
    },
    
},{paranoid:true});

// Statistic.sync()
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });


//   Product.sync({ alter: true })
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });


//   Product.sync({ force: true })
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });

module.exports=Statistic;