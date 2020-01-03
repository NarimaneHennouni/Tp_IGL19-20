/**
 * This file contains different routes of the app
 * @module  server-side/routes/approutes-js
 */
'use strict';
/**
 * defines what to do if the user types a specific url 
 * @function 
 * @param {Express.Application} app -node application or the server
 */
module.exports = function(app) {
  /**
   * @member todoList 
   * @description variable that contains a question object
   */
  var todoList = require('../controllers/appController');

  /**
   * @member routes
   * @description todoList Routes
   */
  // todoList Routes
  app.route('/forumesiquestions')
    .get(todoList.list_all_questions)
    .post(todoList.create_a_question);
   
   app.route('/forumesiquestions/:quesId')
    .get(todoList.read_a_question)
    };