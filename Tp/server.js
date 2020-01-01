

var mysql      = require('mysql');
var http       = require('http');
const express =  require('express');
//const axios = require('axios');
const bodyParser = require("body-parser");
/**
 * creates the express app
 */
const app= express();
/**
 * app module
 * @module app
 */
var coeff,moys,nom_mod,moye,coefficient=[],final;
/**
 * i
 * {int} garde la trace pour parcourir la table de chaque module
 */
var i=0;
app.use(bodyParser.json());
/** 
 * app.get()
 * enables the route in order to give data to the front app using react
*/
app.get('/api',(req ,res)=>{
  const etudiants= final;
 return res.json(etudiants);
});
module.exports = app;
//app.listen(3003,()=>console.log("console satrted"));

/**
 * used for the connection with database 'tp_igl'
 */
var connection = mysql.createConnection({
  host            : process.env.DATABASE_HOST,
  port            : process.env.MYSQL_PORT,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE
});

/**
 * enables the sql connection with the database
 */
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

/**
 * @type {Array} contains names of the tables of the different subjects in the database
 */

var module=[];
module[2]='notes_anum';
module[0]="notes_igl";
module[1]="notes_res";
module[3]="notes_thp";
/**
 * {Array} contains names of averages of each subject in the db in order to fil the table 'moy_etudiants'
 */
var moyenne=[];
moyenne[0]="Moy_igl";
moyenne[1]="Moy_res";
moyenne[2]="Moy_anum";
moyenne[3]="Moy_thp";
/**
 * variable containing the preparation of the mysql query which brings formula's information about each subject
 */
var sql1="SELECT CC, CI, TP, CF, Coeff FROM modules WHERE id_module=?";
/**
 * @property {Function} remplir -fills the table 'moy_etudiants' with averages of each subject calculated by using marks of each student and the average formula of each subject
 * @param {string} nom_mod -contains the name of the subject on which we want to apply th query
 * @param {int} i -contains the subject id-1
 * @param {string} moye -the name of the average's field correspending to this subject in order to insert the average
 * @returns {void}
 */
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
   
       
      
});
  

});
}

/**
 * Calculates the general average of each student in the table 'moy_etudiants' and inserts the result in the field 'Moyf'
 * @returns {void}
 */
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
/**
 * orders the students following the descendant order of their averages
 * @returns {void}
 */
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

for(i=0;i<4;i++){
  nom_mod=module[i];
  moye=moyenne[i];
  var y= remplir(nom_mod,i,moye);
  
}
calcul_moy_total();
 classer();

