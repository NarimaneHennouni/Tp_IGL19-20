/**
 * This file contains methods that execute sql queries on the database
 * @module server-side/model/appModel-js
 */
'user strict';
/**
 * @member sql -
 * @description variable that establishes connection with the database
 */
var sql = require('./questions_db.js');
/**
 * @description constructor of the question
 * @function Question 
 * @param {string} question -content of the question
 */
//question object constructor
var Question = function(question){
    /**
     * @member question
     * @description content of the question
     */
    //this.id_user = id_user connecté
    this.question = question.question;
};
/**
 * @member {function} createQuestion
 * @description inserts a new question into the database
 */
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
/**
 * @member {function} getQuestionById
 * @description  displays details of a question
 */
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
/**
 * @member {function} getAllquestions
 * @description displays all questions posted in the forum
 */
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


