const {DataTypes}= require('sequelize');
const db= require('../db.config');

const User=db.define('User',{
    id:{
        type:DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement:true
    },
    nom:{
        type:DataTypes.STRING(100),
        defaultValue:'',
        allowNull:false
    },
    prenoms:{
        type:DataTypes.STRING(100),
        defaultValue:'',
        allowNull:false
    },
    pseudo:{
        type:DataTypes.STRING(100),
        defaultValue:'',
        allowNull:false,
    
    },
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING(64),
        is:/^[0-9a-f]{64}$/i
    },

    role:{
        type:DataTypes.STRING(5),
        defaultValue:'user',
    },
    
    
},{paranoid:true});

// User.sync()
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });


//   User.sync({ alter: true })
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });


//   User.sync({ force: true })
//   .then(() => {
//     console.log('model Product synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to synchronize the database:', err);
//   });


module.exports=User;