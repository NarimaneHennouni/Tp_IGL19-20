const mysql=require('mysql');
const express=require('express');
var app=express();
//const bodyparser=require('body-parser');

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'forumesi',
    multipleStatements:true,
    
});

mysqlConnection.connect((err)=>{
    if(!err) console.log('DB connection succeded');
    else console.log('DB connection failed \n Error : '+JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

//récuperer les questions depuis la BDD
app.get('/forumesi',(req,res)=>{
    mysqlConnection.query('SELECT * FROM questions',(err,rows,fields)=>{
        if(!err) {res.send(rows); //transform the response into a JSON format
        }
        else console.log(err);
    })
});

//récuperer une question dont l'id est égale à 'id' depuis la BDD
app.get('/forumesi/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM questions WHERE id_qst = ?',[req.params.id],(err,rows,fields)=>{
        if(!err) res.send(rows); //transform the response into a JSON format
        else console.log(err);
    })
});

//insérer une question dans la BDD
app.post('/forumesi',(req,res)=>{
    let ques=req.body;
    var sql="SET @id_qst = ?;SET @id_user = ?;SET @question = ?;\
    CALL poserquestion(@id_qst,@id_user,@question);";
    mysqlConnection.query(sql,[ques.id_qst,ques.id_user,ques.question],(err,rows,fields)=>{
        if(!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('inserted question id :'+element[0].id_qst);
        });
        else console.log(err);
    })
});