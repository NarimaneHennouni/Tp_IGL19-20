/**
 * This file contains controllers of the different HTTP requests 
 * @module server-side/controllers/appController-js
 */
'use strict';
/**
 * @member Question 
 * @description Question object that handles HTTP requests (GET,GET:ID,POST)
 */
var Question = require('../model/appModel.js');
/**
 * @function list_all_questions -lists all questions posted in the forum
 */
exports.list_all_questions = function(req,res) {
  Question.getAllquestions(function(err, question) {

    console.log('controller')
    if (err) res.send(err);
    res.json(question); 
  });
};
/**
 * @function create_a_question -creates a new question and posts it in the forum
 */
exports.create_a_question = function(req, res) {
  var new_ques = new Question(req.body.question);

  //handles null error 
   if(!new_ques.question){

            res.status(400).send({ error:true, message: 'Please provide question/status' });

        }
else{
  
  Question.createQuestion(new_ques, function(err, question) {
    
    if (err)
      res.send(err);
    res.json(question);
  });
}
};
/**
 * @function read_a_question -displays a question and its related answers
 */
exports.read_a_question = function(req, res) {
  Question.getQuestionById(req.params.quesId, function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};


