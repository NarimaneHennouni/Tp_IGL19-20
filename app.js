var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/* set up sql connection */
var mysql = require("mysql");
var connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
	user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});

/* throw an error if sql connect fails. it should fail a couple times in docker 
 before successfully connecting. the container takes longer to boot up, essentially.
 */
connection.connect(function(err){
	if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
	}
	console.log("connected as id " + connection.threadId);
});


/* -------------------------------------- */
/* Get routes below */

app.get('/forumesi', function(req, res){
	
	var q = 'SELECT * from questions';


	/* query for characters, abilities, and allegiances then
	pass the results into the page so the drop downs can be populated */
	connection.query(q, function(error, results, fields){
		if(error) throw error;
		qsts = results;
		//console.log(qsts);
	    });
});
    var port = 3000;

app.listen(port, function(){
	console.log("app listening on port: " + port);
});