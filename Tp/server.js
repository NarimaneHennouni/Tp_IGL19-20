var mysql      = require('mysql');
var http       = require('http');
const express =  require('express');
//const axios = require('axios');
const bodyParser = require("body-parser");
const app= express();
var coeff,moys,nom_mod,moye,coefficient=[],final;
var tab_moy=[];
var i=0;
var Moyf;
app.use(bodyParser.json());

app.get('/api',(req ,res)=>{
  const etudiants= final;
 return res.json(etudiants);
});
module.exports = app;
/*axios.get("http://localhost:3000/api")
.then(res => (res.data))
.catch(err => 'error');*/
//app.listen(3003,()=>console.log("console satrted"));


var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'tp_igl',
    user     : 'root',
    password : '',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});



var module=[];
module[2]='notes_anum';
module[0]="notes_igl";
module[1]="notes_res";
module[3]="notes_thp";
var moyenne=[];
moyenne[0]="Moy_igl";
moyenne[1]="Moy_res";
moyenne[2]="Moy_anum";
moyenne[3]="Moy_thp";
var sql1="SELECT CC, CI, TP, CF, Coeff FROM modules WHERE id_module=?";
async function remplir(nom_mod,i,moye)
{
   var k= await connection.query(sql1,[i+1], function (error, results2, fields){
    if (error)
    throw error;
    coeff=results2;
    coefficient[i]=results2[0].Coeff;
    console.log(coefficient[i]);
  })
  var t= await connection.query("SELECT id_etud, CC, CI, TP, CF FROM "+nom_mod, function (error, results1, fields) {
    if (error)
        throw error;
        console.log(results1);
       results1.forEach (result => {
          var somme_coeff=coeff[0].CC+coeff[0].CI+coeff[0].TP+coeff[0].CF;
          var moy=((result.CC * coeff[0].CC+result.CI * coeff[0].CI+result.TP * coeff[0].TP+result.CF * coeff[0].CF)/(somme_coeff));
          var mysql3 = "UPDATE "+nom_mod+" SET MOY=? WHERE id_etud = ?";

          connection.query(mysql3,[moy,result.id_etud] , function (error, results) {
          if (error)
          throw error;
          console.log("inserted");

      }); 
      var mysql4 = "UPDATE moy_etudiants SET "+moye+"= ? WHERE id_etud = ?";

          connection.query(mysql4,[moy,result.id_etud] , function (error, results) {
          if (error)
          throw error;
          console.log("inserted");

      }); 
   
        // add a query to fetch the data from oy etudiant and make as the return value in order to apply test on it
        //
      
      
});
  
/*var mysql5 = "SELECT Moy FROM notes_thp WHERE id_etud=17/0022";
 connection.query("SELECT CC,Moy FROM notes_thp WHERE id_etud=16/1067", function (error, res, fields) {
  if (error)
      throw error;
      console.log("am resultss", res);
      tab_moy[i]=res[0].CC;
      console.log("MOyennneee");
      console.log(res[0].Moy);
  });
  
});
return tab_moy[i];*/
});
}


async function calcul_moy_total()
{
  var y =await connection.query("SELECT id_etud, Moy_IGL,Moy_RES,Moy_ANUM,Moy_THP FROM moy_etudiants", function (error, results, fields) {
    if (error)
        throw error;
       results.forEach (result => {
         var moy_g=((result.Moy_IGL*coefficient[0]+result.Moy_RES*coefficient[1]+result.Moy_ANUM*coefficient[2]+result.Moy_THP*coefficient[3])/(coefficient[0]+coefficient[1]+coefficient[2]+coefficient[3]));
         var mysql3 = "UPDATE moy_etudiants SET Moyf= ? WHERE id_etud = ?";

         connection.query(mysql3,[moy_g,result.id_etud] , function (error, results) {
         if (error)
         throw error;
         });
       })
      });
}

async function classer(){
 await connection.query("SELECT id_etud, Moy_IGL,Moy_RES,Moy_ANUM,Moy_THP, Moyf FROM moy_etudiants ORDER BY Moyf DESC" , function (error, results) {
    if (error)
    throw error;
    final=results;
    console.log(final);
    }
  );
  return final;
}
/*async function traitement()
{
for(i=0;i<4;i++){
  console.log("am in");
  nom_mod=module[i];
  moye=moyenne[i];
  var y= await remplir(nom_mod,i,moye);
  console.log("am yyyyyyyyyyyyyyyyyyyyyyyyyyy");
  console.log(y);
}
var y=await calcul_moy_total();
console.log("am 222222222222222222 yyyyyyyyyyyyyyyyyyyyyyyyyyy");
console.log(y);*/
//var t = await
 classer();
//}

//traitement();







//connection.end();
