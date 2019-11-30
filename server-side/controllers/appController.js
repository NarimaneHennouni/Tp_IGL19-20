'use strict';

var Question = require('../model/appModel.js');

exports.list_all_questions = function(req,res) {
  Question.getAllquestions(function(err, question) {

    console.log('controller')
    if (err) res.send(err);
    res.json(question);      
  });
};



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


exports.read_a_question = function(req, res) {
  Question.getQuestionById(req.params.quesId, function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};
