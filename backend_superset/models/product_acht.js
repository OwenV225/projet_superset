const {DataTypes}= require('sequelize');
const db= require('../db.config');

const Product_acht =db.define('Product_acht',{
    id:{
        type:DataTypes.INTEGER(10),
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    id_prod:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        defaultValue:'',
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER(10),
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


Product_acht.sync({ alter: true })
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

module.exports=Product_acht;