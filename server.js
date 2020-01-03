/**
 * This file establishes the connection with the database and launches both of the server and the app
 * @module server-js
 */


const express = require('express');
/**
 * @member app
 * @description express application that is launched on a localhost and listens to HTTP requests
 */
  app = express();
  const bodyParser = require('body-parser');
  
  /**
   * @member port 
   * @description specified port for the backend (3000)
   */
  port = process.env.PORT || 3000;

const mysql = require('mysql');
/**
 * database's connection configurations
 * @type {Object}
 */

var connection = mysql.createConnection({
  host            : 'localhost',
//  port            : process.env.MYSQL_PORT,
  user            : 'root',
  password        : '',
  database        : 'forumesi'
});

 // connect to database
 connection.connect();
 app.listen(port);

 /* for docker
 connection.connect(function(err) {
  if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
  }

  console.log('Connected as id ' + connection.threadId);
});*/


console.log('API server started on: ' + port);

/**
 * @member a_peace_of_code_that_fixes_CORS_ERROR
 * @description Cross-Origin error means that the server gets requests only from its port (in this case only from 3000),
 * but the react app is running on port 4000 so if it makes an HTTP request for the server, it won't get a response because it
 * is not allowed due to Cross-Origin error, so we should add some stuffs to the response header and thus requests are allowed from any url.
 */
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','POST,GET,PUT,PATCH,DELETE');
    return res.status(200).json({}); 
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./server-side/routes/approutes'); //importing route
/**
 * @function routes
 * @param {Express.Application} app -Express app
 * @description indicates how the express app responds to client requests to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
 * Each route can have one or more handler functions, which are executed when the route is matched.
 */
routes(app); //register the route
module.exports=app;
