/**
 * récuperer le module app et se connecter au serveur
 */

const app = require("./server.js");

app.listen(3003, () => console.log("server starting on port 3000!"));
