var mysql      = require('mysql');
var http       = require('http');
const express =  require('express');
const app=express();
var coeff,moys,nom_mod,moye,coefficient=[];
var i=0;
app.get("/",(req,res)=>{
  console.log("responding to root route");
  res.send("Heelloo from ROOOOT");
})

app.listen(3000,()=>{
  console.log("server is up and listnening");
});
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
module[0]='notes_anum';
module[1]="notes_igl";
module[2]="notes_res";
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
   connection.query("SELECT id_etud, CC, CI, TP, CF FROM "+nom_mod, function (error, results1, fields) {
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

        });
      
      
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

function classer(){
  connection.query("SELECT id_etud, Moyf FROM moy_etudiants ORDER BY Moyf DESC" , function (error, results) {
    if (error)
    throw error;
    console.log(results);
    }
  );
}
/*for(i=0;i<4;i++){
  console.log("am in");
  nom_mod=module[i];
  moye=moyenne[i];
  var y= remplir(nom_mod,i,moye);
}
calcul_moy_total();*/
classer();

  // à la fin on fait un sort selon la moyenne







//connection.end();
