'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/appController');

  // todoList Routes
  app.route('/forumesiquestions')
    .get(todoList.list_all_questions)
    .post(todoList.create_a_question);
   
   app.route('/forumesiquestions/:quesId')
    .get(todoList.read_a_question)
    };