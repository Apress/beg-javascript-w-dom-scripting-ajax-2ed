var http = require('http');

function startUp(){
   function onRequest(request, response){
      response.writeHead(200,{"Content-Type": "text/plain"}); 
      response.end("It's the information age!");
   }
    http.createServer(onRequest).listen(8080);
}
exports.startup = startUp;
