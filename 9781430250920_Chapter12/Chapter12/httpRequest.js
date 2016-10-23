var http = require('http');

var options = {
  host: 'www.apress.com',
  path: '/9781430250920'
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

function startUp(){
   var req = http.request(options, callback);
	req.end();

}
exports.startup = startUp;
