const {DataTypes}= require('sequelize');
const db= require('../db.config');

const Product =db.define('Product',{
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
        type:DataTypes.STRING,
        defaultValue:'',
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


  Product.sync({ alter: true })
  .then(() => {
    console.log('model Product synchronized successfully.');
  })
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

module.exports=Product;