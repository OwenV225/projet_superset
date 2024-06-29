const {DataTypes}= require('sequelize');
const db= require('../db.config');

const Sec_prod =db.define('Sec_prod',{
    id:{
        type:DataTypes.INTEGER(10),
        primaryKey:true,
        autoIncrement:true
    },
    sector_id:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    total_value:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    average_value:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER(4),
        allowNull:false
    },
    is_most_productive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    
},{paranoid:true});

// Product.sync()
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

module.exports=Sec_prod;