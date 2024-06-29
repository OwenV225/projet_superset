const express=require("express");
const cors=require("cors");
const db=require('./db.config');



const app =express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const user_router =require('./routes/users');
const sector_prod_router =require('./routes/sector_product');
const product_router =require('./routes/produit');
const auth_router = require("./routes/auth");
const user_statistic =require('./routes/statistic');
const user_sector =require('./routes/sector');
const route_region =require('./routes/region');
const purchased= require('./routes/satistics');



app.use('/purchased',purchased);
app.use('/users',user_router);
app.use('/produits',product_router);
app.use('/statistic',user_statistic);
app.use('/sector',user_sector);
app.use('/auth',auth_router);
app.use('/region',route_region);
app.use('/sector_prod',sector_prod_router);

app.get('*',(req,res)=>{
    res.status(5001).send("mauvais lien");
})


db.authenticate()
.then(()=>{console.log('connexion à la base de donnée reussie');})
.then(()=>{
app.listen(process.env.server_port,function(){
    console.log("serveur lancé sur le port 3000");
})
}

)
.catch((err)=>{console.log("base de données non connectée",err);})

