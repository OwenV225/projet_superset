const {Sequelize}=require("sequelize");

let sequelize= new Sequelize(process.env.db_name,process.env.db_user,process.env.db_password,{
    host:process.env.db_host,
    port:process.env.db_port,
    dialect:'mysql',
    logging:false
}

);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to synchronize the database:', err);
  });



module.exports=sequelize;