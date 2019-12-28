'user strict';
var sql = require('./questions_db.js');

//question object constructor
var Question = function(question){
    //this.id_user = id_user connecté
    this.question = question.question;
};

Question.createQuestion = function (newQues, result) {    
        sql.query("INSERT INTO questions set ?", newQues, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Question.getQuestionById = function (quesId, result) {
        sql.query("Select question from questions where id_qst = ? ", quesId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Question.getAllquestions = function (result) {
        sql.query("Select * from questions", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('questions : ', res);                       
                  result(null,res);
                }
            });   
};
module.exports=Question


